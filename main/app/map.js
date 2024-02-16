//Variables 
// Layers
var source_ign = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //maxZoom: 17,
    //attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
});

var source_pnoa = L.tileLayer.wms('http://www.ign.es/wms-inspire/pnoa-ma', {
  layers: 'OI.OrthoimageCoverage',
  format: 'image/png',
  transparent: false,
 // continuousWorld : true,
  //attribution: 'PNOA cedido por © <a href="http://www.ign.es/ign/main/index.do" target="_blank">Instituto Geográfico Nacional de España</a>'
});




var source_catastro = L.tileLayer.wms('https://www1.sedecatastro.gob.es/Cartografia/GeneraMapa.aspx?', {
        format: 'image/png',
        version: '1.1.0',
        layers: 'PARCELA,TXTPARCELA,MASA',
        visible: true,
        transparent:true,
        opacity: 0.6,
        crossOrigin: "anonymous"
});

var source_sigpac = L.tileLayer.wms('https://wms.mapa.gob.es/sigpac/wms?', {
        request:"GetMap",
        format: 'image/png',
        version: '1.3.0',
        layers: 'sigpac:recinto',
        visible: true,
        transparent:true,
        opacity: 0.6,
        crossOrigin: "anonymous"
});
/*

// Agregar capa base WMTS del IGN
var ignWMTSUrl = 'https://www.ign.es/wmts/pnoa-ma?SERVICE=WMTS&REQUEST=GetCapabilities';
var ignWMTSLayer = 'OI.OrthoimageCoverage';

var ignWMTS = L.tileLayer.wmts(ignWMTSUrl, {
    layer: ignWMTSLayer,
    format: 'image/jpeg',
    tileSize: 256,
    attribution: 'IGN España'
});
*/

var pnoaUTLWMTS = 'https://www.ign.es/wmts/pnoa-ma?'
var pnoaWMTSLayer = 'OI.OrthoimageCoverage';

/*
var pnoaWMTS = new L.TileLayer.WMTS(pnoaUTLWMTS, {
    layer: pnoaWMTSLayer,
    request: "GetTile",
    format: 'image/jpeg',
    tileSize: 256,
    style: "normal",
    tilematrixSet: "PM",
    attribution: 'IGN España'
});

// Definir las opciones del servicio WMTS
var pnoaWMTS = {
    layer: pnoaWMTSLayer,
    format: 'image/jpeg',
    tileSize: 256,
    attribution: '© Instituto Geográfico Nacional de España'
  };
  
  // Crear la capa WMTS
  var wmtsLayer = L.TileLayer.WMTS(pnoaUTLWMTS, pnoaWMTS);
*/
var map = L.map('map', {
    layers: [source_pnoa],
   // measureControl: true,
    center: [38.325381, -4.328517],
    zoom: 17,
    zoominfoControl: false,
    zoomControl: false,
    //zoomHome:true,
   // timeZone:crs,
    // doubleClickZoom: false,
});	



//map.addLayer(source_catastro);

//map.addLayer(source_sigpac);

var optionsMapa = {
    position: 'topleft',
    fill: "fill",
    collapsed: false,
    //toggleDisplay: true,
   // autoToggleDisplay: false,

};

var baseMaps = {
    "Ortofoto PNOA": source_pnoa,
    "OpenStreetMap": source_ign
};

var overlayMaps = {
    "Catrastro": source_catastro,
    "SIGPAC":source_sigpac
};

//var layerControl = L.control.layers(baseMaps, overlayMaps,optionsMapa).addTo(map);


/*....Controles...*/ 
// Control de zoom 
map.on('zoomend', function (ev) {
	zoomLevel = map.getZoom();
    document.getElementById("zoom_container").innerHTML = zoomLevel;	        
	});
 
    
/*
// zoom home/inicio
var zoomHome = L.Control.zoomHome({ position: 'topright' });
zoomHome.addTo(map);
*/


// Control escala
var optionsScale = {
	position: 'bottomleft',
	fill: "fill",
    metric:true,
    imperial:false,
};

var graphicScale = L.control.scale([optionsScale]);

graphicScale.addTo(map);


// Control minimap
var optionsMinimap = {
		position: 'bottomleft',
		fill: "fill",
        collapse: true,
        toggleDisplay: true,
        autoToggleDisplay: false,

	};

var miniMap = new L.Control.MiniMap(source_ign,optionsMinimap).addTo(map);

// Control locate
var optionLocate = {
		position: 'bottomleft',
		fill: "fill",
        toggleDisplay: true,
        autoToggleDisplay: true,

	};
var locate = L.control.locate().addTo(map);


// `fullscreenchange` Event that's fired when entering or exiting fullscreen.
map.on('fullscreenchange', function () {
    if (map.isFullscreen()) {
        console.log('entered fullscreen');
    } else {
        console.log('exited fullscreen');
    }
});
var optionFullScrem = {
    position: 'topright',

};
// or, add to an existing map:
map.addControl(new L.Control.Fullscreen(optionFullScrem));

// Sistema de Referencia de Coordenadas
var crs = map.options.crs.code;
console.log(crs)
    $('#crsValue').html(crs);
        map.on('mousemove', function(event) {
            $("#currentLng").html(event.latlng.lng.toFixed(5));
            $("#currentLat").html(event.latlng.lat.toFixed(5));
    });
		
console.log(crs)

// Control de mediciones 
L.Measure = {
    linearMeasurement: "Distancia",
    areaMeasurement: "Superficie",
    start: "Inicio",
    meter: "m",
    kilometer: "km",
    squareMeter: "m2",
    squareKilometers: "km2",
};
                                        
measuresSuperficies = L.control.measure({}).addTo(map);
$(measuresSuperficies.getContainer()).css({ position: 'topright' });


/*
  /*


var magnifyingGlass = L.magnifyingGlass({
    layers: layer1
});

map.addLayer(magnifyingGlass);

*/


if (navigator.maxTouchPoints > 0){
    $(document).ready(function() {
        initCoords();
    });	
   // L.control.locate().addTo(map);
    }