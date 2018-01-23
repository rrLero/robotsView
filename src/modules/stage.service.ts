import { HTMLGeneratorService } from './html-generator.service';
import { UnitModel } from './../shared/unit.model';

export class StageService {
	private htmlGeneratorService = new HTMLGeneratorService();
	private renderInterval: number;
	private unit: UnitModel;
	private html: string;
	private arrUnits: UnitModel[];

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
        this.html = this.arrUnits.map((el, i) => this.htmlGeneratorService.generate(el, i)).join();
        this.$stageElem.innerHTML = this.html;
	}
}