var homegraphcheckboxes = $('.homegraphcheckbox');

homegraphcheckboxes.on('change',function(){
    var value = $(this).val();
    var checked = $(this).prop('checked');
    

    var lineClass = 'path.line_' + value;
    var line = $(lineClass);

    if (checked) {
        console.log(line);
        line.addClass('selected');
        line.attr('fill', 'black');
    } else {
        line.removeClass('selected');
    }
});