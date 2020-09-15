const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let initialLoad= true;
let ready=false;
let imagesLoaded=0;
let totalImages = 0;
let photosArray = [];
// Helper function to set attributes
function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}
// Check if images are loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready=true;
        loader.hidden=true;
        initialLoad=false
        count=30
    }
}
// Create elements for link & photo to add to DOM
function displayPhotos(){
    imagesLoaded=0;
    totalImages=photosArray.length;
    //Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to unsplash
        const item = document.createElement('a');

        setAttributes(item,{
            href: photo.links.html,
            target: '_blank',
        })
        // create <img> for photo
        const img = document.createElement('img');

        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })
        // Event Listener, check when each is finished loading
        img.addEventListener('load',imageLoaded())
        //put <img> inside <a>, then but both into imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Unsplash API

const apiKey = "qSpNj3FPHp6U3Sa4M9dC-9Nr5Mnnk8E_BxFnfVNKC8w";
const count = 5;
const proxyUrl = 'https://mysterious-chamber-61347.herokuapp.com/';
const apiUrl= `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // catch error here
        
    }
}
// Event listener - check for scrolling near bottom of page
window.addEventListener('scroll',()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready){
        ready=false;
        getPhotos();
    }
});

//On Load
getPhotos();
