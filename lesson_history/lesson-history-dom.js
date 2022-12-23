import {changeViewToTreeViewAltOpenSkillDetails} from "../main/main.js";

export function createTableHeader() {
    const headerRow = document.createElement('div')
    headerRow.classList.add('lesson-history-table-header')

    const dateTimeItem = document.createElement('div')
    dateTimeItem.classList.add('lesson-history-table-datetime-header')
    dateTimeItem.innerText = "DATE TIME"
    headerRow.appendChild(dateTimeItem)

    const locationItem = document.createElement('div')
    locationItem.classList.add('lesson-history-table-location-header')
    locationItem.innerText = "LOCATION"
    headerRow.appendChild(locationItem)

    const skillMarks = document.createElement('div')
    skillMarks.classList.add('lesson-history-table-skillmarks-header')
    skillMarks.innerText = 'SKILL MARKS'
    headerRow.appendChild(skillMarks)

    return headerRow
}

export function createListing(lesson) {
    const tableRow = document.createElement('div')
    tableRow.classList.add('lesson-history-table-row')

    //dateTime
    const dateTimeItem = document.createElement('div')
    dateTimeItem.classList.add('lesson-history-table-datetime-item')
    dateTimeItem.innerText = lesson.dateTime
    tableRow.appendChild(dateTimeItem)

    //location
    const locationItem = document.createElement('div')
    locationItem.classList.add('lesson-history-table-location-item')
    locationItem.innerText = lesson.location
    tableRow.appendChild(locationItem)

    //skill marks
    const statusImageMap = {
        'ACQUIRED': '../images/correct-icon.webp',
        'TRAINED': '../images/in-progress-icon.png',
        'NOT_TRAINED': '../images/blocked-icon.png'
    }

    const skillMarksItem = document.createElement('div')
    skillMarksItem.classList.add('lesson-history-table-skillmarks-item')
    lesson.skillMarks.forEach(sm => {
        const skillMarkListing = document.createElement('div')
        skillMarkListing.classList.add('lesson-history-table-skillmarks-item-listing')

        const imageContainer = document.createElement('div')
        imageContainer.classList.add('lesson-history-table-skillmarks-item-image-container')

        const img = document.createElement('img')
        img.style.content = `url(${statusImageMap[sm.skillStatus]})`
        imageContainer.appendChild(img)

        skillMarkListing.appendChild(imageContainer)

        const titleContainer = document.createElement('div')
        titleContainer.classList.add('lesson-history-table-skillmarks-item-title-container')

        const title = document.createElement('span')
        title.innerText = sm.skillDetailsTitle
        titleContainer.appendChild(title)

        skillMarkListing.addEventListener('click', (e) => {
            if (tableRow.classList.contains('unfolded')) {
                changeViewToTreeViewAltOpenSkillDetails(sm.skillDetailsId)
                e.stopImmediatePropagation()
            }
        })

        skillMarkListing.appendChild(titleContainer)

        skillMarksItem.appendChild(skillMarkListing)
    })
    tableRow.appendChild(skillMarksItem)

    tableRow.addEventListener('click', () => {
        if (tableRow.classList.contains('unfolded')) {
            tableRow.classList.remove('unfolded')
        } else {
            tableRow.classList.add('unfolded')
        }
    })

    return tableRow
}