import { StageService } from './modules/stage.service';
import { RobotModel } from './units/robot.model';
import { BulletModel } from "./units/bullet.model";

const $stageElem: Element = document.getElementById('stage');
const stageService = new StageService($stageElem);

const robot = new RobotModel();

const robot2 = new RobotModel();
robot2.getView().left = 500;

stageService.addUnit(robot);
stageService.addUnit(robot2);

stageService.run();

window.onkeydown = handle;
function handle(e: any) {
	const map = {
		13: 'enter',
		39: 'arrow-right',
		37: 'arrow-left',
		38: 'arrow-top',
		40: 'arrow-bottom',
		32: 'space',
		65: 'a-left',
		87: 'w-top',
		68: 'd-right',
		83: 's-down',
		17: 'ctrl'
	};
	const key = map[e.keyCode];
	if(key === 'enter') {
		robot.shot();
        const bullet = new BulletModel(robot);
        stageService.addUnit(bullet);
        bullet.makingShot();
        setInterval(()=>{
        	if (bullet.endOfMove) {
                stageService.removeUnit(bullet)
			}
		},100);
	}
	if(key === 'arrow-right') {
		robot.forward();
	}
	if(key === 'arrow-left') {
		robot.back();
	}
	if(key === 'arrow-top') {
		robot.up();
	}
	if(key === 'arrow-bottom') {
		robot.down();
	}

    if(key === 'ctrl') {
        robot2.shot();
        const bullet2 = new BulletModel(robot2);
        stageService.addUnit(bullet2);
        bullet2.makingShot();
        setInterval(()=>{
            if (bullet2.endOfMove) {
                stageService.removeUnit(bullet2)
            }
        },100);
    }
    if(key === 'd-right') {
        robot2.forward();
    }
    if(key === 'a-left') {
        robot2.back();
    }
    if(key === 'w-top') {
        robot2.up();
    }
    if(key === 's-down') {
        robot2.down();
    }
    console.log(key);
}