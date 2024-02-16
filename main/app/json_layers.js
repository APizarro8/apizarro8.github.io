/*****************************************************************/
/*JSON QUE CONTINE LAS PROPIEDADES DE LAS CAPAS AÑADIDAS AL MAPA*/
/****************************************************************/

//var urlMTNWMTS =  document.getElementById('urlMTN').value;

var baseLayersWMTS = [{
    idgroup: 0,
    titulo_group: "Mapas base y ortofotos",
    titulo_group_es: "Mapas base y ortofotos",
    titulo_group_en: "Base maps and Ortho-photo",
    icono: "fas fa-layer-group", // https://fontawesome.com/v5.15/icons?d=gallery&p=2&q=layers
    capas: [{
        titulo_capa: "Mapa Base (IGN)",
        titulo_capa_es: "Mapa Base (IGN)",
        titulo_capa_en: "Base Map (IGN)",
        metadatos: "https://www.idee.es/csw-inspire-idee/srv/spa/catalog.search#/metadata/spaignwmts_mapa-raster",
        name: "MTN",
        url_capa: "https://www.ign.es/wmts/mapa-raster?",
        layers: "IGNBaseTodo",
        format: 'image/jpeg',
        url_copy: "https://www.ign.es/wmts/mapa-raster?",
        version: '1.1.1',
        addToTreeLayer: false,
        queriesArray: [],
        desc_popup: "Texto descriptivo de la capa común a todas sus entidades que será mostrado en cada popup",
        tipo_servicio: 'wmts',
        tilematrixSet: 'EPSG:3857',
        attribution: "WMTS © IGN",
        default_basemap: true
    }, 
     {
        titulo_capa: "Ortofotos (PNOA)",
        titulo_capa_es: "Ortofotos (PNOA)",
        titulo_capa_en: "Ortho-photos (PNOA)",
        metadatos: "http://www.ign.es/csw-inspire/srv/spa/main.home",
        name: "OI.OrthoimageCoverage",
        url_capa: "https://www.ign.es/wmts/pnoa-ma?",
        layers: "OI.OrthoimageCoverage",
        format: 'image/jpeg',
        url_copy: "https://www.ign.es/wmts/pnoa-ma?",
        version: '1.1.1',
        addToTreeLayer: true,
        queriesArray: [],
        desc_popup: "Texto descriptivo de la capa común a todas sus entidades que será mostrado en cada popup",
        tipo_servicio: 'wmts', //https://www.idee.es/web/guest/directorio-de-servicios?p_p_id=DIRSRVIDEE_WAR_DIRSRVIDEEportlet_INSTANCE_KXnVu4qMJc1J&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&p_p_col_id=column-1&p_p_col_count=1&_DIRSRVIDEE_WAR_DIRSRVIDEEportlet_INSTANCE_KXnVu4qMJc1J_tipoServicio=WMTS&_DIRSRVIDEE_WAR_DIRSRVIDEEportlet_INSTANCE_KXnVu4qMJc1J_supertipo=OGC&_DIRSRVIDEE_WAR_DIRSRVIDEEportlet_INSTANCE_KXnVu4qMJc1J_descSrv=VISUALIZACION
        tilematrixSet: 'GoogleMapsCompatible', // Se obtiene del getCapabilities del servicio
        attribution: "WMTS © IGN",
        default_basemap: false
    }]
    }
];


var mapama_json = [{
    idgroup: 0,
    titulo_group: "SIGPAC",
    titulo_group_es: "SIGPAC",
    titulo_group_en: "SIGPAC",
    icono: "fas fa-layer-group", // https://fontawesome.com/v5.15/icons?d=gallery&p=2&q=layers
    capas: [{
        titulo_capa: "Mapa Base (IGN)",
        titulo_capa_es: "Mapa Base (IGN)",
        titulo_capa_en: "Base Map (IGN)",
        metadatos: "https://www.idee.es/csw-inspire-idee/srv/spa/catalog.search#/metadata/spaignwmts_mapa-raster",
        name: "sigpac:recinto",
        url_capa: "https://wms.mapa.gob.es/sigpac/wms?",
        layers: "sigpac:recinto",
        format: 'image/jpeg',
        url_copy: "https://www.ign.es/wmts/mapa-raster?",
        version: '1.1.1',
        addToTreeLayer: false,
        queriesArray: [],
        desc_popup: "Texto descriptivo de la capa común a todas sus entidades que será mostrado en cada popup",
        tipo_servicio: 'wmts',
        tilematrixSet: 'EPSG:3857',
        attribution: "WMTS © IGN",
        default_basemap: true
    }, 
     {
        titulo_capa: "Ortofotos (PNOA)",
        titulo_capa_es: "Ortofotos (PNOA)",
        titulo_capa_en: "Ortho-photos (PNOA)",
        metadatos: "http://www.ign.es/csw-inspire/srv/spa/main.home",
        name: "OI.OrthoimageCoverage",
        url_capa: "https://www.ign.es/wmts/pnoa-ma?",
        layers: "OI.OrthoimageCoverage",
        format: 'image/jpeg',
        url_copy: "https://www.ign.es/wmts/pnoa-ma?",
        version: '1.1.1',
        addToTreeLayer: true,
        queriesArray: [],
        desc_popup: "Texto descriptivo de la capa común a todas sus entidades que será mostrado en cada popup",
        tipo_servicio: 'wmts', //https://www.idee.es/web/guest/directorio-de-servicios?p_p_id=DIRSRVIDEE_WAR_DIRSRVIDEEportlet_INSTANCE_KXnVu4qMJc1J&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&p_p_col_id=column-1&p_p_col_count=1&_DIRSRVIDEE_WAR_DIRSRVIDEEportlet_INSTANCE_KXnVu4qMJc1J_tipoServicio=WMTS&_DIRSRVIDEE_WAR_DIRSRVIDEEportlet_INSTANCE_KXnVu4qMJc1J_supertipo=OGC&_DIRSRVIDEE_WAR_DIRSRVIDEEportlet_INSTANCE_KXnVu4qMJc1J_descSrv=VISUALIZACION
        tilematrixSet: 'EPSG:3857', // Se obtiene del getCapabilities del servicio
        attribution: "WMTS © IGN",
        default_basemap: false
    }]
    }
];


var rutasAzuel = {
    
}