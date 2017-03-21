var constants = require("../constants");
var util = require("../util");
var Calendar = require("./Calendar");
var DateObject = require("../DateObject");


function GregorianCalendar(options){
  Calendar.call(this, options);
  this.numberOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];  
}

GregorianCalendar.prototype = Object.create(Calendar.prototype, {
  constructor: {
    configurable: true,
    enumerable: true,
    value: GregorianCalendar,
    writable: true
  }
});

 GregorianCalendar.prototype.convertDateToCalendarDate = function(date){
  return new DateObject(date.getFullYear(), date.getMonth() + 1, date.getDate());
}; 

GregorianCalendar.prototype.convertCalendarDateToUnixTime = function(){
  return new Date(this.getDateObject().getYear(), this.getDateObject().getMonth() - 1, this.getDateObject().getDay()).getTime() / 1000; 
};

GregorianCalendar.prototype.convertDateFormat = function(){
  //format: YYYY/MM/DD
  return [this.getDateObject().getYear(), (this.getDateObject().getMonth() > 9 ? '' : '0') + this.getDateObject().getMonth(), 
     (this.getDateObject().getDay() > 9 ? '' : '0') + this.getDateObject().getDay()].join("/");  
};

GregorianCalendar.prototype.getMonthName = function(){
  return util.getL10N().months[this.getDateObject().getMonth() - 1];  
};

GregorianCalendar.prototype.getFirstDayOfWeek = function(){
  return this.dayOfWeek(this.convertCalendarToJulianDay(this.getDateObject().getYear(), this.getDateObject().getMonth(), 1));  
};

GregorianCalendar.prototype.getDayNumberOfMonth = function(dateObject){
  if(dateObject.getMonth() === 2 && this.isLeapYear(dateObject.getYear())) {
    return 29;
  }else{
    return this.numberOfDays[dateObject.getMonth() - 1]; 
  }
};

GregorianCalendar.prototype.isLeapYear = function(year){
  return ((year % 4) == 0) && (!(((year % 100) === 0) && ((year % 400) != 0)));
};

//default for GregorianCalendar/BuddhistCalendar
GregorianCalendar.prototype.convertCalendarToJulianDay = function(year, month, day) {
  return (constants.GREGORIAN_EPOCH - 1) + (365 * (year - 1)) + Math.floor((year - 1) / 4) + (-Math.floor((year - 1) / 100)) + 
     Math.floor((year - 1) / 400) + Math.floor((((367 * month) - 362) / 12) + ((month <= 2) ?  0 : (this.isLeapYear(year) ? -1 : -2)) + day);
};

//default for GregorianCalendar/BuddhistCalendar
GregorianCalendar.prototype.convertJulianDayToCalendar = function(jd) {
  var wjd, depoch, quadricent, dqc, cent, dcent, quad, dquad, yindex, dyindex, year, yearday, leapadj;
  wjd = Math.floor(jd - 0.5) + 0.5;
  depoch = wjd - constants.GREGORIAN_EPOCH;
  quadricent = Math.floor(depoch / 146097);
  dqc = util.mod(depoch, 146097);
  cent = Math.floor(dqc / 36524);
  dcent = util.mod(dqc, 36524);
  quad = Math.floor(dcent / 1461);
  dquad = util.mod(dcent, 1461);
  yindex = Math.floor(dquad / 365);
  year = (quadricent * 400) + (cent * 100) + (quad * 4) + yindex;
  if (!((cent == 4) || (yindex == 4))) {
    year++;
  }
  yearday = wjd - this.convertCalendarToJulianDay(year, 1, 1);
  leapadj = ((wjd < this.convertCalendarToJulianDay(year, 3, 1)) ? 0 : (this.isLeapYear(year) ? 1 : 2)
  );
  month = Math.floor((((yearday + leapadj) * 12) + 373) / 367);
  day = (wjd - this.convertCalendarToJulianDay(year, month, 1)) + 1;
  return {year: year, month: month, day: day};
};

module.exports = GregorianCalendar;