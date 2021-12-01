let Jumbotron = $(".jumbotron")
let artistInput = $("#artist")
let locationInput = $("#location")
let Submit = $("#submit")

let musicianInformation = $(".musician-information")
let artistInfo = $("#artist-info")
let Events = $("#events")

Submit.on('click', async() => {
    let Artist = artistInput.val()
    let Location = locationInput.val()
    if (!Artist) return

    let artistEvents = await fetchArtistEvents(Artist)
    await displayArtistInfo(artistEvents[0].artist)
    if (Location) artistEvents = await filterEventLocations(artistEvents, Location)

    if (artistEvents.length == 0) return

    musicianInformation.css("display", "block")
    displayArtistEvents(artistEvents)
})

Events.on('click', '.listing-button', getVenueInfo)

function getVenueInfo(event) {
    let buttonParent = $(this).parent('div').get(0)
    console.log($(buttonParent).attr('data-venuename'))

    let query = $(buttonParent).attr('data-venuename')

    fetch('https://maps.googleapis.com/maps/api/place/findplacefromtext/jsoninputtype=textquery&input=' + query + '&key=AIzaSyBB3ZBBQz3jrOk3wbOE4_Vwmd17g31AASk')
        .then(function(response) {
            if (response.ok) return response.json()
        })
        .then(function(data) {
            console.log(data)
        })

}


function displayArtistEvents(info) {
    console.log(info)
    for (artistEvent of info) {
        let div = $("<div>")
        div.attr("data-venueName", artistEvent.venue.name)
        div.addClass("row concert box col-6 justify-content-center")

        let date = $("<div>")
        date.addClass("date d-flex justify-content-center align-items-center text-center col-md-12 col-lg-4")
        date.text(moment(artistEvent.datetime).format("MMMM Do, YYYY"))

        let venue = $("<div>")
        venue.addClass("venue d-flex justify-content-center align-items-center text-center col-md-12 col-lg-4")
        venue.text(artistEvent.venue.location)

        let a = $("<a>")
        a.addClass("d-flex justify-content-center align-items-center text-center col-md-12 col-lg-4")
        a.attr("href", artistEvent.url)

        let button = $("<button>")
        button.attr("type", "button")
        button.addClass("btn btn-primary tickets-button")
        button.text("Tickets")

        let googleButton = $("<button>")
        googleButton.attr("type", "button")
        googleButton.attr("data-bs-toggle", "modal")
        googleButton.attr("data-bs-target", "#exampleModal")
        googleButton.addClass("btn btn-primary listing-button")
        googleButton.text("Google Listing")

        a.append(button)
        div.append(date)
        div.append(venue)
        div.append(a)
        Events.append(div)
        div.append(googleButton)
    }
}

async function displayArtistInfo(info) {

    await artistInfo.empty()
    await Events.empty()

    let Image = $("<img>")
    Image.attr("id", "artist-image")
    Image.attr("src", info.thumb_url)

    let Name = $("<div>")
    Name.attr("id", "artist-name")
    Name.addClass("align-middle ml-5")
    Name.text(info.name)

    artistInfo.append(Image)
    artistInfo.append(Name)
}

async function filterEventLocations(artistEvents, Location) {
    let eventsArray = []
    for (currentEvent of artistEvents) {
        if (currentEvent.venue.city.toLowerCase() == Location.toLowerCase() || currentEvent.venue.city.toLowerCase().includes(Location.toLowerCase())) {
            eventsArray.push(currentEvent)
            console.log(currentEvent)
        }
    }

    return eventsArray;
}

async function fetchArtistEvents(artists) {
    let artistEvents = await fetch(`https://rest.bandsintown.com/artists/${artists}/events?app_id=6d75d8ac2c520ded53402bbdd9edc158`, { method: 'GET' })
    artistEvents = await artistEvents.json()

    if (artistEvents.length < 1) return

    return artistEvents
}

setBackgroundImage()
async function setBackgroundImage() {
    let storedImages = await getImages()
    let randomBackground = storedImages[Math.floor(Math.random() * storedImages.length)];
    Jumbotron.css({ 'background-image': `url(${randomBackground.src.landscape})` })
}


async function getImages() {
    let storedImages = JSON.parse(localStorage.getItem("Images"))
    if (!storedImages) {
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