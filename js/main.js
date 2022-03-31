import '../style.css';
import '../bootstrap/css/bootstrap.min.css';
import '../bootstrap/js/bootstrap.min.js';
import '/js/jspdf';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';
import KML from 'ol/format/KML';
import {Vector as VectorLayer} from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import {getArea, getLength} from 'ol/sphere';
import {
  Circle as CircleStyle,
  Fill,
  RegularShape,
  Stroke,
  Style,
  Text,
} from 'ol/style';
import {Draw, Modify} from 'ol/interaction';
import {LineString, Point} from 'ol/geom';


var coord = [-58.1553207,-32.2250377];
/* MAPA */
var layerMap = 
	new TileLayer({
		source: new OSM(),
});
/* MAPA */
/* Zonas */
/* var zonas= new TileLayer({
		title:"zonas",
		visible:true,
		source:new TileWMS({
			url:'http://geoservicios.entrerios.gov.ar/geoserver/ows',
			params: {'LAYERS': 'IDEER:zonas_ecologicas_economicas_ideer', 'TILED': true},
		})
	}); */
/* Zonas */
/* Frontera */
/* var frontera= new TileLayer({
		title:"frontera",
		visible:true,
		source:new TileWMS({
			url:'https://wms.ign.gob.ar/geoserver/wms',
			params: {'LAYERS': 'ign:area_de_desarrollo_de_fronteras', 'TILED': true},
		})
	}); */
/* Frontera */
/* KML */
const manzana = new VectorLayer({
	source: new VectorSource({
		url: '/files/kml/manzana/manzana.kml',
		format: new KML({
			extractStyles: false,
		}),
	}),
	//style: styleFunction,
});
const calles = new VectorLayer({
	source: new VectorSource({
		url: '/files/kml/calles/calle.kml',
		format: new KML({
			extractStyles: false,
		}),
	}),
	//style: styleFunction,
});
const edif = new VectorLayer({
	source: new VectorSource({
		url: '/files/kml/edif/edif.kml',
		format: new KML({
			extractStyles: false,
		}),
	}),
	//style: styleFunction,
});
const espverde = new VectorLayer({
	source: new VectorSource({
		url: '/files/kml/espverde/espverde.kml',
		format: new KML({
			extractStyles: false,
		}),
	}),
	//style: styleFunction,
});
const grupo = new VectorLayer({
	source: new VectorSource({
		url: '/files/kml/grupo/grupo.kml',
		format: new KML({
			extractStyles: false,
		}),
	}),
	//style: styleFunction,
});

const hidro = new VectorLayer({
	source: new VectorSource({
		url: '/files/kml/hidro/hidro.kml',
		format: new KML({
			extractStyles: false,
		}),
	}),
	//style: styleFunction,
});
const parcela = new VectorLayer({
	source: new VectorSource({
		url: '/files/kml/parcela/parcela.kml',
		format: new KML({
			extractStyles: false,
		}),
	}),
	//style: styleFunction,
});
const sec = new VectorLayer({
	source: new VectorSource({
		url: '/files/kml/sec/sec.kml',
		format: new KML({
			extractStyles: false,
		}),
	}),
	//style: styleFunction,
});
const vias = new VectorLayer({
	source: new VectorSource({
		url: '/files/kml/vias/vias.kml',
		format: new KML({
			extractStyles: false,
		}),
	}),
	//style: styleFunction,
});
/* KML */
/* Render Mapa */
const map = new Map({
  	target: 'map',
	layers: [
			layerMap,
	],
	view: new View({
		center: fromLonLat(coord,'EPSG:3857'),
		zoom: 19,
		/* maxZoom: 19,
		minZoom: 11, */
	})
});
/* Render Mapa */
/* Render measure */

const typeSelect = document.getElementById('type');
const showSegments = document.getElementById('segments');
const clearPrevious = document.getElementById('clear');

const style = new Style({
  fill: new Fill({
    color: 'rgba(255, 255, 255, 0.2)',
  }),
  stroke: new Stroke({
    color: 'rgba(0, 0, 0, 0.5)',
    lineDash: [10, 10],
    width: 2,
  }),
  image: new CircleStyle({
    radius: 5,
    stroke: new Stroke({
      color: 'rgba(0, 0, 0, 0.7)',
    }),
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.2)',
    }),
  }),
});

const labelStyle = new Style({
  text: new Text({
    font: '14px Calibri,sans-serif',
    fill: new Fill({
      color: 'rgba(255, 255, 255, 1)',
    }),
    backgroundFill: new Fill({
      color: 'rgba(0, 0, 0, 0.7)',
    }),
    padding: [3, 3, 3, 3],
    textBaseline: 'bottom',
    offsetY: -15,
  }),
  image: new RegularShape({
    radius: 8,
    points: 3,
    angle: Math.PI,
    displacement: [0, 10],
    fill: new Fill({
      color: 'rgba(0, 0, 0, 0.7)',
    }),
  }),
});

const tipStyle = new Style({
  text: new Text({
    font: '12px Calibri,sans-serif',
    fill: new Fill({
      color: 'rgba(255, 255, 255, 1)',
    }),
    backgroundFill: new Fill({
      color: 'rgba(0, 0, 0, 0.4)',
    }),
    padding: [2, 2, 2, 2],
    textAlign: 'left',
    offsetX: 15,
  }),
});

const modifyStyle = new Style({
  image: new CircleStyle({
    radius: 5,
    stroke: new Stroke({
      color: 'rgba(0, 0, 0, 0.7)',
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 0, 0.4)',
    }),
  }),
  text: new Text({
    text: 'Drag to modify',
    font: '12px Calibri,sans-serif',
    fill: new Fill({
      color: 'rgba(255, 255, 255, 1)',
    }),
    backgroundFill: new Fill({
      color: 'rgba(0, 0, 0, 0.7)',
    }),
    padding: [2, 2, 2, 2],
    textAlign: 'left',
    offsetX: 15,
  }),
});

const segmentStyle = new Style({
  text: new Text({
    font: '12px Calibri,sans-serif',
    fill: new Fill({
      color: 'rgba(255, 255, 255, 1)',
    }),
    backgroundFill: new Fill({
      color: 'rgba(0, 0, 0, 0.4)',
    }),
    padding: [2, 2, 2, 2],
    textBaseline: 'bottom',
    offsetY: -12,
  }),
  image: new RegularShape({
    radius: 6,
    points: 3,
    angle: Math.PI,
    displacement: [0, 8],
    fill: new Fill({
      color: 'rgba(0, 0, 0, 0.4)',
    }),
  }),
});

const segmentStyles = [segmentStyle];

const formatLength = function (line) {
  const length = getLength(line);
  let output;
  if (length > 100) {
    output = Math.round((length / 1000) * 100) / 100 + ' km';
  } else {
    output = Math.round(length * 100) / 100 + ' m';
  }
  return output;
};

const formatArea = function (polygon) {
  const area = getArea(polygon);
  let output;
  if (area > 10000) {
    output = Math.round((area / 1000000) * 100) / 100 + ' km\xB2';
  } else {
    output = Math.round(area * 100) / 100 + ' m\xB2';
  }
  return output;
};

/* const raster = new TileLayer({
  source: new OSM(),
}); */

const source = new VectorSource();

const modify = new Modify({source: source, style: modifyStyle});

let tipPoint;

function styleFunction(feature, segments, drawType, tip) {
  const styles = [style];
  const geometry = feature.getGeometry();
  const type = geometry.getType();
  let point, label, line;
  if (!drawType || drawType === type) {
    if (type === 'Polygon') {
      point = geometry.getInteriorPoint();
      label = formatArea(geometry);
      line = new LineString(geometry.getCoordinates()[0]);
    } else if (type === 'LineString') {
      point = new Point(geometry.getLastCoordinate());
      label = formatLength(geometry);
      line = geometry;
    }
  }
  if (segments && line) {
    let count = 0;
    line.forEachSegment(function (a, b) {
      const segment = new LineString([a, b]);
      const label = formatLength(segment);
      if (segmentStyles.length - 1 < count) {
        segmentStyles.push(segmentStyle.clone());
      }
      const segmentPoint = new Point(segment.getCoordinateAt(0.5));
      segmentStyles[count].setGeometry(segmentPoint);
      segmentStyles[count].getText().setText(label);
      styles.push(segmentStyles[count]);
      count++;
    });
  }
  if (label) {
    labelStyle.setGeometry(point);
    labelStyle.getText().setText(label);
    styles.push(labelStyle);
  }
  if (
    tip &&
    type === 'Point' &&
    !modify.getOverlay().getSource().getFeatures().length
  ) {
    tipPoint = geometry;
    tipStyle.getText().setText(tip);
    styles.push(tipStyle);
  }
  return styles;
}
map.addInteraction(modify);
let draw; // global so we can remove it later

function addInteraction() {
  const drawType = typeSelect.value;
  const activeTip =
    'Click para continuar dibujando ' +
    (drawType === 'Polygon' ? 'polygon' : 'line');
  const idleTip = 'Click para empezar a medir';
  let tip = idleTip;
  draw = new Draw({
    source: source,
    type: drawType,
    style: function (feature) {
      return styleFunction(feature, showSegments.checked, drawType, tip);
    },
  });
  draw.on('drawstart', function () {
    if (clearPrevious.checked) {
      source.clear();
    }
    modify.setActive(false);
    tip = activeTip;
  });
  draw.on('drawend', function () {
    modifyStyle.setGeometry(tipPoint);
    modify.setActive(true);
    map.once('pointermove', function () {
      modifyStyle.setGeometry();
    });
    tip = idleTip;
  });
  modify.setActive(true);
  map.addInteraction(draw);
}

typeSelect.onchange = function () {
  map.removeInteraction(draw);
  addInteraction();
};

//addInteraction();
const vector = new VectorLayer({
  source: source,
  style: function (feature) {
    return styleFunction(feature, showSegments.checked);
  },
});
showSegments.onchange = function () {
  vector.changed();
  draw.getOverlay().changed();
};

/* Render measure */
/* Render pdf */
const dims = {
  a0: [1189, 841],
  a1: [841, 594],
  a2: [594, 420],
  a3: [420, 297],
  a4: [297, 210],
  a5: [210, 148],
};

const exportButton = document.getElementById('export-pdf');

exportButton.addEventListener(
  'click',
  function () {
    exportButton.disabled = true;
    document.body.style.cursor = 'progress';

    const format = document.getElementById('format').value;
    const resolution = document.getElementById('resolution').value;
    const dim = dims[format];
    const width = Math.round((dim[0] * resolution) / 25.4);
    const height = Math.round((dim[1] * resolution) / 25.4);
    const size = map.getSize();
    const viewResolution = map.getView().getResolution();

    map.once('rendercomplete', function () {
      const mapCanvas = document.createElement('canvas');
      mapCanvas.width = width;
      mapCanvas.height = height;
      const mapContext = mapCanvas.getContext('2d');
      Array.prototype.forEach.call(
        document.querySelectorAll('.ol-layer canvas'),
        function (canvas) {
          if (canvas.width > 0) {
            const opacity = canvas.parentNode.style.opacity;
            mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
            const transform = canvas.style.transform;
            // Get the transform parameters from the style's transform matrix
            const matrix = transform
              .match(/^matrix\(([^\(]*)\)$/)[1]
              .split(',')
              .map(Number);
            // Apply the transform to the export map context
            CanvasRenderingContext2D.prototype.setTransform.apply(
              mapContext,
              matrix
            );
            mapContext.drawImage(canvas, 0, 0);
          }
        }
      );
      mapContext.globalAlpha = 1;
      const pdf = new jspdf.jsPDF('landscape', undefined, format);
      pdf.addImage(
        mapCanvas.toDataURL('image/jpeg'),
        'JPEG',
        0,
        0,
        dim[0],
        dim[1]
      );
      pdf.save('map.pdf');
      // Reset original map size
      map.setSize(size);
      map.getView().setResolution(viewResolution);
      exportButton.disabled = false;
      document.body.style.cursor = 'auto';
    });

    // Set print size
    const printSize = [width, height];
    map.setSize(printSize);
    const scaling = Math.min(width / size[0], height / size[1]);
    map.getView().setResolution(viewResolution / scaling);
  },
  false
);
/* Render pdf */


/* ----------------------------------------------------------------- */
(function() {
   // your page initialization code here
   // the DOM will be available here

/* JS Interaccion menu */
function onClick(id,callback){
	document.getElementById(id).addEventListener("click",callback);
}
/* Segun opcion: */
onClick('radioSec',function(){
	ubicarSec()
});
onClick('ckZona',function(){
	var check=document.getElementById("ckZona").checked;
	ubicarZonas(check)
});
onClick('ckCalles',function(){
	var check=document.getElementById("ckCalles").checked;
	ubicarCalles(check)
});
onClick('ckManzana',function(){
	var check=document.getElementById("ckManzana").checked;
	ubicarManzana(check)
});
onClick('ckRefunc',function(){
	var check=document.getElementById("ckRefunc").checked;
	ubicarRef(check)
});
onClick('ckBarrios',function(){
	var check=document.getElementById("ckBarrios").checked;
	ubicarBarr(check)
});
onClick('ckParcela',function(){
	var check=document.getElementById("ckParcela").checked;
	ubicarParcela(check)
});
onClick('ckGas',function(){
	var check=document.getElementById("ckGas").checked;
	ubicarGas(check)
});
onClick('ckSalud',function(){
	var check=document.getElementById("ckSalud").checked;
	ubicarSalud(check)
});
onClick('regla',function(){
	var check=document.getElementById("regla").checked;
  if(check){
    addInteraction();
  }else{
      map.removeInteraction(draw);

  }
});
/* Funciones */
function ubicarSec(){
	map.removeLayer(sec);
	map.addLayer(sec);
}
function ubicarZonas(check){
	if(check){
		map.addLayer(zonas);
	}else{
		map.removeLayer(zonas);
	}
}
function ubicarCalles(check){
	if(check){
		map.addLayer(calles);
	}else{
		map.removeLayer(calles);
	}
}
function ubicarManzana(check){
	if(check){
		map.addLayer(manzana);
	}else{
		map.removeLayer(manzana);
	}
}
function ubicarParcela(check){
	if(check){
		map.addLayer(parcela);
	}else{
		map.removeLayer(parcela);
	}
}

})();
/* JS Interaccion menu */
