var easy = [
    [new enemy(300, 300, 2), new enemy(600, 600, 2), new enemy(300, 600, 2), new enemy(600, 300, 2)],
    
    [new enemy(300, 300, 2), new enemy(10, 450, 2), new enemy(10, 10, 2), new regenerate(300, 10, 3), new enemy(450, 450, 3), 
    new enemy(150, 150, 3),],
    
    [new enemy(10, 30, 1), new enemy(10, 520, 1), new enemy(200, 520, 2), new enemy(500, 30, 3), new enemy(500, 520, 3), 
    new enemy(200, 200, 2), new enemy(200, 400, 3), new enemy(400, 200, 3), new enemy(400, 400, 3)], 
    
    [new regenerate(200, 200, 3), new enemy(200, 400, 2), new enemy(400, 400, 2), new enemy(400, 200, 2), new enemy(500, 500, 3), 
    new regenerate(500, 100, 2), new enemy(100, 500, 2)],
    
    [new enemy(10, 30, 2), new enemy(10, 520, 2), new enemy(200, 30, 3), new enemy(200, 520, 3), new enemy(500, 30, 2), 
    new enemy(500, 520, 3), new enemy(200, 200, 2), new enemy(200, 400, 3), new enemy(400, 400, 3)],
    
    [new enemy(500, 500, 1), new enemy(100, 100, 3), new enemy(100, 300, 3), new spiker(300, 500, 2), new enemy(300, 100, 3), 
    new spiker(500, 300, 3)],
    
    [new enemy(10, 30, 2), new enemy(10, 520, 1), new regenerate(200, 30, 1), new spiker(200, 520, 1), new regenerate(500, 30, 3), 
    new spiker(500, 520, 3), new regenerate(200, 200, 3), new enemy(200, 400, 2), new enemy(400, 200, 2)],
    
    [new enemy(30, 10, 2), new spiker(520, 10, 1), new regenerate(300, 200, 3), new spiker(400, 400, 3), new regenerate(30, 500, 3), 
    new enemy(520, 500, 1), new enemy(500, 200, 3), new enemy(300, 200, 3), new spawner(200, 400, 3)]
    ];
    
    var medium = [
    [new enemy(30, 10, 2), new regenerate(10, 520, 2), new enemy(300, 200, 2), new enemy(200, 520, 3), new enemy(500, 30, 3), 
    new enemy(500, 520, 3), new enemy(200, 200, 2), new regenerate(200, 400, 3), new enemy(400, 200, 3)],
    
    [new enemy(500, 500, 1), new spiker(100, 100, 3), new enemy(100, 300, 3), new enemy(300, 500, 2), new enemy(300, 100, 3), 
    new enemy(500, 300, 3), new enemy(600, 600, 2), new spiker(300, 600, 2), new enemy(600, 300, 2)],
    
    [new enemy(10, 30, 2), new spiker(10, 520, 1), new enemy(200, 30, 1), new enemy(200, 520, 1), new enemy(500, 30, 3), 
    new enemy(500, 520, 3), new enemy(200, 200, 3), new regenerate(200, 400, 2), new enemy(400, 400, 2)],
    
    [new enemy(10, 30, 2), new spiker(520, 10, 1), new regenerate(200, 30, 3), new enemy(400, 400, 3), new enemy(30, 500, 3), 
    new enemy(520, 500, 1), new regenerate(500, 200, 3), new spiker(300, 200, 3), new enemy(200, 400, 3)],
    
    [new enemy(300, 300, 2), new enemy(600, 600, 2), new spawner(300, 600, 2), new enemy(600, 300, 2), new enemy(700, 700, 2),
    new spawner(700, 100, 2.5), new enemy(700, 200, 2.1), new enemy(700, 300, 1.9), new enemy(700, 400, 2.1), new enemy(700, 500, 2.5), 
    new enemy(-100, 100, 2.4), new enemy(-100, 200, 2), new spawner(-100, 300, 1.8), new enemy(-100, 400, 2), new enemy(-100, 500, 2.4),
    new enemy(900, 90, 2.8), new enemy(900, 190, 2.4), new enemy(900, 290, 2.2), new enemy(900, 390, 2.4), new spawner(900, 490, 2.8), 
    new enemy(-250, 110, 2.7), new enemy(-250, 210, 2.3), new enemy(-250, 310, 2), new spawner(-250, 410, 2.3), new enemy(-250, 510, 2.7)],
    ];
    
    var hard = [
    [new spiker(500, 500, 1), new enemy(100, 100, 3), new regenerate(300, 300, 2), new enemy(300, 500, 2), new enemy(300, 100, 3), 
    new enemy(500, 300, 3), new regenerate(600, 600, 2), new enemy(300, 600, 2), new spiker(600, 300, 2)],
    
    [new enemy(10, 30, 2), new enemy(10, 520, 1), new spawner(200, 30, 1), new enemy(200, 520, 1), new enemy(500, 30, 3), 
    new enemy(500, 520, 3), new spawner(200, 200, 3), new enemy(200, 400, 2), new enemy(400, 400, 2)],
    
    [new enemy(700, 100, 2.5), new enemy(700, 200, 2.1), new spiker(700, 300, 1.9), new regenerate(700, 400, 2.1), new spiker(700, 500, 2.5), 
    new enemy(-100, 100, 2.4), new enemy(-100, 200, 2), new enemy(-100, 300, 1.8), new enemy(-100, 400, 2), new enemy(-100, 500, 2.4),
    new enemy(900, 90, 2.8), new enemy(900, 190, 2.4), new regenerate(900, 290, 2.2), new spiker(900, 390, 2.4), new regenerate(900, 490, 2.8), 
    new enemy(-250, 110, 2.7), new enemy(-250, 210, 2.3), new enemy(-250, 310, 2), new enemy(-250, 410, 2.3), new enemy(-250, 510, 2.7)],
    
    [new regenerate(100, 700, 2.5), new enemy(200, 700, 2.1), new regenerate(300, 700, 1.9), new enemy(400, 700, 2.1), new regenerate(500, 700, 2.5), 
    new enemy(100, -100, 2.4), new regenerate(200, -100, 2), new enemy(300, -100, 1.8), new spawner(400, -100, 2), new enemy(500, -100, 2.4),
    new enemy(90, 900, 2.8), new spawner(190, 900, 2.4), new enemy(290, 900, 2.2), new regenerate(390, 900, 2.4), new enemy(490, 900, 2.8), 
    new regenerate(110, -250, 2.7), new enemy(210, -250, 2.3), new regenerate(310, -250, 2), new enemy(-410, -250, 2.3), new regenerate(510, -250, 2.7)],
    
    [new enemy(700, 100, 2.5), new regenerate(700, 200, 2.1), new spiker(700, 300, 1.9), new regenerate(700, 400, 2.1), new enemy(700, 500, 2.5), 
    new enemy(-100, 100, 2.4), new regenerate(-100, 200, 2), new enemy(-100, 300, 1.8), new regenerate(-100, 400, 2), new enemy(-100, 500, 2.4),
    new enemy(900, 90, 2.9), new spiker(900, 190, 2.5), new spawner(900, 290, 2.3), new spiker(900, 390, 2.5), new enemy(900, 490, 2.9), 
    new enemy(-250, 110, 2.8), new regenerate(-250, 210, 2.4), new spawner(-250, 310, 2.2), new regenerate(-250, 410, 2.4), new enemy(-250, 510, 2.8),
    new enemy(100, 700, 2.7), new regenerate(200, 700, 2.3), new spawner(300, 700, 2.1), new regenerate(400, 700, 2.3), new enemy(500, 700, 2.7), 
    new enemy(100, -100, 2.6), new spiker(200, -100, 2.2), new spawner(300, -100, 2), new spiker(400, -100, 2.2), new enemy(500, -100, 2.6),
    new enemy(90, 900, 3.1), new regenerate(190, 900, 2.7), new enemy(290, 900, 2.5), new regenerate(390, 900, 2.7), new enemy(490, 900, 3.1), 
    new enemy(110, -250, 3), new regenerate(210, -250, 2.6), new spiker(310, -250, 2.4), new regenerate(-410, -250, 2.6), new enemy(510, -250, 3)]
    ];