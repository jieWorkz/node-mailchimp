const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const res = require("express/lib/response");
const { response } = require("express");

const app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

  mailchimp.setConfig({
    apiKey: "a21d4bee70f29b2d38354c14ad568fa7-us21",
    server: "us21",
  });

  const listID = "f3710c0769";

  const subscribingUser = {
    firstName: req.body.fname,
    lastName: req.body.lname,
    email: req.body.email
  };

  async function run() {
    const response = await mailchimp.lists.addListMember(listID, {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName
      }
    });

    // console.log(
    //   `Successfully added contact as an audience member. The contact's id is ${
    //     response.statusCode
    //   }.`
    // );
    // console.log(response);

    res.sendFile(__dirname + "/success.html");

  }

  run();


});



app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on Port 3000");
});


// API KEY
// a21d4bee70f29b2d38354c14ad568fa7-us21

// List idea
// f3710c0769
