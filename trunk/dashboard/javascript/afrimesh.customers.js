/*
 * Afrimesh: easy management for B.A.T.M.A.N. wireless mesh networks
 * Copyright (C) 2008-2009 Meraka Institute of the CSIR
 * All rights reserved.
 *  
 * This software is licensed as free software under the terms of the
 * New BSD License. See /LICENSE for more information.
 */


function BootCustomers(parent) {

  var customers = function() { return this.customers.status(); };

  customers.select = function() { 
    return afrimesh.villagebus.radius.select();
  }
  customers.generate = function(username, type, seconds) { 
    return afrimesh.villagebus.radius.insert(username, type, seconds);  // TODO - split insert into generate & insert
  };
  customers.update = function(username, new_username, new_password, new_type) { 
    return afrimesh.villagebus.radius.update(username, new_username, new_password, new_type); 
  };
  customers.update.username = function(username, new_username) { 
    return afrimesh.villagebus.radius.update(username, new_username, null, null); 
  };
  customers.update.type = function(username, new_type) { 
    return afrimesh.villagebus.radius.update(username, null, null, new_type); 
  };
  customers.remove = function(username) { 
    return afrimesh.villagebus.radius.remove(username); 
  };
  customers.status  = function() {
    return afrimesh.villagebus.radius.who();
  };


  

  return customers;
};
console.debug("loaded afrimesh.customers.js");

