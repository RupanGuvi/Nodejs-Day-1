import http from "http";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import fs from "fs";
import { format } from "date-fns";

//to configure the dotenv package
dotenv.config();

//express initalization
const app = express();

//cors package setup
app.use(cors());

//Port to run the server
const port = process.env.PORT || 5000;

// to create a server using http & nodejs
/*
http.createServer((req,res)=>{
    res.writeHead(200,{"Content-Type":"text/plain"})
    res.write("Hello Welcome to backend")
    res.end();
}).listen(port,()=>{
     console.log(`Server is started and running on the port`);
})
*/

//Default route to avoid cannot get
app.get("/", (req, res) => {
  //res.status(200).json({message:"Welcome to backend"})
  res.status(200).send(
    `<div style="background-color:aqua; color:black"> 
        <h1>Welcome to backend </h1>
        </div>`
  );
});

//Api to access the filesystem and perfom operations
app.get("/write", (req, res) => {
  let today = format(new Date(), "dd-MM-yyyy-HH-mm-ss");
  console.log(today);
  const filepath = `TimeStamp/${today}`;
  fs.writeFileSync(filepath, `${today}`, "utf8");
  let data = fs.readFileSync(filepath, "utf8");
  try {
    res.status(200).send(data);
  } catch (error) {
    res.status(503).json({ message: "Failed to create a file" });
  }
});

//create a server using express
app.listen(port, () => {
  console.log(`Server is started and running on the port`);
});
