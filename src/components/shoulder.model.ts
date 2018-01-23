import { UnitModel } from './../shared/unit.model';
import { ArmPartModel } from './arm-part.model';
import { WeaponModel } from './weapon.model';

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
    private topPart = new ArmPartModel();
    private bottomPart = new ArmPartModel();
    private weapon = new WeaponModel();

    constructor() {
        super();

        this.addChild(this.topPart, {});
        this.addChild(this.bottomPart, {
            top: 107,
            left: -41,
            transform: 'rotateY(190deg)'
        });
    }

    shot() {
        this.weapon.removeChildren();
        clearInterval(this.interval);
        clearInterval(this.interval2);
        const rotateZTo = 90;
        const delay = 1000;
        let rotateZ = 11;
        this.interval = setInterval(() => {
            if(rotateZ < rotateZTo) {
                ++rotateZ;
                this.view.transform = 'rotateZ(-'+ rotateZ +'deg)';
                return;
            } else {
                clearInterval(this.interval);
                this.weapon.addBullet();
                const moveDown = () => {
                    this.interval = setTimeout(()=>{
                        if(rotateZ === 10) {
                            this.view.transform = 'rotateZ('+ 10 +'deg)';
                            clearInterval(this.interval);
                            return;
                        }
                        --rotateZ;
                        this.view.transform = 'rotateZ(-'+ rotateZ +'deg)';
                        moveDown();
                    }, delay / rotateZTo)
                };
                this.interval2 = setTimeout(()=> {
                    this.weapon.removeChildren();
                    moveDown();
                }, 2000);
            }
        }, delay / rotateZTo);
    }

    addWeapon() {
        this.bottomPart.addChild(this.weapon, {
            width: 148,
            height: 72,
            top: 67,
            left: -95,
            transform: 'rotateZ(-88deg) rotateX(0deg) rotateY(176deg)'
        });
    }
}