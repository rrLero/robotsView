import { UnitModel } from './../shared/unit.model';
import {BulletModel} from "./bullet.model";

export class WeaponModel extends UnitModel {
	protected view = {
		'background-image': 'url(i/21.png)',
		'background-position': '0 19px'
	};

	private bullets = new Array(7).fill(0).map((el) => new BulletModel());

	addBullet() {
		if (this.bullets.length) {
            this.addChild(this.bullets[this.bullets.length - 1], {});
            this.bullets[this.bullets.length - 1].bulletMove();
            this.bullets.pop()
		}
		return
	}

	removeBullet() {
        this.removeChildren();
	}
}