var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");


function draw(ctx, src, x, y, width, height) {
    var img = new Image();
    img.src = src;

    if(!img.complete) {
        setTimeout(function() {
            draw(ctx, src, x, y, width, height);
        }, 50);
        return;
    }

    ctx.drawImage(img, x, y, width, height)
}

class projectile {
    constructor(x, y) {
        this.img = "images/energyBall.png";
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.vel = 20;
        this.width = 47;
        this.height = 42;
        this.new = true;
    }

    fire(mouseX, mouseY) {
        var pmx = this.x;
        var pmy = this.y;
        var mx = mouseX;
        var my = mouseY;

        var radians = Math.atan2(my - pmy, mx - pmx);
        this.dx = Math.cos(radians) * this.vel;
        this.dy = Math.sin(radians) * this.vel;
    }

    update(screen) {
        this.x += this.dx;
        this.y += this.dy;
        draw(screen, this.img, Math.floor(this.x), Math.floor(this.y), this.width, this.height);
    }
}

var player = {
    img: "images/wizardRight.png",
    x: 10,
    y: 300,
    width: 50,
    height: 64,
    vel: 12,
    health: 120,
    baseHealth: 120,
    attack: 30,
    spell: [],
    fired: false,
    score: 0,
    level: 0,
    attackLimit: 1
};

function playerMove(event) {
    if(event.keyCode == 65 && player.x > 10) {
        // move left
        player.x -= player.vel;
        player.img = "images/wizardLeft.png";
    }
    if(event.keyCode == 87 && player.y > 10) {
        // move up
        player.y -= player.vel;
    }
    if(event.keyCode == 68 && player.x < 590 - player.width) {
        // move right
        player.x += player.vel;
        player.img = "images/wizardRight.png";
    }
    if(event.keyCode == 83 && player.y < 590 - player.height) {
        // move down
        player.y += player.vel;
    }
    if(event.keyCode == 32) {
        // pause
        alert("The game has been paused. Click 'ok' to resume.");
    }
    cvs.width = cvs.width;
    draw(ctx, player.img, player.x, player.y, player.width, player.height);
}

function playerAttack(event) {
    if(player.spell.length != player.attackLimit) {
        player.fired = true;
        var temp = new projectile(player.x, player.y);
        player.spell.push(temp);
        var rect = cvs.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        for(var i = 0; i < player.spell.length; i++) {
            if(player.spell[i].new) {
                player.spell[i].fire(x, y);
                player.spell[i].new = false;
            }
        }
    }
}

class enemy {
    constructor(x, y, vel) {
        this.fire = "images/attack.png";
        this.explode = "images/explode.png";
        this.left = "images/demonLeft.png";
        this.right = "images/demonRight.png";
        this.x = x;
        this.y = y;
        this.vel = vel;
        this.dx = 0;
        this.dy = 0;
        this.pmx = x;
        this.pmy = y;
        this.dist = 0;
        this.width = 80;
        this.height = 80;
        this.health = 90;
        this.baseHealth = 90;
        this.attack = 4;
        this.score = 15;
    }

    follow(mx, my) {
        var radians = Math.atan2(my - this.pmy, mx - this.pmx);
        this.dist = Math.hypot(mx - this.pmx, my - this.pmy) / this.vel;
        this.dist = Math.floor(this.dist);

        this.dx = Math.cos(radians) * this.vel;
        this.dy = Math.sin(radians) * this.vel;

        this.pmx = mx;
        this.pmy = my;
    }

    update(screen) {
        if(this.dist > 0) {
            this.dist -= 1;
            this.x += this.dx;
            this.y += this.dy;
        }
        if(this.dx < 0) {
            draw(screen, this.left, this.x, this.y, this.width, this.height);
        } else {
            draw(screen, this.right, this.x, this.y, this.width, this.height);
        }
    }

    effect() {
        return;
    }
}

class regenerate extends enemy {
    left = "images/healDemonLeft.png";
    right = "images/healDemonRight.png";
    score = 20;

    effect() {
        if(this.health < 90) {
            this.health += 0.07;
        } else if (this.health < 45) {
            this.health += 0.14;
        }
    }
}

class spiker extends enemy {
    left = "images/spikerDemonLeft.png";
    right = "images/spikerDemonRight.png";
    spikeLimit = 225;
    attack = 3;

    effect() {
        if(this.spikeLimit == 0) {
            var temp = new spikes(this.x, this.y);
            items.push(temp);
            this.spikeLimit = 225;
        } else {
            this.spikeLimit -= 1;
        }
    }
}

class spawner extends enemy {
    left = "images/spawnerDemonLeft.png";
    right = "images/spawnerDemonRight.png";
    spawns = 5;
    score = 25;

    effect() {
        if(this.health < 90 && this.spawns != 0) {
            this.spawns -= 1;
            var spawnSpeed = this.vel + (Math.floor(Math.random() * 10) / 10) - 0.5;

            var random = Math.floor(Math.random() * 10);
            var temp;
            if(random == 3 || random == 1) {
                temp = new regenerate(this.x, this.y, spawnSpeed);
            } else if(random == 5) {
                temp = new spiker(this.x, this.y, spawnSpeed);
            } else {
                temp = new enemy(this.x, this.y, spawnSpeed);
            }
            demons.push(temp);
        } 
    }
}

class upgrades {
    constructor(x, y) {
        this.img = "images/explode.png"; // for debugging
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40;
        this.timer = 1500;
    }

    expiration() {
        return this.timer -= 1;
    }

    update(screen) {
        draw(screen, this.img, this.x, this.y, this.width, this.height);
    }
}

class spikes extends upgrades {
    img = "images/spikes.png";
    timer = 300;

    effect(player) {
        player.health -= 15;
    }
}

class heal extends upgrades {
    img = "images/healthBoost.png";

    effect(player) {
        if(player.health <= 85) {
            player.health += 35;
        } else if(player.health < 120) {
            player.health = 120;
        }
    }
}

class speed extends upgrades {
    img = "images/speedBoost.png";

    effect(player) {
        player.vel += .8;
    }
}

class spell extends upgrades {
    img = "images/spellBoost.png";

    effect(player) {
        player.attackLimit += 1;
    }
}