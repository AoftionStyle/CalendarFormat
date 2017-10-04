document.addEventListener("DOMContentLoaded", function(event) { 
    var inputDateTime = "1-2-2016 23:23.12"
    // document.getElementById('demo').innerHTML = inputDateTime

    var ec = expectedCalendar()
    var ac = actualCalendar(inputDateTime)
    myFunction(inputDateTime)
    //compareFunction(ec,ac)
});

function myFunction(inputDateTime){
    var calendar = calendarFormat(inputDateTime)
    console.log(calendar);
    console.log(calendar.getDay());
}

function compareFunction(resultCalendar, callCalendar){
    compareCalendar(resultCalendar, callCalendar)
}