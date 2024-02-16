///Variables
var mapaBase;
var mapaPNOA;
var sigpac;

var capaName;
var capaURL;
var capaNameWMS;
var capaURLWMS;

var arrayCapas =[]

//Para entrar en las variables del json
function callmisCapasWMTS(){

    var capas =  "";

    for (let i = 0; i < baseLayersWMTS.length; i++) {
        const grupoMiscapas = baseLayersWMTS[i];
        console.log(grupoMiscapas)
        console.log("entra capas base")

        for (var j = 0; j < baseLayersWMTS[i].capas.length; j++) {
            let capajson = baseLayersWMTS[i].capas[j];

             capaURLIGN = grupoMiscapas.capas[0].url_capa;
             capaNameIGN = grupoMiscapas.capas[0].name;
             capaMatrixSetIGN = grupoMiscapas.capas[0].tilematrixSet;
             capaURLPNOA = grupoMiscapas.capas[1].url_capa;
             capaNamePNOA = grupoMiscapas.capas[1].name;
             capaMatrixSetPNOA = grupoMiscapas.capas[1].tilematrixSet;
             
        }

        var urlIGN = `${capaURLIGN}?service=wmts&request=GetTile&version=1.0.0&layer=${capaNameIGN}&style=default&tilematrixset=${capaMatrixSetIGN}&tilematrix={z}&tilerow={y}&tilecol={x}&format=image%2Fpng`

        // Llama a los layers 
        var mapaBase =new L.TileLayer(urlIGN, {
            continuousWorld: true,
           // minZoom: ((basemapJSON.minZoom != null) ? basemapJSON.minZoom : null)
    
        });
        
        var urlPNOA = `${capaURLPNOA}?service=wmts&request=GetTile&version=1.0.0&layer=${capaNamePNOA}&style=default&tilematrixset=${capaMatrixSetPNOA}&tilematrix={z}&tilerow={y}&tilecol={x}&format=image%2Fpng`

         // Llama a los layers 
         var mapaPNOA =new L.TileLayer(urlPNOA, {
            continuousWorld: true,
           // minZoom: ((basemapJSON.minZoom != null) ? basemapJSON.minZoom : null)
    
        }); 


    } 

    arrayCapas.push(mapaBase);
    createMap(mapaBase,mapaPNOA);
  
}

//Para entrar en las variables del json
function callmisCapasWMS(){

    var capas = "";
    for (let i = 0; i < mapama_json.length; i++) {
        const grupoMiscapasMapa = mapama_json[i];

        for (var j = 0; j < mapama_json[i].capas.length; j++) {
            let capajson = mapama_json[i].capas[j];

             capaURLWMS = grupoMiscapasMapa.capas[0].url_capa;
             capaNameWMS = grupoMiscapasMapa.capas[0].name;
        }

        // Llama a los layers 
        var siggpac =L.tileLayer.wms(capaURLWMS, {
            request:"GetMap",
            format: 'image/png',
            version: '1.3.0',
            layers: capaNameWMS,
            visible: true,
            transparent:true,
            opacity: 0.6,
            crossOrigin: "anonymous"
    
        }); 

        /*
        var source_catastro = L.tileLayer.wms('https://www1.sedecatastro.gob.es/Cartografia/GeneraMapa.aspx?', {
            format: 'image/png',
            version: '1.1.0',
            layers: 'PARCELA,TXTPARCELA,MASA',
            visible: true,
            transparent:true,
            opacity: 0.6,
            crossOrigin: "anonymous"
        });
        */
    } 

    arrayCapas.push(siggpac);
    console.log(arrayCapas);


}
function createMap(mapaBase, mapaPNOA){

    var map = L.map('map', {
            layers: arrayCapas,
            // measureControl: true,
            center: [38.325381, -4.328517],
            zoom: 12,
            zoominfoControl: true,
            zoomControl: false,
            zoomHome:true,
    });

    /*....Controles...*/ 
    // Control de zoom 
    map.on('zoomend', function (ev) {
        zoomLevel = map.getZoom();
            document.getElementById("zoom_container").innerHTML = zoomLevel;	   
            
    if (zoomLevel>=14){
        map.removeLayer(mapaBase);
        map.addLayer(mapaPNOA);

    }
    else{
        map.removeLayer(mapaPNOA);
        map.addLayer(mapaBase);
    }     
    });

    // zoom home/inicio
    var zoomHome = L.Control.zoomHome({position: 'topright' });
    zoomHome.addTo(map);

    // Control escala
    var optionsScale = {
        position: 'topleft',
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

    //var miniMap = new L.Control.MiniMap(mapaBase,optionsMinimap).addTo(map);

    // Control locate
    var optionLocate = {
            position: 'bottomleft',
            fill: "fill",
            toggleDisplay: true,
            autoToggleDisplay: true,

        };

    //map.addControl(new L.Control.locate(optionLocate));
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
        position: 'bottomleft',

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

}




 
  

/*
  /*


var magnifyingGlass = L.magnifyingGlass({
    layers: layer1
});

map.addLayer(magnifyingGlass);

*/



function buildBasemapWMTS(basemapJSON) {
    if (basemapJSON.tipo_servicio.toUpperCase() == 'WMTS') {
        var url = `${basemapJSON.url_capa}?service=wmts&request=GetTile&version=1.0.0&layer=${basemapJSON.layers}&style=default&tilematrixset=${basemapJSON.tilematrixSet}&tilematrix={z}&tilerow={y}&tilecol={x}&format=image%2Fpng`
        var tileLayer = new L.TileLayer(url, {
            continuousWorld: true,
            minZoom: ((basemapJSON.minZoom != null) ? basemapJSON.minZoom : null)
        });
    } else if (basemapJSON.tipo_servicio.toUpperCase() == 'WMS') {
        var tileLayer = L.tileLayer.wms(basemapJSON.url_capa, {
            layers: basemapJSON.layers,
            format: 'image/jpeg',
            transparent: true,
            attribution: basemapJSON.attribution,
            minZoom: ((basemapJSON.minZoom != null) ? basemapJSON.minZoom : null)
        });
    }

    return tileLayer;

}

// añadir zoom y coordenadas cuando el mapa ya está cargado. 
function addControlsMap(){

   var coordinates =  ` <div id="src">
                                <p><span id="txtLng">Lng</span> : <span id="currentLng"></span><br><span id="txtLat">Lat</span> : <span id="currentLat"></span></p></div> 
                                <div id="zoom_container" title="Zoom del mapa"></div> 
                                <div id="iconos">    
                                    <button id="botonImprimirPDF" title="Impresión de mapas" onclick="imprimirMapaComoPDF()"> 
                                        <i class="fas fa-layer-group"> Guardar en PDF</i></button>
                                </div>`

   document.getElementById('menuHerramientas').innerHTML=coordinates;
}