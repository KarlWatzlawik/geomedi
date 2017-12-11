function ourfunction (map, options){
    
    //Marker with GeoJson
    var name;
    function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.picture) {
        layer.bindPopup('<p>' + feature.properties.picture + '</p> <br/> <img src="{% static "map/images/Fernsehtrum.png" %}" /><p>' + feature.properties.description + '</p>');
        sidebar.setContent('<b>' + feature.properties.name + '</b>');
    }

    //OnClick show Sidebar
    layer.on('click', function (e) {
        sidebar.toggle();
    });

    //OnClick hide Sidebar
    map.on('click', function () {
        sidebar.hide();
    })
}

    var controlLayers = L.control.layers().addTo(map);

    //Add Marker
    var ourdata = '{% url "data" %}';
    
    $.getJSON(ourdata, function(data){
        var marker = L.geoJson(data,{onEachFeature: onEachFeature}).addTo(map);
        controlLayers.addOverlay(marker, 'Marker');
    })

    //Add Polygon
    var polydata = '{% url "poly" %}';
    
    $.getJSON(polydata, function(poly){
        var polygone = L.geoJson(poly).addTo(map);
        controlLayers.addOverlay(polygone, 'Polygone');
    })
    
    //Routing
    L.Routing.control({
        //Startpunkte festlegen
        waypoints: [
            L.latLng(52.514, 13.350),
            L.latLng(52.520, 13.409)
        ],
        //Lineoptions
        lineOptions: {
            styles: [
                {color: 'black', opacity: 0.3, weight: 11},
                {color: 'white', opacity: 0.9, weight: 9},
                {color: 'red', opacity: 1, weight: 3}
            ]
        },
        //List collapse
        collapsible: true,
        //Geocoder
        geocoder: true,
        //show routing in beginning
        show: false,

    }).addTo(map);

    //Init Sidebar
    var sidebar = L.control.sidebar('sidebar', {
        position: 'left',
        closeButton: 'true'
    });
    //Start options: show/hide sidebar
    setTimeout(function () {
        sidebar.hide();
    }, 500);

    //Add content to sidebar
    //sidebar.setContent('<b>' + test + '</b>');
    map.addControl(sidebar);

 }