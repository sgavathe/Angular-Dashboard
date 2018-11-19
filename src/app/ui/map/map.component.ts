import { Component, OnInit, OnDestroy } from '@angular/core';
import Map from 'ol/Map.js';
import * as ol_extent from 'ol/extent.js';
import View from 'ol/View.js';
import {defaults as defaultControls, FullScreen, ZoomToExtent, Control} from 'ol/control.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import 'style-loader!ol/ol.css';
import { GETSTATSService } from '../../service/getstats.service';
import { Http } from '@angular/http';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import ol_layer_Vector from 'ol/layer/Vector';
import ol_source_Vector from 'ol/source/Vector';
import ol_style_Fill from 'ol/style/Fill.js';
import ol_style_Text from 'ol/style/Text.js';
import ol_style_Stroke from 'ol/style/Stroke.js';
import ol_style_Style from 'ol/style/Style.js';
import ol_style_Circle from 'ol/style/Circle.js';
import * as $ from 'jquery';
import ol_format_EsriJSON from 'ol/format/EsriJSON.js';
import {defaults as defaultInteractions} from 'ol/Interaction.js';
import { MessageService } from '../../service/message.service';
import Overlay from 'ol/Overlay.js';
import Cluster from 'ol/source/Cluster';
import AnimatedCluster from 'ol-ext/layer/AnimatedCluster';
import SelectCluster from 'ol-ext/interaction/SelectCluster';
import ol_coordinate_convexHull from 'ol-ext/geom/ConvexHull';
import Polygon from 'ol/geom/Polygon';
import ol_geom_Geometry from 'ol/geom/Geometry';
import GeoJSON from 'ol/format/GeoJSON.js';
import TileJSON from 'ol/source/TileJSON.js';
import {unByKey} from 'ol/Observable.js';
import {easeOut} from 'ol/easing.js';
import {fromLonLat} from 'ol/proj';

let flashduration = 3000;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {  
  showOffices: any;
  showOfficePoly: any;
  officepolyESRILayer: any;
  message: any;
  subscription: Subscription;
  layerFeatures: any;
  map: Map;  
  sourceFeatures: any;
  showPopup: any;
  toggleOfficeType: any;
  isClusterOn: any;
  clusterLayer: any;
  featuresArray: string[] = [];
  ocdPolyArray: string[] = [];
  pointFlash: any;
  showClusterPopup: any;
  //showClusterPopup: any;
  constructor(private dataService:GETSTATSService, 
              private messageService:MessageService ) {
    let that = this;
    this.subscription = this.messageService.getMessage().
            subscribe(message => 
            { 
                //this.message = message; 
                if(message.datatype == 'ocdpoints' ){
                  var feature = this.sourceFeatures.forEachFeature( (feature) => {
                        if(feature.get('OBJECTID') == message.text){
                            var extent = feature.getGeometry().getExtent().slice(0);
                            //that.map.getView().fit(extent, {duration: 500}, {zoom: 6});
                            var ext=feature.getGeometry().getExtent();
                            var center=ol_extent.getCenter(ext);
                            that.map.setView( new View({
                                projection: 'EPSG:102100',//or any projection you are using
                                center: [center[0] , center[1]],//zoom to the center of your feature
                                zoom: 12 //here you define the levelof zoom
                            }));

                            // var field_location = feature.getGeometry();
                            // var field_extent = field_location.getExtent();
                            // that.map.getView().fit(field_extent, that.map.getSize());
                            // const coords = fromLonLat([field_location.flatCoordinates[0], field_location.flatCoordinates[1]]);
                            // that.map.getView().animate({center: coords, zoom: 10});
                            that.map.on('moveend', ()=> {          
                               //To unbind the event
                               that.map.removeEventListener('moveend');                                                  
                               //that.messageService.clearMessage();                          
                               that.pointFlash(feature);
                               window.scrollTo(0, 0);
                               that.showClusterPopup(feature, '', that.map);                               
                            })

                           
                        }
                    }, that );

                }else{
                var source = this.officepolyESRILayer.getSource();   
                let zoomtoofficepoly = function(){
                    var features = source.getFeatures();
                    for (var i = 0, ii = features.length; i < ii; i++) {        
                      if(features[i].get('OCD') == message.text){                                                                  
                            var extent = features[i].getGeometry().getExtent().slice(0);                   
                            that.map.getView().fit(features[i].getGeometry(), {duration: 500}, {zoom: 6}, that.map.getSize())
                            window.scrollTo(0, 0);   
                            return false;    
                      }                                       
                    }
                }

                this.officepolyESRILayer.setVisible(true);
                this.clusterLayer.setZIndex(1);
                this.officepolyESRILayer.setZIndex(0);
                
                if(source.getFeatures().length > 0)  {
                  zoomtoofficepoly();
                }else{
                    if (this.officepolyESRILayer instanceof  ol_layer_Vector) {                   
                      this.officepolyESRILayer.on("precompose", function () {
                          that.officepolyESRILayer.removeEventListener('precompose');                                    
                          console.log("precompose stage");
                      });
                      this.officepolyESRILayer.on("render", ()=> {
                        that.officepolyESRILayer.removeEventListener('render');    
                        that.officepolyESRILayer.removeEventListener('precompose');   
                        //dispatch your custom event
                        //source.set('loadend', Math.random());
                        zoomtoofficepoly();
                      });                   
                  }
                }                               
              }
            });
   }

//   public testService(): Observable<any>{     
//      let mapUrl = 'http://gisdev.labs.addev.ssa.gov/arcgis/rest/services/Getstats/ODAR/MapServer/3/query?where=ZIP%3D21227&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=json';
//      return this.dataService.request({method: 'GET', url: mapUrl}).map((response) => {             
//       return response;
//     }); 
//   }

  ngOnDestroy() {
     // unsubscribe to ensure no memory leaks
     this.subscription.unsubscribe();
  }
  
  ngOnInit() {

    let offTypes = {
      "ADO": ['11'],
      "DDS": ['07', '15'],
      "DDS-DDS": ['07'],
      "DDS-DHU": ['15'],
      "EXTAGY": ['09', '0D'],
      "EXTAGY-EXTAGY": ['09'],
      "EXTAGY-OCSE": ['0D'],
      "EQUIP-EQUIP": ['93'],
      "EQUIP-ROCC": ['10'],
      "EQUIP": ['93', '10'],

      "FO": ['13', '01', '18', '16', '0E'],
      "FO-FO/1": ['13'],
      "FO-FO/2": ['01'],
      "FO-FO/RS": ['18'],
      "FO-FSP": ['16'],
      "FO-VSDEXT": ['0E'],

      "FOSU/WSU/SDW": ['42', '30', '65'],
      "FOSU/WSU/SDW-FOSU": ['42'],
      "FOSU/WSU/SDW-ICTS": ['30'],
      "FOSU/WSU/SDW-SDW": ['65'],

      "MISC": ['90', '06', '26'],
      "MISC-AGENCY": ['90'],
      "MISC-HCFA": ['06'],
      "MISC-MISC": ['26'],

      //"ODAR": ['52', '71', '54', '50', '29', '64', '0A', '0C'],
      //"ODAR-OAOLO": ['52', '71', '54'],              
      "ODAR": ['28', '29', '50', '64', '0A', '0C'],
      "ODAR-OHOCO": ['28'],
      "ODAR-OHORO": ['29'],
      "ODAR-OHOFO": ['50'],
      "ODAR-OHOPRS": ['64', '0A', '0C'],

      "OAO": ['49','51','52','54','71'],
      "OAO-OAOCO": ['49'],
      "OAO-OAOAO": ['51'],
      "OAO-OAODR": ['52'],
      "OAO-OAOLO": ['54'],
      "OAO-OAOLD": ['71'],

      //"OAO-OHACO": ['28'],               
      //"ODAR-VTC": ['0C'],
      //"ODAR/roll": ['51', '52', '71', '54'],
      //"ODAR/roll-OAOAO": ['51'],
      //"ODAR/roll-OAODR": ['52'],
      //"ODAR/roll-OAOLD": ['71'],            
      //"ODAR/roll-OAOLO": ['54'],
      "OIG": ['0H', '32', '31', '41', '25', '27'],
      "OIG-OIGCDI": ['0H'],
      "OIG-OIGABR": ['32'],
      "OIG-OIGADV": ['31'],
      "OIG-OIGIBR": ['41'],
      "OIG-OIGIDV": ['25'],
      "OIG-OIGOTH": ['27'],
      "OQP": ['23'],
      //"PSC": ['02', '05'],
      "PC/TSC/WBDOC": ['56', '47', '02', '81', '82', '05', '21'],
      "PC/TSC/WBDOC-OCO": ['56'],
      "PC/TSC/WBDOC-OEO": ['47'],
      "PC/TSC/WBDOC-PC": ['02'],
      "PC/TSC/WBDOC-SAU": ['81', '82'], //two in one
      "PC/TSC/WBDOC-TSC": ['05'],
      "PC/TSC/WBDOC-WBDOC": ['21'],

      //"PSC/roll": ['20', '19', '04', '98', '08'],
      //"PSC/roll-OTHPC": ['20'],
      //"PSC/roll-OTHTSC": ['19'],
      //"PSC/roll-PCMOD": ['04'],
      //"PSC/roll-TSTOFC": ['98'],
      //"PSC/roll-TSUNIT": ['08'],

      "RO": ['03'],

      //"RO/roll": ['24', '22'],
      //"RO/roll-OTHRRO": ['24'],
      //"RO/roll-RSO": ['22'],

      "SSA HQ": ['59', '63'],
      "SSA HQ-COMSNR": ['59'],
      "SSA HQ-DIVISN": ['63'] //,
      //"SDW": ['65']

      //"SSA HQ/Roll": ['60', '66', '61'],
      //"SSA HQ/Roll-DEPCOM": ['60'],
      //"SSA HQ/Roll-DEPMNT": ['66'],
      //"SSA HQ/Roll-OFFICE": ['61']
  };

  var officeTypeSymbols = {
      "ADO": [255, 215, 0, 1],
      "DDS-DDS": [255, 0, 255, 1],
      "DDS-DHU": [0, 255, 0, 1],
      "EXTAGY-EXTAGY": [0, 255, 255, 1],
      "EXTAGY-OCSE": [100, 149, 237, 1],
      "EQUIP-EQUIP": [255, 165, 0, 1],
      "EQUIP-ROCC": [0, 250, 154, 1],

      "FO": [102, 51, 255, 1],
      "FO-FO/1": [166, 206, 227, 1],
      "FO-FO/2": [31, 120, 180, 1],
      "FO-FO/RS": [178, 223, 138, 1],
      "FO-FSP": [51, 160, 44, 1],
      "FO-VSDEXT": [251, 154, 153, 1],

      "FOSU/WSU/SDW-FOSU": [154, 205, 50, 1],
      "FOSU/WSU/SDW-ICTS": [32, 178, 170, 1],
      "FOSU/WSU/SDW-SDW": [250, 235, 215, 1],

      "MISC-AGENCY": [239, 237, 245, 1],
      "MISC-HCFA": [188, 189, 220, 1],
      "MISC-MISC": [117, 107, 177, 1],

      //"ODAR-OAOCO": [127, 201, 127, 1],
      "ODAR-OHO": [190, 174, 212, 1],
      //"ODAR-OAOLO": [253, 192, 134, 1],
      "ODAR-OHOCO": [253, 192, 134, 1],
      "ODAR-OHORO": [56, 108, 176, 1],
      "ODAR-OHOFO": [255, 255, 153, 1],                
      "ODAR-OHOPRS": [240, 2, 127, 1],
      "ODAR-VTC": [191, 91, 23, 1],

      "OAO-OAOCO": [127, 201, 127, 1],
      "OAO-OAOAO": [253, 192, 134, 1],
      "OAO-OAODR": [0, 250, 154, 1],
      "OAO-OAOLO": [188, 189, 220, 1],
      "OAO-OAOLD": [118, 42, 131, 1],

      //"ODAR/roll-OAOAO": [202, 0, 32, 1],
      //"ODAR/roll-OAODR": [244, 165, 130, 1],
      //"ODAR/roll-OAOLD": [146, 197, 222, 1],
      //"ODAR/roll-OAOLO": [5, 113, 176, 1],
      "OIG-OIGCDI": [118, 42, 131, 1],
      "OIG-OIGABR": [175, 141, 195, 1],
      "OIG-OIGADV": [231, 212, 232, 1],
      "OIG-OIGIBR": [217, 240, 211, 1],
      "OIG-OIGIDV": [127, 191, 123, 1],
      "OIG-OIGOTH": [27, 120, 55, 1],
      "OQP": [255, 255, 150, 1],

      "PC/TSC/WBDOC-OCO": [141, 211, 199, 1],
      "PC/TSC/WBDOC-OEO": [255, 255, 179, 1],
      "PC/TSC/WBDOC-PC": [190, 186, 218, 1],
      "PC/TSC/WBDOC-SAU": [251, 128, 114, 1],
      "PC/TSC/WBDOC-TSC": [128, 177, 211, 1],
      "PC/TSC/WBDOC-WBDOC": [253, 180, 98, 1],

      //"PSC/roll-OTHPC": [208, 28, 139, 1],
      //"PSC/roll-OTHTSC": [241, 182, 218, 1],
      //"PSC/roll-PCMOD": [253, 180, 98, 1],
      //"PSC/roll-TSTOFC": [184, 225, 134, 1],
      //"PSC/roll-TSUNIT": [77, 172, 38, 1],

      //"PSC": [204, 204, 0, 1],
      "RO": [255, 0, 51, 1],

      //"RO/roll-OTHRRO": [127, 205, 187, 1],
      //"RO/roll-RSO": [44, 127, 184, 1],

      "SSA HQ-COMSNR": [158, 188, 218, 1],
      "SSA HQ-DIVISN": [136, 86, 167, 1],

      //"SSA HQ/Roll-DEPCOM": [229, 245, 249, 1],
      //"SSA HQ/Roll-DEPMNT": [153, 216, 201, 1],
      //"SSA HQ/Roll-OFFICE": [44, 162, 95, 1]
      //"SDW": [255, 102, 204, 1]
  };
  
  /* label layer */
  var labelStyle = new ol_style_Style({
    geometry: function(feature) {
      var geometry = feature.getGeometry();
      if (geometry.getType() == 'MultiPolygon') {
        // Only render label for the widest polygon of a multipolygon
        var polygons = geometry.getPolygons();
        var widest = 0;
        for (var i = 0, ii = polygons.length; i < ii; ++i) {
          var polygon = polygons[i];
          var width = ol_extent.getWidth(polygon.getExtent());
          if (width > widest) {
            widest = width;
            geometry = polygon;
          }
        }
      }
      return geometry;
    },
    text: new ol_style_Text({
      font: '12px Calibri,sans-serif',
      overflow: true,
      fill: new ol_style_Fill({
        color: '#000'
      }),
      stroke: new ol_style_Stroke({
        color: '#fff',
        width: 3
      })
    })
  });

  let officeStylePolygon = 
  new ol_style_Style({
    stroke: new ol_style_Stroke({
      color: [0, 121, 88, 1],
      width: 1
    })
  });

  var style = [officeStylePolygon, labelStyle];
  /* label layer */

  /*      Progress Bar */

    /**
       * Renders a progress bar.
       * @param {Element} el The target element.
       * @constructor
       */
      function Progress(el) {
        this.el = el;
        this.loading = 0;
        this.loaded = 0;
      }


      /**
       * Increment the count of loading tiles.
       */
      Progress.prototype.addLoading = function() {
        if (this.loading === 0) {
          this.show();
        }
        ++this.loading;
        this.update();
      };


      /**
       * Increment the count of loaded tiles.
       */
      Progress.prototype.addLoaded = function() {
        var this_ = this;
        setTimeout(function() {
          ++this_.loaded;
          this_.update();
        }, 100);
      };


      /**
       * Update the progress bar.
       */
      Progress.prototype.update = function() {
        var width = (this.loaded / this.loading * 100).toFixed(1) + '%';
        this.el.style.width = width;
        if (this.loading === this.loaded) {
          this.loading = 0;
          this.loaded = 0;
          var this_ = this;
          setTimeout(function() {
            this_.hide();
          }, 500);
        }
      };


      /**
       * Show the progress bar.
       */
      Progress.prototype.show = function() {
        this.el.style.visibility = 'visible';
      };


      /**
       * Hide the progress bar.
       */
      Progress.prototype.hide = function() {
        if (this.loading === this.loaded) {
          this.el.style.visibility = 'hidden';
          this.el.style.width = 0;
        }
      };

     var progress = new Progress(document.getElementById('progress'));

  /*      Progress Bar */
  var esrijsonFormat = new ol_format_EsriJSON();
  var serviceUrl = 'http://gisval.labs.addev.ssa.gov:6080/arcgis/rest/services/GETSTATS_VAL/GETSTATS2/MapServer/';
  var layer = 0;
  var url = serviceUrl + layer + '/query/?f=json&' +
              'returnGeometry=true&inSR=102100&outFields=*' +
              '&outSR=102100&where=1%3D1';

  this.toggleOfficeType = function(event){
    //console.log(event);
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;

    if(value == "alloffices"){     
      this.clusterLayer.setVisible(false);
      this.layerFeatures.setVisible(true);
      this.officepolyESRILayer.setVisible(false);
      this.isClusterOn = false;
    }else if(value == "allofficespoly"){     
        this.officepolyESRILayer.setVisible(true);
        this.clusterLayer.setVisible(false);
        this.layerFeatures.setVisible(false);
        this.isClusterOn = false;   
    }else{
        this.clusterLayer.setVisible(true);
        this.layerFeatures.setVisible(false);
        this.officepolyESRILayer.setVisible(false);
        this.isClusterOn = true;
    }
  }

  this.showOfficePoly = function(){

    this.dataService.getMapData('./data/OCD_POLY.json').subscribe(data => {
          //console.log(data);
         let features = new  GeoJSON().readFeatures(data);    

         //var distinctitems = getUniqueValuesOfKey(JSON.stringify(data), 'properties.OCD')
         if(features.length > 0){
            for (let key in features) {            
              for (let item in features[key]) {
                if(item == "values_"){
                  let clone = {}; // the new empty object
                  for (let value in features[key][item]) {
                    if(value != "geometry"){
                      if(typeof value == 'object'){
                        //do nothing
                      }else{
                          clone[value] = features[key][item][value]; 
                      }
                    }                      
                  }
                  this.ocdPolyArray.push(clone);
                }                
              }
            }
            this.messageService.fetchResults(this.ocdPolyArray, 'ocds');
            //this.messageService.fetchImportedResults(this.ocdPolyArray;
            //console.log(this.ocdPolyArray);
          }

        //var distinctFeaures = data.features.distinct((x) => { return x.properties.OCD});
        //this.sourceFeatures.addFeatures(features);     
    }, err => {
       console.log(err);
    }); 
  }

  // function getUniqueValuesOfKey(array, key){
  //   return array.reduce(function(carry, item){
  //     if(item[key] && !~carry.indexOf(item[key])) carry.push(item[key]);
  //     return carry;
  //   }, []);
  // }


this.pointFlash = function(feature: any) {
      var start = new Date().getTime();
      var listenerKey = this.map.on('postcompose', animate);
      var that = this;
      function animate(event) {
        var vectorContext = event.vectorContext;
        var frameState = event.frameState;
        var flashGeom = feature.getGeometry().clone();
        var elapsed = frameState.time - start;
        var elapsedRatio = elapsed / flashduration;
        // radius will be 5 at start and 30 at end.
        var radius = easeOut(elapsedRatio) * 25 + 5;
        var opacity = easeOut(1 - elapsedRatio);

        var style = new ol_style_Style({
          image: new ol_style_Circle({
            radius: radius,
            stroke: new ol_style_Stroke({
              color: 'rgba(255, 0, 0, ' + opacity + ')',
              width: 0.25 + opacity
            })
          })
        });

        vectorContext.setStyle(style);
        vectorContext.drawGeometry(flashGeom);
        if (elapsed > flashduration) {
          unByKey(listenerKey);
          return;
        }
        // tell OpenLayers to continue postcompose animation
        that.map.render();
      }
    }

  this.officepolyESRILayer = new ol_layer_Vector ({
    source: new ol_source_Vector({
      //url: 'http://gisdev.labs.addev.ssa.gov:6080/arcgis/rest/services/GETSTATS_DEV/GETSTATS2/MapServer/1/query?where=1=1&outFields=*&outSR=4326&f=geojson',
      url: './data/OCD_POLY.json',
      format: new GeoJSON()
    }),
    visible: false,
    style: function(feature) {
      labelStyle.getText().setText(feature.get('OCD'));
      return style;
    },
    declutter: true    
    //style: polygonStyleFunction    
  });
  
  this.showOffices = function(){
    console.log("show offices");
    //progress.addLoading();
    //if(this.officesOn == false){
    //  this.officesOn = true;  
    //progress.addLoading();
      var url = serviceUrl + layer + '/query/?f=json&' +
      'returnGeometry=true&inSR=102100&outFields=*' +
      '&outSR=102100&where=1%3D1';
      var localdataurl = './data/offices.json';
      //let featuresArray = [];
      this.dataService.getOfficeData().subscribe(data => {
        var features = esrijsonFormat.readFeatures(data, {
            featureProjection:  'EPSG:102100',
          });
          if (features.length > 0) {
            this.sourceFeatures.addFeatures(features);                                     
            //console.log(features);
            //progress.addLoaded();
          }     
          // dataProjection will be read from document
          //   var features = esrijsonFormat.readFeatures(data, {
          //    featureProjection:  'EPSG:102100',
          // });
          // let's copy all feature properties into it
          for (let key in features) {            
              for (let item in features[key]) {
                if(item == "values_"){
                  let clone = {}; // the new empty object
                  for (let value in features[key][item]) {
                    if(value != "geometry"){
                      if(typeof value == 'object'){
                        //do nothing
                      }else{
                          clone[value] = features[key][item][value]; 
                      }

                     }                      
                  }
                  this.featuresArray.push(clone);
                }                
              }            
            
          }
          //console.log(this.featuresArray);
          this.messageService.fetchImportedResults(this.featuresArray);
          if (features.length > 0) {
            //vectorSource.addFeatures(features);
            //sourceFeatures.addFeatures(features);
            //console.log(features);
            //var ext = this.map.getView().calculateExtent(this.map.getSize());
            // var features=[];
            for (var i=0; i<features.length; ++i)
            {	
              //features[i]=new Feature(new Point([ext[0]+(ext[2]-ext[0])*Math.random(), ext[1]+(ext[3]-ext[1])*Math.random()]));
              features[i].set('id',i);
              
            }
            clusterSource.getSource().clear();
            clusterSource.getSource().addFeatures(features);
            //getOfficeData();

          }     
      }, err => {
        console.log(err);
      }); 

  }

    this.sourceFeatures = new ol_source_Vector({
            
    });

    /**
     * Elements that make up the popup.
     */
    var container = document.getElementById('popup');
    var content = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');


      /**
       * Add a click handler to hide the popup.
       * @return {boolean} Don't follow the href.
       */
      closer.onclick = function() {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
      };


      
      /**
       * Create an overlay to anchor the popup to the map.
       */
      var overlay = new Overlay({       
        element: container,
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        }
      });

this.showPopup = function(feature, map){    
    console.log(feature.get("NAME"));
    var htmlArr = [];
    htmlArr.push("<table"); // class='text-primary'
    htmlArr.push("<tr><td><b>OCD&nbsp;&nbsp;:</b></td><td>&nbsp;&nbsp;" + feature.get("OCD") + "</td></tr><br />");
    htmlArr.push("<tr><td><b>Name&nbsp;&nbsp;:</b></td><td>&nbsp;&nbsp;" + feature.get("NAME") + "</td></tr><br />");    
    htmlArr.push("<tr><td><b>Address&nbsp;&nbsp;:</b></td><td>&nbsp;&nbsp;" + feature.get("CITY") + ",&nbsp;" + feature.get("STATE") + "&nbsp;&nbsp;" + feature.get("ZIP") + "</td></tr><br />");    
    htmlArr.push("<tr><td><b>Phone&nbsp;&nbsp;:</b></td><td>&nbsp;&nbsp;" + feature.get("PHONE") + "</td></tr><br />");
    htmlArr.push("</table>");
    
    var coordinate =  feature.values_.geometry.getCoordinates(); //feature.values_.geometry.getCoordinates() this.map.getLonLatFromViewPortPx(evt.xy); //evt.mapBrowserEvent.coordinate;
    htmlArr.push(htmlArr);    
    content.innerHTML = htmlArr.join("");
    overlay.setPosition(coordinate);     

  }
  
  this.showClusterPopup = function(feature, evt, map){
    console.log(feature.get("NAME"));
    var htmlArr = [];    
    htmlArr.push("<table"); // class='text-primary'
    htmlArr.push("<tr><td><b>OCD&nbsp;&nbsp;:</b></td><td>&nbsp;&nbsp;" + feature.get("OCD") + "</td></tr><br />");
    htmlArr.push("<tr><td><b>Name&nbsp;&nbsp;:</b></td><td>&nbsp;&nbsp;" + feature.get("NAME") + "</td></tr><br />");    
    htmlArr.push("<tr><td><b>Address&nbsp;&nbsp;:</b></td><td>&nbsp;&nbsp;" + feature.get("CITY") + ",&nbsp;" + feature.get("STATE") + "&nbsp;&nbsp;" + feature.get("ZIP") + "</td></tr><br />");    
    htmlArr.push("<tr><td><b>Phone&nbsp;&nbsp;:</b></td><td>&nbsp;&nbsp;" + feature.get("PHONE") + "</td></tr><br />");
    htmlArr.push("</table>");
    var coordinate = feature.values_.geometry.flatCoordinates;

    console.log(coordinate);

    htmlArr.push(htmlArr);
    content.innerHTML = htmlArr.join("");
    overlay.setPosition(coordinate);    

    var closeButtonPopup = document.getElementById("popupclosebutton"); //d-md-down-none 
    if(closeButtonPopup){
      closeButtonPopup.addEventListener('click', function()
      {        
        setTimeout( function() {           
            overlay.setPosition(undefined);
              closer.blur();                
              return false;          
        }, 200);
      });
    }
  }


  this.layerFeatures = new ol_layer_Vector({
    source: this.sourceFeatures,
    click: function (feature)  {
      console.log(feature);
    },
    style: function(feature, resolution){
        var styleR3 = new ol_style_Style( {
            image: new ol_style_Circle( {
                radius: 5,
                fill: new ol_style_Fill( {
                    color: [0,0,255]
                } )
            } )
        } );

        var styleCatchAll = new ol_style_Style( {
            image: new ol_style_Circle( {
                radius: 5,
                fill: new ol_style_Fill( {
                    color: [255,0,0]
                } )
            } )
        } );
        
        var ofctypes = [];
        var officetypeList = offTypes;
        for (var key in officetypeList) {
            //console.log(key);
            if (officetypeList.hasOwnProperty(key)) {
                if (officetypeList[key].length == 1) {
                    //ofctypes.push("'" + officetypeList[key][0] + "'");                    
                    if(officetypeList[key] == feature.get('OFC_TYP')){
                        return new ol_style_Style( {
                            image: new ol_style_Circle( {
                                radius: 5,
                                fill: new ol_style_Fill( {
                                    color: officeTypeSymbols[key]
                                } ),
                                stroke: new ol_style_Stroke({
                                    width : 1,
                                    color: 'rgba(255, 100, 50, 0.8)',
                                    //color : 'black',
                                    radius : 1
                                })
                            } )
                        }) // officeTypeSymbols[key];    
                    }
                } else {
                    //if (key == "PC/TSC/WBDOC-SAU") {
                        for (var item in officetypeList[key]) {
                            if (officetypeList[key].hasOwnProperty(item)) {
                                //ofctypes.push("'" + officetypeList[key][item][0] + "'");
                                if(officetypeList[key] == feature.get('OFC_TYP')){
                                    return new ol_style_Style( {
                                        image: new ol_style_Circle( {
                                            radius: 5,
                                            fill: new ol_style_Fill( {
                                                color: officeTypeSymbols[key][item][0]
                                            } )
                                        } )
                                    }) // officeTypeSymbols[key];    
                                }
                            }
                        }
                    //}

                }
            }
        }      
      }
    });

    var source = new OSM({   
      crossOrigin: null
    })
    // var source = new TileJSON({
    //   url: 'https://api.tiles.mapbox.com/v3/mapbox.world-bright.json?secure',
    //   crossOrigin: 'anonymous'
    // });

    source.on('tileloadstart', function() {
      progress.addLoading();
    });

    source.on('tileloadend', function() {
      progress.addLoaded();
    });
    source.on('tileloaderror', function() {
      progress.addLoaded();
    });
    
    this.map = new Map({
      
      overlays: [overlay],
      interactions: defaultInteractions({
        constrainResolution: true, onFocusOnly: true
      }),
      layers: [
        new TileLayer({source: source})
      ],
      target: 'map',
      controls: defaultControls({
        attributionOptions: {
          collapsible: false
        }
      }).extend([
        new FullScreen()
      ]).extend([
        new ZoomToExtent(  {
          extent: [-15358099.626816723, 2524371.9646285083, -5857894.255311261, 7142391.46550449]
        })
      ]),
      view: new View({
          center: [-10997148, 4569099],
          zoom: 4
      }),
        // Improve user experience by loading tiles while animating. Will make
      // animations stutter on mobile or slow devices.
      loadTilesWhileAnimating: true,
      loadTilesWhileInteracting: true,
    });

    const getStyle = function(feature, resolution)
		{	
      var size = feature.get('features').length;
			var style = styleCache[size];
			if (!style)
			{	var color = size>25 ? "192,0,0" : size>8 ? "255,128,0" : "0,128,0";
				var radius = Math.max(8, Math.min(size*0.75, 20));
				var dash = 2*Math.PI*radius/6;
				var dashArray = [ 0, dash, dash, dash, dash, dash, dash ];
				style = styleCache[size] = new ol_style_Style(
					{	image: new ol_style_Circle(
						{	radius: radius,
							stroke: new ol_style_Stroke(
							{	color: "rgba("+color+",0.5)", 
								width: 15 ,
								lineDash: dashArray,
								lineCap: "butt"
							}),
							fill: new ol_style_Fill(
							{	color:"rgba("+color+",1)"
							})
						}),
						text: new ol_style_Text(
						{	text: size.toString(),
							fill: new ol_style_Fill(
							{	color: '#fff'
							})
						})
					});
			}
			return [style];
    }

    // Style for the clusters
    var styleCache = {};		

    // Cluster Source
    var clusterSource=new Cluster({
        distance: 40,
        source: new ol_source_Vector()
    });

     // Style for selection
     var img = new  ol_style_Circle(
        {	radius: 5,
          stroke: new ol_style_Stroke(
          {	color:"rgba(0,0,255,1)", 
            width:1 
          }),
          fill: new ol_style_Fill(
          {	color:"rgba(0,255,255,0.3)"
          })
        });
      var style0 = new ol_style_Style( 
        {	image: img
        });
      var style1 = new  ol_style_Style( 
        {	image: img,
          // Draw a link beetween points (or not)
          stroke: new ol_style_Stroke(
            {	color:"#fff", 
              width:1 
            }) 
        });

    // Select interaction to spread cluster out and select features
    var selectCluster = new  SelectCluster(
        {	// Point radius: to calculate distance between the features
            pointRadius:7,
            animate: $("#animatesel").prop('checked'),
            // Feature style when it springs apart
            featureStyle: function()
            {	return [ $("#haslink").prop('checked') ? style1:style0 ]
            },
            // selectCluster: false,	// disable cluster selection
            // Style to draw cluster when selected
            style: function(f,res)
            {	
              var cluster = f.get('features');
              if(!cluster){
                return;
              }
              if (cluster.length>1)
              {	  
                var feature = f;
                var resolution = res ;
                var s = [];            
                s = getStyle(f,res);
                //if ($("#convexhull").prop("checked") && coordinate.convexHull)
                //{	
                  var coords = [];
                  for (var i=0; i<cluster.length; i++){
                    coords.push(cluster[i].getGeometry().getFirstCoordinate());
                  }               
                  var chull = ol_coordinate_convexHull(coords);
                  s.push( 
                    new  ol_style_Style(
                    {	stroke: new  ol_style_Stroke({ color: "rgba(0,0,192,0.5)", width:2 }),
                      fill: new  ol_style_Fill({ color: "rgba(0,0,192,0.3)" }),
                      geometry: new  Polygon([chull]),
                      zIndex: 1
                    }));
                return s;
              }
              else 
              {	return [
                  new ol_style_Style(
                  {	image: new ol_style_Circle (
                    {	stroke: new ol_style_Stroke({ color: "rgba(0,0,192,0.5)", width:2 }),
                      fill: new ol_style_Fill({ color: "rgba(0,0,192,0.3)" }),
                      radius:5
                    })
                  })];
              }
            }
          }, (self));

    // Animated cluster layer
    this.clusterLayer = new AnimatedCluster(
        {	
        ame: 'Cluster',
        source: clusterSource,
        animationDuration: true ? 700:0,
        // Cluster style
        style: getStyle
    });
    
    
    this.map.addInteraction(selectCluster);    
    selectCluster.animate = true;

    this.map.on("moveend", function(e){
      // event actions            
      e.map.updateSize();          
    }, this);

    //this is so after clicking siderbar map refreshes
    // var navbarToggleclassname = document.getElementById("menu-toggle"); //d-md-down-none 
    // navbarToggleclassname.addEventListener('click', () =>
    // {     
    //    setTimeout( () => { 
    //     this.map.updateSize();
    //   }, 200);
    // } , true);

    selectCluster.on('select', ((evt) =>{
      if(this.isClusterOn == false){
      
        var selected = evt.selected;
        var deselected = evt.deselected;
        //selected[0].setStyle(styleClick);
        this.showClusterPopup(selected[0], evt, this.map);    
        // deselected.forEach(function(feature){
        //     feature.setStyle(null);
        // });
        
      }
    }));
      

    // On selected => get feature in cluster and show info
    selectCluster.getFeatures().on(['add'], (e, evt) =>
    {
      var c = e.element.get('features');   
      if(!c){
        return;
      }   
      if (c.length==1)
      {	
        var feature = c[0];
        //$(".infos").html("One feature selected...<br/>(office="+feature.get('NAME')+")");
        this.showClusterPopup(feature, e, this.map);
      }
      else
      {	
        $(".infos").text("Cluster ("+c.length+" features)");
      }
    });

    selectCluster.getFeatures().on(['remove'], function (e)
    {	
      $(".infos").html("");
    });
 

    this.map.addLayer(this.clusterLayer);
    this.map.addLayer(this.layerFeatures);
    this.map.addLayer(this.officepolyESRILayer);
    
    //this.map.addOverlay([overlay]);

    this.layerFeatures.setVisible(false);

    // this.layerFeatures.getFeatures().on(['select'], function (e, evt) {
    //   console.log(evt);
    // });

     setTimeout(() => {
        console.log("loading offices");
        this.showOffices();
        this.showOfficePoly();
      }, 500);
  
  };

};
