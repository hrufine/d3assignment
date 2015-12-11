var margin = {
	top: 20,
	right: 20,
	bottom: 30,
	left: 40
},
width = 1300 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
	.rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
	.rangeRound([height, 0]);

var color = d3.scale.ordinal()
	.range(["gray", "brown", "red", "violet"]);

var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom");

var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left")
	.tickFormat(d3.format(".2s"));

var svg = d3.select("body").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("../json/rice_result.json", function(error, data) {
	if (error) throw error;

	color.domain(d3.keys(data[0]).filter(function(key) {
		return key !== "Year";
	}));

	data.forEach(function(d) {
		var y0 = 0;
		d.state = color.domain().map(function(name) {
			return {
				name: name,
				y0: y0,
				y1: y0 += +d[name]
			};
		});
		d.total = d.state[d.state.length - 1].y1;
	});



	x.domain(data.map(function(d) {
		return d.Year;
	}));
	y.domain([0, 30000]);

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Rice Production");

	var Year = svg.selectAll(".Year")
		.data(data)
		.enter().append("g")
		.attr("class", "g")
		.attr("transform", function(d) {
		return "translate(" + x(d.Year) + ",0)";
	});

	Year.selectAll("rect")
		.data(function(d) {
		return d.state;
	})
		.enter().append("rect")
		.attr("width", x.rangeBand())
		.attr("y", function(d) {
		return y(d.y1);
	})
		.attr("height", function(d) {
		return y(d.y0) - y(d.y1);
	})
		.style("fill", function(d) {
		return color(d.name);
	});

	var legend = svg.selectAll(".legend")
		.data(color.domain().slice().reverse())
		.enter().append("g")
		.attr("class", "legend")
		.attr("transform", function(d, i) {
		return "translate(20," + i * 20 + ")";
	});

	legend.append("rect")
		.attr("x", width - 18)
		.attr("width", 18)
		.attr("height", 18)
		.style("fill", color);

	legend.append("text")
		.attr("x", width - 24)
		.attr("y", 9)
		.attr("dy", ".35em")
		.style("text-anchor", "end")
		.text(function(d) {
		return d;
	});

});
