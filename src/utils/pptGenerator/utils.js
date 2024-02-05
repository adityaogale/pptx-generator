const convertCoordinateToEmu = (value) => (48.3 / 1.7) * Number(value || 0);

module.exports = { convertCoordinateToEmu };
