import {createListing, createTableHeader} from "./lesson-history-dom.js";

export function renderLessonHistory(json) {

    const lessonHistoryView = document.createElement('div')
    lessonHistoryView.classList.add('lesson-history-view')

    const table = document.createElement('div')
    table.classList.add('lesson-history-table')
    lessonHistoryView.appendChild(table)

    //header
    table.appendChild(createTableHeader())

    //listings
    json.forEach(lesson => {
        table.appendChild(createListing(lesson))
    })

    return lessonHistoryView
}