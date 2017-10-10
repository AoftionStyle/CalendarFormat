document.addEventListener("DOMContentLoaded", function(event) { 
    var inputDateTime = "01.02.2016 23:24:01"

    // var mapDateTime = { year:2016, month:1, date:2-1, hours:23, miniutes:24, seconds:1 }
    // var dateObject = new Date( mapDateTime.year, mapDateTime.month, mapDateTime.date, mapDateTime.hours, mapDateTime.miniutes, mapDateTime.seconds )
    // var inputDateTime = dateObject.getTime()
    // console.log("inputDateTime ",dateObject);
    // console.log("# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # ");
    // document.getElementById('demoDateTime').innerHTML = inputDateTime + "<br><br> inputDateTime is " + inputDateTime.getTime()
    
    document.getElementById('demoDateTime').innerHTML = inputDateTime ;
    let calendar = calendarFormat();
    console.log("calendar :", calendar.calendarDate()); // without inputeDateTime
    // compareCalendar(inputDateTime)
    // compareGetGroup(inputDateTime)
    // compareNextGroup(inputDateTime)
    // comparePrevGroup(inputDateTime)
});