const express = require('express')
const app = express()
const port = 5000 || process.env.PORT
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors({
  origin : "http://localhost:3000"
}))

app.get('/',(req,res)=>{
  const readData = JSON.parse(fs.readFileSync('./newdata.json','utf-8'))
  res.send(readData)
})

app.post('/',(req,res)=>{
  const obj = {
    id : req.body.id ,
    name : req.body.name,
    book : req.body.url,
    img : req.body.img,
    name_book : req.body.name_book,
    disc : req.body.disc
  }
  const alldata = require('./newdata.json');
  alldata.push(obj);

  fs.writeFileSync('newdata.json',JSON.stringify(alldata,null,4),'utf-8',(err)=>{
    if(err)console.log(err);
    console.log('path file > obj ')
  })
  res.send('melad')
})

// setting data in json
function OrderValue(start,end,Data){
  const NewData = Data.filter(e => e !== null && e.id >= start && e.id < end).map((e,i) => {
    return {
      id : i + start,
      name : e.name ,
      url : e.url ,
      img : e.img ,
      name_book : e.name_book ,
      subjectCode : e.subjectCode ,
      disc : e.disc
    }
  } )
  return NewData;
}

// delete data from json  
app.post('/delete',(req,res)=>{
  const alldata = require('./newdata.json');
  const datafromdelete = req.body.data;
  let x = alldata.filter(e => e.id !== +datafromdelete)
  var i = j =0;
    x.forEach(e => i += 1 );
    alldata.forEach(e => j+=1)
    const length = {
      lengthAlldata : i,
      lengthX : j
    };
    let condtinal = length.lengthAlldata === length.lengthX;
    if(condtinal === false) {
      x = [ ...OrderValue(1,5000,x),
        ...OrderValue(5000,10000,x),
        ...OrderValue(10000,15000,x),
        ...OrderValue(15000,20000,x),
        ...OrderValue(20000,25000,x),
        ...OrderValue(25000,30000,x)
      ];
    };
    fs.writeFileSync('newdata.json',JSON.stringify(''));
    fs.writeFileSync('newdata.json',JSON.stringify(x,null,4),'utf-8',(err)=>{
      if(err)console.log(err);
    });
    
    res.send(x)
});


// module.exports.handler = serverlss(app)
app.listen(port, (err) => {
  if(err) console.log(err);
  console.log(`Example app listening on port ${port}`);
});