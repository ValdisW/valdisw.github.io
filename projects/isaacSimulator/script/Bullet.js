//===============================================================
// Bullet
//---------------------------------------------------------------
//  子弹类。子弹在飞行至末端时，会平抛落地。因此子弹高度也会影响射程
//  子弹的方向在飞行过程中保持不变，初始化时就已确定。
//===============================================================
class Bullet extends Moveable{
    constructor(config) {
        super(config);
        this.direction = config.direction;                  // 基础方向（表示上下左右的单位向量），实际情况会根据玩家移动速度有所偏移
        this.range = config.range || 500;                   // 范围
        this.bulletSpeed = config.bulletSpeed || 5;         // 弹速，每帧前进的距离
        this.height = config.height || 50;                  // 子弹高度

        this.playerVelocity = config.playerVelocity;        // 子弹发射时玩家的速度（向量）

        this.fallingSpeed = 0;

        this.lifespan = this.range;
        this.isValid = true;
    
        let tempVector = createVector(abs(this.direction.y), abs(this.direction.x));
        this.playerVelocity.x *= tempVector.x;
        this.playerVelocity.y *= tempVector.y;
        this.realDirection = (this.direction.copy().add(this.playerVelocity.normalize().mult(0.6))).normalize();
        console.log(this.direction);
    }
    update() {
        // 碰到墙壁
        if (this.position.x <= room.leftFloor ||
            this.position.x >= room.rightFloor ||
            this.position.y <= room.upFloor ||
            this.position.y >= room.downFloor) this.isValid = false;

        // 位置更新，基础方向上添加惯性的影响
        this.position.add(this.realDirection.setMag(this.bulletSpeed));

        // 射程计算
        this.lifespan -= this.bulletSpeed;

        // 当子弹飞行至有效射程时，即lifespan==0时，开始类平抛下落
        // 下落处理（类平抛运动）
        if (this.lifespan <= 0) {
            this.fallingSpeed += fallingAcceleration;
            this.height -= this.fallingSpeed;
        }

        // 落地失效
        if (this.height <= 0) this.isValid = false;
    }
    render() {
        fill(this.color);
        stroke(0);
        ellipse(this.position.x, this.position.y - this.height, this.radius * 2, this.radius * 2);
        super.render();
    }
}