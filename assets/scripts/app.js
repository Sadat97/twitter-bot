var firstButton = document.getElementById("first-button");
var secondButton = document.getElementById("second-button");
var thirdButton = document.getElementById("third-button");

checkbox.addEventListener("change", function() {
  if (firstButton.checked) {
    // do this
    console.log("Checked");
  } else {
    // do that
    console.log("Not checked");
  }
});
