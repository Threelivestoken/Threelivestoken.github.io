function performSearch() {
    var searchInputValue = document.getElementById('searchInput').value;
  
    // Here you can add your search functionality or redirect logic
    // For simplicity, let's show content1
    var content1 = document.getElementById('content1');
    content1.style.opacity = '1'; // Ensure opacity is reset
    content1.style.transition = 'opacity 0.5s ease-in-out'; // Add a fade transition
    content1.style.display = 'block';
  }
  
  function showContent() {
    // Hide content1 and the search bar with a fade transition
    var content1 = document.getElementById('content1');
    var centercontainer = document.getElementById('center-container');
    content1.style.opacity = '0';
    centercontainer.style.opacity='0';
    setTimeout(function () {
        content1.style.display = 'none';
        centercontainer.style.display = 'none';
    }, 500); // Wait for the transition to complete (500ms)
  
    // Show content2 with a delay and a fade transition
    setTimeout(function () {
      var content2 = document.getElementById('content2');
      content2.style.opacity = '0';
      content2.style.transition = 'opacity 0.5s ease-in-out'; // Add a fade transition
      content2.style.display = 'block';
  
      // Reset content2 opacity after a short delay (to allow for display change)
      setTimeout(function () {
        content2.style.opacity = '1';
      }, 10);
    }, 1000); // Wait for 1 second before showing content2
  }






/*scatterplot*/
const barChartData = [
    { label: 'Search result 1', value: 19.2 },
    { label: 'Search result 2', value: 17.6 },
    { label: 'Search result 3', value: 17.6 },
    { label: 'Search result 4', value: 18.0 },
    { label: 'Search result 5', value: 20.6 },
    { label: 'Search result 6', value: 14.2 },
    { label: 'Search result 7', value: 17.2 },
    { label: 'Search result 8', value: 16.2 },
    { label: 'Search result 9', value: 21.0 },
    { label: 'Search result 10', value: 14.4 }

    // ... add more data points as needed
  ];
  
  const scatterplotData = [
    { x:  10 , y:  11  },{ x:  1 , y:  23  },{ x:  2 , y:  18  },{ x:  3 , y:  17  },{ x:  4 , y:  17  },
    { x:  5 , y:  31  },{ x:  6 , y:  16  },{ x:  7 , y:  11  },{ x:  8 , y:  10  },{ x:  9 , y:  24  },
    { x:  10 , y:  25  },{ x:  1 , y:  18  },{ x:  2 , y:  21  },{ x:  3 , y:  11  },{ x:  4 , y:  18  },
    { x:  5 , y:  16  },{ x:  6 , y:  6  },{ x:  7 , y:  15  },{ x:  8 , y:  24  },{ x:  9 , y:  16  },
    { x:  10 , y:  14  },{ x:  1 , y:  23  },{ x:  2 , y:  18  },{ x:  3 , y:  17  },{ x:  4 , y:  24  },
    { x:  5 , y:  25  },{ x:  6 , y:  17  },{ x:  7 , y:  25  },{ x:  8 , y:  16  },{ x:  9 , y:  34  },
    { x:  10 , y:  11  },{ x:  1 , y:  10  },{ x:  2 , y:  14  },{ x:  3 , y:  16  },{ x:  4 , y:  13  },
    { x:  5 , y:  14  },{ x:  6 , y:  16  },{ x:  7 , y:  16  },{ x:  8 , y:  15  },{ x:  9 , y:  15  },
    { x:  10 , y:  11  },{ x:  1 , y:  22  },{ x:  2 , y:  17  },{ x:  3 , y:  27  },{ x:  4 , y:  18  },
    { x:  5 , y:  17  },{ x:  6 , y:  16  },{ x:  7 , y:  19  },{ x:  8 , y:  16  },{ x:  9 , y:  16  }

    // ... add more data points as needed
  ];
  
  const createBarChart = () => {
    const svgBarChart = d3.select("#bar-chart");
  
    const xScaleBarChart = d3.scaleBand()
                             .domain(barChartData.map(d => d.label))
                             .range([0, 500])
                             .padding(0.1);
  
    const yScaleBarChart = d3.scaleLinear()
                             .domain([0, d3.max(barChartData, d => d.value)])
                             .range([300, 0]);
  
    // Add bars
    svgBarChart.selectAll("rect")
       .data(barChartData)
       .enter().append("rect")
       .attr("x", d => xScaleBarChart(d.label))
       .attr("y", d => yScaleBarChart(d.value))
       .attr("width", xScaleBarChart.bandwidth())
       .attr("height", d => 300 - yScaleBarChart(d.value))
       .attr("fill", "steelblue")
       .on("mouseover", function(event, d) {
          d3.select(this).attr("fill", "orange");
          showTooltip(event, `Label: ${d.label}, Value: ${d.value}`);
       })
       .on("mouseout", function() {
          d3.select(this).attr("fill", "steelblue");
          hideTooltip();
       });
  };
  
  const createScatterplot = () => {
    const svgScatterplot = d3.select("#scatterplot");
  
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const xScaleScatterplot = d3.scaleLinear()
        .domain([0, d3.max(scatterplotData, d => d.x)])
        .range([0, width]);

    const yScaleScatterplot = d3.scaleLinear()
        .domain([0, d3.max(scatterplotData, d => d.y)])
        .range([height, 0]);

    // Add x-axis
    svgScatterplot.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScaleScatterplot));

    // Add y-axis
    svgScatterplot.append("g")
        .attr("transform", `translate(${width},0)`)
        .call(d3.axisLeft(yScaleScatterplot));


    // Add circles
    svgScatterplot.selectAll("circle")
       .data(scatterplotData)
       .enter().append("circle")
       .attr("cx", d => xScaleScatterplot(d.x))
       .attr("cy", d => yScaleScatterplot(d.y))
       .attr("r", 6)
       .attr("fill", "red")
       .on("mouseover", function(event, d) {
          d3.select(this).attr("fill", "orange");
          showTooltip(event, `X: ${d.x}, Y: ${d.y}`);
       })
       .on("mouseout", function() {
          d3.select(this).attr("fill", "red");
          hideTooltip();
       });
  };
  
  // Tooltip functions
  const tooltip = d3.select("body").append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0);
  
  function showTooltip(event, text) {
    tooltip.transition()
           .duration(200)
           .style("opacity", 1);
    tooltip.html(text)
           .style("left", event.pageX + 10 + "px")
           .style("top", event.pageY - 15 + "px");
  }
  
  function hideTooltip() {
    tooltip.transition()
           .duration(200)
           .style("opacity", 0);
  }
  
  createBarChart();
  createScatterplot();
  