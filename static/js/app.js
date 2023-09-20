// Define the URL for your JSON data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Function to initialize the page
function init() {
    // Populate the dropdown menu with sample IDs
    d3.json(url).then((data) => {
        console.log(data);
        var dropdown = d3.select("#selDataset");

        // Add options to the dropdown menu
        data.names.forEach((name) => {
            dropdown.append("option").text(name).property("value", name);
        });

        // Use the first sample ID to build the initial plots
        var firstSample = data.names[0];
        buildPlots(firstSample);
        buildBubbleChart(firstSample);
        displaySampleMetadata(firstSample); // Display metadata for the first ID
    });
}

// Function to build the plots
function buildPlots(sample) {
    // Fetch the JSON data
    d3.json(url).then((data) => {
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

        var data = [trace];

        var layout = {
            title: `Top 10 OTUs for Sample ${sample}`,
            xaxis: { title: "Sample Values" },
            yaxis: { title: "OTU IDs" }
        };

        Plotly.newPlot("bar", data, layout);
    });
}


// Function to handle changes in the dropdown menu
function optionChanged(sample) {
    buildPlots(sample);
}

// Initialize the page
init();

// Function to build the bubble chart
function buildBubbleChart(sample) {
    // Fetch the JSON data
    d3.json(url).then((data) => {
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
                colorscale: 'Earth'  // You can change the colorscale as needed
            }
        };

        var data = [trace];

        var layout = {
            title: `Bubble Chart for Sample ${sample}`,
            xaxis: { title: "OTU IDs" },
            yaxis: { title: "Sample Values" }
        };

        Plotly.newPlot("bubble", data, layout);
    });
}

// Call the buildBubbleChart function in your optionChanged function
function optionChanged(sample) {
    buildPlots(sample);
    buildBubbleChart(sample); // Call the bubble chart function here
}
// Function to display sample metadata
function displaySampleMetadata(sample) {
    // Fetch the JSON data
    d3.json(url).then((data) => {
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
    });
}
// Function to handle changes in the dropdown menu
function optionChanged(sample) {
    buildPlots(sample);
    buildBubbleChart(sample);
    displaySampleMetadata(sample); // Call the metadata function here
}
