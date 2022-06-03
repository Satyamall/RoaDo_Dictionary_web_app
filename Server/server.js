const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const DicRouter = require("./router");

app.use(express.json())
app.use(cors());

const endpoint = "entries";
const language = "en-gb";
const app_id = "b379705c"; 
const app_key = "7857bd13754e61e7e1dd70237f87b7a7";


app.get("/meaning/:word", function (req,res){
    const words = req.params.word;

    let url = `https://od-api.oxforddictionaries.com/api/v2/${endpoint}/${language}/${words}`;

    fetch(url, {
      method: "GET",
      mode: "no-cors",
      headers: {
        app_key: app_key,
        app_id: app_id
      }
    })
    .then((res)=>res.json())
    .then((data)=>res.send(data))
})

app.use("/",DicRouter);

const connect = function(){
  return mongoose.connect("mongodb://localhost:27017/dictionary")
}

const start = async()=>{
  await connect();
  app.listen(5000,()=>{
    console.log("App is Listening on port 5000")
  })

}

start();
