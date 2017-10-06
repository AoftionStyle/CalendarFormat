document.addEventListener("DOMContentLoaded", function(event) { 
    var inputDateTime = "1-2-2016 23:23.1"
    
    document.getElementById('demoDateTime').innerHTML = "inputDateTime is "+inputDateTime

    // myFunction(inputDateTime)
    // compareCalendar(inputDateTime)
    compareGetGroup(inputDateTime)
});

function myFunction(inputDateTime){
    
}

function compareFunction(resultCalendar, callCalendar){
    compareCalendar(resultCalendar, callCalendar)
}