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
// ProactiveItem
//---------------------------------------------------------------
//  主动道具类。需要充能后才可以使用。
//===============================================================
class ProactiveItem extends Item{
    constructor(config) {
        super(config);
    }
    update() {

    }
    render() {

    }
}

//===============================================================
// OrdinaryItem
//---------------------------------------------------------------
//  基础掉落类。包括心、硬币、炸弹、钥匙等
//===============================================================
class OrdinaryItem extends Item{
    constructor(config) {
        super(config);
    }
    update() {

    }
    render() {

    }
}

//===============================================================
// PillsAndCards
//---------------------------------------------------------------
//  药丸和卡牌
//===============================================================
class PillsAndCards extends Item{
    constructor(config) {
        super(config);
    }
    update() {

    }
    render() {

    }
}
