const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcrypt')

app.use(express.json())
const posts = [
    {
        username: 'jason',
        password: '12345',
        title: 'post 1'
    },
    {
        username: 'kyle',
        password: '67890',
        title: 'post 2'
    }
]

app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
})

app.post('/login', async (req, res) => {
     
        const username = req.body.username
        const user = {name: username}

       const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
       res.json({accessToken: accessToken})
    })
function authenticateToken(req, res, next)  {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]    
    if(token == null)return res.sendStatus(401)
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
            req.user = user
        next()
    })
}
app.listen(3000)