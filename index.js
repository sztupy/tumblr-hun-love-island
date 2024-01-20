var viewer = OpenSeadragon({
    id: "openseadragon1",
    prefixUrl: (hasPrefix ? "../" : "") + "openseadragon/images/",
    showNavigator:  true,
    maxZoomPixelRatio: 4,
    navigatorBackground: '#DCE2FF',
    tileSources: {
        "Image": {
            "xmlns":    "http://schemas.microsoft.com/deepzoom/2008",
            "Format":   "png",
            "Overlap":  "1",
            "TileSize": "255",
            "Url": "tiles/",
            "Size": {
                "Height": height,
                "Width": width
            }
        }
    }
});

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
    viewer.viewport.panTo(new OpenSeadragon.Point(blogs[blog][0], blogs[blog][1]));
    viewer.viewport.zoomTo(15);
    searchBox.style.display = "none";
    searchBoxOpener.style.display = "block";
  }
  searchBox.appendChild(child);
}