var nextPrevWrapper = $('#nextPrevWrapper');

if (nextPrevWrapper.length) {

    var listLength = postsList.length;

    var nextIndex = currentPost - 1;
    var prevIndex = currentPost + 1;

    if (nextIndex >= 0) {
        var next = postsList[nextIndex];
    } else {
        var next = false;
    }

    if (prevIndex < listLength) {
        var prev = postsList[prevIndex];
    } else {
        var prev = false;
    }

    var nextOutput = '';
    if (next) {
        nextOutput = '<a href="';
        nextOutput += next['url'];
        nextOutput += '" class="nav-button-next">';
        nextOutput += next['title'];
        nextOutput += '</a>'
    }

    var prevOutput = '';
    if (prev) {
        prevOutput = '<a href="';
        prevOutput += prev['url'];
        prevOutput += '" class="nav-button-prev">';
        prevOutput += prev['title'];
        prevOutput += '</a>'
    }

    var nextBox = $('#nextBox');
    var prevBox = $('#prevBox');

    nextBox.html(nextOutput);
    prevBox.html(prevOutput);

}