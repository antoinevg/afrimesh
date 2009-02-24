/*
 * Afrimesh: easy management for B.A.T.M.A.N. wireless mesh networks
 * Copyright (C) 2008-2009 Meraka Institute of the CSIR
 * All rights reserved.
 *  
 * This software is licensed as free software under the terms of the
 * New BSD License. See /LICENSE for more information.
 */
   
   
/** - afrimesh node bootstrap --------------------------------------------- */
var afrimesh = undefined;
(function() {
  function Afrimesh() {
    this.settings = { 
      network_name : "development testbed",
      location : {
        longitude : 18.339733,
        latitude  : -34.138061
      },
      map : {
        server    : "openstreetmaps.org",
        extent    : 0.025, // in degrees 
        zoom      : 16,
        aerial    : false
      },
      locale       : "en_US.UTF-8",
      hosts        : {
        dashboard_server  : "afrimesh.7degrees.co.za",
        batman_vis_server : "dashboard.7degrees.co.za",
        mesh_gateway      : "192.168.20.200"
      },
      internet_gateway : {
        address   : "192.168.20.1",
        snmp      : {
          community : "public",
          down      : ".1.3.6.1.2.1.2.2.1.10.4",  // interfaces.ifTable.ifEntry.ifInOctets.4  ->  eth0.1 == .4
          up        : ".1.3.6.1.2.1.2.2.1.16.4"   // interfaces.ifTable.ifEntry.ifOutOctets.4 ->  eth0.1 == .4
        },
        bandwidth : { 
          down : 512,    // with protocol overhead the max observed is 430
          up   : 256     // with protocol overhead the max observed is 228
        }
      },
      ajax_proxy    : "/cgi-bin/ajax-proxy.cgi?url="
    };
    this.network    = BootNetwork(this);
    this.customers  = BootCustomers(this);
    this.villagebus = BootVillageBus(this);
  };
  afrimesh = new Afrimesh();
})();
console.debug("loaded afrimesh.js - completed afrimesh node bootstrap");

// check namespace pollution
// dump_object(this);


