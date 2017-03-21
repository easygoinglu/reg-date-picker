var util = require("../util");
var Calendar = require("./Calendar");
var DateObject = require("../DateObject");
var GregorianCalendar = require("./GregorianCalendar");

const BUDDHIST_YEAR_INCREATEMENT = 543;

function BuddhistCalendar(options){
  Calendar.call(this, options);  
  this.numberOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];  
}

BuddhistCalendar.prototype = Object.create(Calendar.prototype, {
  constructor: {
    configurable: true,
    enumerable: true,
    value: BuddhistCalendar,
    writable: true
  }
});

BuddhistCalendar.prototype.convertDateToCalendarDate = function(date){
  return new DateObject(date.getFullYear() + BUDDHIST_YEAR_INCREATEMENT, date.getMonth() + 1, date.getDate());
};

BuddhistCalendar.prototype.convertCalendarDateToUnixTime = function(){
  return new Date(this.getDateObject().getYear() - BUDDHIST_YEAR_INCREATEMENT, this.getDateObject().getMonth() - 1, 
    this.getDateObject().getDay()).getTime() / 1000;  
};

BuddhistCalendar.prototype.convertDateFormat = function(){
  //format: YYYY/MM/DD
  return [this.getDateObject().getYear(), (this.getDateObject().getMonth() > 9 ? '' : '0') + this.getDateObject().getMonth(), 
      (this.getDateObject().getDay() > 9 ? '' : '0') + this.getDateObject().getDay()].join("/");  
};

BuddhistCalendar.prototype.getMonthName = function(){
  return util.getL10N().months[this.getDateObject().getMonth() - 1];    
};

BuddhistCalendar.prototype.getFirstDayOfWeek = function(){
  return this.dayOfWeek(GregorianCalendar.prototype.convertCalendarToJulianDay.apply(this, [this.getDateObject().getYear() - 
    BUDDHIST_YEAR_INCREATEMENT, this.getDateObject().getMonth(), 1]));
};

BuddhistCalendar.prototype.getDayNumberOfMonth = function(dateObject){
  if(dateObject.getMonth() === 2 && this.isLeapYear(dateObject.getYear())) {
    return 29;
  }else{
    return this.numberOfDays[dateObject.getMonth() - 1]; 
  }
};

BuddhistCalendar.prototype.isLeapYear = function(year){
  year -= BUDDHIST_YEAR_INCREATEMENT;
  return ((year % 4) == 0) && (!(((year % 100) === 0) && ((year % 400) != 0)));
};

module.exports = BuddhistCalendar;