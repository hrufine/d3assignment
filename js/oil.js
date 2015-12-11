var margin = {
	top: 50,
	right: 20,
	bottom: 30,
	left: 40
},
width = 1450 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
	.rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
	.range([height, 0]);

var xAxis = d3.svg.axis()
	.scale(x)

	.orient("bottom");

var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left")
	.ticks(10);

var svg = d3.select("body").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");



d3.json("../json/oilseed_result.json", function(error, data) {
	if (error) throw error;
	data.sort(function(a, b) {
		return (parseFloat(b.Quantity) - parseFloat(a.Quantity));
	});
	x.domain(data.map(function(d) {
		return d.Particulars;
	}));
	y.domain([0, 20]);

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 8)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Production in Ton");



	svg.selectAll(".bar")
		.data(data)
		.enter().append("rect")
		.attr("class", "bar")
		.attr("x", function(d) {
		return x(d.Particulars);
	})
		.attr("width", x.rangeBand())
		.attr("y", function(d) {
		return y(d.Quantity);
	})
		.attr("height", function(d) {
		return height - y(d.Quantity);
	});


});

function type(d) {
	//d.Year = +d.Year;
	return d;
}
