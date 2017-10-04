document.addEventListener("DOMContentLoaded", function(event) { 
    var inputDateTime = "1-2-2016 23:23.12"
    var a = [1,2,2,2,2]
    document.getElementById('demo').innerHTML = a

    var resultCalendar = setResultCalendar()
    var callCalendar = getCalendar(inputDateTime)

    compareCalendar(resultCalendar, callCalendar)
    whyFalse(resultCalendar, callCalendar)
});