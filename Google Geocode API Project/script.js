document.querySelector('#submit').addEventListener('click', getLocation);

function getLocation(e) {
    e.preventDefault();

    const usp = new URLSearchParams({
        address: document.querySelector('#location-input').value,
        key: 'AIzaSyDKJhHrF1DrRXu3Qjb_9OEA3Pu8eoJyRWY',
    });

    let url = `https://maps.googleapis.com/maps/api/geocode/json?${usp.toString()}`;

    // console.log(url);

    // fetch the input location

    fetch(url)
    .then((res) => res.json())
    .then((res) => {
        console.log(res);

        // getting the formatted address

        let formattedAddress = res.results[0].formatted_address;

        let formattedAddressOutput = `<ul class='list-group'>
        <li class='list-group-item'><strong>Formatted Address:</strong> ${formattedAddress}</li></ul>`;

        document.querySelector('#formatted_address').innerHTML = formattedAddressOutput;

        // gettting the address components
        let addressComponents = res.results[0].address_components;

        // console.log(addressComponents);

        let addressComponentsOutput = `<ul class='list-group'>`

        for (let {long_name, types} of addressComponents) {
            //console.log(`${types[0]} => ${long_name}`);

            addressComponentsOutput += `
                <li class='list-group-item card'>
                <strong>${types[0]}:</strong> 
                ${long_name}</li>`
        }

        addressComponentsOutput += `</ul>`

        document.querySelector('#address_components').innerHTML = addressComponentsOutput;

        // getting longitude and latitude
    
        let {lat, lng} = res.results[0].geometry.location;

        let geometryOutput = `
        <ul class='list-group'>
            <li class='list-group-item'><strong>Longitude:</strong> ${lng}
            <li class='list-group-item'><strong>Latitude:</strong> ${lat}
        </ul>`

        console.log(geometryOutput);
        
        document.querySelector('#geometry').innerHTML = geometryOutput;
    })
    .catch((err) => console.log(err));
}
