let Jumbotron = $(".jumbotron")
let artistInput = $("#artist")
let locationInput = $("#location")
let Submit = $("#submit")

let musicianInformation = $(".musician-information")
let artistInfo = $("#artist-info")
let Events = $("#events")

Submit.on('click', async () => {
    let Artist = artistInput.val()
    let Location = locationInput.val()

    let artistEvents = await fetchArtistEvents(Artist)
    if(Location) artistEvents = await filterEventLocations(artistEvents, Location)
    
    if(artistEvents.length == 0) return

    console.log(artistEvents)
    musicianInformation.css("display", "block")
    await displayArtistInfo(artistEvents[0].artist)
    displayArtistEvents(artistEvents)
})

function displayArtistEvents(info) {

    for(artistEvent of info) {
        let div = $("<div>")
        div.addClass("d-flex concert box col-8 justify-content-center")

        let date = $("<div>")
        date.addClass("date")
        date.text(moment(artistEvent.datetime).format("MMMM Do, YYYY"))

        let venue = $("<div>")
        venue.addClass("venue")
        venue.text(artistEvent.venue.location)
        
        let a = $("<a>")
        a.attr("href", artistEvent.url)

        let button = $("<button>")
        button.attr("type", "button")
        button.attr("href", artistEvent.url)
        button.addClass("btn btn-primary tickets-button")
        button.text("Tickets")
        
        a.append(button)
        div.append(date)
        div.append(venue)
        div.append(a)
        Events.append(div)
    }
}

async function displayArtistInfo(info) {

    let Image = $("<img>")
    Image.attr("id", "artist-image")
    Image.attr("src", info.thumb_url)

    let Name = $("<div>")
    Name.attr("id", "artist-name")
    Name.addClass("align-middle ml-5")
    Name.text(info.name)

    artistInfo.append(Name)
    artistInfo.append(Image)
}

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
        url: `https://api.pexels.com/v1/search?query=concert&orientation=landscape&color=white&locale=en-US&per_page=100`, 
        headers: {
            Authorization: "563492ad6f91700001000001c3ab8936662f45c48ef0844a767bbda8"
        } 
    })

    return RandomImage = backgroundImage.photos;
}

