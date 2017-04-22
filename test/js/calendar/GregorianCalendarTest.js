var expect = require("chai").expect;
var sinon = require("sinon");
var sinonTest =  require("sinon-test");
var DateObject = require("../../../src/js/DateObject");
var Calendar = require("../../../src/js/calendar/Calendar");
var GregorianCalendar = require("../../../src/js/calendar/GregorianCalendar");

sinon.test = sinonTest.configureTest(sinon);

describe("GregorianCalendar", function() {
  describe("#constructor()", function() {
    it("should have called Calendar with options", sinon.test(function() {

      var baseCalendar = this.stub(Calendar, "call");
      var calendar = new GregorianCalendar({});
      sinon.assert.calledOnce(baseCalendar);
      sinon.assert.calledWith(baseCalendar, calendar, {});
    }));
  });
});

describe("GregorianCalendar", function() {
  describe("#constructor()", function() {
    it("should be instance of Calendar", sinon.test(function() {
      var calendar = new GregorianCalendar({});
      expect(calendar).to.be.an.instanceof(Calendar);
    }));
  });
});

describe("GregorianCalendar", function() {
  describe("#constructor()", function() {
    it("should have numberOfDays property", sinon.test(function() {
      var calendar = new GregorianCalendar({});
      expect(calendar.numberOfDays).to.eql([31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);
    }));
  });
});

describe("GregorianCalendar", function() {
  describe("#convertDateToCalendarDate()", function() {
    it("should convert UTC date to DateObject", sinon.test(function() {
     var dateObject = new DateObject(2017,1,1);

      var date = new Date("2017/01/01");
      var calendar = new GregorianCalendar({});
      var calendarDate = calendar.convertDateToCalendarDate(date);
      expect(calendarDate).to.eql(dateObject);
    }));
  });
});

describe("GregorianCalendar", function() {
  describe("#convertCalendarDateToUnixTime()", function() {
    it("should convert calendar DateObject to unix time", sinon.test(function() {

      var options = {unixTime: 1483228800};
      var calendar = new GregorianCalendar(options);
      var dateObject = calendar.getDateObject();
      expect(dateObject.getYear()).to.eql(2017);
      expect(dateObject.getMonth()).to.eql(1);
      expect(dateObject.getDay()).to.eql(1);          

      var unixTime = calendar.convertCalendarDateToUnixTime(); 
      expect(unixTime).to.eql(options.unixTime);
    }));
  });
});

describe("GregorianCalendar", function() {
  describe("#convertDateFormat()", function() {
    it("should convert date to YYYY/MM/DD format.", function() {
      //prepare input parameter
      var options1 = {unixTime: 1483228800};
      var options2 = {unixTime: 1507593600};
      var calendar1= new GregorianCalendar(options1);
      var calendar2 = new GregorianCalendar(options2);

      expect(calendar1.convertDateFormat()).to.equal("2017/01/01");
      expect(calendar2.convertDateFormat()).to.equal("2017/10/10");      
    });
  });
});

describe("GregorianCalendar", function() {
  describe("#getMonthName()", function() {
    it("should get month name of calendar", function() {

      //prepare input parameter      
      var options1 = {unixTime: 1483228800};
      var options2 = {unixTime: 1485907200};
      var options3 = {unixTime: 1488326400};
      var options4 = {unixTime: 1491004800};
      var options5 = {unixTime: 1493596800};
      var options6 = {unixTime: 1496275200};
      var options7 = {unixTime: 1498867200};
      var options8 = {unixTime: 1501545600};
      var options9 = {unixTime: 1504224000};    
      var options10 = {unixTime: 1506816000};
      var options11 = {unixTime: 1509494400};
      var options12 = {unixTime: 1512086400};


      var calendar1 = new GregorianCalendar(options1);
      var calendar2 = new GregorianCalendar(options2);
      var calendar3 = new GregorianCalendar(options3);
      var calendar4 = new GregorianCalendar(options4);
      var calendar5 = new GregorianCalendar(options5);
      var calendar6 = new GregorianCalendar(options6);
      var calendar7 = new GregorianCalendar(options7);
      var calendar8 = new GregorianCalendar(options8);
      var calendar9 = new GregorianCalendar(options9);
      var calendar10 = new GregorianCalendar(options10);
      var calendar11 = new GregorianCalendar(options11);
      var calendar12 = new GregorianCalendar(options12);

      expect(calendar1.getMonthName()).to.equal("Jan");
      expect(calendar2.getMonthName()).to.equal("Feb");
      expect(calendar3.getMonthName()).to.equal("Mar");
      expect(calendar4.getMonthName()).to.equal("Apr");
      expect(calendar5.getMonthName()).to.equal("May");
      expect(calendar6.getMonthName()).to.equal("Jun");
      expect(calendar7.getMonthName()).to.equal("Jul");
      expect(calendar8.getMonthName()).to.equal("Aug");
      expect(calendar9.getMonthName()).to.equal("Sep");
      expect(calendar10.getMonthName()).to.equal("Oct");
      expect(calendar11.getMonthName()).to.equal("Nov");
      expect(calendar12.getMonthName()).to.equal("Dec");
    });
  });
});

describe("GregorianCalendar", function() {
  describe("#getFirstDayOfWeek()", function() {
    it("should get week of first day", sinon.test(function() {

      var options = {unixTime: 1483228800}; //2017/01/01
      var calendar = new GregorianCalendar(options);
      var dateObject = calendar.getDateObject();
      expect(dateObject.getYear()).to.eql(2017);
      expect(dateObject.getMonth()).to.eql(1);
      expect(dateObject.getDay()).to.eql(1);          

      var week = calendar.getFirstDayOfWeek(); 
      expect(week).to.eql(0);
    }));
  });
});

describe("GregorianCalendar", function() {
  describe("#getDayNumberOfMonth()", function() {
    it("should get day number of month", sinon.test(function() {

      var calendar = new GregorianCalendar({});
      var dateObject1 = new DateObject(2017,1,1);    
      var dateObject2 = new DateObject(2016,2,1);    
      var days1 = calendar.getDayNumberOfMonth(dateObject1);
      var days2 = calendar.getDayNumberOfMonth(dateObject2); 
      expect(days1).to.eql(31);      
      expect(days2).to.eql(29);
    }));
  });
});

describe("GregorianCalendar", function() {
  describe("#isLeapYear(year)", function() {
    it("should be true if it's leap year; otherwise, return false", function() {
      var calendar = new GregorianCalendar({});
      expect(calendar.isLeapYear(4)).to.be.true;
      expect(calendar.isLeapYear(400)).to.be.true;
      expect(calendar.isLeapYear(1)).to.be.false;
      expect(calendar.isLeapYear(100)).to.be.false;
    });
  });
});

describe("GregorianCalendar", function() {
  describe("#convertCalendarToJulianDay()", function() {
    it("should convert calendar date to Julian Day", function() {
      var calendar = new GregorianCalendar({});
      expect(calendar.convertCalendarToJulianDay(2017,1,1)).to.eql(2457754.5);   
    });
  });
});

describe("GregorianCalendar", function() {
  describe("#convertJulianDayToCalendar()", function() {
    it("should convert Julian Day to calendar date", function() {
      var calendar = new GregorianCalendar({});
      expect(calendar.convertJulianDayToCalendar(2457754.5)).to.eql({year:2017,month:1,day:1});   
    });
  });
});


