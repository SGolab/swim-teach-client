import {
    createDiv, createH1,
    createIFrame,
    createImageContainer,
    createImageContainerSrc, createInstructionsContainer,
    createStatusInfoContainer
} from "./skill-tree-alt-dom.js";

let treeViewAlt;

let cardContainers;

let rootContainer;
let stagesContainer;
let subjectsContainer;
let skillsContainer;
let skillDetailsContainer;

let instructionsContainer;

const timeUnit = 50
const modifier = 1
const hideElementAnimationDuration = 5 * timeUnit * modifier
const flexBoxAnimationDuration = 10 * timeUnit * modifier
const showElementAnimationDuration = 5 * timeUnit * modifier
const showNextContainerDelay = 3 * timeUnit * modifier

export function renderTreeViewAlternative(mainContainer, json) {
    treeViewAlt = createDiv('tree-view-alt')
    mainContainer.appendChild(treeViewAlt)

    instructionsContainer = createInstructionsContainer()
    treeViewAlt.appendChild(instructionsContainer)

    createCardContainers(treeViewAlt)

    rootContainer.appendChild(createRootCard(json))

    //animation preparing start
    let oldStagesAnimationInfo = getFlexItemInfo(stagesContainer);

    //changing state
    json.stages.forEach(stage => {
        stagesContainer.appendChild(createStageCard(stage))
    })
    stagesContainer.childNodes.forEach(stageCard => stageCard.childNodes.forEach(cn => cn.style.opacity = 0))
    stagesContainer.style.display = 'flex'

    // animation start
    let newStagesAnimationInfo = getFlexItemInfo(stagesContainer);
    oldStagesAnimationInfo.x = oldStagesAnimationInfo.x + newStagesAnimationInfo.width //changing the direction of slide from left (all items lie on flex start) to right

    animateFlexBox(oldStagesAnimationInfo, newStagesAnimationInfo)

    setTimeout(() => {
        showAndSlideCardContent(stagesContainer, showElementAnimationDuration)
    }, flexBoxAnimationDuration)
    //animation end
}

function createStageCard(stage) {
    let stageCard = createDiv('card');

    stageCard.appendChild(createH1(stage.title))
    stageCard.appendChild(createImageContainerSrc('../images/dolphin.png'))

    stageCard.addEventListener('click', () => {
        rootContainer.style.display = 'flex'
        onCLick(stagesContainer, subjectsContainer, createSubjectCard, stage.subjects)
    })
    return stageCard
}

function createSubjectCard(subject) {
    let subjectCard = createDiv('card')

    subjectCard.appendChild(createH1(subject.title))
    subjectCard.appendChild(createImageContainerSrc('../images/dolphin.png'))

    subjectCard.addEventListener('click', () => {
            onCLick(subjectsContainer, skillsContainer, createSkillCard, subject.skills)
        }
    )
    return subjectCard;
}

function createSkillCard(skill) {
    let skillCard = createDiv('card')

    if (skill.status !== 'NOT_TRAINED') {
        skillCard.appendChild(createH1(skill.title))

        skillCard.addEventListener('click', () => {
            onCLick(skillsContainer, skillDetailsContainer, createSkillDetailsCard, Array.of(skill))
        })
    }

    skillCard.appendChild(createImageContainer(skill.status))

    return skillCard
}

function onCLick(container, nextContainer, createCardFunction, cardDataList) {

    let nextContainers = getNextContainersExcluding(container);
    nextContainers.forEach(c => {
        c.innerHTML = ''
        c.style.display = 'none'
        c.classList.remove('folded')
    })

    if (!container.classList.contains('folded')) {
        hideCardContent(container, hideElementAnimationDuration)
    }

    setTimeout(() => {
        const oldContainerAnimationInfo = getFlexItemInfo(container)

        container.classList.add('folded')

        //animating nextContainer's cards
        const oldNextContainerAnimationInfo = getFlexItemInfo(nextContainer)

        //changing state
        cardDataList.forEach(cardInfo => {
            nextContainer.appendChild(createCardFunction(cardInfo))
        })

        nextContainer.childNodes.forEach(card => card.childNodes.forEach(cn => cn.style.opacity = 0))
        nextContainer.style.opacity = 0
        nextContainer.style.display = 'flex'

        setTimeout(() => { //delaying appearance of next container
            nextContainer.style.opacity = 1

            let newNextContainerAnimationInfo = getFlexItemInfo(nextContainer);
            oldNextContainerAnimationInfo.x = oldNextContainerAnimationInfo.x + newNextContainerAnimationInfo.width //changing the direction of slide from left (all items lie on flex start) to right

            animateFlexBox(oldNextContainerAnimationInfo, newNextContainerAnimationInfo)

            setTimeout(() => {
                showAndSlideCardContent(nextContainer, showElementAnimationDuration)
            }, flexBoxAnimationDuration)
        }, showNextContainerDelay)
        //end of nextContainer's cards animation


        const newContainerAnimationInfo = getFlexItemInfo(container)
        animateFlexBox(oldContainerAnimationInfo, newContainerAnimationInfo) //animating container

        setTimeout(() => {
            showCardContent(container, showElementAnimationDuration)
        }, flexBoxAnimationDuration)

    }, hideElementAnimationDuration)
}

function createRootCard(json) {
    let rootCard = createDiv('card')
    rootContainer.classList.add('folded')

    rootCard.addEventListener('click', () => {

        rootContainer.style.display = 'none'
        onCLick(rootContainer, stagesContainer, createStageCard, json.stages)
    })

    return rootCard
}

function getFlexItemInfo(container) {
    const rect = container.getBoundingClientRect()

    const info = {
        element: container,
        // x: rect.right,
        x: (rect.right + rect.left) / 2,
        y: rect.top,
        width: rect.right - rect.left,
        height: rect.bottom - rect.top,
    }

    return info
}

function animateFlexBox(oldFlexItemInfo, newFlexItemInfo) {
    const translateX = oldFlexItemInfo.x - newFlexItemInfo.x
    const scaleX = oldFlexItemInfo.width / newFlexItemInfo.width

    newFlexItemInfo.element.childNodes.forEach(el => {
        el.animate(
            [
                {
                    borderRadius: '3px'
                },
                {
                    borderRadius: '10px'
                },
            ],
            {
                duration: flexBoxAnimationDuration,
                easing: 'ease-out',
            }
        )
    })

    newFlexItemInfo.element.animate(
        [
            {
                transform: `translate(${translateX}px) scaleX(${scaleX})`,
            },
            {
                transform: 'none',
            },
        ],
        {
            duration: flexBoxAnimationDuration,
            easing: 'ease-out',
        }
    )
}

function hideCardContent(container, duration) {
    let cardContentItems = container.querySelectorAll('.card > *');
    cardContentItems.forEach(cardContentItem => {
        cardContentItem.animate(
            [
                {
                    opacity: 1,
                    transform: 'translateX(0)'
                },
                {
                    opacity: 0,
                    transform: 'translateX(-200px)'
                }
            ],
            {
                duration: duration,
                easing: 'ease-out'
            }
        )
        setTimeout(() => cardContentItem.style.opacity = 0, duration)
    })
}

function showCardContent(container, duration) {
    let cardContentItems = container.querySelectorAll('.card > *');
    cardContentItems.forEach(image => {
        image.animate(
            [
                {
                    opacity: 0
                },
                {
                    opacity: 1
                }
            ],
            {
                duration: duration,
                easing: 'ease-in'
            }
        )
        setTimeout(() => image.style.opacity = 1, duration)
    })
}

function showAndSlideCardContent(container, duration) {
    let cardContentItems = container.querySelectorAll('.card > *');
    cardContentItems.forEach(image => {
        image.animate(
            [
                {
                    opacity: 0,
                    transform: 'translateX(200px)'
                },
                {
                    opacity: 1,
                    transform: 'translateX(0px)'
                }
            ],
            {
                duration: duration,
                easing: 'ease-out'
            }
        )
        setTimeout(() => image.style.opacity = 1, duration)
    })
}

function createSkillDetailsCard(skill) {
    let cardDetails = createDiv('card', 'details');

    cardDetails.appendChild(createH1(skill.title))
    cardDetails.appendChild(createStatusInfoContainer(skill.status))
    cardDetails.appendChild(createIFrame(skill.url))

    return cardDetails
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

function getNextContainersIncluding(container) {
    return cardContainers.slice(cardContainers.indexOf(container), cardContainers.length)
}

function getNextContainersExcluding(container) {
    return cardContainers.slice(cardContainers.indexOf(container) + 1, cardContainers.length)
}