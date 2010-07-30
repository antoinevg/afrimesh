/*
 * Afrimesh: easy management for B.A.T.M.A.N. wireless mesh networks
 * Copyright (C) 2008-2009 Meraka Institute of the CSIR
 * All rights reserved.
 *  
 * This software is licensed as free software under the terms of the
 * New BSD License. See /LICENSE for more information.
 */


function BootPerson(parent) {

  var person = {}; // function(id, continuation) { return this.person.load(id, continuation); };

  // TODO - Please for fsck's sake can we have a combinator to pipeline
  //        these (&#@$ reams&reams of continuations?
  //        
  //        I like Italian food as much as the next guy but there are other 
  //        dishes than spaghetti! Maybe some nice Gnocchi?
  person.save = function(person, continuation, source) {
    
    // TODO - some field validation plz
    if (!person ||
        (!person.email     || person.email     == "") ||
        (!person.firstname || person.firstname == "") ||
        (!person.lastname  || person.lastname  == "")) {
      console.log("error saving person");
      return continuation("Specify all the user details please.", null);
    }

    console.log("SAVING PERSON: " + show(person));
    console.log("SOURCE: " + show(source));

    // If the person has an id it already exists & we need to:
    //   set person:<id>:details 
    //   if email has changed
    //     del person:<old email>:id 
    //     set person:<new email>:id   // automatically done by update()
    if (person.id) {
      return update(person, function(error, person) {
        if (error) return continuation(error, person);
        return (person.email == source.email) 
            ? continuation(error, person)
            : nuke_email(source, continuation);
      });
    }

    // If the person has no id we need to
    //   get person:<email>:id 
    //   if email has an id
    //     set  person:<id>:details
    //   else it's a new record
    //     incr person:id
    //     set person:<id>:details
    //     set person:<email>:id      // automatically done by update()
    return load_email(person, function(error, person) {
      if (person.id) {
        return update(person, continuation);
      }
      return new_id(person, function(error, person) {
        if (error) return continuation(error, response);
        return update(person, continuation);
      });      
    });
    
    
    // Generate a person id if there is no record associated with this email
    // <id> = incr person:id
    // sadd <id> person:ids    TODO
    function new_id(person, continuation) {
      var name = afrimesh.villagebus.Bind("/@root/db/incr/person:id", function(error, id) {
          person.id = id;
          return continuation(error, person); 
        });
      return afrimesh.villagebus.GET(name);
    };

    // Save the person details
    // set person:<id>:details = { id, email, firstname, lastname };
    function update(person, continuation) {
      var name = afrimesh.villagebus.Bind("/@root/db/person:" + person.id + ":details", function(error, response) {
          if (error) return continuation(error, response);
          return index_email(person, continuation);
        });
      return afrimesh.villagebus.PUT(name, person)
    };

    // Link person id & email
    // set person:<email>:id id
    function index_email(person, continuation) {
      var name = afrimesh.villagebus.Bind("/@root/db/person:" + person.email + ":id", function(error, response) {
          return continuation(error, person);
        });
      return afrimesh.villagebus.PUT(name, person.id); 
    };

    // Remove Link between person id & email
    // del person:<email>:id
    function nuke_email(person, continuation) {
      var name = afrimesh.villagebus.Bind("/@root/db/person:" + person.email + ":id", function(error, response) {
          return continuation(error, person);
        });
      return afrimesh.villagebus.DELETE(name); 
    };

    // find person with this email
    function load_email(person, continuation) {
      var name = afrimesh.villagebus.Bind("/@root/db/person:" + person.email + ":id", function(error, id) {
        console.log("/@root/db/person:" + person.email + ":id -> (" + error + ", " + id + ")");
        if (error) return continuation(error, id);
        person.id = id;
        return continuation(error, person);
      });
      return afrimesh.villagebus.GET(name);
    };
   

  };

  person.load = function(email, continuation) {
  };


  /**
   * Link the given device ip to a person id
   *
   * set provision:<device.ip>:person = person.id
   */
  person.link = function(person, device, continuation) {
    var name = afrimesh.villagebus.Bind("/@root/db/provision:" + device.ip + ":person", function(error, response) {
        return continuation(error, person);
      });
    return afrimesh.villagebus.PUT(name, person.id);     
  };


  /*
  customers.status  = function(continuation) {
    var name = afrimesh.villagebus.Name("/@radius");
    name = afrimesh.villagebus.Bind(name, continuation);
    name = afrimesh.villagebus.POST(name, { command : "who" }, null, true);
    return name;
  };  

  customers.select = function(continuation) {
    var name = afrimesh.villagebus.Name("/@radius");
    name = afrimesh.villagebus.Bind(name, continuation);
    name = afrimesh.villagebus.POST(name, { command : "list" }, null, true);
    return name;
  };

  customers.generate = function(username, type, seconds, continuation) { 
    var name = afrimesh.villagebus.Name("/@radius");
    name = afrimesh.villagebus.Bind(name, continuation);
    name = afrimesh.villagebus.POST(name, { command  : "new",
                                            username : username, 
                                            type     : type,
                                            seconds  : seconds }, null, true);    
    return name;
  };

  customers.update = function(username, new_username, new_password, new_type, continuation) { 
    var name = afrimesh.villagebus.Name("/@radius");
    name = afrimesh.villagebus.Bind(name, continuation);
    name = afrimesh.villagebus.POST(name, { command      : "modify",
                                            username     : username, 
                                            new_username : new_username,
                                            new_password : new_password,
                                            new_type     : new_type }, null, true);    
    return name;
  };

  customers.update.username = function(username, new_username, continuation) { 
    return customers.update(username, new_username, null, null, continuation);
  };

  customers.update.type = function(username, new_type, continuation) { 
    return customers.update(username, null, null, new_type, continuation);
  };

  customers.remove = function(username, continuation) { 
    var name = afrimesh.villagebus.Name("/@radius");
    name = afrimesh.villagebus.Bind(name, continuation);
    name = afrimesh.villagebus.POST(name, { command  : "delete",
                                            username : username }, null, true);    
    return name;
  };*/

  return person;
};
console.debug("loaded afrimesh.person.js");


