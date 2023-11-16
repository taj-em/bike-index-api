function getBikesWithin(event) {
  event.preventDefault();
  const city = document.getElementById("userInput").value;
  let promise = new Promise(function (resolve, reject) {
    let request = new XMLHttpRequest();
    const url = `https://bikeindex.org:443/api/v3/search?page=1&per_page=10&location=${city}&distance=40&stolenness=proximity`;
    request.addEventListener("loadend", function () {
      const response = JSON.parse(this.responseText);
      if (this.status === 200) {
        resolve(response, city);
      } else {
        reject(this);
      }
    });
    request.open("GET", url);
    request.send();
  });

  promise.then(function (response) {
    console.log(response);
    let displayDiv = document.getElementById("display-bikes");
    displayDiv.innerText = null;
    for (let i = 0; i < response.bikes.length; i++) {
      let h3 = document.createElement("h3");
      let ul = document.createElement("ul");
      let stolenFrom = document.createElement("li");
      let stolenDate = document.createElement("li");
      let img = document.createElement("img");
      h3.innerText = "Make/Model: " + response.bikes[i].title + " " + "Frame Color(s): " + response.bikes[i].frame_colors;
      if (response.bikes[i].stolen_location) {
        stolenFrom.append("Stolen From: " + response.bikes[i].stolen_location);
      } else {
        stolenFrom.append("Stolen From: Unknown Location");
      }
      if (response.bikes[i].date_stolen) {
        let realDate = new Date(response.bikes[i].date_stolen * 1000).toLocaleDateString("en-US");
        stolenDate.append("Date Stolen: " + realDate);
      } else {
        stolenDate.append("Date Stolen: Unknown Date");
      }
      if (response.bikes[i].large_img) {
        img.src = response.bikes[i].large_img;
        img.height = 200;
      }
      ul.append(stolenFrom);
      ul.append(stolenDate);
      displayDiv.append(h3);
      displayDiv.append(ul);
      displayDiv.appendChild(img);
    }
  }, function (errorMessage) {
    let errorDiv = document.getElementById("display-error");
    let p = document.createElement("p");
    p.append("Error Code: " + errorMessage.status + " => " + errorMessage.responseText);
    errorDiv.append(p);
  });
}

document.getElementById("userInput-form").addEventListener("submit", getBikesWithin);