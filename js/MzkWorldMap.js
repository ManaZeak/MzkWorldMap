import WorldMapView from './WorldMapView.js';


/* MzkWorldMap version 0.8 */
const MzkWorldMapVersion = '0.8';
// Configuration menu constants
const ConfigurationHTML = `
  <h1>MzkWorldMap configuration</h1>
  <p>Please set the following preferences, according to your computer's specifications.<br>
  <i>MzkWorldMap</i> requires a modern web browser that uses WebGL for 3D animation.</p>
  <form>
    <div>
      <h3>Texture quality :</h3>
      <p>Select the default resolution to be used when building world map.<br>
      <span class="warning">Warning, this has a heavy network cost.</span></p>
      <label for="2k">Low (2K, 2048 x 1024)</label>
      <input type="radio" id="id-2k" name="textureQuality" value="2k"><br>
      <label for="4k">Medium (4K, 4096 x 2048)</label>
      <input type="radio" id="id-4k" name="textureQuality" value="4k" checked><br>
      <label for="2k">High (8K, 8192 x 2048)</label>
      <input type="radio" id="id-8k" name="textureQuality" value="8k">
    </div><div>
      <h3>Country border precision :</h3>
      <p>Select the max distance between points to draw country borders.<br>
      <span class="warning">Warning, this has a heavy CPU cost.</span></p>
      <label for="110m">Low (110m)</label>
      <input type="radio" id="id-110m" name="borderPrecision" value="110m"><br>
      <label for="50m">Medium (50m)</label>
      <input type="radio" id="id-50m" name="borderPrecision" value="50m" checked><br>
      <label for="10m">High (10m)</label>
      <input type="radio" id="id-10m" name="borderPrecision" value="10m">
    </div><div>
      <h3>Sphere segments :</h3>
      <p>Select the number of segments needed to draw a sphere.<br>
      <span class="info">Moderate impact on CPU.</span></p>
      <label for="32">Low (32)</label>
      <input type="radio" id="id-32" name="sphereSegments" value="32"><br>
      <label for="64">Medium (64)</label>
      <input type="radio" id="id-64" name="sphereSegments" value="64" checked><br>
      <label for="128">High (128)</label>
      <input type="radio" id="id-128" name="sphereSegments" value="128"><br>
    </div><div>
      <h3>Shadow resolution :</h3>
      <p>Define the shadow map square resolution.<br>
      <span class="warning">Warning, this has a heavy CPU cost.</span></p>
      <label for="512">Low (512x512)</label>
      <input type="radio" id="id-512" name="shadowResolution" value="512"><br>
      <label for="2048">Medium (2048x2048)</label>
      <input type="radio" id="id-2048" name="shadowResolution" value="2048" checked><br>
      <label for="8192">High (8192x8192)</label>
      <input type="radio" id="id-8192" name="shadowResolution" value="8192"><br>
    </div>
    <p class="mzkworldmap-debug"><label for="debug">Debug mode</label><input type="checkbox" id="id-debug" name="debug"></p>
    <button type="submit">Start MzkWorldMap</button>
  </form>
`;
const ConfigurationValues = {
  textures: ['2k', '4k', '8k'],
  borders: ['110m', '50m', '10m'],
  segments: ['32', '64', '128'],
  shadows: ['512', '2048', '8192']
};


class MzkWorldMap {


  /** @author Arthur Beaulieu
   * @param {object} options
   * @param {string} options.baseUrl - URL to for 'assets/' folder
   * @param {object} options.renderTo - The DOM element to render MzkWorldMap to
   * @param {function} [options.countryClicked] - The callback to call when a country is clicked
   * @param {object} [options.userData] - User 'object per country' data, see README.md **/
  constructor(options) {
    // Save options in controller
    this._assetsUrl = options.assetsUrl || null;
    this._renderTo = options.renderTo || null;
    if (this._renderTo === null || this._assetsUrl === null) {
      console.error('Missing arguments in new MzkWorldMap()'); return;
    }
    // Optional arguments
    this._countryClicked = options.countryClicked || (() => {});
    this._userData = options.data || { type: 'default', countries: [] };
    // Check local storage for previous preferences
    this._preferences = this._getLocalPreferences();
    this._view = null; // Active WorldMapView
    // Init parent with css base style for views to be properly rendered
    this._renderTo.classList.add('mzkworldmap');
    // Determine if session is user first connection
    if (!this._hasLocalPreferences()) { // No local preferences or incorrect local preferences
      this._buildConfigurationView({ emptyLocalStorage: true }); // Init with configuration to store preferences
    } else {
      this._buildWorldMapView(); // Build WorldMapView with local preferences
    }
  }


  /** Destroy view and all internals **/
  destroy() {
    return new Promise(resolve => {
      this._view.destroy();
      // Delete object attributes
      Object.keys(this).forEach(key => { delete this[key]; });
      resolve();
    });
  }


  /*  ----------  WorlMapView handler and configurator  ----------  */


  /** Build the configuration view either with local preferences or nothing
   * The configuration view aim to modify the WorldMapView rendering according to graphical preferences.
   * The method will render the ConfigurationHTML template to its parent (this._renderTo) full size and wait a <form> submission event.
   * When submitted, preferences are saved in the local storage to skip this configuration view on user's next session.
   * When true, the options.emptyLocalStorage flag will initialize radios and checkbox according to the local storage content.
   * When false, it will keep the initial template radios (all radio checked with Medium, Debug unchecked).
   * It provides preferences for texture resolution, geojson point distance, sphere segments and shadow map resolution.
   * For each of these preferences, there are three levels ; Low, Medium and High.
   * Finally, a debug checkbox allow to open map with THREE helpers displayed **/
  _buildConfigurationView(options) {
    // The container form container (mostly define padding on sides)
    const container = document.createElement('DIV');
    container.classList.add('configuration-form');
    container.innerHTML = ConfigurationHTML; // Import configuration HTML
    // Set checked radio and checkbox according to local preferences if session has valid preferences
    if (options.emptyLocalStorage === false) {
      this._preferences = this._getLocalPreferences();
      container.querySelector(`#id-${this._preferences.textureQuality}`).checked = true;
      container.querySelector(`#id-${this._preferences.borderPrecision}`).checked = true;
      container.querySelector(`#id-${this._preferences.sphereSegments}`).checked = true;
      container.querySelector(`#id-${this._preferences.shadowResolution}`).checked = true;
      container.querySelector(`#id-debug`).checked = this._preferences.debug;
    }
    // Handle form submission
    const form = container.querySelector('form');
    form.addEventListener('submit', event => {
      event.preventDefault(); // Prevent location redirection with params
      const data = new FormData(form);
      const output = [];
      // Iterate over radios to extract values
      for (const entry of data) {
        output.push(entry[1]);
      }
      // Set debug from checkbox state
      let debug = false;
      if (output[4] === 'on') {
        debug = true;
      }
      // Update local storage and session preferences
      this._setLocalPreferences(output, debug);
      this._preferences = this._getLocalPreferences();
      // Remove configuration view and build WorldMapView
      requestAnimationFrame(() => {
        container.style.opacity = 0
        setTimeout(() => {
          this._renderTo.removeChild(container);
          this._buildWorldMapView();
        }, 1000); // 2.5s delay according to CSS transition value
      });
    }, false);
    // Append configuration view and start opacity transition
    this._renderTo.appendChild(container);
    requestAnimationFrame(() => container.style.opacity = 1);
  }


  /** Build a WorldMapView with local preferences.
   * The wmv allows to navigate in 3D around Earth, click on countries and do stuff on caller to those country clicked.
   * As this view is meant to be launched as a plugin, several data must be retrieved:
   * - The ManaZeak WorldData, that contains all countries, with capital city and country center lat/long among others.
   * - The Geo data (geojson) that will allow the country clicking part, also to render countries as unique meshes.
   * - Finally, the library data is an external object that contains country with artists (the ones to be displayed with a bar).
   * Graphical preferences must be sent through the wmv constructor (implying they are already set when calling new). **/
  _buildWorldMapView() {
    const worldDataPath = `${this._assetsUrl}json/WorldData.json` // WorldData is lat/long for all countries
    const geoPath = `${this._assetsUrl}json/GeojsonData_${this._preferences.borderPrecision}.json`; // All world geojson dataset must be loaded to draw boundaries properly
    // Load ManaZeak WorldData and Geo data according to given base url and build WorldMapView with all parameters
    this._readJSONFile(worldDataPath)
      .then(worldData => {
        this._readJSONFile(geoPath)
          .then(geoData => {
            this._view = new WorldMapView({
              renderTo: this._renderTo, // DOM element to render canva to
              assetsUrl: this._assetsUrl || './', // Fallback on local execution context
              countryClickedCB: this._countryClicked, // Country clicked external callback
              configurationCB: this._congigurationClicked.bind(this), // Keep scope at definition
              worldData: worldData, // Lat/Long for interresting points
              userData: this._buildFinalData(worldData, this._userData, geoData), // Extend library data with world data (only country that has artists will be filled)
              geoData: geoData, // Raw Geojson data
              preferences: this._preferences // Local storage preferences
            });
            // Clean WebGL and WorldMapView when user leave page
            window.addEventListener('beforeunload', this.destroy.bind(this), false);
          }) // Catch for geojson data loading
          .catch(err => console.error(err));
      }) // Catch for world data loading
      .catch(err => console.error(err));
  }


  /** Callback that needs to be sent to WorldMapView, to open up the configuration view when clicked on gear icon.
   * This allow to destroy the current WorldMapView to launch it again with new settings without reloading.
   * Since this method is called from WorldMapView, and therefor testifies that preferences are set, we build the
   * configuration view with the local storage content (emptyLocalStorage false). **/
  _congigurationClicked() {
    this._buildConfigurationView({ emptyLocalStorage: false });
    setTimeout(() => {
      this._view.destroy().then(() => this._view = null);
    }, 2000); // Delay view destruction to let fade in animation end
  }


  /*  ----------  Local storage utils  ----------  */


  /** Get local storage items and return as preferences object with these.
   * Debug must be json parsed because local storage only contains string. **/
  _getLocalPreferences() {
    return {
      textureQuality: localStorage.getItem('mzkworldmap-texture-quality'),
      borderPrecision: localStorage.getItem('mzkworldmap-border-precision'),
      sphereSegments: localStorage.getItem('mzkworldmap-sphere-segments'),
      shadowResolution: localStorage.getItem('mzkworldmap-shadow-resolution'),
      debug: JSON.parse(localStorage.getItem('mzkworldmap-debug')) // Convert string to bool
    };
  }


  /** Set local storage items according to submitted form values in configuration HTML. **/
  _setLocalPreferences(preferences, debug) {
    // Array order follows HTML template order
    localStorage.setItem('mzkworldmap-texture-quality', preferences[0]);
    localStorage.setItem('mzkworldmap-border-precision', preferences[1]);
    localStorage.setItem('mzkworldmap-sphere-segments', preferences[2]);
    localStorage.setItem('mzkworldmap-shadow-resolution', preferences[3]);
    localStorage.setItem('mzkworldmap-debug', debug);
  }


  /** Return true only when local storage do contain every needed preferences, and with values
   * that are valid to send in WorldMapView, return false otherwise. **/
  _hasLocalPreferences() {
    return ConfigurationValues.textures.indexOf(this._preferences.textureQuality) !== -1 &&
           ConfigurationValues.borders.indexOf(this._preferences.borderPrecision) !== -1 &&
           ConfigurationValues.segments.indexOf(this._preferences.sphereSegments) !== -1 &&
           ConfigurationValues.shadows.indexOf(this._preferences.shadowResolution) !== -1 &&
           typeof this._preferences.debug === 'boolean'; // Debug checkbox in necessarly a bool
  }


  /*  ----------  WorldMapView controller utils  ----------  */


  /** This method prepare libraryData for WorldMapView. A height scale must be computed, according to artists count.
   * The height scale factor represents the 'weight' of a country by its artists number. Countries with lot of artists
   * will be rendered with a high cylinder on country center. Otherwise, the cylinder will remain low.
   * Output array contains countries with artists, relative scale, and extend every property of their respective country from ManaZeak WorldData **/
  _buildFinalData(worldData, userData, geoData) {
    const output = []; // Output array that consist of all countries that has artists
    const type = userData.type; // Get data object type per country
    let maxCount = 0; // The maxArtistsCount is to know which country have the most artists, so it can be the high bound for pin height
    // First of, we only select contries that have artists
    for (let i = 0; i < userData.countries.length; ++i) {
      for (let j = 0; j < worldData.countries.length; ++j) {
        // We found in world data, the country associated with the current library data country
        if (userData.countries[i].trigram === worldData.countries[j].trigram) {
          const country = worldData.countries[j];
          country[type] = userData.countries[i][type]; // Append objects in output
          // Update country that has the most artists if needed
          if (maxCount < userData.countries[i][type].length) {
            maxCount = userData.countries[i][type].length;
          }
          output.push(country); // Completting output array with current artist
          break; // Go on to next data country, break worldData iteration
        }
      }
    }
    // Then we fill each selected countries with geojson properties
    for (let i = 0; i < output.length; ++i) {
      // Then we compute their associated height on map in percentage
      output[i].scale = output[i][type].length / maxCount;
      for (let j = 0; j < geoData.features.length; ++j) {
        if (output[i].trigram === geoData.features[j].properties.GU_A3) {
          // Extend geojson properties
          output[i] = { ...output[i], ...geoData.features[j].properties };
          break;
        }
      }
    }
    // Finally return data object
    return output;
  }


  /** Read JSON file with XMLHttpRequest.
   * When running standalone, the browser cors policy must be disabled to load local JSON files.
   * Please beware to set this cors policy back to its default when done playing with MzkWorldMap. **/
  _readJSONFile(path, callback) {
    return new Promise((resolve, reject) => {
      try {
        const request = new XMLHttpRequest();
        request.overrideMimeType('application/json');
        request.open('GET', path, true);
        request.onreadystatechange = () => {
          if (request.readyState === 4) {
            if (request.status === 200) {
              resolve(JSON.parse(request.responseText));
            } else {
              reject(`Error when loading ${path}.\nPlease contact support@manazeak.org (request status: ${request.status}).`);
            }
          }
        };
        request.send();
      } catch(err) {
        reject(`Error when loading ${path}.\nPlease contact support@manazeak.org (${err}).`);
      }
    });
  }


}


window.MzkWorldMap = MzkWorldMap; // Global scope attachment will be made when bundling this file
export default MzkWorldMap;
