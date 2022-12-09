const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const secretKey = 'secretKey';

app.get('/', (req, res) => {
  res.json({
    message: 'Hello data',
  });
});

app.post('/login', (req, res) => {
  const user = {
    id: 1,
    username: 'Shailesh',
    email: 'zadavshailesh@gmail.com',
  };
  jwt.sign({ user }, secretKey, { expiresIn: '400s' }, (err, token) => {
    res.json({
      token,
    });
  });
});

app.post('/profile', verifyToken, (req, res) => {
    jwt.verify(req.token,secretKey,(err,authData)=>{
        if(err){
            res.send({
                result:"Invalid Token"
            })
        }else{
            res.json({
                message:"Login Successful",
                authData
            })
        }
    });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.send({
      result: 'Token is not valid',
    });
  }
}

app.listen(4000, () => {
  console.log('Port is running at http://localhost:4000');
});
