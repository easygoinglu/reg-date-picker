var util = require("./util");
var CalendarFactory = require("./calendar/CalendarFactory");
var DateObject = require("./DateObject");
require("../css/DatePicker.less");


//variable
var lang = navigator.language ? navigator.language.split("-")[0]: "";
 
//constructor
function DatePicker(configs){  
  var daySlot = 42; 

  if(!configs.container){
    throw new Error("Date picker input field is required.")
  }else if(configs.container.datePicker){
    configs.container.datePicker.destroy();
  }

  var self = this;
  configs.container.datePicker = self;

  var calendar = createCalendar({type: lang, unixTime: configs.date});

  //instance variable
  self.configs = configs;
  self.datePickerInputElement = configs.container;
  self.datePickerContainer = null;  //date picker dom elements

  //relate to prototype method
  self.updateDatePickerByUnixTime = updateDatePickerByUnixTime;
  self.hideDatePicker = hideDatePicker;
  self.showDatePicker = showDatePicker;
  self.clickPreviousYearNav = clickPreviousYearNav;
  self.clickPreviousMonthNav = clickPreviousMonthNav;
  self.clickNextYearNav = clickNextYearNav;
  self.clickNextMonthNav = clickNextMonthNav;  
  self.changeDate = changeDate; 
  self.preventPropagateEvent = preventPropagateEvent;
  self.onDateChangePtr = configs.onDateChange || function(){}; 

  self.datePickerInputElement.readOnly = true;

  //render date picker
  renderDatePicker();   

  //position date picker based on input field
  setDatePickerPosition(self.datePickerInputElement);

  self.datePickerInputElement.addEventListener("click", showDatePicker);
  self.datePickerContainer.addEventListener("click", preventPropagateEvent);

  //private function
  function createCalendar(options){
    var calendarFactory = new CalendarFactory();
    return calendarFactory.createCalendar(options);
  }

  function renderDatePicker(){
    var datePickerFragment = document.createDocumentFragment();    
    var datePickerWrapper = util.createElement("div", "rdpicker-wrapper");
    var datePickerContainer = util.createElement("div", "rdpicker rdpicker-hide");
    var datePickerInputElementParent = self.datePickerInputElement.parentNode;     

    //render date picker
    renderNavBar(datePickerFragment);
    renderWeek(datePickerFragment);
    renderDay(datePickerFragment);

    //insert input field wrapper for setting date picker position
    datePickerContainer.appendChild(datePickerFragment);
    datePickerWrapper.appendChild(datePickerContainer);
    datePickerInputElementParent.replaceChild(datePickerWrapper, self.datePickerInputElement);
    datePickerWrapper.insertBefore(self.datePickerInputElement, datePickerWrapper.firstChild);

    self.datePickerContainer = datePickerContainer;        
  }    

  function renderNavBar(datePickerFragment){
    //render navigation bar(year and month)
    var datePickerNavElement = util.createElement("div", "rdpicker-nav-bar");    
    var yearElement = util.createElement("span", "rdpicker-year", calendar.getDateObject().getYear());
    var monthElement = util.createElement("span", "rdpicker-month", calendar.getMonthName());  
    var previousYearNavElement = util.createElement("span", "rdpicker-nav rdpicker-previous-year-nav"); 
    var previousMonthNavElement = util.createElement("span", "rdpicker-nav rdpicker-previous-month-nav"); 
    var nextMonthNavElement = util.createElement("span", "rdpicker-nav rdpicker-next-month-nav"); 
    var nextYearNavElement = util.createElement("span", "rdpicker-nav rdpicker-next-year-nav");  

    previousYearNavElement.addEventListener("click", clickPreviousYearNav);
    previousMonthNavElement.addEventListener("click", clickPreviousMonthNav);
    nextYearNavElement.addEventListener("click", clickNextYearNav);
    nextMonthNavElement.addEventListener("click", clickNextMonthNav);    

    datePickerNavElement.appendChild(previousYearNavElement);
    datePickerNavElement.appendChild(previousMonthNavElement); 
    datePickerNavElement.appendChild(monthElement);    
    datePickerNavElement.appendChild(yearElement);
    datePickerNavElement.appendChild(nextYearNavElement);      
    datePickerNavElement.appendChild(nextMonthNavElement);
    datePickerFragment.appendChild(datePickerNavElement);   
  }

  function renderWeek(datePickerFragment){
    //render week
    var weekElement;    
    var weeksElement = util.createElement("div", "rdpicker-weeks");

    for(var i = 0; i < calendar.getWeeks().length; i++){
      weekElement = util.createElement("span", "rdpicker-week", calendar.getWeekName(i));
      weeksElement.appendChild(weekElement);
    }
    datePickerFragment.appendChild(weeksElement);
  }

  function renderDay(datePickerFragment){  
    //render day
    var dayElement, day, dateOfNextMonth = 0;    
    var daysElement = util.createElement("div", "rdpicker-days");    
    var firstDayOfWeek = calendar.getFirstDayOfWeek();
    var dayNumberOfMonth = calendar.getDayNumberOfMonth(calendar.getDateObject());
    var dayNumberOfPreviousMonth = calendar.getDayNumberOfMonth(getFirstDayOfPreviousMonth());

    for(var i = 0; i < daySlot; i++){
      if(i < firstDayOfWeek){   
        //render day of previous month
        dayElement = util.createElement("span", "rdpicker-day rdpicker-previous-month", dayNumberOfPreviousMonth - firstDayOfWeek + 1 + i);
      }else if(i < firstDayOfWeek + dayNumberOfMonth){
        //render day of this month
        dayElement = util.createElement("span", "rdpicker-day rdpicker-current-month", i - firstDayOfWeek + 1);
      }else{
        //render day of next month
        dayElement = util.createElement("span", "rdpicker-day rdpicker-next-month", ++dateOfNextMonth);
      }     

      if(self.configs.className){
        dayElement.classList.add(self.configs.className);
      }
      daysElement.appendChild(dayElement);
    }   

    daysElement.childNodes[firstDayOfWeek + calendar.getDateObject().getDay() - 1].classList.add("rdpicker-selected-date");     
    daysElement.addEventListener("click", changeDate);
    datePickerFragment.appendChild(daysElement);
  }

  function updateDatePicker(){ 
    
    var dayElement = self.datePickerContainer.getElementsByClassName("rdpicker-day");    
    var firstDayOfWeek = calendar.getFirstDayOfWeek();
    var dayNumberOfMonth = calendar.getDayNumberOfMonth(calendar.getDateObject());
    var dayNumberOfPreviousMonth = calendar.getDayNumberOfMonth(getFirstDayOfPreviousMonth());
    var dateOfNextMonth = 0;

    self.datePickerContainer.getElementsByClassName("rdpicker-year")[0].textContent = calendar.getDateObject().getYear();
    self.datePickerContainer.getElementsByClassName("rdpicker-month")[0].textContent = calendar.getMonthName();

    for(var i = 0; i < daySlot; i++){
      if(i < firstDayOfWeek){  
        //render day of previous month             
        dayElement[i].className = "rdpicker-day rdpicker-previous-month";
        dayElement[i].textContent = dayNumberOfPreviousMonth - firstDayOfWeek + 1 + i;
      }else if(i < firstDayOfWeek + dayNumberOfMonth){
        //render day of this month
        dayElement[i].className = "rdpicker-day rdpicker-current-month";
        dayElement[i].textContent = i - firstDayOfWeek + 1;
      }else{
        //render day of next month
        dayElement[i].className = "rdpicker-day rdpicker-next-month";
        dayElement[i].textContent = ++dateOfNextMonth;
      }     
    }

    if(calendar.getSelectedDate().getYear() === calendar.getDateObject().getYear() && calendar.getSelectedDate().getMonth() === calendar.getDateObject().getMonth()){
      self.datePickerContainer.getElementsByClassName("rdpicker-days")[0].childNodes[firstDayOfWeek + 
           calendar.getSelectedDate().getDay() - 1].classList.add("rdpicker-selected-date"); 
    }            
  }

  function updateDatePickerByUnixTime(unixTime){
    if(!calendar.getSelectedDate().equals(calendar.convertDateToCalendarDate(calendar.convertUnixTimeToDate(unixTime)))){
      calendar.setCalendarDate(unixTime);          
      updateDatePicker();
      self.onDateChangePtr(unixTime);
    }
  }

  function clickPreviousYearNav(){
    setFirstDayOfMonthOfPreviousYear();
    updateDatePicker();
  }

  function clickPreviousMonthNav(){
    setFirstDayOfPreviousMonth();
    updateDatePicker();
  }

  function clickNextYearNav(){
    setFirstDayOfMonthOfNextYear();
    updateDatePicker();
  }

  function clickNextMonthNav(){
    setFirstDayOfNextMonth();
    updateDatePicker();
  }

  function changeDate(e){
    e.stopPropagation();

    var selectedMonthType = e.target.classList;
    var currentDay = e.target.textContent;
 
    if(selectedMonthType.contains("rdpicker-day")){

      if(selectedMonthType.contains("rdpicker-previous-month")){
        setDayOfPreviousMonth(parseInt(currentDay));         
      }else if(selectedMonthType.contains("rdpicker-next-month")){
        setDayOfNextMonth(parseInt(currentDay));  
      }else if(selectedMonthType.contains("rdpicker-current-month")){
        calendar.setDateObject(new DateObject(calendar.getDateObject().getYear(), calendar.getDateObject().getMonth(), parseInt(currentDay)));
      }

      var isDateChanged = false;
      if(!calendar.getDateObject().equals(calendar.getSelectedDate())){
        isDateChanged = true;
        calendar.setSelectedDate(calendar.getDateObject().clone());
      }

      updateDatePicker();

      self.datePickerInputElement.value = calendar.convertDateFormat(); 
      self.close();           

      if(isDateChanged){
        self.onDateChangePtr(calendar.convertCalendarDateToUnixTime());
      }     
    }
  }

  function clearDatePickerPosition(){
    self.datePickerContainer.style.bottom = null;
    self.datePickerContainer.style.left = null;
    self.datePickerContainer.style.right = null;  
    self.datePickerContainer.style.top = null;
  }

  function setDatePickerPosition(targetElement){         
    if(self.datePickerContainer.classList.contains("rdpicker-hide")){
      self.hideDatePicker();
    }else{
      clearDatePickerPosition();

      var targetElementPosition = targetElement.getBoundingClientRect();
      var datePickerHeight = self.datePickerContainer.offsetHeight;      
      var datePickerWidth = self.datePickerContainer.offsetWidth;
      var viewportHeight = window.innerHeight;       
      var viewportWidth = window.innerWidth; 

      if((targetElementPosition.bottom + datePickerHeight) < viewportHeight ||
        (targetElementPosition.top - datePickerHeight) < 0){
        self.datePickerContainer.style.top = targetElement.offsetHeight+"px";
      }else{
        self.datePickerContainer.style.bottom = targetElement.offsetHeight+"px";
      }
      
      if((targetElementPosition.left + datePickerWidth) < viewportWidth ||
        (targetElementPosition.right - datePickerWidth) < 0){
        self.datePickerContainer.style.left = 0;
      }else{
        self.datePickerContainer.style.right = 0;
      }
    }
  }

  //bind input field event
  function showDatePicker(e){     
    e.stopPropagation();

    //fire event to close other date picker before show date picker
    triggerEvent(document, "click");

    updateDatePicker();
    self.datePickerContainer.classList.remove("rdpicker-hide");        
    setDatePickerPosition(self.datePickerInputElement);
    document.addEventListener("click", self.close.bind(self));
  }

  function hideDatePicker(){
    clearDatePickerPosition(); 
    self.datePickerContainer.style.top = "-9999px";
    self.datePickerContainer.classList.add("rdpicker-hide");                
  }

  function triggerEvent(element, eventType){
    var event;
    if(typeof(Event) === "function" && Event.constructor){
      event = new Event(eventType, {bubbles: true});
    }else{
      event = document.createEvent(eventType)
    }
    element.dispatchEvent(event);
  }

  function preventPropagateEvent(e){
    e.stopPropagation();
  }

  function setFirstDayOfMonthOfPreviousYear(){
    var dateObject = calendar.getDateObject();
    dateObject.setYear(calendar.getDateObject().getYear() - 1);
    dateObject.setDay(1);
  }

  function setFirstDayOfMonthOfNextYear(){
    var dateObject = calendar.getDateObject();
    dateObject.setYear(dateObject.getYear() + 1);
    dateObject.setDay(1);    
  }

  function setFirstDayOfPreviousMonth(){
    setDayOfPreviousMonth(1);
  }

  function getPreviousMonth(){
    var dateObject = calendar.getDateObject();
    if(dateObject.getMonth() === 1){
      return 12;
    }else{
      return dateObject.getMonth() - 1;     
    }
  }

  function setDayOfPreviousMonth(day){
    var dateObject = calendar.getDateObject();
    if(dateObject.getMonth() === 1){
      dateObject.setYear(dateObject.getYear() - 1);
      dateObject.setMonth(12);    
    }else{
      dateObject.setMonth(dateObject.getMonth() - 1);     
    }
    dateObject.setDay(day);
  }

  function getFirstDayOfPreviousMonth(){
    var dateObject = calendar.getDateObject();
    if(dateObject.getMonth() === 1){
      return new DateObject(dateObject.getYear() - 1, 12, 1);
    }else{
      return new DateObject(dateObject.getYear(), dateObject.getMonth() - 1, 1);
    }
  }

  function setFirstDayOfNextMonth(){
    setDayOfNextMonth(1);
  }

  function setDayOfNextMonth(day){
    var dateObject = calendar.getDateObject();
    if(dateObject.getMonth() === 12){
      dateObject.setYear(dateObject.getYear() + 1);
      dateObject.setMonth(1);
      dateObject.setDay(day);
    }else{
      dateObject.setMonth(dateObject.getMonth() + 1);
      dateObject.setDay(day);
    }  
  }
}

//prototype method
DatePicker.prototype.setDate = function(unixTime){
  this.updateDatePickerByUnixTime(unixTime);
};

DatePicker.prototype.getDate = function(){
  return this.convertDateToUnixTime(calendar.getSelectedDate());
};

DatePicker.prototype.close =  function(){ 
  document.removeEventListener("click", this.close);
  this.hideDatePicker();
};

DatePicker.prototype.destroy =  function(){ 
  //remove events
  document.removeEventListener("click", this.close);
  this.datePickerInputElement.removeEventListener("click", this.showDatePicker);
  this.datePickerContainer.getElementsByClassName("rdpicker-previous-year-nav")[0].removeEventListener("click", this.clickPreviousYearNav);
  this.datePickerContainer.getElementsByClassName("rdpicker-previous-month-nav")[0].removeEventListener("click", this.clickPreviousMonthNav);
  this.datePickerContainer.getElementsByClassName("rdpicker-next-month-nav")[0].removeEventListener("click", this.clickNextYearNav);
  this.datePickerContainer.getElementsByClassName("rdpicker-next-year-nav")[0].removeEventListener("click", this.clickNextMonthNav);  
  this.datePickerContainer.getElementsByClassName("rdpicker-days")[0].removeEventListener("click", this.changeDate);       
  this.datePickerContainer.removeEventListener("click", this.preventPropagateEvent);

  //remove date picker wrapper
  var datePickerInputElementOriginalParent = this.datePickerInputElement.parentNode.parentNode; 
  datePickerInputElementOriginalParent.replaceChild(this.datePickerInputElement, this.datePickerInputElement.parentNode);

  this.datePickerInputElement.readOnly = false;

  //remove dom reference
  this.datePickerInputElement = null;
  this.datePickerContainer = null; 
};

module.exports = DatePicker;
