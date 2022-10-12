var series = [
  ["USA",10,'Proof of concept'],
  ["CAN",20,'Proof of concept'],
  ["ZAF",30,'Proof of concept'],
  ["PAK",40,'Proof of concept'],
  ["CHE",50,'Proof of concept'],
  ["NGA",50,'Proof of concept'],
  ["GBR",60,'Proof of concept'],
  ["IND",70,'Proof of concept'],
  ["VNM",80,'Proof of concept'],
  ["AUS",90,'Proof of concept'],
  ["RUS",100,'Proof of concept']
];
      
var dataset = {};
var time = Date.now();
var autorotate = [39.666666666666664, -30];
var velocity = [.015, -0];
// We need to colorize every country based on "partnerLink"
// colors should be uniq for every value.
// For this purpose we create palette(using min/max series-value)
var proof = series.map(function(obj){ return obj[2]; });
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
    fills: {defaultFill: '#3a3a3a'},
    data: dataset,
    geographyConfig: {
      responsive: true,
      borderColor: '#444',
      highlightBorderWidth: 1,
      highlightFillOpacity: 1,
      // don't change color on mouse hover
      highlightFillColor: function(geo) {
          if (typeof geo.partnerLink !== "undefined") {
            return 'white';
          }
          return geo['fillColor'] || '#3a3a3a'
          
      },
      // only change border
      // show desired information in tooltip
      popupTemplate: function(geo, data, proof) {
        // don't show tooltip if country don't present in dataset
        if (!data) { return ; }
        // tooltip content
        return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name,
                '<br>' + data.partnerLink + ' hectares', '<br>' + proof,
                ''].join('');        
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
