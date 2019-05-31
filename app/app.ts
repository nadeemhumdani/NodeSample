// lib/app.ts
import express = require('express');
import {fetchConnectionSetting, ApplicationException} from './src/ConfigManager'


// Create a new express application instance
const app: express.Application = express();

//const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('./swagger.json');

app.get('/', (req, res) => {
  res.send('Hello World!!!ß');
});

// app.use((req, res, next) => {

// })

app.all('/api', (reg, res, next) => {
  console.log("all api")
  next()
})

app.get('/api', async (req, res)  => {

  console.log("get api")
  //console.log("request received...")
  var setting = await fetchConnectionSetting(req.query['appid'])

  if ((setting as ApplicationException)){
    //res.statusCode = 404
    res.status(404).send(setting)
  } else {
    res.send(setting);
  }
});

app.listen(3000, () => {
  console.log('Running Confirguration Manager on port 3000...');
});
