import express from 'express';


const api = express()


api.get('/',(req,res) => {
    res.send({
        message: 'hello from the api'   
    })
})

api.listen(3000, () => {
    console.log('Running Confirguration Manager on port 3000...');
  });

export default api
