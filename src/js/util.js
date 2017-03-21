var L10Ns = require("../lang/L10Ns");

var util = {
  createElement: function(tag, className, text){
    var element = document.createElement(tag);
    element.className = className || "";
    element.textContent = text || "";
    return element;
  },
  getL10N: function(){
    return L10Ns;
  },
  mod: function(number1, number2) {
    return number1 - (number2 * Math.floor(number1 / number2));
  }  
};

module.exports = util;
  
