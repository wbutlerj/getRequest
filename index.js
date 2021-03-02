//get user info with request and format it
loadDoc();
function loadDoc() {
  var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // document.getElementById("demo").innerHTML = this.responseText;
      //  var myArr = JSON.parse(this.responseText);
      convertDoc(JSON.parse(this.responseText));
    }
  };
  xhttp.open("GET", "https://jsonplaceholder.typicode.com/users", true);
  xhttp.send();
}

function convertDoc(myUsers) {
  //build final json array for push
  var customUsers = { applicant: "Weston Jones", users: [] };

  //populate the customUsers array
  for (var i = 0; i < myUsers.length; i++) {
    var curUser = myUsers[i];

    //break the name into first and last
    var full_name = curUser.name.split(" ");
    var fName = full_name[0];
    var lName = full_name[1];
    // create and push new object to final array
    customUsers.users.push({
      first_name: fName,
      last_name: lName,
      company_name: curUser.company.name,
      company_full_address:
        curUser.address.street +
        ", " +
        curUser.address.city +
        ", " +
        curUser.address.zipcode,
      website: curUser.website,
      phone: curUser.phone,
    });
  }

  //write json object to json file
  let data = JSON.stringify(customUsers);
  const fs = require("fs");
  fs.writeFileSync("Json.json", data);

  // var testData = "hello";
  // postData(testData);
  //call powershell function
  postWithShell();
}

//function to call powershell script to post data to server
function postWithShell() {
  const Shell = require("node-powershell");
  const ps = new Shell({ executionPolicy: "Bypass", noProfile: true });
  ps.addCommand("./sendJson.ps1");
  ps.invoke()
    .then((output) => {
      console.log(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

//unworking javascript post function

// function postData(data) {
//   // console.log(data);
//   fetch("https://ptsv2.com/t/eq55i-1614670001/post", {
//     method: "POST",
//     body: JSON.stringify(data),
//     headers: {
//       "Content-Type": "application/json",
//     },
//     // ,
//     // body: JSON.stringify(data),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Success:", data);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }
