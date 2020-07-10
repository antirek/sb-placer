var select = require('./helpers/selector');

var actions = {

  place: function(targets, value) {
    for (var i = 0; i < targets.length; i++) {
      targets[i].innerHTML = value;
    }
  },

  getTargets: function(selectors) {
    return select.call(document, selectors);
  }

};

module.exports = actions;