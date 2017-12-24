import {UnitModel} from './../shared/unit.model';
import {ArmPartModel} from './arm-part.model';
import {WeaponModel} from './weapon.model';
import {BulletModel} from "../units/bullet.model";
import {StageService} from "../modules/stage.service";
import {RobotModel} from "../units/robot.model";

export class ShoulderModel extends UnitModel {
    protected view = {
        width: 200,
        height: 200,
        top: -9,
        left: -24,
        'background-image': 'url(i/12.png)',
        transform: 'rotateZ(10deg)'
    };
    private interval: number;
    private interval2: number;
    private interval3: number;
    private stage: StageService;
    private topPart = new ArmPartModel();
    private bottomPart = new ArmPartModel();

    constructor(stage?: StageService) {
        super();
        this.stage = stage;
        this.addChild(this.topPart, {});
        this.addChild(this.bottomPart, {
            top: 107,
            left: -41,
            transform: 'rotateY(190deg)'
        });
    }

    shot() {
        clearInterval(this.interval);
        clearInterval(this.interval2);
        clearTimeout(this.interval3);
        const rotateZTo = 90;
        const delay = 1000;
        let up = true;
        let rotateZ = 11;

        this.interval = setInterval(() => {
            ++rotateZ;
            this.view.transform = 'rotateZ(-' + rotateZ + 'deg)';

            if (rotateZ >= rotateZTo) {
                clearInterval(this.interval);
                const curRobot = this.stage.arrUnits.filter((el: RobotModel) => el.shoulderLeft === this)[0];
                const positionBullet = !(curRobot.getView().transform === 'rotateY(180deg)') ?
                    [+curRobot.getView().bottom + +curRobot.getView().height * 0.7,
                        +curRobot.getView().left + +curRobot.getView().width * 1.8, true] :
                    [+curRobot.getView().bottom + +curRobot.getView().height * 0.7,
                        +curRobot.getView().left - +curRobot.getView().width * 0.9, false];
                const bullet = new BulletModel(this.stage, +positionBullet[0], +positionBullet[1], !!positionBullet[2]);
                this.stage.addUnit(bullet);
                bullet.shot();
                this.interval3 = setTimeout(() => {

                    this.interval2 = setInterval(() => {
                        --rotateZ;
                        this.view.transform = 'rotateZ(-' + rotateZ + 'deg)';
                        if (rotateZ === 10) {
                            this.view.transform = 'rotateZ(' + 10 + 'deg)';
                            clearInterval(this.interval2);
                            return;
                        }
                    }, delay / rotateZTo);
                }, 1000);
            }
            return;
        }, delay / rotateZTo);
    }

    addWeapon() {
        const weapon = new WeaponModel();
        this.bottomPart.addChild(weapon, {
            width: 148,
            height: 72,
            top: 67,
            left: -95,
            transform: 'rotateZ(-88deg) rotateX(0deg) rotateY(176deg)'
        });
    }
}