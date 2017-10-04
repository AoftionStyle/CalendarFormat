function compareCalendar(resultCalendar, callCalendar){
    var mapCalendar = mapResultCalendar(resultCalendar, callCalendar)
    console.log("calendarMap :",mapCalendar);
}

function setResultCalendar(){
    var resultCalendar = []
    resultCalendar.push("01/02/2016")
    resultCalendar.push("23:23:12")
    resultCalendar.push("01/02/2016 23:23:12")
    resultCalendar.push(new Date( 2016, 2-1, 01, 23, 23, 12 ).toString())

    return resultCalendar
}

function getCalendar(inputDateTime){
    var calendar = calendarFormat(inputDateTime);
    var callCalendar = []
    callCalendar.push(calendar.calendarDate)
    callCalendar.push(calendar.calendarTime)
    callCalendar.push(calendar.calendarDateTime)
    callCalendar.push(calendar.calendarObject.toString())
    
    return callCalendar
}

function mapResultCalendar(resultCalendar, callCalendar){
    var mapCalendar = new Map()
    for(var i = 0; i<resultCalendar.length; i++ ){
        mapCalendar.set( resultCalendar[i], resultCalendar[i]===callCalendar[i] ? "true" : "false" )
        document.write( resultCalendar[i], " === " , callCalendar[i], " => ", mapCalendar.get(resultCalendar[i] ) )
        document.write("<br>")
    }
    return mapCalendar
}

function whyFalse(resultCalendar, callCalendar){
    console.log(resultCalendar[3].toString(), "===" , callCalendar[3].toString() );
    console.log(resultCalendar[3].toString() === callCalendar[3].toString());
    
}