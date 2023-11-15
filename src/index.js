import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

function getBikesWithin() {
  let promise = new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    const url = `https://bikeindex.org:443/api/v3/search?page=1&per_page=10&location=Chico%2C%20CA%2C%20US&distance=40&stolenness=proximity`;
    request.open("GET", url, true);
    request.send();
    request.addEventListener("loadend", function() {
      const response = JSON.parse(this.responseText);
      if (this.status === 200) {
        resolve([response]);
      } else {
        reject([this, response]);
      }
    });
  });

  promise.then(function(response) {
    console.log(response);
    return response;
  }, function(errorMessage) {
    console.log(errorMessage);
    return errorMessage;
  });
}


