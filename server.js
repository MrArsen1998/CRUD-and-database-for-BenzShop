const express = require('express')
const sqlite = require('sqlite3').verbose()
const app = express()
const port = 3001
const cors = require('cors')
app.use(cors());
app.use(express.json()) 

const db = new sqlite.Database('database.db', (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("OK")
    }
})

app.get('/', (req, res) => {
    db.all('SELECT * FROM cars', [], (err, data) => {
        res.send(data)
    })
})

app.get('/cars/:ID', (req, res) => {
    const id = req.params.ID
    db.get('SELECT * FROM cars WHERE ID=?', [id], (err, data) => {
        console.log(data)
        res.send(data)
    })
})

app.post("/new", (req,res)=>{
    const image = req.body.image
    const image2 = req.body.image2
    const image3 = req.body.image3
    const title = req.body.title
    const price = req.body.price
    const description = req.body.description 
    const settings = req.body.settings
    const performance = req.body.performance
    db.run("insert into cars(image, image2, image3, title, price, description, settings, performance) values(?,?,?,?,?,?,?,?)",[image, image2, image3, title, price, description, settings, performance], ()=>{
     res.send("OK")
    } )
 })
 
 app.put("/update/:ID", (req, res)=>{
    const image = req.body.image
    const image2 = req.body.image2
    const image3 = req.body.image3
    const title = req.body.title
    const price = req.body.price
    const description = req.body.description
    const settings = req.body.settings
    const performance = req.body.performance
    const id = req.params.ID
     db.run("update cars set image=?, image2=?, image3=?, title=?, price=?, description=?, settings=?, performance=? where id=?",[image, image2, image3, title, price, description, settings, performance, id], (err,data)=>{
         res.send("OK")
     })
 })
 
 app.delete('/delete/:ID', (req,res)=>{
     const id=req.params.ID
     db.get("delete from cars where id=?",[id], (err,data)=>{
         res.send("OK")
     })
 })

app.listen(port)