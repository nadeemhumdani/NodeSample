// lib/app.ts
import express = require('express');
import {fetchConnectionSetting, ApplicationException} from './src/ConfigManager'
import * as cache from './src/cache/cacheServer'
import * as users from './src/api/controllers/users'

// Create a new express application instance
const app: express.Application = express();

//const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('./swagger.json');

app.all('/', (reg, res, next) => {
  console.log("all api")
  next()
})

app.get('/api', async (req, res)  => {

  console.log("get api")
  console.log("request received for appid:", req.query['appid'])
  var setting = await fetchConnectionSetting(req.query['appid'])

  if (failed(setting)){
    res.statusCode = 404
  }

  res.send(setting)

  // if ((setting as ApplicationException)){
  //   console.log("in ApplicationException")
  //   //res.statusCode = 404
  //   //res.status(404).send(setting)
  //   res.send(setting);
  // } else {
  //   res.send(setting);
  // }
});

app.get('/userlist', users.GetUsers)
app.get('/clearcache', cache.Clear)

const failed = (result: any): result is ApplicationException => { return true}

app.listen(3000, () => {
  cache.Connect();
  console.log('Running Confirguration Manager on port 3000...');
});
