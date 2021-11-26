let Jumbotron = $(".jumbotron")
let artistInput = $("#artist")
let locationInput = $("#location")
let Submit = $("#submit")

Submit.on('click', async () => {
    let Artist = artistInput.val()
    let Location = locationInput.val()

    let artistEvents = await fetchArtistEvents(Artist)
    if(Location) artistEvents = await filterEventLocations(artistEvents, Location)
    
    console.log(artistEvents)
})

async function filterEventLocations(artistEvents, Location) {
    let eventsArray = []
    for(currentEvent of artistEvents) {
        if(currentEvent.venue.city == Location || currentEvent.venue.city.includes(Location)) eventsArray.push(currentEvent)
    }

    return eventsArray;
}

async function fetchArtistEvents(artists) {
    let artistEvents = await fetch(`https://rest.bandsintown.com/artists/${artists}/events?app_id=6d75d8ac2c520ded53402bbdd9edc158`, { method: 'GET' })
    artistEvents = await artistEvents.json()
    
    if(artistEvents.length < 1) return


    return artistEvents
}


setBackgroundImage()
async function setBackgroundImage() {
    let storedImages = await getImages()
    let randomBackground = storedImages[Math.floor(Math.random() * storedImages.length)];
    Jumbotron.css({ 'background-image': `url(${randomBackground.src.landscape})`})
}


async function getImages() {
    let storedImages = JSON.parse(localStorage.getItem("Images"))
    if(!storedImages) {
        let randomImages = await getRandomImages()
        localStorage.setItem("Images", JSON.stringify(randomImages))

        storedImages = JSON.parse(localStorage.getItem("Images"))
    }

    return storedImages
}


async function getRandomImages() {
    let backgroundImage = await $.ajax({ 
        type: 'GET', 
        url: `https://api.pexels.com/v1/search?query=concert&orientation=landscape&color=white&locale=en-US&per_page=50`, 
        headers: {
            Authorization: "563492ad6f91700001000001c3ab8936662f45c48ef0844a767bbda8"
        } 
    })

    return RandomImage = backgroundImage.photos;
}

