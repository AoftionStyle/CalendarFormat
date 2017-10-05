document.addEventListener("DOMContentLoaded", function(event) { 
    var inputDateTime = "1-2-2016 23:23.1"
    
    document.getElementById('demoDateTime').innerHTML = "inputDateTime is "+inputDateTime

    var ec = expectedCalendar()
    var ac = actualCalendar(inputDateTime)
    myFunction(inputDateTime)
    //compareFunction(ec,ac)
});

function myFunction(inputDateTime){
    var calendar = calendarFormat(inputDateTime)
    console.log("FULLLLLL :",calendar);
    console.log( "obj :",calendar.calendarObject )
    console.log( "next :",calendar.nextDate() );
    console.log( "date :",calendar.calendarDate());
    console.log( "obj :",calendar.calendarObject )
    console.log( "prev :",calendar.prevDay() );
    console.log( "obj :",calendar.calendarObject )

    // console.log( calendar.calendarDate() )
    // console.log( calendar.nextDay() );
    // console.log( calendar.calendarDate() )
    // console.log( calendar.prevDay() );
    // console.log( calendar.calendarDate() )
}

function compareFunction(resultCalendar, callCalendar){
    compareCalendar(resultCalendar, callCalendar)
}