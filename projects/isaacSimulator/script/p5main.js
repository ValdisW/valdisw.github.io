//============================================================
// setup()
//------------------------------------------------------------
//  各部分定义后，从这里开始进行初始化
//============================================================
function setup(){
    // 创建画布
    createCanvas(windowWidth, windowHeight);

    textSize(20);

    // 初始化房间
    room = new Room({
        leftFloor: 220,
        rightFloor: width - 220,
        upFloor: 130,
        downFloor: height - 130,
        leftCeil: 120,
        rightCeil: width - 120,
        upCeil: 30, 
        downCeil: height - 30
    });

    // 初始化玩家
    player = new Player({
        position: createVector(width / 2, height / 2),
        color: color(240, 220, 220),
        radius: 30,
        speed: 6,
        tears: 20,
        bulletSpeed: 7
    });
    stats = [player.speed, player.range, player.tears, player.bulletSpeed, player.attack, player.luck, (0).toFixed(2) + '%', (0).toFixed(2) + '%'];

    // 初始化敌人
    for (let i = 0; i < 8; i++) {
        enemies.push(new Enemy({
            position: createVector(random(width), random(height)),
            hp: 100,
            radius: 25,
            color: color(122)
        }));
    }

    frameRate(60);
}

//============================================================
// draw()
//------------------------------------------------------------
//  每帧渲染的内容
//============================================================
function draw() {
    // 黑色背景
    fill(0);
    stroke(0);
    rect(0, 0, width, height);

    // 绘制墙壁和地板
    room.render();

    // 更新玩家
    player.update(time);
    player.render(time);

    // 更新敌人
    for (let i = enemies.length-1; i >= 0; i--) {       // 敌人集合清理死亡的敌人
        if (!enemies[i].isAlive) {
            enemies.splice(i, 1);
            //score += enemies[i].scoreValue;
        }
    }
    for (enemy of enemies) {
        enemy.update();
        enemy.render();
    }

    // 更新子弹
    for (let i = player.bullets.length-1; i >= 0; i--) {        // 先删除无效子弹
        if (!player.bullets[i].isValid) player.bullets.splice(i, 1);
    }
    for (let b of player.bullets) {
        b.update(player.currentVelocity);
        b.render();
    }

    //==================================
    //--------------- UI ---------------
    fill(128);
    stroke(128);
    // 游戏时间和分数
    text("TIME:", width/2 - 60, 30);
    text(timeFormatter(parseInt(time/60)), width/2, 30);
    text("SCORE:", width/2 - 60, 60);
    text(score, width/2 + 68, 60);

    // 玩家血量
    stroke(255);
    for (let i = 0; i < player.maxHP; i++) {
        if (i+1 > player.hitpoints) {
            fill(0, 0, 0, 0);
        }else {
            fill(255, 0, 0);
        }
        ellipse(140 + i * 40, 30, 20, 20);
    }

    // 资源
    stroke(0);
    fill(203, 207, 111);            // 硬币
    ellipse(50, 100, 15, 20);

    fill(70);                       // 炸弹
    ellipse(50, 130, 20, 20);

    fill(203);                      // 钥匙
    stroke(203);
    ellipse(50, 155, 15, 10);
    rect(44, 163, 5, 2);
    rect(44, 168, 5, 2);
    rect(49, 160, 2, 10);
    fill(0)
    stroke(0);
    ellipse(50, 155, 7.5, 5);

    fill(255);
    text(player.coins<10?'0'+player.coins:player.coins, 70, 108);
    text(player.bombs<10?'0'+player.bombs:player.bombs, 70, 138);
    text(player.keys<10?'0'+player.keys:player.keys, 70, 168);

    // 玩家属性
    fill(128);
    stroke(0);
    for (let i = 0; i < stats.length; i++) {
        text(stats[i], 50, height/3+ i*30);
    }
    //--------------- UI ---------------
    //==================================

    time ++;
}

//============================================================
// keyPressed()
//------------------------------------------------------------
//  监听键盘按下
//============================================================
function keyPressed() {
    // 方向键判定
    if (key === 'ArrowLeft') {trigger.left = true; player.shootingDirection = createVector(-1, 0);}
    if (key === 'ArrowRight') {trigger.right = true; player.shootingDirection = createVector(1, 0);}
    if (key === 'ArrowUp') {trigger.up = true; player.shootingDirection = createVector(0, -1);}
    if (key === 'ArrowDown') {trigger.down = true; player.shootingDirection = createVector(0, 1);}
    // 四个方向键任意一个被按下，判定玩家射击
    if (trigger.up || trigger.down || trigger.left || trigger.right) {
        player.isShooting = true;
    }

    // WASD判定
    if (key === 'w' | key === 'W') trigger.w = true;
    if (key === 'a' | key === 'A') trigger.a = true;
    if (key === 's' | key === 'S') trigger.s = true;
    if (key === 'd' | key === 'D') trigger.d = true;
}

//============================================================
// keyReleased()
//------------------------------------------------------------
//  监听键盘松开
//============================================================
function keyReleased() {
    if (key === 'ArrowLeft') {trigger.left = false;}
    if (key === 'ArrowRight') {trigger.right = false;}
    if (key === 'ArrowUp') {trigger.up = false;}
    if (key === 'ArrowDown') {trigger.down = false;}
    // 四个方向键均未按下时，判定玩家没有在射击
    if (!(trigger.up || trigger.down || trigger.left || trigger.right)) {
        player.isShooting = false;
    }

    // WASD判定
    if (key === 'w' | key === 'W') trigger.w = false;
    if (key === 'a' | key === 'A') trigger.a = false;
    if (key === 's' | key === 'S') trigger.s = false;
    if (key === 'd' | key === 'D') trigger.d = false;
}