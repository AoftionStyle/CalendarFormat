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
    ac.push(calendar.setPrevDay())
    ac.push(calendar.setPrevDate())
    ac.push(calendar.setPrevWeek())
    ac.push(calendar.setPrevMonth())
    ac.push(calendar.setPrevYear())
    
    return ac
}

function comparePrevGroup(epouchTime){
    let expected = expectedPrevGroup();
    let actual = actualPrevGroup(epouchTime);
    let mapCalendar = new Map()
    for(let i = 0; i<expected.length; i++ ){
        mapCalendar.set( expected[i], expected[i]===actual[i] ? "true" : "false" )
        console.log( expected[i], " === " , actual[i], " => ", mapCalendar.get(expected[i] ) )
    }
    return mapCalendar
}