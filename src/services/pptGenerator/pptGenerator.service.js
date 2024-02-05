const A4PortraitV2 = require('../../utils/pptGenerator/templates/A4_Portrait_v2');

const createTemplate = async () => {
	const pptx = new A4PortraitV2();
	await pptx.addSlide();
	await pptx.addBrand(`BRAND`);
    await pptx.addCountryOfOrigin('Country Of Origin')
	await pptx.saveTemplate();
};

module.exports = { createTemplate };
