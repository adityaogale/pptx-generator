const pptx = require('nodejs-pptx');
const { convertCoordinateToEmu } = require('./utils');

const { AvailableLayouts } = require('./constants');

class PptxGenerator {
	presentation;

	constructor(layout) {
		const selectedLayout = this.getSelectedLayout(layout);

		this.presentation = new pptx.Presentation();
		this.presentation.layout(selectedLayout);
	}

	getAvailableLayouts = () => Object.keys(AvailableLayouts);

	getSelectedLayout = (layout) => {
		const availableLayouts = this.getAvailableLayouts();
		const layoutIndex = availableLayouts.indexOf(layout);
		if (layoutIndex > -1) {
			return layout;
		} else {
			return AvailableLayouts.A4_Portrait;
		}
	};

	addSlide = async () => this.presentation.addSlide();

	getSlidesCount = async () => {
		const totalSlides =
			this.presentation?.content['docProps/app.xml']?.Properties?.Slides;
		return parseInt(totalSlides, 10);
	};

	getSlide = async (slideNumber) =>
		await this.presentation.getSlide(slideNumber);

	getCurrentSlide = async () => {
		const getLastSlide = await this.getSlidesCount();
		return await this.getSlide(getLastSlide);
	};

	addText = async (slideTextOptionsData, slidePos = null) => {
		let slideNumber = isNaN(slidePos) ? slidePos : await this.getSlidesCount();

		const slideDetails = await this.presentation.getSlide(slideNumber);

		const slideTextOptions = this.generateSlideTextOptions(slideTextOptionsData);

		await slideDetails.addText(slideTextOptions);
	};

	generateSlideTextOptions = (slideTextOptionsData) => {
		const defaultText = {
			value: 'Test',
			fontFace: 'Arial',
			fontSize: 12,
			x: 0,
			y: 0,
			// cx: 0,
			// cy: 0,
		};

		const slideTextOptions = { ...defaultText, ...slideTextOptionsData };

		if (slideTextOptions.x) {
			slideTextOptions.x = convertCoordinateToEmu(slideTextOptions.x);
		}

		if (slideTextOptions.y) {
			slideTextOptions.y = convertCoordinateToEmu(slideTextOptions.y);
		}

		if (slideTextOptions.cx) {
			slideTextOptions.cx = convertCoordinateToEmu(slideTextOptions.cx);
		}

		if (slideTextOptions.cy) {
			slideTextOptions.cy = convertCoordinateToEmu(slideTextOptions.cy);
		}

		return slideTextOptions;
	};

	saveTemplate = async () => {
		await this.presentation.save(`./blank.pptx`);
	};
}

module.exports = PptxGenerator;
