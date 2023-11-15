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
    for (let i = 0; i < response.bikes.length; i++) {
      let h3 = document.createElement("h3");
      let ul = document.createElement("ul");
      let li = document.createElement("li");
      h3.innerText = "Make/Model: " + response.bikes[i].title + " " + "Frame Color(s): " + response.bikes[i].frame_colors;
      if (response.bikes[i].stolen_location) {
        li.append("Stolen From: " + response.bikes[i].stolen_location);
      } else {
        li.append("Stolen From: Unknown Location");
      }
      ul.append(li);
      displayDiv.append(h3);
      displayDiv.append(ul);
    }
  }, function (errorMessage) {
    let errorDiv = document.getElementById("display-error");
    let p = document.createElement("p");
    p.append("Error Code: " + errorMessage.status + " => " + errorMessage.responseText);
    errorDiv.append(p);
  });
}

document.getElementById("userInput-form").addEventListener("submit", getBikesWithin);