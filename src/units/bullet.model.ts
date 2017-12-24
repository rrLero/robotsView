import { UnitModel } from './../shared/unit.model';
import { View } from './../shared/view.type';
import {StageService} from "../modules/stage.service";

export class BulletModel extends UnitModel {

    protected view: View = {
        width: 20,
        height: 20,
        'background-image': 'url(i/bullet.png)',
        'background-size': '100% 100%'
    };
    private interval: number;
    private stage: StageService;
    private isRight: boolean;

    constructor(stage: StageService, bottom: number, left: number, isRight: boolean) {
        super();
        this.view.left = left;
        this.view.bottom = bottom;
        this.stage = stage;
        this.isRight = isRight;
    }

    shot() {
        this.interval = setInterval(()=>{

            if (this.view.left > document.body.offsetWidth - 2 * +this.view.width || this.view.left < 0) {
                clearInterval(this.interval);
                this.stage.removeUnit(this);
            }
            if (this.isRight) {
                this.view.left = +this.view.left + 10;
            } else {
                this.view.left = +this.view.left - 10;
            }
        }, 100)
    }
}