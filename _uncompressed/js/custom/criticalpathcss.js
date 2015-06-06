var cpHtml = document.getElementById('criticalPath');
var className = 'cp-css';

if (cpHtml.classList) {
    cpHtml.classList.remove(className);
} else {
    cpHtml.className = cpHtml.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}