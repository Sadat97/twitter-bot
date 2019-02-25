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
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var url = JSON.parse(this.responseText);
        console.log(url.articles[0].url);
        news_link = url.articles[0].url;
      }
    };
    xhttp.open(
      "GET",
      "https://newsapi.org/v2/top-headlines?country=eg&apiKey=5546e675c6334e0b9b1bf229e18a2d13",
      false
    );
    xhttp.send();
  }
  if (jokes) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
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
        rl = data.recipes[Math.floor(Math.random() * 30) + 0].f2f_url;
        console.log("Recipe Link", rl, "\n");
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
  var jokesStatment = `Joke of the day: ${jk}`;
  var newsStatment = `Recipe of the Day: ${rl}`;
  var foodRecipesStatment = `top headline of the day: ${news_link}`;
  var statusCheck = false;
  // this is the body of the tweet append on it

  if (jokes && news && foodRecipes) {
    status = jokesStatment + "\n" + newsStatment + "\n" + foodRecipesStatment;
    statusCheck = true;
  } else if (jokes) {
    status = jokesStatment;
    statusCheck = true;
  } else if (news) {
    status = newsStatment;
    statusCheck = true;
  } else if (foodRecipes) {
    status = foodRecipesStatment;
    statusCheck = true;
  } else if (jokes && foodRecipes) {
    status = jokesStatment + "\n" + foodRecipesStatment;
    statusCheck = true;
  } else if (jokes && news) {
    status = jokesStatment + "\n" + newsStatment;
    statusCheck = true;
  } else if (news && foodRecipes) {
    status = newsStatment + "\n" + newsStatment;
    statusCheck = true;
  }

  // call it to make the tweet
  if (statusCheck) tweetIt(status);
}

function tweetIt(status) {
  var param = {
    tweet: {
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
    .then(response => response.json())
    .then(data => {
      updateTweetsRecords(data.id);
      console.log(data);
    });
}

function getallTweets() {
  var url = "https://thawing-oasis-15291.herokuapp.com/get_tweets";
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
}

function updateTweetsRecords(id) {
  var param = { id: id };
  var url = "https://thawing-oasis-15291.herokuapp.com/store_tweet";
  fetch(url, {
    method: "PUT",
    body: JSON.stringify(param),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      displayTweets(data.length, id);
    });
}

/* Display Tweets Functions */
var ul = document.querySelector("ul");
console.log(ul);
function displayTweets(numOfTweets, tweetId) {
  var li, a;
  for (var i = 0; i < numOfTweets; i++) {
    createLinkElement(li, a, tweetId);
    console.log(li);
  }
}
function createLinkElement(li, a, tweetId) {
  li = document.createElement("li");
  a = document.createElement("a");
  ul.appendChild(li);
  li.appendChild(a);
  li.appendChild(document.createTextNode("Tweet with id: "));
  a.appendChild(
    document.createTextNode("https://twitter.com/mac_sadat/status/" + tweetId)
  );
  a.href = "https://twitter.com/mac_sadat/status/" + tweetId;
  a.setAttribute("target", "_blank");
}
