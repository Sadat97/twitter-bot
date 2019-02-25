const apiBtns = document.querySelectorAll(".api-btn");

var jk;
var rl;
var news = false;
var jokes = false;
var foodRecipes = false;

apiBtns.forEach(btn =>
  btn.addEventListener("change", e => {
    console.log(e.target.dataset.name); // API name
    if (e.target.checked) {
      // TURN ON API
      if (e.target.dataset.name === "news") {
        news = true;
      }
      if (e.target.dataset.name === "joke") {
        jokes = true;
      }
      if (e.target.dataset.name === "foodRecipes") {
        foodRecipes = true;
      }
      console.log("Checked");
    } else {
      // TURN OFF API
      if (e.target.dataset.name === "news") {
        news = false;
      }
      if (e.target.dataset.name === "joke") {
        jokes = false;
      }
      if (e.target.dataset.name === "foodRecipes") {
        foodRecipes = false;
      }
      console.log("Not checked");
    }
  })
);

function UserAction() {
  var news_link = "";
  if (news) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var url = JSON.parse(this.responseText);
        console.log(url.articles[0].url);
        news_link = url.articles[0].url;

      }
    };
    xhttp.open("GET", "https://newsapi.org/v2/top-headlines?country=eg&apiKey=5546e675c6334e0b9b1bf229e18a2d13", false);
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
    req.open("GET", "https://geek-jokes.sameerkumar.website/api", false);
    req.send();
  }
  if (foodRecipes) {
    // foodRecipes
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        console.log("Recipe Link", data.recipes[0].f2f_url, "\n");
        rl = data.recipes[Math.floor(Math.random() * 30) + 0
            ].f2f_url;
      }
    };
    xhttp.open(
      "GET",
      "https://www.food2fork.com/api/search?key=3c539a3bc1bdf607e4f515665d95b504",
      false
    );
    xhttp.send();
  }

  var status;


  // this is the body of the tweet append on it

  if (jokes && news && foodRecipes)
    {
        status = `Joke of the day: ${jk}
   
Recipe of the Day: ${rl}

top headline of the day: ${news_link}`;
    }
  else if (jokes)
    status = `Joke of the day: ${jk}`;
  else if (news)
    status = `top headline of the day: ${news_link}`;
  else if (foodRecipes)
      status = `Recipe of the Day: ${rl}`;
  else if (jokes && foodRecipes){
      status = `Joke of the day: ${jk}
   
Recipe of the Day: ${rl}`;

  }
  else if (jokes && news){
      status = `Joke of the day: ${jk}
      
top headline of the day: ${news_link}`;

  }

  else if (news && foodRecipes){
      status = `Recipe of the Day: ${rl}

top headline of the day: ${news_link}`;
  }

        // call it to make the tweet
  if (news || jokes)
    tweetIt(status);


}

function tweetIt(status) {
  var param = {
    tweet:
    {
      status: status
    }
  };
  var url = "https://thawing-oasis-15291.herokuapp.com/tweets";
  fetch(url, {
    method: "POST",
    body: JSON.stringify(param),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response) => response.arrayBuffer())
    .then((data) => {
      console.log(data);
    });
}
