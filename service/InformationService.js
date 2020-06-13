'use strict';
let sqlDb;

/**
 * Database table: Issues
 **/ 
exports.IssuesDbSetup = function(connection) {
  sqlDb = connection;
  return sqlDb.schema.hasTable("Issues").then(exists => {
    if (!exists) {
      console.log("Creating: Issues");
      return sqlDb.schema.createTable("Issues", table => {
        table.increments('id_issue').primary();
        table.text("name");
        table.text("email");
        table.text("issue");
        table.date("date");
      });
    } else 
        console.log("It exists.");
  });
};

/**
 * Database table: FAQ
 **/ 
exports.FaqDbSetup = function(connection) {
  sqlDb = connection;
  return sqlDb.schema.hasTable("Faq").then(exists => {
      if (!exists) {
        console.log("Creating: Faq");
        return sqlDb.schema.createTable("Faq", table => {
          table.increments('id_faq').primary();
          table.text("question");
          table.text("answer");
      });
    } else 
      console.log("Exist: Faq");
  });
};

/**
 * Get all FAQ
 * This get has the aim to retrieve all FAQ
 *
 * returns List
 **/
exports.getFaq = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "question" : "question",
  "answer" : "answer",
  "id" : 0
}, {
  "question" : "question",
  "answer" : "answer",
  "id" : 0
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Post a request done via contact form
 * This post has the aim to save requests done by users through the contact form
 *
 * request Request The request to create (optional)
 * no response value expected for this operation
 **/
exports.postForm = function(request) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

