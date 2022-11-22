import {getSavedBaseTranslationX, getSavedBaseTranslationY} from './drag.js'

const zoomElement = document.querySelector('#drag-zoom-item');
let zoom = 1;
const ZOOM_SPEED = 0.1;

const zoomEventListener = function(e) {
    zoomInOut(e.deltaY)
}

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

    zoomElement.style.transform = transformation;
}

export function enableZoom() {
    document.addEventListener("wheel", zoomEventListener)
}

export function disableZoom() {
    document.removeEventListener("wheel", zoomEventListener)
}

export function getZoom() {
    return zoom;
}

export function clearZoom() {
    zoom = 1;
}

document.addEventListener("wheel", zoomEventListener)



