import {disableDragging, enableDragging} from "./drag.js";
import {disableZoom, enableZoom} from "./zoom.js";

let skillCardDetailsElement;

function createExitButton() {
    const exitButton = document.createElement('button')
    exitButton.classList.add('exit-button')
    exitButton.addEventListener('click', closeSkillCardDetails)

    return exitButton;
}

const statusImageMap = {
    'ACQUIRED': '../images/correct-icon.webp',
    'TRAINED': '../images/in-progress-icon.png',
    'NOT_TRAINED': '../images/blocked-icon.png'
}

function createImageContainer(status) {
    const imageContainer = document.createElement('div')
    imageContainer.classList.add('image-container')

    const image = document.createElement('div')
    image.classList.add('image')
    image.style.content = `url(${statusImageMap[status]})`
    imageContainer.appendChild(image)

    return imageContainer;
}

function createDescriptionContainer(description) {
    let descriptionContainer = document.createElement('div')
    descriptionContainer.classList.add('description-container')

    let p = document.createElement('p')
    p.innerText = description;
    descriptionContainer.appendChild(p)

    return descriptionContainer;
}

function createVideoContainer(url) {
    let videoContainer = document.createElement('div')
    videoContainer.classList.add('video-container')

    let video = document.createElement('iframe')
    video.src = url
    video.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    video.allowFullscreen = true;

    videoContainer.appendChild(video)

    return videoContainer
}

function createHeader(title) {
    let header = document.createElement('div')
    header.classList.add('skill-card-details-header')

    let h1 = document.createElement('h1')
    h1.innerText = title
    header.appendChild(h1)

    return header;
}

let treeView
let buttonGrid
let background

export function renderSkillCardDetails(skillCard) {
    treeView = document.querySelector('.tree-view')
    background = document.querySelector('.background')
    buttonGrid = document.querySelector('.button-grid');

    background.style.filter = 'blur(5px)'
    treeView.removeChild(buttonGrid)
    disableDragging()
    disableZoom()

    skillCardDetailsElement = document.createElement('div');
    skillCardDetailsElement.classList.add('skill-card-details')

    skillCardDetailsElement.appendChild(createHeader(skillCard.title))
    skillCardDetailsElement.appendChild(createExitButton())
    skillCardDetailsElement.appendChild(createImageContainer(skillCard.status))
    skillCardDetailsElement.appendChild(createDescriptionContainer(skillCard.description))
    skillCardDetailsElement.appendChild(createVideoContainer(skillCard.url))

    treeView.appendChild(skillCardDetailsElement)
}

const closeSkillCardDetails = function () {
    treeView.removeChild(skillCardDetailsElement)
    treeView.appendChild(buttonGrid)

    background.style.filter = ''

    enableDragging()
    enableZoom()
}

