let Jumbotron = $(".jumbotron")

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





