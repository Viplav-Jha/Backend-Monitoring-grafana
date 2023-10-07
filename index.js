const express = require('express');
const client = require("prom-client")  //Metric collection 
const app = express();
const PORT = process.env.PORT || 8000;
// Import the doSomeHeavyTask function from util.js
const { doSomeHeavyTask } = require('./utils');


//Metrics colleection for monitor cpu memeory,RAM utilization  status
const collectDefaultMetrics = client.collectDefaultMetrics

collectDefaultMetrics({register:client.register})

app.get("/", (req, res) => {
  return res.json({ message: "Hello from Express Server" });
});

app.get("/slow", async (req, res) => {
  try {
    const timeTaken = await doSomeHeavyTask();

    return res.json({
      status: "Success",
      message: `Heavy task completed in ${timeTaken}ms`
    });
  } catch (error) {
    return res.status(500).json({ status: "Error", error: "Internal Server Error" });
  }
});
//metric route
app.get('/metrics',  async (req,res) =>{
   res.setHeader('Content-type',client.register.contentType)
   const metric = await client.register.metrics();

   res.send(metric);
})

app.listen(PORT, () =>
  console.log(`Express server started at http://localhost:${PORT}`)
);
