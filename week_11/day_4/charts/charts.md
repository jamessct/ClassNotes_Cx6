# Lesson objectives
* Make pie chart
* Make column chart

# Charting

We live in the golden age of charting. Everyone loves infographics and you see them everywhere. It's only natural we want to use them in our webpages.

We could draw our graphs from scratch ourselves, using some tools we'll look at this afternoon. But it's far easier to use charting library.

There's a few charting libraries out there, but today we are going to look at HighCharts. It's easy to use and has lovely documentation.

http://www.highcharts.com/docs

http://api.highcharts.com/highcharts

[i]: Hand out the starter project, resources basic_startpoint

Let's start by adding the Highcharts library to our HTML document.

```
#index.html in <head>
<script src="http://code.highcharts.com/highcharts.js"></script>
```

We should be able to see this script in the ***sources*** of the developer tools tab (run the server with 'node server.js' i n the terminal then visit localhost:3000 in the browser and open the dev tools). Also if we type in 'Highcharts' in the console it will return to us an object which we're going to use to make our charts. 

# Setup

We need to make a div element where the chart will be drawn.

```
#index.html
<div id="pieChart"></div>
```

Let's make another script that will hold the pie chart code, and an app.js file to hold our main script.

```
#terminal
cd public
touch pieChart.js
touch app.js

#index.html in <head>
  <script src="pieChart.js"></script>
  <script src="app.js"></script>

```
Cool, let's add a pie chart class we can use and call from app.js.

```
#piechart.js
var PieChart = function() {
}

#app.js
window.onload = function() {

new PieChart();

}
```
# Pie Chart

Great we're all set up. Now let's add a chart!

We need to make some data to work with. We are going to chart the number of each type of Pokemon I've caught.

Let's go and grab the div we made earlier that is going to hold the chart.

```
#pieChart.js
var container = document.getElementById("pieChart");
```

Next we need to make a chart object from the Highcharts library.

```
#pieChart.js
var chart = new Highcharts.Chart();
```
This constructor function takes in an object as a parameter which we can pass all of our settings to. This includes the data we want to display and the type of chart we want and many other config options.

The chart property lets us set some basic information about the chart, such as the type and the container it's going to live in.

```
#pieChart.js
  var chart = new Highcharts.Chart({
    chart: {
      type: 'pie',
      renderTo: container
    }
  });
```

Next we can set the title of the chart using the, you guessed it, title property.

```
#pieChart.js
{
  chart: {
    type: 'pie',
    renderTo: container
   },
   title: { //NEW
      text: "Pokemon Types I've Caught" 
   }
}
```
Next we want to pass the data we want to display. We need to use a series property for this, which is an array.

```
#pieChart.js
{
  chart: {
    type: 'pie',
    renderTo: container
   },
   title: { 
      text: "Pokemon Types I've Caught" 
   },
   series: [] //NEW
}
```
A pie chart only has one series (there are other kinds of charts that take multiple series) so we only need to add one object to this. This object has several properties we can use, including a name and an array for the data points.

```
#pieChart.js
{
  chart: {
    type: 'pie',
    renderTo: container
   },
   title: { 
      text: "Pokemon Types I've Caught" 
   },
   series: [
       {
         name: "Type", //NEW
          data: [] //NEW
       }
   ]
}
```
Each data point is a little object with a name, a "y" (dubious name, but it's used for the y-axis on a series it's just weird because this is a pie chart) and some other options.

```
#pieChart.js
series: [{
              name: "Type",
              data: [ //NEW
              {   
                name: "Fire", 
                y: 74,
                color: "#ffac33"
              },
              {
                name: "Water",
                y: 25,
                color: "#73b7ff"
              },
              { 
                name: "Grass", 
                y: 1,
                color: "#00ba2f"
              }]
            }]
    });
```
Woah! That was a lot of typing. But now we can reload the page and see the fruits of our labours.

There's an additional little option we can add, "sliced". Let's do it.

```
#pieChart.js
 {
            name: "Water",
              y: 25,
              color: "#73b7ff",
              sliced:true
           },

```
Isn't that just the most awesome thing you have ever seen? Also go see what happens if you resize the window. Responsive charts?!?! Boom!!! So good.

[TASK] Add a new slice to the pie chart.


# Bar (Column) Charts

Next up let's have a go at a bar chart. What we think of as a bar chart, HighCharts calls a column chart, and their bar chart is horizontal. Oh well. Let's make a new file to store this in and include it in the index.

```
#terminal public folder
touch columnChart.js

#index.html
<script src="columnChart.js"></script>
```
Let's add a constructor function for it.

```
#barChart.js
var ColumnChart = function() {
}

#app.js
new ColumnChart();
```
We also need a new div to contain the chart.

```
#index.js
<div id="columnChart"></div>
```
The good news is that we can configure a column chart in a very similar way to a pie chart, because HighCharts is awesome. Let's get the container and pass the basic settings in again. 

```
#columnChart
var container = document.getElementById("columnChart");
  var chart = new Highcharts.Chart({ //NEW
    chart: {
      type: 'column',
      renderTo: container
    },
    title: { 
      text: "Our Favourite Programming Languages" 
    }
  });
```

Next we pass the data. 

```
var container = document.getElementById("columnChart");
  var chart = new Highcharts.Chart({ 
    chart: {
      type: 'column',
      renderTo: container
    },
    title: { 
      text: "Our Favourite Programming Languages" 
    },
  series: [{ //NEW
      name: "Cohort 6",
      data: [8, 12, 3, 1]
    }]
});
```
Lastly we need to provide values for the x-axis.

```
var chart = new Highcharts.Chart({
    chart: {
      type: 'column',
      renderTo: container
    },
    title: { 
      text: "Our Favourite Programming Languages" 
    },
    series: [{
      name: "Cohort 6",
      data: [8, 12, 3, 1]
    }],
    xAxis: { //NEW
      categories: ['JavaScript', 'Java', 'Ruby', 'Algol']
    },
  });
```
And hurrah! We have a lovely bar chart.

[TASK:] add another set of bars to the chart for Cohort 5. 

# Lab

1. Modify the line chart constructor function so you can pass it information as arguments in app.js rather than setting it in the chart.js file.
2. Go and create a bar or column chart.
3. Try making a chart using the Rest Countries API data:
  1. Make an HTTP request to the API.
  2. Use the data from this request and pass it into one of your chart constructor functions - you may need to loop through it or use a method on it to change it into the appropriate format. 
