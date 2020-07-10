  "use strict";

  // require('helpers/indexof.js');
  // require('helpers/selector.js');
  // require('helpers/checkers.js');
  var core = require('./core');
  var actions = require('./actions');

  module.exports = function(params) {

    var placer  = actions.place,
        targets = actions.getTargets(params.targets);

    core.go(placer, targets, params);

  };
