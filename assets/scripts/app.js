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
  var news_link;
  var count = 0;
  if (news) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var url = JSON.parse(this.responseText);
        console.log(url.articles[count].url);
        news_link = url.articles[count].url;
        count++;
        if (count > 10) {
          count = 0;
        }
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
      "https://www.food2fork.com/api/search?key=2fd932f0709ea4042f10dcabd03ef84e",
      false
    );
    xhttp.send();
  }

  var status;
  var jokesStatment = `Joke of the day: ${jk}`;
  var newsStatment = `top headline of the day: ${news_link}`;
  var foodRecipesStatment = `Recipe of the Day: ${rl}`;
  var statusCheck = false;
  // this is the body of the tweet append on it

  if (jokes && news && foodRecipes) {
    status = jokesStatment + "\n" + newsStatment + "\n" + foodRecipesStatment;
    statusCheck = true;
  } else if (jokes && foodRecipes) {
    status = jokesStatment + "\n" + foodRecipesStatment;
    statusCheck = true;
  } else if (jokes && news) {
    status = jokesStatment + "\n" + newsStatment;
    statusCheck = true;
  } else if (news && foodRecipes) {
    status = foodRecipesStatment + "\n" + newsStatment;
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
  console.log(param);
  var jsn = JSON.stringify(param);
  var url = "https://thawing-oasis-15291.herokuapp.com/tweets";
  console.log(JSON.stringify(param));
  fetch(url, {
    method: "POST",
    body: jsn,
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(data => {
      updateTweetsRecords(data.id_str);
      //console.log(data);
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
      data.map(function (tweet) {
        displayTweets(tweet.status_id);
      })
      console.log(data);
    });
}

function updateTweetsRecords(id) {
  var param = { status_id: id };
  //console.log(JSON.stringify(param));
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
      displayTweets(id);
    });
}

/* Display Tweets Functions */
var ul = document.querySelector("ul");

function displayTweets(tweetId) {
  var li = document.createElement("li");
  var a = document.createElement("a");
  ul.appendChild(li);
  li.appendChild(a);
  // li.appendChild(document.createTextNode("Tweet with id: "));
  a.appendChild(
    document.createTextNode("https://twitter.com/mac_sadat/status/" + tweetId)
  );
  a.href = "https://twitter.com/mac_sadat/status/" + tweetId;
  a.setAttribute("target", "_blank");
}

getallTweets();



