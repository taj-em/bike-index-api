function getBikesWithin() {
  let promise = new Promise(function (resolve, reject) {
    let request = new XMLHttpRequest();
    const url = `https://bikeindex.org:443/api/v3/search?page=1&per_page=10&location=Chico%2C%20CA%2C%20US&distance=40&stolenness=proximity`;
    request.addEventListener("loadend", function () {
      const response = JSON.parse(this.responseText);
      if (this.status === 200) {
        resolve([response]);
      } else {
        reject([this, response]);
      }
    });
    request.open("GET", url);
    request.send();
  });

  promise.then(function (response) {
    console.log(response);
    for (let i = 0; i < response[0].bikes.length; i++) {
      document.getElementById("display-bike-manufacturer").append(response[0].bikes[i].manufacturer_name);
    }
  }, function (errorMessage) {
    console.log(errorMessage);
  });
}

document.getElementById("display-btn").addEventListener("click", getBikesWithin);