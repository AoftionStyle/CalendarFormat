function expectedPrevGroup(){
    let rc = []
    rc.push("Sunday")
    rc.push("30/01/2016")
    rc.push("23/01/2016")
    rc.push("23/12/2015")
    rc.push("23/12/2014")

    return rc
}

function actualPrevGroup(epouchTime){
    let calendar = calendarFormat(epouchTime);
    let ac = []
    ac.push(calendar.prevDay())
    ac.push(calendar.prevDate())
    ac.push(calendar.prevWeek())
    ac.push(calendar.prevMonth())
    ac.push(calendar.prevYear())
    
    return ac
}

function comparePrevGroup(epouchTime){
    let expected = expectedPrevGroup();
    let actual = actualPrevGroup(epouchTime);
    let mapCalendar = new Map()
    for(let i = 0; i<expected.length; i++ ){
        mapCalendar.set( expected[i], expected[i]===actual[i] ? "true" : "false" )
        // document.write( expectedCalendar[i], " === " , actualCalendar[i], " => ", mapCalendar.get(expectedCalendar[i] ) )
        // document.write("<br>")
        console.log( expected[i], " === " , actual[i], " => ", mapCalendar.get(expected[i] ) )
    }
    return mapCalendar
}