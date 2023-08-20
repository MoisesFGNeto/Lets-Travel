var platform = new H.service.Platform({
  'apikey': 'mXuSQhjf0JrkbwFfH0wHruOzp9S5OLRLDFI9Bhsglw0'
});
  
// Obtain the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();
// Get an instance of the geocoding service:
var service = platform.getSearchService();

let lendmark = document.querySelector('.main-heading').textContent;
service.geocode({
    q: lendmark
  }, (result) => {
    var map = new H.Map(
        document.querySelector('.map'),
        defaultLayers.vector.normal.map,
        {
          zoom: 15,
          center: result.items[0].position
        });
    map.addObject(new H.map.Marker(result.items[0].position));    
    var ui = H.ui.UI.createDefault(map, defaultLayers);
  }, alert);

  
