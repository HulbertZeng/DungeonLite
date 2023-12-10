var wave = [];

//setting up the difficulty levels
while(wave.length == 0) {
    var input = prompt("Enter a number to choose a difficulty\n1. Easy\n2. Medium\n3. Hard");
    if(input == 1) {
        wave = easy;
    } else if(input == 2) {
        wave = medium;
    } else if(input == 3) {
        wave = hard;
    } else {
        alert("Please enter a valid choice");
    }
}


var demons = wave[0];
var items = [];

var loop = function() {
    draw(ctx, "images/dungeonFloor.png", 0, 0, 600, 600);
    draw(ctx, player.img, player.x, player.y, player.width, player.height);

    //display current score and level
    ctx.fillStyle = "red";
    ctx.font = "bold 30px Times New Roman";
    ctx.fillText("Score: " + player.score, 40, 40);
    var level = player.level + 1;
    ctx.fillStyle = "red";
    ctx.font = "bold 30px Times New Roman";
    ctx.fillText("Level: " + level, 460, 40);

    //player actions
    document.onkeydown = playerMove;
    document.addEventListener("mousedown", playerAttack, false);
    if(player.fired) {
        for(var i = 0; i < player.spell.length; ++i) {
            player.spell[i].update(ctx);
            if(!(0 < player.spell[i].x && player.spell[i].x < 600 && 0 < player.spell[i].y && player.spell[i].y < 600)) {
                player.spell.splice(i, 1);
            }
            if(player.spell.length == 0) {
                player.fired = false;
                break;
            }
        }
        
    }

    //player life bar rendered
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(player.x - 5, player.y - 20, 60, 10);
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(player.x - 5, player.y - 20, 60 * (player.health / player.baseHealth), 10);

    //player death condition
    if(player.health <= 0) {
        alert("You have been slain...\nYour total score: " + player.score);
        location.reload();
        return;
    }

    //item interations
    for(var i = 0; i < items.length; ++i) {
        var currI = items[i];

        currI.update(ctx);

        //if the player gets the item
        if((currI.x < player.x + player.width / 2 && player.x + player.width / 2 < currI.x + currI.width) &&
        (currI.y < player.y + player.height / 2 && player.y + player.height / 2 < currI.y + currI.height) &&
        currI.timer != 0) {
            currI.effect(player);
            items.splice(i, 1);
        }

        //if the item expires
        if(currI.expiration() == 0) {
            items.splice(i, 1);
        }
    }

    //demon interations
    for(var i = 0; i < demons.length; ++i) {
        var currD = demons[i]; //for shortcut

        if(player.fired) {
            //if player projectile hits a demon
            for(var j = 0; j < player.spell.length; ++j) {
                if(currD.x < player.spell[j].x + player.spell[j].width / 2 &&
                player.spell[j].x + player.spell[j].width / 2 < currD.x + currD.width &&
                demons[i].y < player.spell[j].y + player.spell[j].height / 2 &&
                player.spell[j].y + player.spell[j].height / 2 < currD.y + currD.height) {
                    currD.health -= player.attack;
                    player.spell.splice(j, 1);
                    player.score += currD.score;
                }
                if(player.spell.length == 0) {
                    player.fired = false;
                    break;
                }
            }
            
            //if the demon is dead
            if(currD.health <= 0) {
                draw(ctx, currD.explode, currD.x, currD.y, currD.width, currD.height);
                player.score += 20;

                var random = Math.floor(Math.random() * 10);
                if(random == 0) {
                    random = Math.floor(Math.random() * 3);
                    var temp;
                    if(random == 0) {
                    temp = new heal(currD.x, currD.y);
                    } else if(random == 1) {
                    temp = new speed(currD.x, currD.y);
                    } else {
                        temp = new spell(currD.x, currD.y);
                    }
                    items.push(temp);
                }
            
                demons.splice(i, 1);
                i = 0;
                
            }

            //if there are no more demons in the current wave
            if(demons.length == 0) {
                ++ player.level;
                //victory condition
                if(wave.length == player.level) {
                    alert("You have slain all the demons in the dungeon.\nYour total score: " + player.score);
                    location.reload();
                    return;
                }
                //level completion condition
                alert("You have slain all the demons in level " + player.level);
                player.x = 10;
                player.y = 300;
                demons = wave[player.level];
                break;
            }
        }

        //demon attack condition
        if(currD.dist == 0) {
            currD.follow(player.x, player.y);
            if(player.x - 20 < currD.x + 40 &&
            currD.x + 40 < player.x + 70 && 

            player.y - 20 < currD.y + 35 &&
            currD.y + 35 < player.y + 84 &&
            player.x - 20 < currD.x &&
            currD.x < player.x + 70 && 
            player.y - 20 < currD.y &&
            currD.y < player.y + 84) {
                draw(ctx, demons[i].fire, player.x, player.y, player.width, player.height);
                player.health -= currD.attack;
                player.score -= 15;
            }
        }

        //demon life bar and sprite display
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(demons[i].x - 5, currD.y - 20, 60, 10);
        ctx.fillStyle = "#00FF00";
        ctx.fillRect(demons[i].x - 5, currD.y - 20, 60 * (currD.health / currD.baseHealth), 10);
        demons[i].update(ctx);
        demons[i].effect();
    }
    
    window.requestAnimationFrame(loop);
};

window.requestAnimationFrame(loop);