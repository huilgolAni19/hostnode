const express = require('express');
const app = express();
const fs = require('fs');
var https = require('https');

const port = 3443;
const base_path = '/njapp/';
const ssl_certificate_base_path = '/home/anirudh/Documents/webtools/SSL-Certificates/Apache2-nexussoftdev_com/'
//const ssl_certificate_base_path = '/Users/anirudhhuilgol/Documents/SSL-Certificate/Apache2-nexussoftdev_com/'
var keyFilePath = `${ssl_certificate_base_path}nexussoftdev.key`;
var rootIntermidateCertificate = `${ssl_certificate_base_path}nexussoftdev-bundle.crt`;
var nexussoftdevCert = `${ssl_certificate_base_path}nexussoftdev.crt`
var forwardUrl = `${base_path}`;


console.log(`\n\nPath For rootIntermidateCertificate ${rootIntermidateCertificate}\n\nPath For keyFile ${keyFilePath}\n\nPath For nexussoftdev Cert ${nexussoftdevCert}\n\n`);

var key = fs.readFileSync(keyFilePath);
var cert = fs.readFileSync(nexussoftdevCert);
var ca = fs.readFileSync(rootIntermidateCertificate);

//SSL-options
var options = {
  key: key,
  cert: cert,
  ca: ca
};

//console.log(ca, cert, key);
app.set('view engine', 'ejs');

app.get('/', (request, response) => {
  response.redirect(forwardUrl);
});

app.get(`${base_path}`, (req, resp) => {
    var data = {
      users: getData()
    }
    resp.render('pages/indexpage', data);
});

app.get(`${base_path}hello/:userName`, (request, response) => {
  var usr = request.params.userName;
  var data = {
    user:usr
  };
  response.render('pages/firstPage', data);
});

var server = https.createServer(options, app);
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Open http://localhost:${port}`);
});


var getData = () => {
  var array = [];
  var myObjecte1 = {};
  var myObjecte2 = {};
  var myObjecte3 = {};

  myObjecte1["FirstName"] = "Anirudh";
  myObjecte1["LastName"] = "Huilgol";
  myObjecte1["Gender"] = "Male";
  myObjecte1["Age"] = 24;
  myObjecte1["City"] = "Hubli"
  myObjecte1["Locality"] = "Vidyanagar"


  myObjecte2["FirstName"] = "Pavan";
  myObjecte2["LastName"] = "Pandurangi";
  myObjecte2["Gender"] = "Male";
  myObjecte2["Age"] = 27;
  myObjecte2["City"] = "Mumbai"
  myObjecte2["Locality"] = "Thane"

  myObjecte3["FirstName"] = "Sohan";
  myObjecte3["LastName"] = "Huilgol";
  myObjecte3["Gender"] = "Male";
  myObjecte3["Age"] = 26;
  myObjecte3["City"] = "Bangalore"
  myObjecte3["Locality"] = "Jayanagara"

  array.push(myObjecte1);
  array.push(myObjecte2);
  array.push(myObjecte3);

  return array;
};
