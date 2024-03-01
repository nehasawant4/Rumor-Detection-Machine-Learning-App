console.log("connected");
var slider = document.getElementById("tweetsrange");
var output = document.getElementById("numoftwtsinput");
var toppostweetstab = document.getElementById("nav-toppostweets");
var topnegtweetstab = document.getElementById("nav-topnegtweets");
var topTopics=document.getElementById("topTopics");
var searchtrend = document.getElementById("searchtrend");

$.getJSON("http://127.0.0.1:5000/getTrending",function(data) {
  
  data=data[0];
  console.log(data);
  $('#1st').text(data[0].toString());
  $('#2nd').text(data[1].toString());
  $('#3rd').text(data[2].toString());
  $('#4th').text(data[3].toString());
  $('#5th').text(data[4].toString());
  $('#6th').text(data[5].toString());
  $('#7th').text(data[6].toString());
  $('#8th').text(data[7].toString());
  $('#9th').text(data[8].toString());
  $('#10th').text(data[9].toString());
});


function runAnalyzer(searchtrend) {
  id=searchtrend.id;
  searchtrend=$('#'+id).text();
  fetch("/analyze?searchtrend=" + searchtrend)
    .then(response => response.json())
    .then(jsondata => {
      console.log(jsondata);
      google.charts.load("current", { packages: ["corechart"] });
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var ptp = jsondata.pp + 0.5 * jsondata.neup;
        var ntp = jsondata.np + 0.5 * jsondata.neup;
        var data = google.visualization.arrayToDataTable([
          ["Senitment Analysis", "%tage"],
          ["Positive", parseInt(ptp)],
          ["Negative", parseInt(ntp)]
        ]);

        var options = { title: "Sentiments", width: 600, height: 400 ,colors: ['#065e23','#cf2a2a']};

        var chart = new google.visualization.PieChart(
          document.getElementById("piechart")
        );
        chart.draw(data, options);
      }
      var postweets = "";
      var negtweets = "";
      var tempt;
      for (var i = 0; i < jsondata.positiveTweets.length; i++) {
        tempt = jsondata.positiveTweets[i].text;
        if(tempt.substring(0,2)==="RT"){
          tempt = tempt.substring(3);
        }
        postweets += "" + (i + 1) + ") " + tempt + "<br><br>";
      }
      toppostweetstab.innerHTML = postweets;
      for (var i = 0; i < jsondata.negativeTweets.length; i++) {
        tempt = jsondata.negativeTweets[i].text;
        if(tempt.substring(0,2)==="RT"){
          tempt = tempt.substring(3);
        }
        negtweets += "" + (i + 1) + ") " + tempt + "<br><br>";
      }
      topnegtweetstab.innerHTML = negtweets;
      return;
    });
  return false;
}

function runAnalyzerForCustom() {

  fetch("/analyze?searchtrend=" + searchtrend.value)
    .then(response => response.json())
    .then(jsondata => {
      console.log(jsondata);
      google.charts.load("current", { packages: ["corechart"] });
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var ptp = jsondata.pp + 0.5 * jsondata.neup;
        var ntp = jsondata.np + 0.5 * jsondata.neup;
        var data = google.visualization.arrayToDataTable([
          ["Senitment Analysis", "%tage"],
          ["Positive", parseInt(ptp)],
          ["Negative", parseInt(ntp)]
        ]);

        var options = { title: "Sentiments", width: 600, height: 400 ,colors: ['#065e23','#cf2a2a']};

        var chart = new google.visualization.PieChart(
          document.getElementById("piechart")
        );
        chart.draw(data, options);
      }
      var postweets = "";
      var negtweets = "";
      var tempt;
      for (var i = 0; i < jsondata.positiveTweets.length; i++) {
        tempt = jsondata.positiveTweets[i].text;
        if(tempt.substring(0,2)==="RT"){
          tempt = tempt.substring(3);
        }
        postweets += "" + (i + 1) + ") " + tempt + "<br><br>";
      }
      toppostweetstab.innerHTML = postweets;
      for (var i = 0; i < jsondata.negativeTweets.length; i++) {
        tempt = jsondata.negativeTweets[i].text;
        if(tempt.substring(0,2)==="RT"){
          tempt = tempt.substring(3);
        }
        negtweets += "" + (i + 1) + ") " + tempt + "<br><br>";
      }
      topnegtweetstab.innerHTML = negtweets;
      return;
    });
  return false;
}

document.onreadystatechange = function() {
  var state = document.readyState;
  if (state == "complete") {
    setTimeout(function() {
      document.getElementById("interactive");
      document.getElementById("load").style.visibility = "hidden";
    }, 1500);
  }
};
