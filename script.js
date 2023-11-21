setTimeout(function() {
    const content = document.querySelector('p#main-text');
    content.style.opacity = 1;
    content.style.transform = 'translateY(0)';
}, 500);

setTimeout(function() {
    const content = document.querySelector('p#secondary-text');
    content.style.opacity = 1;
    content.style.transform = 'translateY(0)';
}, 1500);

setTimeout(function() {
    const content = document.querySelector('p#last-text');
    content.style.opacity = 1;
    content.style.transform = 'translateY(0)';
}, 2500);

setTimeout(function() {
    const pages = document.getElementById('pages');
    pages.style.zIndex = 0;
}, 3500);

setTimeout(function() {
    const content = document.getElementById('ttt-logo');
    content.style.opacity = 1;
    content.style.transform = 'translateY(0)';
    content.style.pointerEvents = "auto";
}, 3500);

setTimeout(function() {
    const content = document.getElementById('minesweeper-board');
    content.style.opacity = 1;
    content.style.transform = 'translateY(0)';
    content.style.pointerEvents = "auto";
}, 3700);

setTimeout(function() {
    const content = document.getElementById('superttt-logo');
    content.style.opacity = 1;
    content.style.transform = 'translateY(0)';
    content.style.pointerEvents = "auto";
}, 3900);