const apiBtns = document.querySelectorAll(".api-btn");

apiBtns.forEach(btn =>
  btn.addEventListener("change", e => {
    console.log(e.target.dataset.name); // API name
    if (e.target.checked) {
      // TURN ON API
      console.log("Checked");
    } else {
      // TURN OFF API
      console.log("Not checked");
    }
  })
);
