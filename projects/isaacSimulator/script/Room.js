//===============================================================
// 房间类
//===============================================================
class Room {
    constructor(config) {
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
        randomSeed(38572935);
        rect(this.leftFloor, this.upFloor, this.rightFloor - this.leftFloor, this.downFloor - this.upFloor);
    }
}