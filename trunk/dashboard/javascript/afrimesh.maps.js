/*
 * Afrimesh: easy management for B.A.T.M.A.N. wireless mesh networks
 * Copyright (C) 2008-2009 Meraka Institute of the CSIR
 * All rights reserved.
 *  
 * This software is licensed as free software under the terms of the
 * New BSD License. See /LICENSE for more information.
 */


/**
 * includes
 */
if (afrimesh.settings.map.aerial) {
  //load("http://maps.google.com/maps?file=api&amp;v=2&amp;key=ABQIAAAAUILHePuv7Cq0mK0HSze5PRRTJkofi8MdSXz7uUeCtVadpg691BS55tAxiNsjEjEAKrgA9qrFrG_PPw");
  //load("http://api.maps.yahoo.com/ajaxymap?v=3.0&appid=euzuro-openlayers");
  load("javascript/yahoo/ajaxymap.js");
  load("javascript/yahoo/dom_2.0.1-b2.js");
  load("javascript/yahoo/event_2.0.0-b2.js");
  load("javascript/yahoo/dragdrop_2.0.1-b4.js");
  load("javascript/yahoo/animation_2.0.1-b2.js");
  load("javascript/yahoo/ymapapi_3_8_2_1.js");
}
load("javascript/openlayers/OpenLayers.js");
load("javascript/openlayers/OpenStreetMap.js");


/** 
 * convenience constructors 
 */
var epsg_4326   = new OpenLayers.Projection("EPSG:4326");
var epsg_900913 = new OpenLayers.Projection("EPSG:900913");
function LonLat(longitude, latitude) {
  return new OpenLayers.LonLat(longitude, latitude).transform(epsg_4326, epsg_900913); 
};
function Point(longitude, latitude) {
  return new OpenLayers.Geometry.Point(longitude, latitude).transform(epsg_4326, epsg_900913);  
};




console.debug("loaded afrimesh.maps.js");