// callback function initMap()

function initMap(){
    // loading coordinates
    let latCoords = document.querySelector('#coords-lat-input').value;
    let lngCoords = document.querySelector('#coords-lng-input').value;
    
    // coverting from str to float
    latCoords =  parseFloat(latCoords);
    lngCoords = parseFloat(lngCoords);

    let options = {
        zoom : 10,
        center: {lat: latCoords, lng: lngCoords},
    };
    // instantiating google.map.Map Object
    let map = new google.maps.Map(document.querySelector('#map'), options);
    
    //IIFE addmarker 
    (function addMarker(){
        let marker = new google.maps.Marker({
            position: {lat: latCoords, lng: lngCoords},
            map: map,
        });
    })();
};

// below function creates a script tag in html file and loads the
// Google Map API dymanically (on demand) in js file.
function loadGoogleMapsApi(){
    let script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDKJhHrF1DrRXu3Qjb_9OEA3Pu8eoJyRWY&callback=initMap";
    script.async = true; // for async call
    document.querySelectorAll("body")[0].appendChild(script);
}

// after submit button press

 document.querySelector('#submit').addEventListener('click', (e) => {
     e.preventDefault();
     loadGoogleMapsApi();
 });

 // this is how things are working
 // submit click -> loadGoogleMapsApi() -> initMap() -> addMarket()