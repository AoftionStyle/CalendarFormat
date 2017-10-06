function expectedNextGroup(){
    let rc = []
    rc.push("Tuesday")
    rc.push("03/02/2016")
    rc.push("10/02/2016")
    rc.push("10/03/2016")
    rc.push("10/03/2017")

    return rc
}

function actualNextGroup(epouchTime){
    let calendar = calendarFormat(epouchTime);
    let ac = []
    ac.push(calendar.nextDay())
    ac.push(calendar.nextDate())
    ac.push(calendar.nextWeek())
    ac.push(calendar.nextMonth())
    ac.push(calendar.nextYear())
    
    return ac
}

function compareNextGroup(epouchTime){
    let expected = expectedNextGroup();
    let actual = actualNextGroup(epouchTime);
    let mapCalendar = new Map()
    for(let i = 0; i<expected.length; i++ ){
        mapCalendar.set( expected[i], expected[i]===actual[i] ? "true" : "false" )
        // document.write( expectedCalendar[i], " === " , actualCalendar[i], " => ", mapCalendar.get(expectedCalendar[i] ) )
        // document.write("<br>")
        console.log( expected[i], " === " , actual[i], " => ", mapCalendar.get(expected[i] ) )
    }
    return mapCalendar
}