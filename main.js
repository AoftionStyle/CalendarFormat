document.addEventListener("DOMContentLoaded", function(event) { 
    // var inputDateTime = "1-2-2016 23:23.1"
    // var inputDatetime = new Date( 2016, ).getTime()

    var mapDateTime = { year:2016, month:1, date:2-1, hours:23, miniutes:24, seconds:1 }
    var inputDateTime = new Date( mapDateTime.year, mapDateTime.month, mapDateTime.date, mapDateTime.hours, mapDateTime.miniutes, mapDateTime.seconds )
    var epouchTime = inputDateTime.getTime()
    
    console.log("inputDateTime ",inputDateTime);
    console.log("# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # ");
    document.getElementById('demoDateTime').innerHTML = inputDateTime + "<br><br> inputDateTime is " + inputDateTime.getTime()
    
    // compareCalendar(epouchTime)
    // compareGetGroup(epouchTime)
    // compareNextGroup(epouchTime)
    // comparePrevGroup(epouchTime)
});