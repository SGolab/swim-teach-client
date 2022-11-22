import {disableDragging, enableDragging} from "./drag.js";
import {disableZoom, enableZoom} from "./zoom.js";

let skillCards = document.querySelectorAll('.skill-card');
let mainContainer = document.querySelector('.main-container');
let screen = document.querySelector('.screen')
let buttonGrid = document.querySelector('.button-grid');

const activate = function () {
    this.classList.add('skill-card-active')
    this.addEventListener('click', select)
}

const deactivate = function () {
    this.classList.remove('skill-card-active')
}

const select = function () {
    mainContainer.style.filter = 'blur(5px)'

    screen.removeChild(buttonGrid)

    renderSkillCardDetails();
}

// let screen;
let skillCardDetailsElement;

function renderSkillCardDetails() {

    disableDragging()
    disableZoom()

    const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

    screen = document.querySelector('.screen');

    skillCardDetailsElement = document.createElement('div');
    skillCardDetailsElement.classList.add('skill-card-details')

    //exit button
    let exitButton = document.createElement('button')
    exitButton.classList.add('exit-button')
    exitButton.addEventListener('click', closeSkillCardDetails)

    skillCardDetailsElement.appendChild(exitButton)


    //image
    let imageContainer = document.createElement('div')
    imageContainer.classList.add('image-container')

    let image = document.createElement('div')
    image.classList.add('image')
    imageContainer.appendChild(image)

    skillCardDetailsElement.appendChild(imageContainer)


    //description
    let descriptionContainer = document.createElement('div')
    descriptionContainer.classList.add('description-container')

    let p = document.createElement('p')
    p.innerText = LOREM;
    descriptionContainer.appendChild(p)

    skillCardDetailsElement.appendChild(descriptionContainer)


    let videoContainer = document.createElement('div')
    videoContainer.classList.add('video-container')

    //video
    let video = document.createElement('iframe')
    video.src = "https://www.youtube.com/embed/pFN2n7CRqhw"
    video.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    video.allowFullscreen = true;

    videoContainer.appendChild(video)

    skillCardDetailsElement.appendChild(videoContainer)


    //header
    let skillCardDetailsHeader = document.createElement('div')
    skillCardDetailsHeader.classList.add('skill-card-details-header')

    let h1 = document.createElement('h1')
    h1.innerText = 'Dive Head Vertically'
    skillCardDetailsHeader.appendChild(h1)

    skillCardDetailsElement.appendChild(skillCardDetailsHeader)

    screen.appendChild(skillCardDetailsElement)
}

const closeSkillCardDetails = function () {
    screen.removeChild(skillCardDetailsElement)
    screen.appendChild(buttonGrid)


    mainContainer.style.filter = ''

    enableDragging()
    enableZoom()
}

skillCards.forEach(function (sc) {
    sc.addEventListener('mouseover', activate);
    sc.addEventListener('mouseout', deactivate)
})

