function expectedCalendar(){
    var rc = []
    rc.push("01/02/2016")
    rc.push("23:23:12")
    rc.push("01/02/2016 23:23:12")
    rc.push(new Date( 2016, 2-1, 01, 23, 23, 12 ).toString())

    return rc
}

function actualCalendar(inputDateTime){
    var calendar = calendarFormat(inputDateTime);
    var ac = []
    ac.push(calendar.calendarDate)
    ac.push(calendar.calendarTime)
    ac.push(calendar.calendarDateTime)
    ac.push(calendar.calendarObject.toString())
    
    return ac
}

function compareCalendar(expectedCalendar, actualCalendar){
    var mapCalendar = new Map()
    for(var i = 0; i<expectedCalendar.length; i++ ){
        mapCalendar.set( expectedCalendar[i], expectedCalendar[i]===actualCalendar[i] ? "true" : "false" )
        document.write( expectedCalendar[i], " === " , actualCalendar[i], " => ", mapCalendar.get(expectedCalendar[i] ) )
        document.write("<br>")
    }
    return mapCalendar
}