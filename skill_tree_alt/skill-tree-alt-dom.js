export function createImageContainerSrc(url) {
    const imageContainer = createDiv('image-container')
    const image = createDiv('image')
    image.style.content = `url(${url})`
    imageContainer.appendChild(image)

    return imageContainer
}

export function createImageContainer(status) {
    const statusImageMap = {
        'ACQUIRED': '../images/correct-icon.webp',
        'TRAINED': '../images/in-progress-icon.png',
        'NOT_TRAINED': '../images/blocked-icon.png'
    }

    return createImageContainerSrc(statusImageMap[status]);
}

export function createIFrame(url) {
    let iframe = document.createElement('iframe')
    iframe.src = url
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    iframe.allowFullscreen = true;
    return iframe;
}

export function createStatusInfoContainer(status) {

    let statusInfoContainer = createDiv('status-info-container');

    let span = document.createElement('span')
    span.classList.add('status-title')
    span.innerText = status
    statusInfoContainer.appendChild(span)

    statusInfoContainer.appendChild(createImageContainer(status))

    return statusInfoContainer;
}

export function createH1(title) {
    let h1 = document.createElement('h1')
    h1.innerText = title
    return h1
}

export function createInstructionsContainer() {
    const defaultText = 'SELECT STAGE'

    let instructionsContainer = document.createElement('div');
    instructionsContainer.classList.add('instructions-container')
    let span = document.createElement('span');
    span.innerText = defaultText
    instructionsContainer.appendChild(span)
    return instructionsContainer;
}

export function createDiv(...classes) {
    const div = document.createElement('div')

    if (Array.isArray(classes)) {
        classes.forEach(c => {
            div.classList.add(c)
        })
    } else {
        div.classList.add(classes)
    }

    return div;
}