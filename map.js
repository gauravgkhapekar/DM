
// Define marker icons for different severity levels
var highSeverityIcon = L.icon({
    iconUrl: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

var mediumSeverityIcon = L.icon({
    iconUrl: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

var lowSeverityIcon = L.icon({
    iconUrl: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});


// Wait for the DOM content to be fully loaded before executing any JavaScript code
document.addEventListener("DOMContentLoaded", function() {
    // Initialize the map
    // var map = L.map('map').setView([20.5937, 78.9629], 5);

    // // Add tile layer (Mapbox Streets)
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // }).addTo(map);

    var map = L.map('map').setView([20.5937, 78.9629], 5); // Set the coordinates to the center of India and adjust the zoom level as needed

    // Add tile layer (Mapbox Streets)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Function to filter floods based on selected year
    function filterFloodsByYear(year) {
        // Clear existing markers
        map.eachLayer(function(layer) {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });

        // Filter floods for the selected year
        var floodsForYear = floodData.filter(function(flood) {
            return flood.Year === year;
        });

        // Initialize severity count variables
        var highSeverityCount = 0;
        var mediumSeverityCount = 0;
        var lowSeverityCount = 0;

        // Add markers for floods of the selected year
        floodsForYear.forEach(function(flood) {
            var markerIcon;
            if (flood.Death > 1000) {
                markerIcon = highSeverityIcon;
                highSeverityCount++;
            } else if (flood.Death > 50) {
                markerIcon = mediumSeverityIcon;
                mediumSeverityCount++;
            } else {
                markerIcon = lowSeverityIcon;
                lowSeverityCount++;
            }

            L.marker([flood.Latitude, flood.Longitude], { icon: markerIcon }).addTo(map)
                .bindPopup('<b>' + flood.Location + '</b><br>' + 'Deaths: ' + flood.Death);
        });

        // Update severity counts and bars
        document.getElementById('high-bar').style.width = highSeverityCount * 10 + '%';
        document.getElementById('high-bar').getElementsByTagName('span')[0].textContent = highSeverityCount;

        document.getElementById('medium-bar').style.width = mediumSeverityCount * 10 + '%';
        document.getElementById('medium-bar').getElementsByTagName('span')[0].textContent = mediumSeverityCount;

        document.getElementById('low-bar').style.width = lowSeverityCount * 10 + '%';
        document.getElementById('low-bar').getElementsByTagName('span')[0].textContent = lowSeverityCount;
    }

    // Add event listener for changes in the selected year
    document.getElementById('year-select').addEventListener('change', function() {
        var selectedYear = parseInt(this.value); // Get the selected year
        filterFloodsByYear(selectedYear); // Call the function with the selected year
    });

    // Initialize the map with the default year (e.g., 2023)
    var current_year = 2000;
    filterFloodsByYear(current_year);
});
