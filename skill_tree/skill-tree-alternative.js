export function renderTreeViewAlternative(mainContainer, json) {
    const treeViewAlternative = createDiv('tree-view-alt')

    const dotsImg = createDiv('dots-img')

    const img = document.createElement('img')
    img.src = '..//images/dots.png'
    dotsImg.appendChild(img)

    treeViewAlternative.appendChild(dotsImg)

    const stagesContainer = createDiv('card-container')
    treeViewAlternative.appendChild(stagesContainer)

    const subjectsContainer = createDiv('card-container')
    treeViewAlternative.appendChild(subjectsContainer)

    const skillsContainer = createDiv('card-container')
    treeViewAlternative.appendChild(skillsContainer)

    json.stages.push(json.stages[0]) //testing
    json.stages.push(json.stages[0]) //testing
    json.stages.push(json.stages[0]) //testing

    for (let stageIndex = 0; stageIndex < json.stages.length; stageIndex++){
        const stage = json.stages[stageIndex];

        let stageCard = createDiv('card');
        let h1 = document.createElement('h1')
        h1.innerText = stage.title
        stageCard.appendChild(h1)
        stagesContainer.appendChild(stageCard)

        stageCard.addEventListener('click', () => {

            stagesContainer.childNodes.forEach(cn => {
                cn.style.background =  'rgba(0, 0, 0, 0.2)';
                cn.style.boxShadow = 'none';
            })

            stageCard.style.background = 'rgba(0, 0, 0, 0.25)';
            stageCard.style.boxShadow = 'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset';

            subjectsContainer.innerHTML = ''
            skillsContainer.innerText = ''

            for (let subjectIndex = 0; subjectIndex < stage.subjects.length; subjectIndex++) {
                const subject = stage.subjects[subjectIndex];
                let subjectCard = createDiv('card')


                let h1 = document.createElement('h1')
                h1.innerText = subject.title
                subjectCard.appendChild(h1)

                const iconContainer = createDiv('icon-container')
                const icon = document.createElement('img')
                icon.src = '..//images/dolphin.png'
                iconContainer.appendChild(icon)
                subjectCard.appendChild(iconContainer)

                subjectsContainer.appendChild(subjectCard)

                subjectCard.addEventListener('click', () => {

                    subjectsContainer.childNodes.forEach(cn => {
                        cn.style.background =  'rgba(0, 0, 0, 0.2)';
                        cn.style.boxShadow = 'none';
                    })

                    subjectCard.style.background = 'rgba(0, 0, 0, 0.25)';
                    subjectCard.style.boxShadow = 'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset';


                    skillsContainer.innerHTML = ''

                    subject.skills.forEach(skill => {
                        let skillCard = createDiv('card')

                        skillCard.title = skill.title
                        skillCard.status = skill.status
                        skillCard.descriptioin = skill.description
                        skillCard.url = skill.url

                        skillCard.addEventListener('click', () => {
                            //todo render skillDetails
                        })

                        let h1 = document.createElement('h1')
                        h1.innerText = skill.title
                        skillCard.appendChild(h1)
                        skillsContainer.appendChild(skillCard)
                    })

                    skillsContainer.classList.remove('active')
                    skillsContainer.offsetWidth //https://stackoverflow.com/questions/44846614/trigger-css-animations-in-javascript
                    skillsContainer.classList.add('active')
                })
            }

            subjectsContainer.classList.remove('active')
            subjectsContainer.offsetWidth //https://stackoverflow.com/questions/44846614/trigger-css-animations-in-javascript
            subjectsContainer.classList.add('active')

            // document.addEventListener('click', closeStageCard)
        })

        // function closeStageCard(e) {
        //     if (e.target !== stageCard && !subjectsContainer.contains(e.target)) {
        //         subjectsContainer.innerHTML = ''
        //     }
        // }


    }

    mainContainer.appendChild(treeViewAlternative)
}

function createDiv(...classes) {
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