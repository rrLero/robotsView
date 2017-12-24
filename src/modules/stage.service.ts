import { HTMLGeneratorService } from './html-generator.service';
import { UnitModel } from './../shared/unit.model';

export class StageService {
	private htmlGeneratorService = new HTMLGeneratorService();
	private renderInterval: number;
	private unit: UnitModel;
	private html: string;
	public arrUnits: UnitModel[];

	constructor(private $stageElem: Element) {
		this.arrUnits = [];
	}

	addUnit(unit: UnitModel) {
		this.arrUnits.push(unit);
	}

	removeUnit(unit: UnitModel) {
		this.arrUnits = this.arrUnits.filter((el)=> (el !== unit));
	}

	run() {
		this.render();
		this.renderInterval = setInterval(() => {
			this.render();
		}, 100);
	}

	stop() {
		clearInterval(this.renderInterval);
	}

	setUnit(unit: UnitModel) {
		this.unit = unit;
	}

	private render() {
		let html = '';
		this.arrUnits.forEach((el, i) => {
            html += this.htmlGeneratorService.generate(el, i);
            this.html = html;
		});
        this.$stageElem.innerHTML = this.html;

		// if(this.html === html) {
		// 	return;
		// }


	}
}