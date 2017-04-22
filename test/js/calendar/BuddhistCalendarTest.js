var expect = require("chai").expect;
var sinon = require("sinon");
var sinonTest =  require("sinon-test");
var DateObject = require("../../../src/js/DateObject");
var Calendar = require("../../../src/js/calendar/Calendar");
var BuddhistCalendar = require("../../../src/js/calendar/BuddhistCalendar");

sinon.test = sinonTest.configureTest(sinon);

describe("BuddhistCalendar", function() {
  describe("#constructor()", function() {
    it("should have called Calendar with options", sinon.test(function() {

      var baseCalendar = this.stub(Calendar, "call");
      var calendar = new BuddhistCalendar({});
      sinon.assert.calledOnce(baseCalendar);
      sinon.assert.calledWith(baseCalendar, calendar, {});
    }));
  });
});

describe("BuddhistCalendar", function() {
  describe("#constructor()", function() {
    it("should be instance of Calendar", sinon.test(function() {
      var calendar = new BuddhistCalendar({});
      expect(calendar).to.be.an.instanceof(Calendar);
    }));
  });
});

describe("BuddhistCalendar", function() {
  describe("#constructor()", function() {
    it("should have numberOfDays property", sinon.test(function() {
      var calendar = new BuddhistCalendar({});
      expect(calendar.numberOfDays).to.eql([31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);
    }));
  });
});

describe("BuddhistCalendar", function() {
  describe("#convertDateToCalendarDate()", function() {
    it("should convert UTC date to DateObject", sinon.test(function() {
     var dateObject = new DateObject(2560,1,1);

      var date = new Date("2017/01/01");
      var calendar = new BuddhistCalendar({});
      var calendarDate = calendar.convertDateToCalendarDate(date);
      expect(calendarDate).to.eql(dateObject);
    }));
  });
});

describe("BuddhistCalendar", function() {
  describe("#convertCalendarDateToUnixTime()", function() {
    it("should convert calendar DateObject to unix time", sinon.test(function() {

      var options = {unixTime: 1483228800};
      var calendar = new BuddhistCalendar(options);
      var dateObject = calendar.getDateObject();
      expect(dateObject.getYear()).to.eql(2560);
      expect(dateObject.getMonth()).to.eql(1);
      expect(dateObject.getDay()).to.eql(1);          

      var unixTime = calendar.convertCalendarDateToUnixTime(); 
      expect(unixTime).to.eql(options.unixTime);
    }));
  });
});

describe("BuddhistCalendar", function() {
  describe("#convertDateFormat()", function() {
    it("should convert date to YYYY/MM/DD format.", function() {
      //prepare input parameter
      var options1 = {unixTime: 1483228800};
      var options2 = {unixTime: 1507593600};
      var calendar1= new BuddhistCalendar(options1);
      var calendar2 = new BuddhistCalendar(options2);

      expect(calendar1.convertDateFormat()).to.equal("2560/01/01");
      expect(calendar2.convertDateFormat()).to.equal("2560/10/10");      
    });
  });
});

describe("BuddhistCalendar", function() {
  describe("#getFirstDayOfWeek()", function() {
    it("should get week of first day", sinon.test(function() {

      var options = {unixTime: 1483228800}; //2017/01/01
      var calendar = new BuddhistCalendar(options);
      var dateObject = calendar.getDateObject();
      expect(dateObject.getYear()).to.eql(2560);
      expect(dateObject.getMonth()).to.eql(1);
      expect(dateObject.getDay()).to.eql(1);          

      var week = calendar.getFirstDayOfWeek(); 
      expect(week).to.eql(0);
    }));
  });
});

describe("BuddhistCalendar", function() {
  describe("#getDayNumberOfMonth()", function() {
    it("should get day number of month", sinon.test(function() {

      var calendar = new BuddhistCalendar({});
      var dateObject1 = new DateObject(2560,1,1);    
      var dateObject2 = new DateObject(2559,2,1);    
      var days1 = calendar.getDayNumberOfMonth(dateObject1);
      var days2 = calendar.getDayNumberOfMonth(dateObject2); 
      expect(days1).to.eql(31);      
      expect(days2).to.eql(29);
    }));
  });
});

describe("BuddhistCalendar", function() {
  describe("#isLeapYear(year)", function() {
    it("should be true if it's leap year; otherwise, return false", function() {
      var calendar = new BuddhistCalendar({});
      expect(calendar.isLeapYear(547)).to.be.true;
      expect(calendar.isLeapYear(943)).to.be.true;
      expect(calendar.isLeapYear(544)).to.be.false;
      expect(calendar.isLeapYear(643)).to.be.false;
    });
  });
});