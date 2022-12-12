

export function createOptionsItems(options) {

    let optionsItems = []
    let slideAnimationDelay = 0;

    options.forEach(option => {
        let item = createOptionsItem(option.text, option.action);

        item.style.visibility = 'hidden'
        setTimeout(() => {
            item.style.visibility = 'visible'
            item.classList.add('sliding')
        }, slideAnimationDelay)
        slideAnimationDelay += 50

        optionsItems.push(item)
    })

    return optionsItems
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