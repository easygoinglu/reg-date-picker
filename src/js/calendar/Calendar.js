var util = require("../util");

function Calendar(options){
  this.setCalendarDate(options.unixTime);
}

Calendar.prototype = Object.create(Object.prototype, {
  constructor: {
    configurable: true,
    enumerable: true,
    value: Calendar,
    writable: true
  }
});

Calendar.prototype.convertUnixTimeToDate = function(unixTime){
  var date;

  if(unixTime){
    date = new Date(unixTime * 1000);
  }else{
    date = new Date();
  }
  return date;
}; 

Calendar.prototype.setCalendarDate = function(unixTime) {
  this.dateObject = this.convertDateToCalendarDate(this.convertUnixTimeToDate(unixTime)); 
  this.selectedDate = this.dateObject.clone();
};

Calendar.prototype.setDateObject = function(dateObject) {
  this.dateObject = dateObject;
};

Calendar.prototype.getDateObject = function() {
  return this.dateObject;
};

Calendar.prototype.setSelectedDate = function(selectedDate) {
  this.selectedDate = selectedDate;
};

Calendar.prototype.getSelectedDate = function() {
  return this.selectedDate;
};

Calendar.prototype.getWeeks = function() {
  return util.getL10N().weeks;
};

Calendar.prototype.getWeekName = function(index) {
  return this.getWeeks()[index];
};

Calendar.prototype.dayOfWeek = function(jd) {
  return util.mod(Math.floor(jd + 1.5), 7);
};

module.exports = Calendar;