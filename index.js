const express = require('express');
const pptxService = require('./src/services/pptGenerator/pptGenerator.service');


const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    await pptxService.createTemplate();
    res.send('Hello World');
	
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
