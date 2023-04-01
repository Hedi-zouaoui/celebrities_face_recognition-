const express = require('express') ; 
const bodyParser = require('body-parser') ; 
const bcrypt = require('bcrypt-nodejs')
const app = express() ; 
const cors = require('cors') ; 
const knex = require('knex') ; 
const { response } = require('express');


const db = knex ({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : '1234',
    database : 'users'
  }
});
console.log(db.select('*').from('users') ) ; 
app.use(bodyParser.json()) ;
app.use(cors()) ;  



app.get('/' , (req , res) => {
 
    res.send(database.users)
} ) 

app.post('/signin' , (req , res) => {
  db.select('email' , 'hash').from('login')
  .where('email', '=' , req.body.mail )
  .then(data => {
    const isValid = bcrypt.compareSync(req.body.password, data[0].hash) ; 
     
    if(isValid) {
        console.log(isValid)
        return db.select('*').from('users')
        .where ('email', '=' , req.body.mail)
        .then(user => {
            res.json(user[0])
        })
        .catch(err => res.status(400).json('enable to get user'))
    } else {
          console.log(isValid)
        res.status(400).json('wrong credentials')
    }
    
  }).catch(err => res.status(400).json('wrong credentials'))
})


app.post('/register' , (req , res ) => {

    const { mail , name , password } = req.body ; 
const hash = bcrypt.hashSync(password) ; 
db.transaction(trx => {
    trx.insert({
        hash: hash ,
        email: mail
    })
    .into('login')
    .returning('email')
    .then(loginEmail => {
        return trx('users')
        .returning('*')
        .insert({
            email: loginEmail[0].email , 
    name: name , 
    joined: new Date() 
})
.then(user => {
    res.json(user[0] ) ; 
}) 
}) .then(trx.commit)
.catch(trx.rollback)
})
.catch(err => res.status(400).json('enable to join '))
})

app.get('/profile/:id' , (req , res) => {
    const {id} = req.params ; 
   db.select('*').from('users').where({id})
   .then(user => {
    console.log(user)
    if(user.length) {
        res.json(user[0])
    }else {
        res.status(400).json('not found')
    }
   })
        
})
 app.listen(3000 , () => {
console.log('app is running in port 3000 ') ; 
 }) ; 









