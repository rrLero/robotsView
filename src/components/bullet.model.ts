import { UnitModel } from './../shared/unit.model';

export class BulletModel extends UnitModel {

    private interval: number;
    protected view = {
        'background-image': 'url(i/bullet.png)',
        'background-position': '0 19px',
        width: 25,
        height: 100,
        left: 100,
        top: 20,
        transform: 'rotateY(190deg)'
    };
    public isBullet = false;

    bulletMove () {
        this.isBullet = true;
        clearInterval(this.interval);
        const MoveTo = 2000;
        let rotateX = 0;
        this.interval = setInterval(() => {
            if(rotateX < MoveTo) {
                rotateX += 100;
                this.view.transform = 'rotateZ(190deg)'+ ' ' + 'translateX(' + -rotateX + '%)';
            } else {
                rotateX = 0;
                this.view.transform = 'rotateZ(190deg)'+ ' ' + 'translateX(' + -rotateX + '%)';
                this.isBullet = false;
                clearInterval(this.interval);
            }
        }, 100);
    }
}