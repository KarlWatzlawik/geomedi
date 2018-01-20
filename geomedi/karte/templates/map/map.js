function ourfunction(map, options) {
    //Marker mit Inhalten aus GeoJson
    function onEachFeature(feature, layer) {
        //Popup-Inhalte für Point-Marker
        if (feature.geometry.type === 'Point') {
            layer.bindPopup('<h4 class="h4_pin">' + feature.properties.name + '</h4>' + '<img src="../static/map/images/sights/' + feature.properties.picture + '.jpg"/><br/>' + '<br><button class="button_pin trigger">mehr</button>');
            //Bei klick auf Botten wird die Sidebar geöffnet
            $('#map').on('click', '.trigger', function () {
                show = true;
                openSidebar();
            });
            layer.on({
                click: openSidebar,
            });
        }
        //Popup-Inhalte für Polygon-Marker
        if (feature.geometry.type === 'MultiPolygon') {
            layer.bindPopup(feature.properties.name);
        }
        //OnClick Sidebar ausbelden
        map.on('click', function () {
            sidebar.hide();
        })
    }

    //SIDEBAR-FUNCTION
    var show = false;       //boolean-wert zum aktivieren der sidebar
    function openSidebar(e) {
        if (show) {
            sidebar.toggle();   //Anzeige der Sidebar
            show = false;
        }
        if (e.target.feature.geometry.type === 'Point') {
            sidebar.setContent('<h3 class="h3_sidebar">' + e.target.feature.properties.name + '</h3><br/>' + '<img src="../static/map/images/sights/' + e.target.feature.properties.picture + '.jpg"/><br/>' + '<p class="p_sidebar">' + e.target.feature.properties.description + '</p>');     //Sidebar-Inhalte
        }
    }

    //Layercontrol erstellen
    var controlLayers = L.control.layers().addTo(map);

    //Marker zur Karte hinzufügen
    var ourdata = '{% url "data" %}';                    //URL für Markerdaten im GeoJSON-Format

    $.getJSON(ourdata, function (data) {
        var marker = L.geoJson(data, {onEachFeature: onEachFeature}).addTo(map);
        controlLayers.addOverlay(marker, 'Marker');      //erzeugt Layergrout "Marker"
    })

    //Polygone zur Karte hinzufügen
    var polydata = '{% url "poly" %}';                   //URL für Polygondaten im GeoJSON-Format

    $.getJSON(polydata, function (poly) {
        var polygone = L.geoJson(poly, {onEachFeature: onEachFeature}).addTo(map);
        controlLayers.addOverlay(polygone, 'Polygone');  //erzeugt Layergroup "Polygone"
    })
    var start = false;  //Boolean Variable zum aktivieren der Sidebar

    //########## ROUTING ##########
    //Quelle: http://www.liedman.net/leaflet-routing-machine/tutorials/
    L.Routing.control({
        lineOptions: {
            styles: [
                {color: 'black', opacity: 0.3, weight: 11},
                {color: 'white', opacity: 0.9, weight: 9},
                {color: 'red', opacity: 1, weight: 3}
            ]
        },
        routeWhileDragging: true,
        //Geocoder Nominatim
        geocoder: L.Control.Geocoder.nominatim(),
        //Routing ausklappbar (true)
        collapsible: true,
        //Routing zu Beginn nicht anzeigen (false)
        show: false,
        //Sprachausgabe
        language: 'de'
    }).addTo(map);

    ////########## SIDEBAR ##########
    //Quelle: https://github.com/turbo87/leaflet-sidebar/
    var sidebar = L.control.sidebar('sidebar', {
        position: 'left',
        closeButton: 'true'
    });
    //Start-Option: show/hide sidebar
    setTimeout(function () {
        sidebar.hide();
    }, 500);

    //Add content to sidebar
    map.addControl(sidebar);
}

////########## SLEEP MAP ##########
//Quelle: https://github.com/CliffCloud/Leaflet.Sleep
map3 = L.map('map', {
    //Aktivieren der Sleep-Funktion
    sleep: true,
    //Timer (ms) bis zum erneuten Aktivieren der Sleep-Funktion
    sleepTime: 750,
    //Timer (ms) bis zum Erwachen der Karte bei Mouseover
    wakeTime: 750,
    //Zeigt Infos wie die Karte aktiviert werden kann
    sleepNote: true,
    //Erlaubnis die styling note zu überschreiben
    sleepNoteStyle: {color: 'red'},
    //Mouseover aktiviert die Karte (Klick geht immer)
    hoverToWake: true,
    //Transparenz bei deaktivierter Karte
    sleepOpacity: .7
})
