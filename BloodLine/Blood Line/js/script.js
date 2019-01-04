var fetchResult = document.getElementById('fetchResult');

var modal = document.getElementById('modal-wrapper');
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var fetch = document.getElementById('fetch-wrapper');
window.onclick = function (event) {
    if (event.target == fetch) {
        fetch.style.display = "none";
    }
}

document.getElementById('formRegister').addEventListener('submit', setData);

function setData(e){
    var usr = document.getElementById('register-username').value;
    var bld = document.getElementById('register-blood').value;
    var ag = document.getElementById('register-age').value;
    var vene = document.getElementById('register-venue').value;
    var dat = document.getElementById('register-date').value;


    var data = {
        username: usr,
        blood: bld,
        age: ag,
        venue: vene,
        date: dat
    }

    if(localStorage.getItem('dataCollection') === null){
        var dataCollection = [];
        dataCollection.push(data);
        localStorage.setItem("dataCollection", JSON.stringify(dataCollection));
    }
    else{
        var dataCollection = JSON.parse(localStorage.getItem('dataCollection'));
        dataCollection.push(data);
        localStorage.setItem("dataCollection", JSON.stringify(dataCollection));
    }
}

function getData(e){
    var dataCollection = JSON.parse(localStorage.getItem('dataCollection'));
     var fetchName = document.getElementById('fetchName').value;
     var resultAge = document.getElementById('fetchAge');
     var resultBlood = document.getElementById('fetchBlood');
     var resultVenue = document.getElementById('fetchVenue');
     var resultDate = document.getElementById('fetchDate');
     var test = 0;
     
     fetchAge.innerHTML = '';
     fetchBlood.innerHTML = '';
     fetchVenue.innerHTML = '';
     fetchDate.innerHTML = '';

     
     for(var i = 0; i < dataCollection.length; i++){
         if (dataCollection[i].username == fetchName) {
            fetchAge.innerHTML += "The User Age is: ";
            fetchAge.innerHTML +=  dataCollection[i].age;

            fetchBlood.innerHTML += "Blood Group: ";
            fetchBlood.innerHTML +=  dataCollection[i].blood;

            fetchVenue.innerHTML += "Venue: ";
            fetchVenue.innerHTML +=  dataCollection[i].venue;

            fetchDate.innerHTML += "Date of Donation: ";
            fetchDate.innerHTML +=  dataCollection[i].date;
            test = 1;
            break;
         }
     }

     if(test === 0){
        fetchResult.innerHTML += "Password Not Found";
     }

}

function refresh(){
    var fetchName = document.getElementById('fetchName');
     var resultAge = document.getElementById('fetchAge');
     var resultBlood = document.getElementById('fetchBlood');
     var resultVenue = document.getElementById('fetchVenue');
     var resultDate = document.getElementById('fetchDate');

     fetchName.innerHTML = 'Enter Username';
     fetchAge.innerHTML = '';
     fetchBlood.innerHTML = '';
     fetchVenue.innerHTML = '';
     fetchDate.innerHTML = '';
}