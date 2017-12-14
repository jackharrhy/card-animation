const express = require('express')
const app = express()
const fs = require('fs')

app.get('/animations', (req, res) => {
    fs.readdir(__dirname + '/public/animations', (err, items) => {
        res.send(JSON.stringify(items))
    })
})

app.use(express.static('public'))

app.listen(3000, () => console.log('cardAnimation listening on port 3000!'))
