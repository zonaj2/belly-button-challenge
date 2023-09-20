# Module 14: Belly Button Challenge

## Table of Contents
- [About](#about)
- [Tools](#tools)
- [Key Steps](#key-steps)
   - [JSON Data](#json-data)
   - [Horizontal Bar Chart](#horizontal-bar-chart)
   - [Metadata](#metadata)
 
## About
In this project I built an interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels.

## Tools
- Javascript
- D3
- HTML
- Plotly

## Key Steps
#### **JSON Data**
Used D3 to read in sample JSON data from a sample [url](https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json).
````
function init() {
    //Import json data
    d3.json(url).then((jsonDatadata) => {
        data = jsonDatadata; // Store the JSON data as a variable
        console.log(data); 
        
`````
--------------------------------------------------- 
#### **Populated the dropdown menu**
 The dropdown menu had options for 150 IDS from individuals in the sample data.
``
     let dropdown = d3.select("#selDataset");
        // Add options to the dropdown menu
        data.names.forEach((name) => {
            dropdown.append("option").text(name).property("value", name);
        });
``
--------------------------------------------------- 
#### **Horizontal Bar Chart**
Created a horizontal bar chart with a dropdown menu to display the top 10 microbial species (also called operational taxonomic units, or OTUs) found in each sample individual.

<img src="images/BarChart.png" width="400" height="400">

--------------------------------------------------- 
#### **Bubble Chart**
Created a bubble chart that displayed the OTU values for each selected individual wtih a marker for bubble size and an OTU label on hover.

<img src="images/BubbleChart.png" width="600" height="250">

--------------------------------------------------- 
#### **Metadata**
Showed demographic data for each selected individual, displayed as key:value pairs.

<img src="images/Metadata.png" width="150" height="250">
--------------------------------------------------- 
####**BONUS**
Created a gauge chart that displayed the weekly washing frequency of the selected individual. The data was filtered from the `metadata.wfreq`.
The example gauge code was modified to account for values ranging from 0 through 9.

<img src"images/GaugeDial.png">





