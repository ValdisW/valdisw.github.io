//===============================================================
// 房间类
//===============================================================
class Room{
    constructor(config){
        this.leftFloor = config.leftFloor;
        this.rightFloor = config.rightFloor;
        this.upFloor = config.upFloor;
        this.downFloor = config.downFloor;
        this.leftCeil = config.leftCeil;
        this.rightCeil = config.rightCeil;
        this.upCeil = config.upCeil;
        this.downCeil = config.downCeil;
    }
    render() {
        // 绘制墙壁
        fill(94, 64, 58);
        stroke(0);
        quad(this.leftCeil, this.upCeil, this.rightCeil, this.upCeil, this.rightFloor, this.upFloor, this.leftFloor, this.upFloor);
        quad(this.leftCeil, this.upCeil, this.leftFloor, this.upFloor, this.leftFloor, this.downFloor, this.leftCeil, this.downCeil);
        quad(this.leftCeil, this.downCeil, this.rightCeil, this.downCeil, this.rightFloor, this.downFloor, this.leftFloor, this.downFloor);
        quad(this.rightCeil, this.upCeil, this.rightFloor, this.upFloor, this.rightFloor, this.downFloor, this.rightCeil, this.downCeil);
        
        // 绘制地板
        fill(74, 44, 45);
        stroke(0);
        rect(this.leftFloor, this.upFloor, this.rightFloor - this.leftFloor, this.downFloor - this.upFloor);
    }
}

//===============================================================
// 游戏对象
//---------------------------------------------------------------
//  房间内所有实体对象都继承于此
//===============================================================
class GameObject{
    constructor(config) {
        this.position = config.position || createVector(width/2, height/2);     // 位置
        this.color = config.color || color(255);                                // 颜色
        this.radius = config.radius || 15;                                      // 半径
    }
    update() {
        // 位置更正。将位置限定在房间范围内。
        if (this.position.x <= room.leftFloor + this.radius) this.position.x = room.leftFloor + this.radius;
        if (this.position.x >= room.rightFloor - this.radius) this.position.x = room.rightFloor - this.radius;
        if (this.position.y <= room.upFloor + this.radius) this.position.y = room.upFloor + this.radius;
        if (this.position.y >= room.downFloor - this.radius) this.position.y = room.downFloor - this.radius;
    }
    render() {
        // 仅绘制阴影
        fill(0, 0, 0, 64);
        stroke(0, 0, 0, 64);
        ellipse(this.position.x, this.position.y, this.radius * 2, this.radius);
    }
}

//===============================================================
// Moveable
//---------------------------------------------------------------
//  可移动对象类。包括玩家、敌人、子弹，可以自主移动。
//===============================================================
class Moveable extends GameObject{
    constructor(config) {
        super(config);
    }
}

//===============================================================
// Item
//---------------------------------------------------------------
//  道具类。分为属性道具（主动、被动）和一般掉落（普通掉落、饰品）
//===============================================================
class Item extends GameObject{
    constructor(config) {
        super(config);
        this.id = config.id || 'unknownItem';
    }
}

//===============================================================
// AttrItem
//---------------------------------------------------------------
//  属性道具类。一般会带一个石头基座，悬浮在空中。有数量限制
//===============================================================
class AttrItem extends Item{
    constructor(config) {
        super(config);
    }
    update() {

    }
    render() {
        switch (this.id) {
            case 'Breakfast': 

                break;
        }
    }
}

//===============================================================
// normalItem
//---------------------------------------------------------------
//  一般道具类。直接在地面上。除了饰品只有一个，其他可以获取无限个。
//===============================================================
class normalItem extends Item{
    constructor(config) {
        super(config);
    }
    update() {

    }
    render() {

    }
}

//===============================================================
// ordinaryItem
//---------------------------------------------------------------
//  基础掉落类。包括心、硬币、炸弹、钥匙等
//===============================================================
class ordinaryItem extends Item{
    constructor(config) {
        super(config);
    }
    update() {

    }
    render() {

    }
}
