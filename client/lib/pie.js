Pie = {
  // Group an array of objects by a property value
  // return an array of items that can be passed to Pie.render
  // i.e. an array of objects with a {name, count}
  group: function (items, byProperty) {
    var data = items.reduce(function (d, item) {
      var className = getClassName(item[byProperty]);
      d[className] = d[className] || 0;
      d[className]++;
      return d;
    }, {});

    return Object.keys(data).map(function (key) {
      return {name: key, count: data[key]};
    });
  },

  // Render a pie chart to a DOM node with the data
  render: function (to, data) {
    if(!data.length) return;

    to = $(to);

    if (!to.attr('id')) to.attr('id', 'pie' + Date.now());

    var pieDim = Math.min(to[0].clientWidth, 500);
    var radius = pieDim / 2;

    var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    var pie = d3.layout.pie()
      .sort(null)
      .value(function (d) { return d.count; });

    var svg = d3.select('#'+ to.attr('id') + ' svg > g');

    if (svg.empty()) {
      svg = d3.select('#' + to.attr('id')).append("svg")
        .attr('width', pieDim)
        .attr('height', pieDim)
        .append('g')
        .attr('transform', 'translate(' + radius + ',' + radius + ')');
    }

    var slice = svg.selectAll(".arc")
      .data(pie(data), function (d) { return d.data.name; });

    var sliceEnter = slice.enter()
      .append('g')
      .attr('class', 'arc')
      .on('mouseover', function(d) {
        d3.select(this).select("text").style({opacity:'1.0'});
      })
      .on('mouseout', function(d) {
        d3.select(this).select("text").style({opacity:'0'});
      });

    sliceEnter.append('path')
      .attr('class', function (d) { return 'slice ' + getClassName(d.data.name); })
      .style('stroke', '#fff')
      .style('stroke-width', 0.005 * pieDim)
      .style('stroke-linejoin', 'bevel');

    /*sliceEnter.append('text')
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .style("text-anchor", "middle")
      .style("fill", "red")
      .style("opacity", "0")
      .style("z-index", "100000")
      .text(function(d) { return d.data.name; });*/

    var sliceUpdate = slice.transition();

    sliceUpdate.select('path')
      .attr('d', arc);

    /*sliceUpdate.select('text')
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; });*/

    slice.exit().remove();
  }
};

function getClassName (str) {
  return str.replace(/[^a-z0-9]/ig, '').toLowerCase();
}
