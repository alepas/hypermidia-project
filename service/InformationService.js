'use strict';


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

