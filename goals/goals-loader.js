function createGoalCard(goal) {
    let goalCard = document.createElement('div');
    goalCard.classList.add('goal-card')

    let titleLabel = document.createElement('div');
    titleLabel.classList.add('title-label')
    titleLabel.innerText = goal.title
    goalCard.appendChild(titleLabel)

    let descriptionContainer = document.createElement('div')
    descriptionContainer.classList.add('description-container')
    descriptionContainer.innerText = goal.description
    goalCard.appendChild(descriptionContainer)

    goalCard.addEventListener('mouseover', () => {
        goalCard.classList.add('goal-card-active')

        goalCard.addEventListener('mouseout', () => {
            goalCard.classList.remove('goal-card-active')
        })
    })

    return goalCard;
}

export function renderGoalView(mainContainer, goalsData) {

    console.log(goalsData)

    const goals = goalsData.goals

    let goalsView = document.createElement('div');
    goalsView.classList.add('goals-view')

    goals.forEach(goal => {
        goalsView.appendChild(createGoalCard(goal))
    })

    mainContainer.appendChild(goalsView)
}