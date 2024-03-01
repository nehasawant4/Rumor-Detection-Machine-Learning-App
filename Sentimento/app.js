require("dotenv").config();
var cors = require('cors')
var express = require("express"),
  request = require("request"),
  bodyParser = require("body-parser"),
  app = express();
  app.use(cors())

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/twitteranalysis", (req, res) => {
  res.render("twitter");
});

app.get("/getTrending",(req,res)=> {
  
});

app.get("/analyze", (req, res) => {
  var query = req.query;
  var count = req.query.ntwts;
  console.log(query['searchtrend'])

  request(
    "http://127.0.0.1:5000/analyze?query=" + query['searchtrend'],
    function(err, response, body) {
      if (!err && response.statusCode === 200) {
        var tweetsAnalysis = JSON.parse(body);
        console.log(tweetsAnalysis);
        res.json(tweetsAnalysis);
      }
    }
  );

});

app.listen(process.env.PORT, process.env.IP, () => {
  console.log("Server started!!");
});
