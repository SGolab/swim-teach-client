import {
    createDiv, createH1,
    createIFrame,
    createImageContainer,
    createImageContainerSrc,
    createStatusInfoContainer
} from "./skill-tree-alt-dom.js";

let containers;

let rootContainer;
let stagesContainer;
let subjectsContainer;
let skillsContainer;
let skillDetailsContainer;

export function renderTreeViewAlternative(mainContainer, json) {

    json.stages.push(json.stages[0]) //todo delete
    json.stages.push(json.stages[0])
    json.stages.push(json.stages[0])

    const treeViewAlternative = createDiv('tree-view-alt')

    containers = []

    rootContainer = createDiv('card-container')
    stagesContainer = createDiv('card-container')
    subjectsContainer = createDiv('card-container')
    skillsContainer = createDiv('card-container')
    skillDetailsContainer = createDiv('card-container', 'details')

    containers.push(rootContainer)
    containers.push(stagesContainer)
    containers.push(subjectsContainer)
    containers.push(skillsContainer)
    containers.push(skillDetailsContainer)

    containers.forEach(container => treeViewAlternative.appendChild(container))


    rootContainer.appendChild(createRootCard(json))

    json.stages.forEach(stage => {
        stagesContainer.appendChild(createStageCard(stage))
    })
    stagesContainer.style.display = 'flex';

    mainContainer.appendChild(treeViewAlternative)
}

function getNextContainersIncluding(container) {
    return containers.slice(containers.indexOf(container), containers.length)
}

function getNextContainersExcluding(container) {
    return containers.slice(containers.indexOf(container) + 1, containers.length)
}

function refresh(item) {
    const c = item.classList[0]

    item.classList.remove(c)
    item.offsetWidth //https://stackoverflow.com/questions/44846614/trigger-css-animations-in-javascript
    item.classList.add(c)
}

function createRootCard(json) {
    let rootCard = createDiv('card')
    rootContainer.classList.add('folded')

    rootCard.addEventListener('click', () => {

        getNextContainersIncluding(rootContainer).forEach(container => container.style.display = 'none')

        getNextContainersExcluding(rootContainer).forEach(container => {
            container.innerHTML = ''
            container.classList.remove('folded')
        })

        json.stages.forEach(stage => {
            stagesContainer.appendChild(createStageCard(stage))
        })
        stagesContainer.style.display = 'flex';

        refresh(stagesContainer)
    })

    return rootCard
}

function createStageCard(stage) {
    let stageCard = createDiv('card');

    stageCard.appendChild(createH1(stage.title))
    stageCard.appendChild(createImageContainerSrc('../images/dolphin.png'))

    stageCard.addEventListener('click', () => {
        getNextContainersExcluding(stagesContainer).forEach(container => {
            container.style.display = 'none'
            container.innerHTML = ''
            container.classList.remove('folded')
        })

        stagesContainer.classList.add('folded')
        stagesContainer.childNodes.forEach(cn => {
            cn.classList.remove('clicked')
        })
        stageCard.classList.add('clicked')

        stage.subjects.forEach(subject => {
            subjectsContainer.appendChild(createSubjectCard(subject))
        })

        subjectsContainer.style.display = 'flex';
        rootContainer.style.display = 'flex'

        refresh(subjectsContainer)
    })

    return stageCard
}

function createSubjectCard(subject) {
    let subjectCard = createDiv('card')

    subjectCard.appendChild(createH1(subject.title))
    subjectCard.appendChild(createImageContainerSrc('../images/dolphin.png'))

    subjectCard.addEventListener('click', () => {

        getNextContainersExcluding(subjectsContainer).forEach(container => {
            container.style.display = 'none'
            container.innerHTML = ''
            container.classList.remove('folded')
        })

        subjectsContainer.classList.add('folded')
        subjectsContainer.childNodes.forEach(cn => {
            cn.classList.remove('clicked')
        })
        subjectCard.classList.add('clicked')

        subject.skills.forEach(skill => {
            skillsContainer.appendChild(createSkillCard(skill))
        })

        skillsContainer.style.display = 'flex';

        refresh(skillsContainer)
    })

    return subjectCard;
}

function createSkillCard(skill) {
    let skillCard = createDiv('card')

    if (skill.status !== 'NOT_TRAINED') {
        skillCard.appendChild(createH1(skill.title))

        skillCard.addEventListener('click', () => {

            getNextContainersExcluding(skillsContainer).forEach(container => {
                container.style.display = 'none'
                container.innerHTML = ''
                container.classList.remove('folded')
            })

            skillsContainer.classList.add('folded')
            skillsContainer.childNodes.forEach(cn => {
                cn.classList.remove('clicked')
            })
            skillCard.classList.add('clicked')

            skillDetailsContainer.appendChild(createSkillDetailsCard(skill))
            skillDetailsContainer.style.display = 'flex';

            refresh(skillDetailsContainer)
        })
    }

    skillCard.appendChild(createImageContainer(skill.status))

    return skillCard
}

function createSkillDetailsCard(skill) {
    let cardDetails = createDiv('card', 'details');

    cardDetails.appendChild(createH1(skill.title))
    cardDetails.appendChild(createStatusInfoContainer(skill.status))
    cardDetails.appendChild(createIFrame(skill.url))

    return cardDetails
}