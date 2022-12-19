import {getSavedBaseTranslationX, getSavedBaseTranslationY} from './drag.js'

let zoomElement;
let zoom = 1;
let ZOOM_SPEED = 0.1;

export function zoomInOut(deltaY) {

    if (deltaY > 0) {
        if (zoom + ZOOM_SPEED < 4) {
            zoom += ZOOM_SPEED
        }
    } else {
        if (zoom - ZOOM_SPEED > 0.2) {
            zoom -= ZOOM_SPEED
        }
    }

    let effectiveTranslationX = getSavedBaseTranslationX() * (1 / zoom);
    let effectiveTranslationY = getSavedBaseTranslationY() * (1 / zoom);

    let transformation = `scale(${zoom}) translateX(${effectiveTranslationX}px) translateY(${effectiveTranslationY}px)`;

    let zoomElement = document.querySelector('#drag-zoom-item')
    zoomElement.style.transform = transformation;
}
export function setZoom(treeView) {
    zoomElement = treeView.querySelector('#drag-zoom-item')
    console.log('set zoomElement to: ' + zoomElement)
}

export function enableZoom() {
    if (zoomElement === undefined) {
        zoomElement = document.querySelector('#drag-zoom-item')
    }

    if (zoom === undefined) {
        zoom = 1
    }

    if (ZOOM_SPEED === undefined) {
        ZOOM_SPEED = 0.1
    }

    document.addEventListener("wheel", zoomEventListener)
    console.log('enabled zooming')
}

export function disableZoom() {
    document.removeEventListener("wheel", zoomEventListener)
    console.log('disabled zooming')
}

export function getZoom() {
    return zoom;
}

export function clearZoom() {
    zoom = 1;

    // zoomElement = document.querySelector('#drag-zoom-item')
    zoomElement.style.transform = '';
}

const zoomEventListener = function(e) {
    zoomInOut(e.deltaY)
}


