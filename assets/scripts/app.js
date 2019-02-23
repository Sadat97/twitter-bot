const apiBtns = document.querySelectorAll(".api-btn");

var news = false;
var jokes = false;
var twitter = false;

apiBtns.forEach(btn =>
  btn.addEventListener("change", e => {
    console.log(e.target.dataset.name); // API name
    if (e.target.checked) {
      // TURN ON API 
      if (e.target.id == 1){
        news = true;
      }
      if (e.target.id == 2){
        jokes = true;
      }
      if (e.target.id == 3){
        twitter = true;
      }
      console.log("Checked");
    } else {
      // TURN OFF API
      console.log("Not checked");
    }
  })
);

function UserAction() {
  if (news)
  {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
             var data = JSON.parse(this.responseText);
             console.log(data.articles[0].url);
             
         }
    };
    xhttp.open("GET", "https://newsapi.org/v2/top-headlines?country=eg&apiKey=5546e675c6334e0b9b1bf229e18a2d13", true);
    xhttp.send();
  }
  if (jokes)
  {
    // get jokes
  }
  if (twitter)
  {
    // TWEET
  }
  
}