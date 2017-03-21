function DateObject(year, month, day){
  this.year = year;
  this.month = month;
  this.day = day;
}

DateObject.prototype.getYear = function(){
  return this.year;
};

DateObject.prototype.getMonth = function(){
  return this.month;
};

DateObject.prototype.getDay = function(){
  return this.day;
};  

DateObject.prototype.setYear = function(year){
  this.year = year;
};

DateObject.prototype.setMonth = function(month){
  this.month = month;
};

DateObject.prototype.setDay = function(day){
  this.day = day;
}; 

DateObject.prototype.clone = function(){
  return new  DateObject(this.getYear(), this.getMonth(), this.getDay()); 
}; 

DateObject.prototype.equals = function(dateObject){
  if(this.year === dateObject.getYear() && this.month === dateObject.getMonth() && this.day === dateObject.getDay()){
    return true;
  }else{
    return false;
  }
};

module.exports = DateObject;