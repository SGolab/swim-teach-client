import {
    createDiv, createH1,
    createIFrame,
    createImageContainer,
    createImageContainerSrc, createInstructionsContainer,
    createStatusInfoContainer
} from "./skill-tree-alt-dom.js";
import {
    delay,
    showCardContentAnimation, slideInAndShowContainerContentAnimation, slideInContainerAnimation,
    slideOutAndHideContainerContentAnimation, slideOutContainerAnimation,
    squeezeContainerAnimation
} from "./skill-tree-alt-animations.js";

let treeViewAlt;

let cardContainers;

let rootContainer;
let stagesContainer;
let subjectsContainer;
let skillsContainer;
let skillDetailsContainer;

let instructionsContainer;

const DIRECTION_LEFT = -1
const DIRECTION_RIGHT = 1

export function renderTreeViewAlternative(json) {
    treeViewAlt = createDiv('tree-view-alt')

    instructionsContainer = createInstructionsContainer()
    treeViewAlt.appendChild(instructionsContainer)

    createCardContainers(treeViewAlt)

    rootContainer.appendChild(createRootCard(json))
    rootContainer.isRoot = true
    rootContainer.style.display = 'flex'
    rootContainer.isFolded = true
    rootContainer.style.maxWidth = '20px'

    Promise.resolve()
        .then(() => createNextCards(stagesContainer, createStageCard, json.stages))
        .then(() => {
            stagesContainer.style.display = 'flex'
            stagesContainer.querySelectorAll('.card *').forEach(item => item.style.opacity = 1)
        })

    return treeViewAlt
}

function createCardContainers(treeViewAlt) {
    cardContainers = []

    rootContainer = createDiv('card-container')
    stagesContainer = createDiv('card-container')
    subjectsContainer = createDiv('card-container')
    skillsContainer = createDiv('card-container')
    skillDetailsContainer = createDiv('card-container', 'details')

    cardContainers.push(rootContainer)
    cardContainers.push(stagesContainer)
    cardContainers.push(subjectsContainer)
    cardContainers.push(skillsContainer)
    cardContainers.push(skillDetailsContainer)

    cardContainers.forEach(container => treeViewAlt.appendChild(container))
}

function createRootCard(json) {
    let rootCard = createDiv('card')

    rootCard.addEventListener('click', () => {
        loadNextContainerAnimated(rootContainer, createStageCard, json.stages)
    })

    return rootCard
}

function createStageCard(stage) {
    let stageCard = createDiv('card');

    stageCard.appendChild(createH1(stage.title))
    stageCard.appendChild(createImageContainerSrc('../images/dolphin.png'))

    stageCard.querySelectorAll('*').forEach(cn => cn.style.opacity = 0)

    stageCard.addEventListener('click', () => {
        loadNextContainerAnimated(stagesContainer, createSubjectCard, stage.subjects)
    })
    return stageCard
}

function createSubjectCard(subject) {
    let subjectCard = createDiv('card')

    subjectCard.appendChild(createH1(subject.title))
    subjectCard.appendChild(createImageContainerSrc('../images/dolphin.png'))

    subjectCard.querySelectorAll('*').forEach(cn => cn.style.opacity = 0)

    subjectCard.addEventListener('click', () => {
        loadNextContainerAnimated(subjectsContainer, createSkillCard, subject.skills)
    })
    return subjectCard;
}

function createSkillCard(skill) {
    let skillCard = createDiv('card')

    if (skill.status !== 'NOT_TRAINED') {
        skillCard.appendChild(createH1(skill.title))

        skillCard.addEventListener('click', () => {
            loadNextContainerAnimated(skillsContainer, createSkillDetailsCard, Array.of(skill))
        })
    }

    skillCard.appendChild(createImageContainer(skill.status))

    skillCard.querySelectorAll('*').forEach(cn => cn.style.opacity = 0)

    return skillCard
}

function createSkillDetailsCard(skill) {
    let detailsCard = createDiv('card', 'details');

    detailsCard.appendChild(createH1(skill.title))
    detailsCard.appendChild(createStatusInfoContainer(skill.status))
    detailsCard.appendChild(createIFrame(skill.url))

    detailsCard.querySelectorAll('*').forEach(cn => cn.style.opacity = 0)

    return detailsCard
}

function loadNextContainerAnimated(container, createCardFunction, cardDataList) {
    let nextContainersList = getNextContainersExcluding(container);
    let nextContainer = nextContainersList[0]

    if (container.isFolded) {
        Promise.resolve()
            .then(() => slideOutAndHideContainersContent(nextContainersList, DIRECTION_RIGHT))
            .then(() => slideOutContainers(nextContainersList))
            .then(() => clearContainers(nextContainersList))
            .then(() => delay())
            .then(() => createNextCards(nextContainer, createCardFunction, cardDataList))
            .then(() => slideInContainer(nextContainer))
            .then(() => slideInAndShowContainerContent(nextContainer))
    } else {
        Promise.resolve()
            .then(() => slideOutAndHideContainerContent(container, DIRECTION_LEFT))
            .then(() => squeezeContainer(container))
            .then(() => {

                showCardContent(container)

                Promise.resolve()
                    .then(() => createNextCards(nextContainer, createCardFunction, cardDataList))
                    .then(() => slideInContainer(nextContainer))
                    .then(() => slideInAndShowContainerContent(nextContainer))
            })
    }
}

function squeezeContainer(container) {
    let h1s = container.querySelectorAll('h1');
    h1s.forEach(h1 => h1.style.display = 'none')
    return squeezeContainerAnimation(container)
        .then(() => container.style.maxWidth = '40px')
}

function showCardContent(container) {
    return showCardContentAnimation(container)
        .then(() => container.querySelectorAll('.card *').forEach(item => item.style.opacity = 1))
}

function slideOutAndHideContainerContent(container, direction) {
    return slideOutAndHideContainerContentAnimation(container, direction)
        .then(() => container.querySelectorAll('.card *').forEach(item => item.style.opacity = 0))
}

function slideOutAndHideContainersContent(nextContainersList, direction) {
    return Promise.all(nextContainersList.map(container => slideOutAndHideContainerContent(container, direction)))
}

function slideOutContainers(nextContainersList) {
    return Promise.all(nextContainersList.map(container => slideOutContainerAnimation(container)))
}

function clearContainers(nextContainersList) {
    nextContainersList.forEach(container => {
        container.style.display = 'none'
        container.isFolded = false
        container.style.maxWidth = '100vw'
        container.innerHTML = ''
    })
}

function createNextCards(nextContainer, createCardFunction, cardDataList) {
    cardDataList.forEach(cardInfo => {
        nextContainer.appendChild(createCardFunction(cardInfo))
    })
}

function slideInContainer(nextContainer) {
    nextContainer.style.display = 'flex'
    return slideInContainerAnimation(nextContainer)
}

function slideInAndShowContainerContent(nextContainer) {
    return slideInAndShowContainerContentAnimation(nextContainer)
        .then(() => nextContainer.querySelectorAll('.card *').forEach(item => item.style.opacity = 1))
}

function getNextContainersExcluding(container) {
    return cardContainers.slice(cardContainers.indexOf(container) + 1, cardContainers.length)
}