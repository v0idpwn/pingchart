// Settings
var updateRate = 100;
var maxData = 50;
var startAtZero = true;
var borderWidth = 1;
var showLabel = true;
var pingRoute = "ping.php";

$(document).ready(function(){
    var ctx = document.getElementById("pingChart").getContext("2d");
    var chartData = {
        datasets: [{
            label: "Ping",
            backgroundColor: "rgba(21,255,0,0.2)",
            borderColor: "rgba(21,255,0,1)",
            pointColor: "rgba(21,255,0,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            borderWidth: 1,
            lineTension: 0
        }]
    };

    var chartOptions = {
        animation: false,
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks:{
                    beginAtZero: startAtZero
                }
            }],
            xAxes: [{
                ticks:{
                    display: showLabel
                }
            }]
        }
    }

    var pingChart = new Chart(ctx, {type: 'line', data: chartData, options: chartOptions});

    updater(pingChart);
});

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function updater(pingChart){
    counter = 0;
    dataH = 0;
    while(1){
        await sleep(updateRate);
        counter+=1;
        $.get(pingRoute, function(data){
            dataH = (data.ping);
        });
        addData(pingChart, counter,dataH);
    }
}

function addData(pingChart, label, data){
    // Remove first if limit reached
    if(label >= maxData){
        pingChart.data.labels.shift();
        pingChart.data.datasets.forEach((dataset) => {
            dataset.data.shift();
        });
    }

    // Add data
    pingChart.data.labels.push(label);
    pingChart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });

    pingChart.update();
}
