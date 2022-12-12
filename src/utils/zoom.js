export function setZoomInstraction(data) {
    return localStorage.setItem('zoomInstraction', data)
}

export function getZoomInstraction() {
    return localStorage.getItem('zoomInstraction')
}