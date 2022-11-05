var series = [
  ["ECU",20],
  ["SEN",20],
  ["DNK",40],
  ["EGY",40],
  ["ARG",40],
  ["AZE",40],
  ["PRK",40],
  ["URY",40],
  ["SXM",40],
  ["CUW",40],
  ["BMU",40],
  ["FIN",40],
  ["ZWE",60],
  ["TZA",60],
  ["IRQ",60],
  ["EST",60],
  ["LVA",60],
  ["LTU",60],
  ["MMR",60],
  ["PHL",60],
  ["LAO",60],
  ["TWN",60],
  ["VUT",60],
  ["CHL",60],
  ["PRY",60],
  ["PER",60],
  ["TTO",60],
  ["COL",60],
  ["GEO",60],
  ["JOR",60],
  ["MEX",60],
  ["KWT",60],
  ["QAT",60],
  ["PAK",60],
  ["FJI",60],
  ["TON",60],
  ["NPL",60],
  ["BGD",60],
  ["BLR",60],
  ["TUN",60],
  ["MAR",60],
  ["RWA",60],
  ["SWZ",60],
  ["HUN",60],
  ["MDG",60],
  ["OMN",60],
  ["NOR",60],
  ["ISL",60],
  ["NAM",60],
  ["KEN",60],
  ["UGA",60],
  ["ZMB",60],
  ["VNM",60],
  ["USA",60],
  ["NZL",60],
  ["ISR",60],
  ["GBR",60],
  ["CZE",60],
  ["CHE",80],
  ["PRT",80],
  ["NLD",80],
  ["SVK",80],
  ["AUT",80],
  ["SVN",80],
  ["ITA",80],
  ["DEU",80],
  ["ESP",80],
  ["BEL",80],
  ["BHR",80],
  ["IRL",80],
  ["BLZ",80],
  ["HTI",80],
  ["PLW",80],
  ["AUS",80],
  ["IDN",80],
  ["JPN",80],
  ["TUR",80],
  ["IRN",80],
  ["BRA",80],
  ["IND",80],
  ["BTN",80],
  ["CAN",80],
  ["MUS",80],
  ["FRA",80],
  ["THA",100],
  ["ZAF",100],
  ["KOR",100],
  ["KAZ",100],
  ["UKR",100],
  ["SWE",100],
  ["MYS",100],
  ["RUS",100],
  ["SAU",100],
  ["ARE",100],
  ["GHA",100],
  ["CHN",100],
  ["JAM",120],
  ["NGA",120],
  ["BHS",120]
];

var dataset = {};
var time = Date.now();
var autorotate = [39.666666666666664, -30];
var velocity = [.015, -0];
// We need to colorize every country based on "partnerLink"
// colors should be uniq for every value.
// For this purpose we create palette(using min/max series-value)
var onlyValues = series.map(function(obj){ return obj[1]; });
var minValue = Math.min.apply(null, onlyValues);
var maxValue = Math.max.apply(null, onlyValues);
// create color palette function
// color can be whatever you wish
var paletteScale = d3.scale.linear()
      .domain([minValue,maxValue])
      .range(["#1177e1","#85acf5"]);  // colorw
// fill dataset in appropriate format
series.forEach(function(item){ //
  // item example value ["USA", 36.2]
  var iso = item[0],
      value = item[1];
  dataset[iso] = { partnerLink: value, fillColor: paletteScale(value) };
});

var map;
var globalRotation = [-19.16,-26];

function redraw() {
  d3.select("#world").html('');
  init(); 
  const buttons = document.querySelectorAll("[data-info]");

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      // var partnerLink = JSON.parse(button.getAttribute("data-info")).partnerLink;
      // window.open(
      //   partnerLink,
      //   '_blank' // <- This is what makes it open in a new window.
      // );
    });
  });
}// redraw
function spin() {
  timer = d3.timer(function() {

    map.projection.rotate([autorotate[10] + velocity[10], autorotate[10] + velocity[10]]);

  });
};
function init() {

  map = new Datamap({//need global var
    scope: 'world',
    element: document.getElementById('world'),
    projection: 'orthographic',
    projectionConfig: {
      rotation: globalRotation
    },
    fills: {defaultFill: '#1f1f1f'},
    data: dataset,
    geographyConfig: {
      responsive: true,
      borderColor: '#444',
      highlightBorderWidth: 1,
      highlightFillOpacity: 1,
      // don't change color on mouse hover
      highlightFillColor: function(geo) {
          if (typeof geo.partnerLink !== "undefined") {
            return '#fff';
          }
          return geo['fillColor'] || '#1f1f1f'
          
      },
      // only change border
      // show desired information in tooltip
      popupTemplate: function(geo, data, proof) {
        // don't show tooltip if country don't present in dataset
        if (!data) { return ; }
        // tooltip content
        if (data.partnerLink <= 20) {
          return ['',
            '<div style="opacity:1; color:#fa0000" class="hoverinfo">' + geo.properties.name,
                '<br>' + 'Cancelled',
                ''].join('');        
        }
        if (data.partnerLink <= 40) {
          return ['',
            '<div style="opacity:1; color:#006D5B" class="hoverinfo">' + geo.properties.name,
                '<br>' + 'Inactive',
                ''].join('');        
        }
        if (data.partnerLink == 60) {
          return ['',
            '<div style="opacity:1; color:#8F00FF" class="hoverinfo">' + geo.properties.name,
                '<br>' + 'Research',
                ''].join('');        
        }
        if (data.partnerLink == 80) {
          return ['',
            '<div style="opacity:1; color:#FF4500" class="hoverinfo">' + geo.properties.name,
                '<br>' + 'Development',
                ''].join('');        
        }
        if (data.partnerLink == 100) {
          return ['',
            '<div style="opacity:1; color:#1177e1" class="hoverinfo">' + geo.properties.name,
                '<br>' + 'Pilot',
                ''].join('');        
        }
        if (data.partnerLink == 120) {
          return ['',
            '<div style="opacity:1; color:#30D5C8" class="hoverinfo">' + geo.properties.name,
                '<br>' + 'Launched',
                ''].join('');        
        }
      },
      done: function(datamap) {
        datamap.svg.call(d3.behavior.zoom().on("zoom", redraw));

        function redraw() {
          datamap.svg.selectAll("g").attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        }
      }
    }
  });


  //draw a legend for this map
  map.legend();

  map.graticule();

  var timer;
  
  
  var drag = d3.behavior.drag().on('drag', function() {
    var dx = d3.event.dx;
    var dy = d3.event.dy;
    
    // var rotation = livemapScope.rotation;
    var rotation = map.projection.rotate();
    var radius = map.projection.scale();
    var scale = d3.scale.linear()
    .domain([-1 * radius, radius])
    .range([-90, 90]);
    var degX = scale(dx);
    var degY = scale(dy);
    rotation[0] += degX;
    rotation[1] -= degY;
    if (rotation[1] > 90) rotation[1] = 90;
    if (rotation[1] < -90) rotation[1] = -90;
    
    if (rotation[0] >= 180) rotation[0] -= 360;
    globalRotation = rotation;
    redraw();
  });

d3.select("#world").select("svg").call(drag);

}// init

redraw();
// spin();