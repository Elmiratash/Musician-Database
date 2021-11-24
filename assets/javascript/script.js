var artists = "Red Hot Chilli Peppers"


fetch('https://rest.bandsintown.com/artists/' + artists + '/events?app_id=codingbootcamp', {
        method: 'GET', //GET is the default.

    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    });