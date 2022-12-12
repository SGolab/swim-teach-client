import {renderSkillCardDetails} from "./skill-card-details.js";
import {clearTranslation, enableDragging} from "./drag.js";
import {clearZoom, enableZoom, zoomInOut} from "./zoom.js";


const statusImageMap = {
    "ACQUIRED": "/images/correct-icon.webp",
    "TRAINED": "/images/in-progress-icon.png",
    "NOT_TRAINED": "/images/blocked-icon.png"
}

let stageBranchElementsMap;

function createTitleContainer(title) {
    const titleContainer = document.createElement('div')
    titleContainer.classList.add('title-container')

    const p = document.createElement('p')
    p.innerText = title;
    titleContainer.appendChild(p);

    return titleContainer
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

export function applyBehaviour(skillCard) {
    const activate = function () {
        this.classList.add('skill-card-active')
        this.addEventListener('click', select)
    }

    const deactivate = function () {
        this.classList.remove('skill-card-active')
        this.removeEventListener('click', select)
    }

    const select = function () {
        renderSkillCardDetails(skillCard);
    }

    skillCard.addEventListener('mouseover', activate);
    skillCard.addEventListener('mouseout', deactivate)
}

function createSkillCardElement(skill) {
    const skillCardElement = document.createElement('div');
    skillCardElement.classList.add('skill-card')

    if (skill.status !== 'NOT_TRAINED') {
        skillCardElement.appendChild(createTitleContainer(skill.title))
        skillCardElement.title = skill.title
        skillCardElement.description = skill.description
        skillCardElement.url = skill.url
        skillCardElement.status = skill.status

        applyBehaviour(skillCardElement);
    } else {
        skillCardElement.classList.add('skill-card-locked')
    }

    skillCardElement.appendChild(createImageContainer(skill.status))

    return skillCardElement;
}

function createGoalCardElement(goal) {

    let goalCard = document.createElement('div');
    goalCard.classList.add('goal-card')

    let titleLabel = document.createElement('div');
    titleLabel.classList.add('title-label')
    titleLabel.innerText = goal.title
    goalCard.appendChild(titleLabel)

    // let descriptionContainer = document.createElement('div')
    // descriptionContainer.classList.add('description-container')
    // descriptionContainer.innerText = goal.description
    // goalCard.appendChild(descriptionContainer)

    return goalCard;
}

function createSubjectTreeElement(subject) {
    let subjectTree = document.createElement('div');
    subjectTree.classList.add('tree')

    let label = document.createElement('span')
    label.classList.add('label')
    label.innerText = subject.title
    subjectTree.appendChild(label)

    subject.skills.forEach(skill => {
        let skillCardElement = createSkillCardElement(skill);
        subjectTree.appendChild(skillCardElement)
    })

    subjectTree.appendChild(createGoalCardElement(subject.goal))

    return subjectTree;
}

function createStageBranchElement(stage) {
    let branchElement = document.createElement('div');
    branchElement.classList.add('branch')

    let label = document.createElement('span')
    label.classList.add('label')
    label.innerText = stage.title
    branchElement.appendChild(label)

    stage.subjects.forEach(subject => {
        let subjectElement = createSubjectTreeElement(subject);
        branchElement.appendChild(subjectElement)
    })

    if (!stageBranchElementsMap) {
        stageBranchElementsMap = new Map()
    }

    stageBranchElementsMap.set(stage.title, branchElement)

    return branchElement
}

function createSkillTree(skillTreeJson) {
    let rootTree = document.createElement('div');
    rootTree.classList.add('tree')

    skillTreeJson.stages.forEach(stage => {
        rootTree.appendChild(createStageBranchElement(stage))
    });

    return rootTree
}

function createButtons() {
    let buttonGrid = document.createElement('div')
    buttonGrid.classList.add('button-grid')

    const stageButtonContainer = document.createElement('div')
    stageButtonContainer.classList.add('stage-button-container')

    stageBranchElementsMap.forEach((stageBranchElement, stageName) => {
        let toggleStageButton = document.createElement('button')
        toggleStageButton.classList.add('stage-button')
        toggleStageButton.innerText = stageName

        toggleStageButton.classList.add('clicked')

        toggleStageButton.addEventListener('click', () => {
            if (stageBranchElement.style.display === 'none') {
                toggleStageButton.classList.add('clicked')
                stageBranchElement.style.display = 'flex'
            } else {
                toggleStageButton.classList.remove('clicked')
                stageBranchElement.style.display = 'none'
            }

            clearTranslation()
            clearZoom()
        })

        stageButtonContainer.appendChild(toggleStageButton)
    })

    buttonGrid.appendChild(stageButtonContainer)


    const controlButtonContainer = document.createElement('div')
    controlButtonContainer.classList.add('control-button-container')

    let centerButton = document.createElement('button')
    centerButton.classList.add('control-button')
    centerButton.id = 'center-button'
    centerButton.innerText = 'CENTER'
    centerButton.addEventListener('click', () => {
        clearTranslation()
        clearZoom()
    })
    controlButtonContainer.appendChild(centerButton)

    let zoomInButton = document.createElement('button')
    zoomInButton.classList.add('control-button')
    zoomInButton.id = 'zoom-in-button'
    zoomInButton.innerText = 'ZOOM IN'
    zoomInButton.addEventListener('click', () => {
        zoomInOut(1);
    })
    controlButtonContainer.appendChild(zoomInButton)

    let zoomOutButton = document.createElement('button')
    zoomOutButton.classList.add('control-button')
    zoomOutButton.id = 'zoom-out-button'
    zoomOutButton.innerText = 'ZOOM OUT'
    zoomOutButton.addEventListener('click', () => {
        zoomInOut(-1);
    })
    controlButtonContainer.appendChild(zoomOutButton)

    buttonGrid.appendChild(controlButtonContainer)

    return buttonGrid;
}

export function renderTreeView(mainContainer, json) {
    let treeView = document.createElement('div')
    treeView.classList.add('tree-view')

    let background = document.createElement('div')
    background.classList.add('background')
    background.id = 'drag-zoom-item'

    let treeContainer = document.createElement("div");
    treeContainer.classList.add('tree-container')

    treeContainer.appendChild(createSkillTree(json))
    background.appendChild(treeContainer)

    treeView.appendChild(createButtons())
    treeView.appendChild(background)

    mainContainer.appendChild(treeView)

    clearTranslation()
    clearZoom()
    enableZoom()
    enableDragging()
}