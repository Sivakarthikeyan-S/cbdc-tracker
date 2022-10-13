var series = [
  ["PHL",20],
  ["HTI",20],
  ["DNK",20],
  ["NLD",20],
  ["BEL",20],
  ["IRQ",20],
  ["JOR",20],
  ["CZE",20],
  ["SVK",20],
  ["AUT",20],
  ["SVN",20],
  ["ITA",20],
  ["EST",20],
  ["MEX",20],
  ["FIN",20],
  ["LVA",20],
  ["LTU",20],
  ["USA",20],
  ["ZAF",20],
  ["NAM",20],
  ["MDG",20],
  ["TZA",20],
  ["ZWE",20],
  ["PAK",20],
  ["UGA",20],
  ["KEN",20],
  ["ZMB",20],
  ["CHE",20],
  ["GBR",20],
  ["TUN",20],
  ["MAR",20],
  ["ESP",20],
  ["PRT",20],
  ["IND",20],
  ["IRL",20],
  ["VNM",20],
  ["YEM",20],
  ["OMN",20],
  ["EGY",20],
  ["ARG",20],
  ["PER",20],
  ["BGD",20],
  ["ISL",20],
  ["POL",20],
  ["DEU",20],
  ["NOR",20],
  ["BGD",20],
  ["THA",60],
  ["HUN",60],
  ["AUS",60],
  ["SWE",60],
  ["RUS",60],
  ["JPN",60],
  ["TUR",60],
  ["IRN",60],
  ["KAZ",60],
  ["IDN",60],
  ["MYS",60],
  ["UKR",60],
  ["NZL",60],
  ["BRA",60],
  ["KOR",60],
  ["ISR",60],
  ["NGA",100],
  ["CAN",100],
  ["SAU",100],
  ["URY",100],
  ["FRA",100],
  ["GHA",100],
  ["CHN",100]
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
      .range(["#87CEEB","#0055e1"]);  // color
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
            return '#1177E1';
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
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name,
                '<br>' + 'Research',
                ''].join('');        
        }
        if (data.partnerLink == 60) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name,
                '<br>' + 'Proof of concept',
                ''].join('');        
        }
        if (data.partnerLink == 100) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name,
                '<br>' + 'Pilot',
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

  function spin() {
    timer = d3.timer(function() {
      var dt = Date.now() -time;

      map.projection.rotate([autorotate[0] + velocity[0] * dt, autorotate[1] + velocity[1] * dt]);

      redraw();
    });
  };

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
