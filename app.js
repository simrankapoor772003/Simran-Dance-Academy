const express=require("express")
const path=require("path");
const app=express();
var mongoose=require('mongoose');
const bodyparser=require("body-parser")
mongoose.connect('mongodb://localhost/contactDance',{useNewUrlparser:true});
const port=8000;

//Defining Schema
var contactSchema=new mongoose.Schema({
    name:String,
    age:String,
    email:String,
    phone:String,
    address:String
});
var Contact=mongoose.model('Contact',contactSchema)

app.use('/static',express.static('static'))
app.use(express.urlencoded())


app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))

// app.get("/",(req,res)=>{
//     const param={ }
//     res.render('index.pug',param)
// })
app.get("/",(req,res)=>{
    const param={ }
    res.render('home.pug',param)
})
app.get("/contact",(req,res)=>{
    const param={ }
    res.render('contact.pug',param)
})
app.post("/contact",(req,res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("FORM HAS BEEN SUBMITTED")
    }).catch(()=>{
        res.status(400).send("THERE WAS AN ERROR SUBMITTING THE FORM")
    })
    res.status(200).render('contact.pug')
})

app.listen(port,()=>{
    console.log(`The app is running at port ${port}`)
})