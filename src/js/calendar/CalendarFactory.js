var GregorianCalendar = require("./GregorianCalendar");
var BuddhistCalendar = require("./BuddhistCalendar");

function CalendarFactory(){}

CalendarFactory.prototype.createCalendar = function(options){
  if(options.type === "th"){
    return new BuddhistCalendar(options);
  }else{
    return new GregorianCalendar(options);
  }
};

module.exports = CalendarFactory;