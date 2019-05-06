//===============================================================
// Player
//---------------------------------------------------------------
//  玩家类
//===============================================================
class Player extends Moveable{
    constructor (config) {
        super(config);

        // 战斗属性
        this.maxHP = config.maxHP || 3;     // 最大生命值
        this.speed = config.speed || 4;     // 移动速度
        this.range = config.range || 400,   // 射程
        this.tears = config.tears || 30;    // 射速
        this.bulletSpeed = config.bulletSpeed || 5;  // 弹速
        this.attack = config.attack || 30;  // 攻击
        this.luck = config.luck || 0;       // 幸运

        this.bullets = [];                  // 存放子弹

        this.accelerationMag = 0.3;

        // 资源
        this.coins = 0;                     // 硬币数
        this.bombs = 0;                     // 炸弹数
        this.keys = 0;                      // 钥匙数

        // 即时状态
        this.currentAcceleration = 0;       // 即时加速度
        this.currentVelocity = createVector(0, 0);           // 即时速度（向量，每帧位置的变化量）

        this.hitpoints = this.maxHP;                 // 当前生命值

        this.cd = 0;                        // 冷却时间，用来处理射速问题

        this.isShooting = false;            // 是否在射击
        this.shootingDirection = void 0;    // 射击方向

        this.isTakingDamage = false;                        // 是否在受伤的无敌时间内
        this.takeDamageTime = Math.NEGATIVE_INFINITY;       // 上次受伤时间
    }

    // 射击，每被调用一次就会生成新的子弹。子弹的绝对速度还会受到玩家速度的影响
    _shoot(d) {
        // 冷却时间
        if (this.cd > 0) {
            this.cd--;
        }else {
            // 创建子弹
            this.bullets.push(new Bullet({
                position: player.position.copy(),
                color: color(172),
                bulletSpeed: this.bulletSpeed,
                radius: 12,
                direction: d.copy(),
                range: this.range,
                playerVelocity: this.currentVelocity.copy()
            }));
            this.cd = this.tears;
        }
    }

    // 掉血，刚掉血时会有短暂的无敌状态
    _takeDamage(time) {
        if (!this.isTakingDamage) {         // 不在无敌状态才会扣血，扣血后进入短暂无敌状态
            this.hitpoints--;
            this.isTakingDamage = true;
            this.takeDamageTime = time;     //  记录受伤时间，在此时间三秒后解除无敌状态
        }
    }

    // 移动。连续的，不包括瞬移。
    // 先加速到恒定，然后减速到静止
    _move() {
        if (trigger.w) this.currentVelocity.y -= this.accelerationMag;
        else if (this.currentVelocity.y < 0) this.currentVelocity.y += (parseInt(abs(this.currentVelocity.y) / this.accelerationMag)==0)?(abs(this.currentVelocity.y) % this.accelerationMag):this.accelerationMag;
        if (trigger.a) this.currentVelocity.x -= this.accelerationMag;
        else if (this.currentVelocity.x < 0) this.currentVelocity.x += (parseInt(abs(this.currentVelocity.x) / this.accelerationMag)==0)?(abs(this.currentVelocity.x) % this.accelerationMag):this.accelerationMag;
        if (trigger.s) this.currentVelocity.y += this.accelerationMag;
        else if (this.currentVelocity.y > 0) this.currentVelocity.y -= (parseInt(abs(this.currentVelocity.y) / this.accelerationMag)==0)?(abs(this.currentVelocity.y) % this.accelerationMag):this.accelerationMag;
        if (trigger.d) this.currentVelocity.x += this.accelerationMag;
        else if (this.currentVelocity.x > 0) this.currentVelocity.x -= (parseInt(abs(this.currentVelocity.x) / this.accelerationMag)==0)?(abs(this.currentVelocity.x) % this.accelerationMag):this.accelerationMag;

        if (this.currentVelocity.mag() > this.speed) this.currentVelocity.setMag(this.speed);
        this.position.add(this.currentVelocity);      // this.currentVelocity是一个向量，表示每帧玩家位置的变化
    }

    // 每帧数据更新
    update(time) {
        super.update();
        // 如果玩家在射击，则生成子弹
        if (this.isShooting) {
            this._shoot(this.shootingDirection);
        }

        // 玩家移动，位置更新
        player._move();

        // 如果玩家被怪碰到，掉血
        for (let enemy of enemies) {
            if (this.position.dist(enemy.position) <= this.radius + enemy.radius) {
                this._takeDamage(time);
            }
        }
        // 解除无敌状态
        if (time - this.takeDamageTime > 100) {
            this.isTakingDamage = false;
        }
    }

    // 每帧渲染内容，玩家外观的变化
    render(time) {
        if (player.hitpoints > 0) {
            stroke(0);
            if (this.isTakingDamage && time % 6 == 0) {
                fill(0, 0, 0, 0);
            }else {
                fill(this.color);
            }

            // 头
            let player_height = 50;
            ellipse(this.position.x, this.position.y - player_height, this.radius * 2, this.radius * 2);

            let eyeRadius = this.radius / 2, eyeBallRadius = eyeRadius / 2;
            fill(0);
            stroke(0);
            ellipse(this.position.x - this.radius / 5 * 3, this.position.y - player_height, eyeRadius, eyeRadius);
            ellipse(this.position.x + this.radius / 5 * 3, this.position.y - player_height, eyeRadius, eyeRadius);

            arc(this.position.x, this.position.y + eyeRadius/3*2 - player_height, eyeRadius, eyeRadius, PI, TWO_PI);

            fill(255);
            ellipse(this.position.x - this.radius / 5 * 3 - eyeBallRadius/3, this.position.y - eyeBallRadius/3 - player_height, eyeBallRadius, eyeBallRadius);
            ellipse(this.position.x + this.radius / 5 * 3 - eyeBallRadius/3, this.position.y - eyeBallRadius/3 - player_height, eyeBallRadius, eyeBallRadius);
            rect(this.position.x - eyeRadius/16*7, this.position.y + eyeRadius/4*2 - player_height, eyeRadius/8*7, eyeRadius/4);

            super.render();
        }
    }
}
