//===============================================================
// Enemy
//---------------------------------------------------------------
//  敌人类
//===============================================================
class Enemy extends Moveable{
    constructor(config) {
        super(config);
        this.direction = config.direction || createVector(100, 100);
        this.hp = config.hp || 100;             // 血量
        this.speed = config.speed || 4;         // 速度
        this.sight = config.sight || 600;       // 视野
        this.isAlive = true;                    // 是否活着
        this.scoreValue = 20;                   // 击杀后获得分数
    }

    // 每帧数据更新
    update() {
        // 位置更新
        super.update();
        // 如果发现玩家则靠近玩家，否则随机移动
        if (this.position.dist(player.position) <= this.sight) {
            this.position.add(player.position.copy().sub(this.position).normalize().setMag(this.speed));
        }else {
            this.position.add(p5.Vector.random2D().setMag(this.speed));
        }
        // 避免和玩家以及其他敌人位置重叠
        for (let enemy of enemies) {
            if (this === enemy) continue;   // 这个"其他敌人"是自己
            if (this.position.dist(enemy.position) <= this.radius + enemy.radius) {
                this.position.add(this.position.copy().sub(enemy.position).normalize().setMag(this.speed));
            }
        }
        if (this.position.dist(player.position) <= this.radius + player.radius/3) {
            this.position.add(this.position.copy().sub(player.position).normalize().setMag(this.speed));
        }

        // 敌人被打
        for (let bullet of player.bullets) {
            if (this.position.dist(bullet.position) <= this.radius + bullet.radius) {
                this.hp -= player.attack;
                bullet.isValid = false;
            }
        }
        if (this.hp <= 0) this.isAlive = false;
    }

    // 每帧渲染内容
    render() {
        fill(255, 128, 192);
        ellipse(this.position.x, this.position.y-50, 30, 30);
        super.render();
    }
}