import {zoomInOut, clearZoom} from "./zoom.js";
import {clearTranslation} from "./drag.js";

const centerButton = document.querySelector('#center-button');
const zoomInButton = document.querySelector('#zoom-in-button');
const zoomOutButton = document.querySelector('#zoom-out-button');

centerButton.addEventListener('click', () => {
    clearTranslation()
    clearZoom()
})

zoomInButton.addEventListener('click', () => {
    zoomInOut(1);
})

zoomOutButton.addEventListener('click', () => {
    zoomInOut(-1);
})

