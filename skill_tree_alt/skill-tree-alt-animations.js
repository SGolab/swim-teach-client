const timeUnit = 50
const modifier = 1
const slideOutContainerContentDuration = 5 * timeUnit * modifier
const slideInAnimationDuration = 10 * timeUnit * modifier
const slideOutAnimationDuration = 10 * timeUnit * modifier
const slideInAndSlideOutDelay = 2 * timeUnit * modifier
const showElementAnimationDuration = 5 * timeUnit * modifier

export function delay() {
    return new Promise((resolve) => setTimeout(resolve, slideInAndSlideOutDelay))
}

export function squeezeContainerAnimation(container) {
    const promises = []

    promises.push(container.animate(
        [
            {
                maxWidth: '100vw'
            },
            {
                maxWidth: '40px'
            },
        ],
        {
            duration: slideInAnimationDuration,
            easing: 'ease-out',
        }
    ).finished)

    container.isFolded = true

    return Promise.all(promises)
}

export function slideInContainerAnimation(container) {
    return container.animate(
        [
            {
                transform: 'translateX(100vw)'
            },
            {
                transform: 'none'
            }
        ],
        {
            duration: slideInAnimationDuration,
            easing: 'ease-out'
        }
    ).finished
}

export function slideOutContainerAnimation(container) {
    return container.animate(
        [
            {
                transform: 'translateX(0)'
            },
            {
                transform: 'translateX(100vw)'
            }
        ],
        {
            duration: slideOutAnimationDuration,
            easing: 'ease-out'
        }
    ).finished
}

export function slideOutAndHideContainerContentAnimation(container, direction) {
    let cardContentItems = container.querySelectorAll('.card > *');

    let promises = [];

    cardContentItems.forEach(cardContentItem => {
        promises.push(cardContentItem.animate(
            [
                {
                    opacity: 1,
                    transform: 'translateX(0)'
                },
                {
                    opacity: 0,
                    transform: `translateX(${200 * direction}px)`
                }
            ],
            {
                duration: slideOutContainerContentDuration,
                easing: 'ease-out',
            }
        ).finished)
    })

    return Promise.all(promises)
}

export function showCardContentAnimation(container) {
    let cardContentChildrenAll = container.querySelectorAll('.card *');

    let promises = []

    cardContentChildrenAll.forEach(image => {
        promises.push(image.animate(
            [
                {
                    opacity: 0,
                },
                {
                    opacity: 1,
                }
            ],
            {
                duration: showElementAnimationDuration,
                easing: 'ease-out',
            }
        ).finished)
    })

    return Promise.all(promises)
}

export function slideInAndShowContainerContentAnimation(container) {
    let cardContentChildrenDirect = container.querySelectorAll('.card > *');
    let cardContentChildrenAll = container.querySelectorAll('.card *');

    let promises = []

    cardContentChildrenDirect.forEach(image => {
        promises.push(image.animate(
            [
                {
                    transform: 'translateX(200px)'
                },
                {
                    transform: 'translateX(0px)'
                }
            ],
            {
                duration: showElementAnimationDuration,
                easing: 'ease-out',
            }
        ).finished)
    })

    cardContentChildrenAll.forEach(image => {
        promises.push(image.animate(
            [
                {
                    opacity: 0,
                },
                {
                    opacity: 1,
                }
            ],
            {
                duration: showElementAnimationDuration,
                easing: 'ease-out',
            }
        ).finished)
    })

    return Promise.all(promises)
}