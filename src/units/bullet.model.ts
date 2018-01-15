import { UnitModel } from './../shared/unit.model';
import { View } from './../shared/view.type';
import {RobotModel} from "./robot.model";

export class BulletModel extends UnitModel {

    protected view: View = {
        width: 20,
        height: 20,
        'background-image': 'url(i/bullet.png)',
        'background-size': '100% 100%'
    };
    private interval: number;
    private robotView: View;
    private positionBullet: [number, number, boolean];
    private robot: RobotModel;
    public endOfMove: Boolean;

    constructor(robot: RobotModel) {
        super();
        this.robot = robot;
        this.view = this.getView();
        this.view.left = -50;
        this.endOfMove = false;
    }

    makingShot() {
        setTimeout(()=> {
            this.robotView = this.robot.getView();
            this.positionBullet = !(this.robotView.transform === 'rotateY(180deg)') ?
                [+this.robotView.bottom + +this.robotView.height * 0.7,
                    +this.robotView.left + +this.robotView.width * 1.8, true] :
                [+this.robotView.bottom + +this.robotView.height * 0.7,
                    +this.robotView.left - +this.robotView.width * 0.9, false];

            this.view.bottom = this.positionBullet[0];
            this.view.left = this.positionBullet[1];
            this.move();
        }, 1000);

    }

    move() {
        this.interval = setInterval(()=>{
            if (this.view.left > document.body.offsetWidth - 2 * +this.view.width || this.view.left < 0) {
                clearInterval(this.interval);
                this.endOfMove = true;
            }
            if (this.positionBullet[2]) {
                this.view.left = +this.view.left + 10;
            } else {
                this.view.left = +this.view.left - 10;
            }
        }, 100)
    }
}