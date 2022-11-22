import {getZoom} from "./zoom.js";

let startDragPosition = {x: 0, y: 0};

let savedTranslationX = 0;
let savedTranslationY = 0;

let baseTranslationX = 0;
let baseTranslationY = 0;

let viewElement = document.querySelector('.screen')
let draggedElement = document.querySelector('#drag-zoom-item');

const mouseDownHandler = function (e) {
    viewElement.style.cursor = 'grabbing';
    viewElement.style.userSelect = 'none';

    startDragPosition = {
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
    };

    viewElement.addEventListener('mousemove', mouseMoveHandler);
    viewElement.addEventListener('mouseup', mouseUpHandler);
};

const mouseMoveHandler = function (e) {
    const dx = (e.clientX - startDragPosition.x);
    const dy = (e.clientY - startDragPosition.y);

    baseTranslationX = (savedTranslationX + dx);
    baseTranslationY = (savedTranslationY + dy)

    let effectiveTranslationX = baseTranslationX * (1 / getZoom())
    let effectiveTranslationY = baseTranslationY * (1 / getZoom());

    //apply transformation style
    let transformation = `scale(${getZoom()}) translateX(${effectiveTranslationX}px) translateY(${effectiveTranslationY}px)`;

    draggedElement.style.transform = transformation;
};

const mouseUpHandler = function () {
    viewElement.removeEventListener('mousemove', mouseMoveHandler);
    viewElement.removeEventListener('mouseup', mouseUpHandler);

    viewElement.style.cursor = 'grab';
    viewElement.style.removeProperty('user-select');

    savedTranslationX = baseTranslationX;
    savedTranslationY = baseTranslationY;
};

export function clearTranslation() {
    baseTranslationX = 0
    baseTranslationY = 0
    savedTranslationX = 0;
    savedTranslationY = 0;
}

export function getSavedBaseTranslationX() {
    return savedTranslationX;
}

export function getSavedBaseTranslationY() {
    return savedTranslationY;
}

export function enableDragging() {
    console.log('enabled dragging')
    viewElement.style.cursor = 'grab';
    viewElement.addEventListener('mousedown', mouseDownHandler)
}

export function disableDragging() {
    console.log('disabled dragging')
    viewElement.style.cursor = 'default';
    viewElement.removeEventListener('mousedown', mouseDownHandler)
}

viewElement.addEventListener('mousedown', mouseDownHandler);