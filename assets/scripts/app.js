const apiBtns = document.querySelectorAll(".api-btn");

var news = false;
var jokes = false;
var foodRecipes = false;
var twitter = false;

apiBtns.forEach(btn =>
  btn.addEventListener("change", e => {
    console.log(e.target.dataset.name); // API name
    if (e.target.checked) {
      // TURN ON API
      if (e.target.dataset.name === "twitter") {
        twitter = true;
      }
      if (e.target.dataset.name === "facebook") {
        news = true;
      }
      if (e.target.dataset.name === "potato") {
        jokes = true;
      }
      if (e.target.dataset.name === "foodRecipes") {
        foodRecipes = true;
      }
      console.log("Checked");
    } else {
      // TURN OFF API
      if (e.target.dataset.name === "twitter") {
        twitter = false;
      }
      if (e.target.dataset.name === "facebook") {
        news = false;
      }
      if (e.target.dataset.name === "potato") {
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
  if (news) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var url = JSON.parse(this.responseText);
        console.log(url.articles[0].url);
      }
    };
    xhttp.open(
      "GET",
      "https://newsapi.org/v2/top-headlines?country=eg&apiKey=5546e675c6334e0b9b1bf229e18a2d13",
      true
    );
    xhttp.send();
  }
  if (jokes) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(JSON.parse(this.responseText));
      }
    };
    req.open("GET", "https://geek-jokes.sameerkumar.website/api", true);
    req.send();
  }
  if (foodRecipes) {
    // foodRecipes
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        console.log("Recipe Title", data.recipes[0].title, "\n");
        console.log(data.recipes[0].image_url, "\n");
        console.log("Recipe Link", data.recipes[0].f2f_url, "\n");
      }
    };
    var input = document.getElementById("textInput");
    var submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", function() {
      if (input.value === "") {
        input.value = "pizza";
      }
    });
    xhttp.open(
      "GET",
      "https://www.food2fork.com/api/search?key=3c539a3bc1bdf607e4f515665d95b504&q=" +
        input.value,
      true
    );
    xhttp.send();
  }
  if (twitter) {
    // TWEET
  }
}
