import { UnitModel } from './../shared/unit.model';
import {BulletModel} from "./bullet.model";

export class WeaponModel extends UnitModel {
	protected view = {
		'background-image': 'url(i/21.png)',
		'background-position': '0 19px'

	};

	private bullet = new BulletModel();

	addBullet() {
        this.addChild(this.bullet, {});
        this.bullet.bulletMove();
	}
	removeBullet() {
        this.removeChildren();
	}
}