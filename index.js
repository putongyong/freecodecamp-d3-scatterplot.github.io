//create the title
    d3.select("main")
    .append("div")
    .attr("id", "title")
    .text("Doping in Professional Bicycle Racing");


//create the tooltip
    d3.select("body")
    .append("div")
    .attr("id", "tooltip")


    async function getData() {
        const response = await fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json');
        const dataset = await response.json();
        return dataset;
    }
    getData().then(dataset => {
        dataset; // fetched movies
        createSVG(dataset);
      });  
    



function createSVG(dataset){

    var width = 800;
    var height = 500;
    var svg = d3.select("main")
    
    .append("svg")
    .attr("width", width+100)
    .attr("height", height+100)

    const maxYear= d3.max(dataset, d => d.Year);
    const minYear= d3.min(dataset, d => d.Year);
    console.log(maxYear);
    console.log(minYear);
    const maxTime= new Date (d3.max(dataset, d => d.Seconds)*1000);
    console.log(maxTime);
    const minTime= new Date (d3.min(dataset, d => d.Seconds)*1000);
    console.log(minTime);


    const xScale = d3.scaleLinear()
    .domain([minYear-1,maxYear+1])
    .range([50,width-10])

    const yScale = d3.scaleTime()
    .domain([maxTime,minTime])
    .range([height-20,20])

    var xAxisTranslate = height-20;

    var x_axis = d3.axisBottom(xScale)
    .tickFormat(d3.format('d'));
   
    svg.append("text")
	.text("No doping allegations")
    .attr("id","legend")
	.attr("x", 600)
	.attr("y", 200);

    svg.append("text")
	.text("Riders with doping allegations")
    .attr("id","legend")
	.attr("x", 600)
	.attr("y", 230);
    
    
    svg.append("g")
    .attr("id","x-axis")
    .attr("transform", "translate(0, " + xAxisTranslate  +")")
    .call(x_axis);

    var y_axis = d3.axisLeft(yScale)
    .tickFormat(d3.timeFormat('%M:%S'));

    svg.append("g")
    .attr("id","y-axis")
    .attr("transform", "translate(50)")
    .call(y_axis);

    svg.selectAll('circle')
         .data(dataset)
         .enter()
         .append('circle')
         .attr("class", "dot")
         .style("fill","green")
         .attr('cx', (d,i) => xScale(dataset[i].Year))
         .attr('cy',(d) => yScale (new Date(d.Seconds * 1000)))
         .attr('r', 5)
         .attr("data-xvalue",(d,i) => dataset[i].Year)
         .attr("data-yvalue",(d) => new Date(d.Seconds * 1000))
         .on("mouseout",(d)=> {
            d3.select("#tooltip")
            .style("visibility", "visible") 
         })
         .on("mouseover",(e,d) => {
            d3.select("#tooltip")
            .style("position", "absolute")
            .style("background-color","yellow")
            .style("opacity",".85")
            .style("border", "solid")
            .style("border-width", "1px")
            .style("border-radius", "5px")
            .style("top", e.pageY+"px")
            .style("left",e.pageX+6+"px")
            .attr("data-year",d.Year)
            .html(`<p> Date:${d.Year} </p>`)
            .style("visibility", "visible")
         })
         .on("mouseout",(d)=> {
            d3.select("#tooltip")
            .style("visibility", "hidden")            
         })
;

}
