
const width = 28637;
const height = 27328;
const tileSize = 255;

function loadDZI() {   
    var layer = new ol.layer.Tile();
    var url = '{TileGroup}tiles/{z}/{x}_{y}.png';

    var source = new ol.source.Zoomify({
        url: url,
        size: [width, height],
        tileSize: tileSize,
        crossOrigin: 'anonymous'
    });

    var offset = Math.ceil(Math.log(tileSize)/Math.LN2);

    source.setTileUrlFunction(function(tileCoord) {
        return url.replace(
            '{z}', tileCoord[0] + offset
        ).replace(
            '{x}', tileCoord[1]
        ).replace(
            '{y}', tileCoord[2]
        ).replace(
            '{TileGroup}',''
        );
    });

    layer.setExtent([0, -height, width, 0]);
    layer.setSource(source);

    return layer;
}

var layer = loadDZI();
var layer2 = loadDZI();

const overviewMapControl = new ol.control.OverviewMap({
    layers: [layer2]
});

var map = new ol.Map({
    controls: ol.control.defaults.defaults().extend([overviewMapControl]),
    target: 'map',
    logo: false
});

map.setView(
    new ol.View({
        resolutions: layer.getSource().getTileGrid().getResolutions(),
        extent: layer.getExtent(),
        constrainOnlyCenter: true
    })
);
map.getView().fit(layer.getExtent(), { size: map.getSize() });

map.addLayer(layer);

var searchBox = document.getElementById("searchbox");
var searchBoxOpener = document.getElementById("searchboxopener");
searchBoxOpener.onclick = function() {
  searchBox.style.display = "block";
  searchBoxOpener.style.display = "none";
}
for (const blog in blogs) {
  const child = document.createElement("a");
  child.href="#";
  child.textContent = blog;
  child.onclick = function() {
    map.getView().setCenter([blogs[blog][0], -blogs[blog][1]]);
    map.getView().setZoom(7);
    searchBox.style.display = "none";
    searchBoxOpener.style.display = "block";
  }
  searchBox.appendChild(child);
}

setTimeout(function(){
    overviewMapControl.setCollapsed(false);
    overviewMapControl.setCollapsible(false);

    let ovMap = overviewMapControl.getOverviewMap();
    ovMap.getView().setMinZoom(10);
    ovMap.getView().setMaxZoom(10);
},1000);