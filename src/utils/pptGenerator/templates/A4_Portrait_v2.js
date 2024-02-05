const pptGenerator = require('../index');
const { convertCoordinateToEmu } = require('../utils');

class A4PortraitV2 extends pptGenerator {
	addBrand = async (brandName) => {
		const brandOptions = {
			value: brandName,
			x: 1.7,
			y: 6.27,
			cx: 8.2,
			cy: 0.42,
			bold: true,
		};
		await this.addText(brandOptions);
	};
	addCountryOfOrigin = async (countryOfOrigin) => {
		const countryOriginOptions = {
			value: countryOfOrigin,
			fontSize: 16,
			textColor: '696997',
			x: 1.7,
			y: 6.84,
			cx: 8.2,
			cy: 0.42,
		};
		await this.addText(countryOriginOptions);
	};
}

module.exports = A4PortraitV2;

// (value = ),
// (fontFace = ),
// (fontSize = 12),
// (x = 48.3), // Left distance in EMU
// (y = 177.6) // Calculated y coordinate in EMU
// // cx: 300, // Textbox width in EMU
// // cy: 27.5 // Textbox height in EMU)
