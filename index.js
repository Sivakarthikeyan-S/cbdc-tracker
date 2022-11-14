var series = [
  ////////// Cancelled
  ["SEN",1],
  ["ECU",2],
  ////////// Inactive
  ["DNK",101],
  ["EGY",102],
  ["ARG",102],
  ["FIN",102],
  ["AZE",102],
  ["PRK",102],
  ["URY",103],
  ///////////Research
  ["NAM",201],
  ["ZMB",201],
  ["ZWE",201],
  ["TZA",201],
  ["RWA",201],
  ["VNM",201],
  ["MMR",201],
  ["BGD",201],
  ["NPL",201],
  ["OMN",201],
  ["QAT",201],
  ["JOR",201],
  ["CZE",201],
  ["BLR",201],
  ["PER",201],
  ["PRY",201],
  ["TTO",201],
  ["ISR",202],
  ["VUT",202],
  ["FJI",202],
  ["TON",202],
  ["NZL",203],
  ["PAK",203],
  ["PHL",203],
  ["KWT",203],
  ["GEO",203],
  ["HUN",203],
  ["KEN",203],
  ["MDG",203],
  ["CHL",203],
  ["MEX",203],
  ["SWZ",204],
  ["USA",204],
  ["TWN",204],
  ["LAO",205],
  ["GBR",206],
  ["NOR",207],
  ["MAR",208],
  ["UGA",209],
  ["COL",210],
  ["TUN",211],
  ["ISL",212],
  ["IRQ",213],
  /////////// Development
  ["AUS",301],
  ["IND",302],
  ["VEN",303],
  ["IDN",303],
  ["JPN",304],
  ["BTN",305],
  ["TUR",306],
  ["CHE",307],
  ["PRT",307],
  ["NLD",307],
  ["FRA",307],
  ["SVK",307],
  ["AUT",307],
  ["SVN",307],
  ["ITA",307],
  ["DEU",307],
  ["ESP",307],
  ["BEL",307],
  ["IRL",307],
  ["BLZ",308],
  ["HTI",309],
  ["IRN",310],
  ["BRA",311],
  ["CAN",312],
  /////////// Pilot
  ["ARE",401],
  ["SAU",401],
  ["MYS",402],
  ["RUS",403],
  ["CHN",404],
  ["THA",405],
  ["KOR",406],
  ["KAZ",407],
  ["UKR",408],
  ["SWE",409],
  ["ZAF",410],
  ["GHA",411],
  //////////// Launched
  ["NGA",501],
  ["JAM",502],
  ["BHS",503]
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
var globalRotation = [-75,-26];

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
        if (data.partnerLink == 1) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#fa0000" class="hoverinfo" >Status: Cancelled </div>' +
            '<div style="color:#fa0000" class="hoverinfo" >Use case: Retail </div>' +
            '<div style="color:#fa0000" class="hoverinfo" >Architecture: Direct </div>' +
            '<div style="color:#fa0000" class="hoverinfo" >Access: Token </div>' +
            '<div style="color:#fa0000" class="hoverinfo" >Technology partnerships: eCurrency Mint </div>',
            ''
          ].join('');        
        }
        if (data.partnerLink == 2) {
          return ['',
          '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
          '<div style="color:#fa0000" class="hoverinfo" >Status: Cancelled </div>' +
          '<div style="color:#fa0000" class="hoverinfo" >Use case: Retail </div>' +
          '<div style="color:#fa0000" class="hoverinfo" >Underlying Technology: Conventional </div>' +
          '<div style="color:#fa0000" class="hoverinfo" >Access: Account </div>' +
          '<div style="color:#fa0000" class="hoverinfo" >Technology partnerships: CNT </div>',
          ''
          ].join('');        
        }
        if (data.partnerLink == 101) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#006D5B" class="hoverinfo" >Status: Inactive </div>' +
            '<div style="color:#006D5B" class="hoverinfo" >Use case: Retail </div>' +
            '<div style="color:#006D5B" class="hoverinfo" >Architecture: Direct </div>' +
            '<div style="color:#006D5B" class="hoverinfo" >Access: Both </div>',
            ''
          ].join('');        
        }
        if (data.partnerLink == 102) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#006D5B" class="hoverinfo" >Status: Inactive </div>' +
            ''
          ].join('');        
        }
        if (data.partnerLink == 103) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#006D5B" class="hoverinfo" >Status: Inactive </div>' +
            '<div style="color:#006D5B" class="hoverinfo" >Use case: Retail </div>' +
            '<div style="color:#006D5B" class="hoverinfo" >Architecture: Intermediate </div>' +
            '<div style="color:#006D5B" class="hoverinfo" >Access: Token </div>',
            '<div style="color:#006D5B" class="hoverinfo" >Underlying Technology: Conventional </div>',
            ''
          ].join('');        
        }
        if (data.partnerLink == 201) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#8F00FF" class="hoverinfo" >Status: Research </div>',
            ''
          ].join('');    
        }
        if (data.partnerLink == 202) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#8F00FF" class="hoverinfo" >Status: Research </div>' +
            '<div style="color:#8F00FF" class="hoverinfo" >Technology Partnerships: Soramitsu </div>',
            ''
          ].join('');    
        }
        if (data.partnerLink == 203) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#8F00FF" class="hoverinfo" >Status: Research </div>' +
            '<div style="color:#8F00FF" class="hoverinfo" >Use case: Retail </div>',
            ''
          ].join('');    
        }
        if (data.partnerLink == 204) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#8F00FF" class="hoverinfo" >Status: Research </div>' +
            '<div style="color:#8F00FF" class="hoverinfo" >Use case: Both </div>',
            ''
          ].join('');    
        }
        if (data.partnerLink == 205) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#8F00FF" class="hoverinfo" >Status: Research </div>' +
            '<div style="color:#8F00FF" class="hoverinfo" >Use case: Both </div>' + 
            '<div style="color:#8F00FF" class="hoverinfo" >Technology Partnerships: Soramitsu </div>',
            ''
          ].join('');    
        }
        if (data.partnerLink == 206) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#8F00FF" class="hoverinfo" >Status: Research </div>' +
            '<div style="color:#8F00FF" class="hoverinfo" >Use case: Both </div>' + 
            '<div style="color:#8F00FF" class="hoverinfo" >Architecture: Intermediate</div>',
            ''
          ].join('');    
        }
        if (data.partnerLink == 207) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#8F00FF" class="hoverinfo" >Status: Research </div>' +
            '<div style="color:#8F00FF" class="hoverinfo" >Use case: Retail </div>' + 
            '<div style="color:#8F00FF" class="hoverinfo" >Technology: Ethereum</div>',
            ''
          ].join('');    
        }
        if (data.partnerLink == 208) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#8F00FF" class="hoverinfo" >Status: Research </div>' +
            '<div style="color:#8F00FF" class="hoverinfo" >Use case: Retail </div>' + 
            '<div style="color:#8F00FF" class="hoverinfo" >Access: Token</div>',
            ''
          ].join('');    
        }
        if (data.partnerLink == 209) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#8F00FF" class="hoverinfo" >Status: Research </div>' +
            '<div style="color:#8F00FF" class="hoverinfo" >Technology Partnerships: Temtum Group </div>',
            ''
          ].join('');    
        }
        if (data.partnerLink == 210) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#8F00FF" class="hoverinfo" >Status: Research </div>' +
            '<div style="color:#8F00FF" class="hoverinfo" >Architecture: Intermediate </div>',
            ''
          ].join('');    
        }
        if (data.partnerLink == 211) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#8F00FF" class="hoverinfo" >Status: Research </div>' +
            '<div style="color:#8F00FF" class="hoverinfo" >Use case: Wholesale </div>',
            '<div style="color:#8F00FF" class="hoverinfo" >Technology Partnerships: ProsperUs </div>',
            ''
          ].join('');    
        }
        if (data.partnerLink == 212) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#8F00FF" class="hoverinfo" >Status: Research </div>' +
            '<div style="color:#8F00FF" class="hoverinfo" >Use case: Retail </div>' +
            '<div style="color:#8F00FF" class="hoverinfo" >Architecture: Direct</div>' +
            '<div style="color:#8F00FF" class="hoverinfo" >Access: Both </div>',
            ''
          ].join('');    
        }
        if (data.partnerLink == 213) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#8F00FF" class="hoverinfo" >Status: Research </div>' +
            '<div style="color:#8F00FF" class="hoverinfo" >Use case: Wholesale </div>',
            ''
          ].join('');    
        }
        if (data.partnerLink == 301) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Status: Development </div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Use case: Both </div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Technology: Ethereum </div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Cross-border Projects: Project Dunbar </div>',
            ''
          ].join('');    
        }
        if (data.partnerLink == 302) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Status: Development </div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Use case: Both </div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Underlying Technology: Both </div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Access: Account </div>',
            ''
          ].join('');    
        }
        if (data.partnerLink == 303) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Status: Development </div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Use case: Both </div>',
            ''
          ].join('');    
        }
        if (data.partnerLink == 304) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Status: Development </div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Use case: Both </div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Architecture: Intermediate </div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Cross-border Projects: Project Stella </div>',
            ''
          ].join('');    
        }
        if (data.partnerLink == 305) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Status: Development </div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Use case: Both </div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Technology: Ripple </div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Technology Partnerships: Ripple </div>',
            ''
          ].join('');    
        }
        if (data.partnerLink == 306) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Status: Development </div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Use case: Retail </div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Underlying Technology: Both </div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Technology Partnerships: Aselsan, Havelsan, Tabitak Bilgem </div>',
            ''
          ].join('');    
        }
        if (data.partnerLink == 307) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Status: Development </div>',
            ''
          ].join('');    
        }
        if (data.partnerLink == 308) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Status: Development </div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Technology Partnerships: Bitt Inc. </div>',
            ''
          ].join('');    
        }
        if (data.partnerLink == 309) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Status: Development </div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Use case: Both </div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Architecture: Intermediate </div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Underlying Technology: Both </div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Technology Partnerships: EMTECH, HaitiPay </div>',
            ''
          ].join('');        
        }
        if (data.partnerLink == 310) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Status: Development </div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Use case: Retail </div>',
            ''
          ].join('');        
        }
        if (data.partnerLink == 311) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Status: Development </div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Use case: Retail </div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Architecture: Intermediate </div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Underlying Technology: DLT </div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Access: Token </div>',
            ''
          ].join('');        
        }
        if (data.partnerLink == 312) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Status: Development </div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Use case: Both </div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Architecture: Intermediate </div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Underlying Technology: Both </div>' +
            '<div style="color:#FF4500" class="hoverinfo" >Access: Token </div>',
            '<div style="color:#FF4500" class="hoverinfo" >Cross-border Projects: Project Jasper </div>',
            ''
          ].join('');        
        }
        if (data.partnerLink == 401) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Status: Pilot </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Use case: Wholesale </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Technology: Fabric </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Underlying Technology: DLT </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Access: Account </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Cross-border Projects: Project Aber </div>',
            ''
          ].join('');        
        }
        if (data.partnerLink == 402) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Status: Pilot </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Use case: Wholesale </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Cross-border Projects: Project Dunbar </div>',
            ''
          ].join('');        
        }
        if (data.partnerLink == 403) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Status: Pilot </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Use case: Retail </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Architecture: Intermediate </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Underlying Technology: Both </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Access: Account </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Technology Partnerships: Sberbank, VTB, Gazprombank Alfa Bank </div>',
            ''
          ].join('');        
        }
        if (data.partnerLink == 404) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Status: Pilot </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Use case: Both </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Architecture: Intermediate </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Underlying Technology: Both </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Access: Account </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Cross-border Projects: mCBDC Bridge </div>',
            ''
          ].join('');        
        }
        if (data.partnerLink == 405) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Status: Pilot </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Use case: Both </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Architecture: Intermediate </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Underlying Technology: Both </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Access: Both </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Technology Partnerships: Giesecke + Devrient </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Cross-border Projects: mCBDC Bridge </div>',
            ''
          ].join('');        
        }
        if (data.partnerLink == 406) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Status: Pilot </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Use case: Retail </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Technology: Ethereum </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Architecture: Intermediate </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Underlying Technology: DLT </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Technology Partnerships: Samsung </div>',
            ''
          ].join('');        
        }
        if (data.partnerLink == 407) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Status: Pilot </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Use case: Retail </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Architecture: Intermediate </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Underlying Technology: Both </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Access: Token </div>',
            ''
          ].join('');        
        }
        if (data.partnerLink == 408) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Status: Pilot </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Technology Partnerships: Stellar Development Foundation </div>',
            ''
          ].join('');        
        }
        if (data.partnerLink == 409) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Status: Pilot </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Use case: Retail </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Architecture: Intermediate </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Underlying Technology: DLT </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Access: Both </div>' + 
            '<div style="color:#1177e1" class="hoverinfo" >Technology Partnerships: Svenska Handelsbanken </div>',
            ''
          ].join('');        
        }
        if (data.partnerLink == 410) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Status: Pilot </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Use case: Both </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Access: Token </div>' + 
            '<div style="color:#1177e1" class="hoverinfo" >Cross-border Projects: Project Dunbar </div>',
            ''
          ].join('');        
        }
        if (data.partnerLink == 411) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Status: Pilot </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Use case: Retail </div>' +
            '<div style="color:#1177e1" class="hoverinfo" >Architecture: Intermediate </div>' + 
            '<div style="color:#1177e1" class="hoverinfo" >Cross-border Projects: Giesecke + Devrient </div>',
            ''
          ].join('');        
        }
        if (data.partnerLink == 501) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#30D5C8" class="hoverinfo" >Status: Launched </div>' +
            '<div style="color:#30D5C8" class="hoverinfo" >Use case: Retail </div>' +
            '<div style="color:#30D5C8" class="hoverinfo" >Technology: Fabric </div>' +
            '<div style="color:#30D5C8" class="hoverinfo" >Architecture: Intermediate </div>' +
            '<div style="color:#30D5C8" class="hoverinfo" >Underlying Technology: DLT </div>',
            '<div style="color:#30D5C8" class="hoverinfo" >Access: Account </div>',
            '<div style="color:#30D5C8" class="hoverinfo" >Technology Partnerships: BITT Inc. </div>',
            ''
          ].join('');        
        }
        if (data.partnerLink == 502) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#30D5C8" class="hoverinfo" >Status: Launched </div>' +
            '<div style="color:#30D5C8" class="hoverinfo" >Use case: Retail </div>' +
            '<div style="color:#30D5C8" class="hoverinfo" >Architecture: Intermediate </div>' +
            '<div style="color:#30D5C8" class="hoverinfo" >Underlying Technology: Conventional </div>',
            '<div style="color:#30D5C8" class="hoverinfo" >Access: Account </div>',
            '<div style="color:#30D5C8" class="hoverinfo" >Technology Partnerships: eCurrency Mint </div>',
            ''
          ].join('');        
        }
        if (data.partnerLink == 503) {
          return ['',
            '<div style="opacity:1;" class="hoverinfo">' + geo.properties.name + '</div>' +
            '<div style="color:#30D5C8" class="hoverinfo" >Status: Launched </div>' +
            '<div style="color:#30D5C8" class="hoverinfo" >Use case: Retail </div>' +
            '<div style="color:#30D5C8" class="hoverinfo" >Technology: NZIA Limited </div>' +
            '<div style="color:#30D5C8" class="hoverinfo" >Architecture: Intermediate </div>' +
            '<div style="color:#30D5C8" class="hoverinfo" >Underlying Technology: Both </div>',
            '<div style="color:#30D5C8" class="hoverinfo" >Access: Both </div>',
            '<div style="color:#30D5C8" class="hoverinfo" >Technology Partnerships: NZIA Limited </div>',
            ''
          ].join('');        
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