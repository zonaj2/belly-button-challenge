// Define the URL for your JSON data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
let data;

// Function to initialize the page
function init() {
    // Populate the dropdown menu with sample IDs
    d3.json(url).then((jsonDatadata) => {
        data = jsonDatadata; // Store the JSON data as a variable
        console.log(data); 
        
        let dropdown = d3.select("#selDataset");
        // Add options to the dropdown menu
        data.names.forEach((name) => {
            dropdown.append("option").text(name).property("value", name);
        });

        // Use the first sample ID to build the initial plots
        let firstSample = data.names[0];
        buildPlots(firstSample);
        buildBubbleChart(firstSample);
        displaySampleMetadata(firstSample);
        buildGaugeChart(firstSample);
    });
}
// Function to build the plots
function buildPlots(sample) {
        // Filter the data for the selected sample ID
        var selectedSample = data.samples.filter((s) => s.id === sample)[0];

        // Sort sample_values in descending order
        selectedSample.sample_values.sort((a, b) => b - a);

        // Get the top 10 OTUs' sample values, IDs, and labels
        var top10SampleValues = selectedSample.sample_values.slice(0, 10).reverse();
        var top10OTUIds = selectedSample.otu_ids.slice(0, 10).reverse();
        var top10OTULabels = selectedSample.otu_labels.slice(0, 10).reverse();

        // Create the horizontal bar chart
        var trace = {
            x: top10SampleValues,
            y: top10OTUIds.map((id) => `OTU ${id}`),
            text: top10OTULabels,
            type: "bar",
            orientation: "h"
        };

        var plotData = [trace];

        var layout = {
            title: `Top 10 OTUs for Sample ${sample}`,
            xaxis: { title: "Sample Values" },
            yaxis: { title: "OTU IDs" }
        };

        Plotly.newPlot("bar", plotData, layout);
}
// Function to build the bubble chart
function buildBubbleChart(sample) {
        // Filter the data for the selected sample ID
        var selectedSample = data.samples.filter((s) => s.id === sample)[0];
        // Get the required data for the bubble chart
        var otuIds = selectedSample.otu_ids;
        var sampleValues = selectedSample.sample_values;
        var otuLabels = selectedSample.otu_labels;
        var trace = {
            x: otuIds,
            y: sampleValues,
            text: otuLabels,
            mode: 'markers',
            marker: {
                size: sampleValues,  // Marker size based on sample_values
                color: otuIds,       // Marker color based on otu_ids
                colorscale: 'Earth'  
            }
        };
        var plotData = [trace];
        var layout = {
            title: `Bubble Chart for Sample ${sample}`,
            xaxis: { title: "OTU IDs" },
            yaxis: { title: "Sample Values" }
        };
        Plotly.newPlot("bubble", plotData, layout);
    }
// Function to display sample metadata
function displaySampleMetadata(sample) {
        // Filter the data for the selected sample ID
        var metadata = data.metadata.filter((m) => m.id == sample)[0];
        // Select the HTML element where you want to display the metadata
        var metadataPanel = d3.select("#sample-metadata");
        // Clear any existing metadata
        metadataPanel.html("");
        // Loop through the metadata properties and display them
        Object.entries(metadata).forEach(([key, value]) => {
            metadataPanel.append("p").text(`${key}: ${value}`);
        });
}
// Function to build the gauge chart
function buildGaugeChart(sample) {
        // Filter the data for the selected sample ID
        var selectedMetadata = data.metadata.filter((m) => m.id == sample)[0];
        // Get the weekly washing frequency (wfreq)
        var wfreq = selectedMetadata.wfreq;
        // Create the gauge chart
        var plotData = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: wfreq,
                title: { text: "Belly Button Washing Frequency" },
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    axis: { range: [0, 9] }, // Set the range from 0 to 9
                    steps: [
                        { range: [0, 1], color: "lightgray" },
                        { range: [1, 2], color: "lightyellow" },
                        { range: [2, 3], color: "lightgreen" },
                        { range: [3, 4], color: "yellow" },
                        { range: [4, 5], color: "green" },
                        { range: [5, 6], color: "lightblue" },
                        { range: [6, 7], color: "blue" },
                        { range: [7, 8], color: "lightpurple" },
                        { range: [8, 9], color: "purple" }
                ]}}];
        var layout = {
            width: 400,
            height: 300,
            margin: { t: 0, b: 0 },
        };

        Plotly.newPlot("gauge", plotData, layout);
}
// Call the buildGaugeChart function in your optionChanged function
function optionChanged(sample) {
    buildPlots(sample);
    buildBubbleChart(sample);
    displaySampleMetadata(sample);
    buildGaugeChart(sample); // Call the gauge chart function here
}
// Initialize the page
init();
