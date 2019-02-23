const apiBtns = document.querySelectorAll(".api-btn");

var news = false;
var jokes = false;
var twitter = false;
var url;
var jk;

apiBtns.forEach(btn =>
  btn.addEventListener("change", e => {
    console.log(e.target.dataset.name); // API name
    if (e.target.checked) {
      // TURN ON API 
      if (e.target.id == 1) {
        news = true;
      }
      if (e.target.id == 2) {
        jokes = true;
      }
      if (e.target.id == 3) {
        twitter = true;
      }
      console.log("Checked");
    } else {
      // TURN OFF API
      if (e.target.id == 1) {
        news = false;
      }
      if (e.target.id == 2) {
        jokes = false;
      }
      if (e.target.id == 3) {
        twitter = false;
      }
      console.log("Not checked");
    }
  })
);

function UserAction() {
  if (news) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        url = JSON.parse(this.responseText);
        console.log(url.articles[0].url);

      }
    };
    xhttp.open("GET", "https://newsapi.org/v2/top-headlines?country=eg&apiKey=5546e675c6334e0b9b1bf229e18a2d13", true);
    xhttp.send();
  }
  if (jokes) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        jk = JSON.parse(this.responseText);
        console.log(jk);

      }
    };
    req.open("GET", "https://geek-jokes.sameerkumar.website/api", true);
    req.send();
  }
  if (twitter) {

  }

}