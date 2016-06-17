var homegraphcheckboxes = $('.homegraphcheckbox');

homegraphcheckboxes.on('change',function(){
    var value = $(this).val();
    var checked = $(this).prop('checked');
    

    var lineClass = 'path.line_' + value;
    var circleClass = 'circle.y_' + value;
    var areaClass = 'path.area_' + value;
    var line = d3.selectAll(lineClass);
    var circle = d3.selectAll(circleClass);
    var area = d3.selectAll(areaClass);

    if (checked) {
        line.classed('selected',true);
        circle.classed('selected',true);
        area.classed('selected',true);
    } else {
        line.classed('selected',false);
        circle.classed('selected',false);
        area.classed('selected',false);
    }
});