var homeGraphCheck = $('.homeGraph');

if (homeGraphCheck.length) {

    // Set the dimensions of the canvas / graph
    var margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 270 - margin.top - margin.bottom;

    var wrapper = d3.select('.homeGraph');

    var wrapperWidth = parseInt(wrapper.style('width')),
            wrapperHeight = parseInt(wrapper.style('height')),
            height = wrapperHeight - margin.top - margin.bottom,
            width = wrapperWidth - margin.left - margin.right;

    // Parse the date / time
    var parseDate = d3.time.format("%d-%b-%y").parse;
        bisectDate = d3.bisector(function(d) { return d.date; }).left;

    // Set the ranges
    var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);
    // var y_mus = d3.scale.linear().range([height, 0]);
    // var y_pilot = d3.scale.linear().range([height, 0]);
    // var y_art = d3.scale.linear().range([height, 0]);

    // Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(5);
    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(5);

    // Define the line
    var valueline = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.happiness); })
        .interpolate('monotone');// monotone | basis | linear | cardinal | bundle

    // Define the line
    var valueline_mus = d3.svg.line()
        .defined(function(d) { return !isNaN(d.musician); })
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.musician); })
        .interpolate('monotone');// monotone | basis | linear | cardinal | bundle

    // Define the line
    var valueline_pilot = d3.svg.line()
        .defined(function(d) { return !isNaN(d.pilot); })
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.pilot); })
        .interpolate('monotone');// monotone | basis | linear | cardinal | bundle

    // Define the line
    var valueline_art = d3.svg.line()
        .defined(function(d) { return !isNaN(d.artist); })
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.artist); })
        .interpolate('monotone');

    // Define the line
    var valueline_des = d3.svg.line()
        .defined(function(d) { return !isNaN(d.designer); })
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.designer); })
        .interpolate('monotone');

    // Define the line
    var valueline_dev = d3.svg.line()
        .defined(function(d) { return !isNaN(d.developer); })
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.developer); })
        .interpolate('monotone');
        
    // Adds the svg canvas
    var svg = d3.select(".homeGraph")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", 
                  "translate(" + margin.left + "," + margin.top + ")");
    var lineSvg = svg.append("g");
    var focus = svg.append("g") 
        .style("display", "none");

    // Get the data
    d3.csv("/data/homegraph.csv", function(error, data) {
        data.forEach(function(d) {
            d.date = parseDate(d.date);
            d.happiness = +d.happiness;
            d.musician = +d.musician;
            d.pilot = +d.pilot;
            d.artist = +d.artist;
            d.designer = +d.designer;
            d.developer = +d.developer;
        });
        
        // Scale the range of the data
        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain([0, 150]);//d3.max(data, function(d) { return d.happiness; })]);
        // y_mus.domain([0, d3.max(data, function(d) { return d.musician; })]);
        // y_pilot.domain([0, d3.max(data, function(d) { return d.pilot; })]);
        // y_art.domain([0, d3.max(data, function(d) { return d.artist; })]);
        
        // Add the valueline path.
        // lineSvg.append("path")
        //     .attr("class", "line")
        //     .attr("d", valueline(data));

        // Add the valueline path.
        lineSvg.append("path")
            .attr("class", "line line_mus")
            .attr("d", valueline_mus(data));

        // Add the valueline path.
        lineSvg.append("path")
            .attr("class", "line line_pilot")
            .attr("d", valueline_pilot(data));

        // Add the valueline path.
        lineSvg.append("path")
            .attr("class", "line line_art")
            .attr("d", valueline_art(data));

        // Add the valueline path.
        lineSvg.append("path")
            .attr("class", "line line_des")
            .attr("d", valueline_des(data));

        // Add the valueline path.
        lineSvg.append("path")
            .attr("class", "line line_dev")
            .attr("d", valueline_dev(data));

        /**
         * AREAS
         */
        
        // areas = lineSvg.append('path');
        // areas_mus = lineSvg.append('path');
        // areas_pilot = lineSvg.append('path');
        // areas_art = lineSvg.append('path');

        // areaShape = d3.svg.area()
        //     // .defined(function(d) { return !isNaN(d[]); })
        //     .x(function(d){ return x(d.date); })
        //     .y0(function(d){ return y(0); })
        //     .y1(function(d){ return y(d.happiness); })
        //     .interpolate('monotone');// monotone | basis | linear | cardinal | bundle

        // areaShape_mus = d3.svg.area()
        //     // .defined(function(d) { return !isNaN(d[]); })
        //     .x(function(d){ return x(d.date); })
        //     .y0(function(d){ return y_mus(0); })
        //     .y1(function(d){ return y_mus(d.musician); })
        //     .interpolate('monotone');// monotone | basis | linear | cardinal | bundle

        // areaShape_pilot = d3.svg.area()
        //     // .defined(function(d) { return !isNaN(d[]); })
        //     .x(function(d){ return x(d.date); })
        //     .y0(function(d){ return y_pilot(0); })
        //     .y1(function(d){ return y_pilot(d.pilot); })
        //     .interpolate('monotone');// monotone | basis | linear | cardinal | bundle

        // areaShape_art = d3.svg.area()
        //     // .defined(function(d) { return !isNaN(d[]); })
        //     .x(function(d){ return x(d.date); })
        //     .y0(function(d){ return y_art(0); })
        //     .y1(function(d){ return y_art(d.artist); })
        //     .interpolate('monotone');// monotone | basis | linear | cardinal | bundle

        // areas
        //     .attr('d',areaShape(data))
        //     .attr('fill','none')
        //     .classed('chartarea', true);

        // areas_mus
        //     .attr('d',areaShape_mus(data))
        //     .attr('fill','none')
        //     .classed('chartarea', true);

        // areas_pilot
        //     .attr('d',areaShape_pilot(data))
        //     .attr('fill','none')
        //     .classed('chartarea', true);

        // areas_art
        //     .attr('d',areaShape_art(data))
        //     .attr('fill','none')
        //     .classed('chartarea', true);
        
        // Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
        
        // Add the Y Axis
        // svg.append("g")
        //     .attr("class", "y axis")
        //     .call(yAxis);
        
        // append the circle at the intersection 
        // focus.append("circle")
        //     .classed("y",true)
        //     .classed("hover",true)
        //     // .style("fill", "white")
        //     // .style("stroke", "steelblue")
        //     // .style("stroke-width", "2px")
        //     .attr("r", 4);

        // append the circle at the intersection 
        focus.append("circle")
            .classed("y_mus",true)
            .classed("hover",true)
            .attr("r", 4);

        // append the circle at the intersection 
        focus.append("circle")
            .classed("y_pilot",true)
            .classed("hover",true)
            .attr("r", 4);

        // append the circle at the intersection 
        focus.append("circle")
            .classed("y_art",true)
            .classed("hover",true)
            .attr("r", 4);

        // append the circle at the intersection 
        focus.append("circle")
            .classed("y_des",true)
            .classed("hover",true)
            .attr("r", 4);

        // append the circle at the intersection 
        focus.append("circle")
            .classed("y_dev",true)
            .classed("hover",true)
            .attr("r", 4);
        
        // append the rectangle to capture mouse
        svg.append("rect")
            .attr("width", width)
            .attr("height", height)
            .style("fill", "none")
            .style("pointer-events", "all")
            .on("mouseover", function() { focus.style("display", null); })
            .on("mouseout", function() { focus.style("display", "none"); })
            .on("mousemove", mousemove);
        function mousemove() {
            var x0 = x.invert(d3.mouse(this)[0]),
                i = bisectDate(data, x0, 1),
                d0 = data[i - 1],
                d1 = data[i],
                d = x0 - d0.date > d1.date - x0 ? d1 : d0;
            // focus.select("circle.y")
            //     .attr("transform",
            //           "translate(" + x(d.date) + "," +
            //                          y(d.happiness) + ")");
            if (!isNaN(d.musician)) {
                focus.select("circle.y_mus")
                    .classed('active',true)
                    // .defined(function(d) { return !isNaN(d.musician); })
                    .attr("transform",
                          "translate(" + x(d.date) + "," +
                                         y(d.musician) + ")");
            } else {
                focus.select("circle.y_mus")
                    .classed('active',false);
            }
            
            if (!isNaN(d.pilot)) {
                focus.select("circle.y_pilot")
                    .classed('active',true)
                    // .defined(function(d) { return !isNaN(d.pilot); })
                    .attr("transform",
                          "translate(" + x(d.date) + "," +
                                         y(d.pilot) + ")");
            } else {
                focus.select("circle.y_pilot")
                    .classed('active',false);
            }

            if (!isNaN(d.artist)) {
                focus.select("circle.y_art")
                    .classed('active',true)
                    .attr("transform",
                          "translate(" + x(d.date) + "," +
                                         y(d.artist) + ")");
            } else {
                focus.select("circle.y_art")
                    .classed('active',false);
            }

            if (!isNaN(d.designer)) {
                focus.select("circle.y_des")
                    .classed('active',true)
                    .attr("transform",
                          "translate(" + x(d.date) + "," +
                                         y(d.designer) + ")");
            } else {
                focus.select("circle.y_des")
                    .classed('active',false);
            }

            if (!isNaN(d.developer)) {
                focus.select("circle.y_dev")
                    .classed('active',true)
                    .attr("transform",
                          "translate(" + x(d.date) + "," +
                                         y(d.developer) + ")");
            } else {
                focus.select("circle.y_dev")
                    .classed('active',false);
            }
        }
    });

}