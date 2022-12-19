export function createOptionsItems(options) {
    return options.map(option => createOptionsItem(option.text, option.action))
}

function createOptionsItem(text, action) {
    let optionsItem = document.createElement('div');
    optionsItem.classList.add('options-item')

    let p = document.createElement('p')
    p.classList.add('options-item-text')
    p.innerText = text

    optionsItem.appendChild(p)

    optionsItem.addEventListener('click', action)

    return optionsItem
}