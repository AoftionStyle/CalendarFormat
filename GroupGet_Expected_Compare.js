function expectedGetGroup(){
    let rc = []
    rc.push("Monday")
    rc.push("01")
    rc.push("02")
    rc.push("2016")
    rc.push("23")
    rc.push("24")
    rc.push("01")

    return rc
}

function actualGetGroup(epouchTime){
    let calendar = calendarFormat(epouchTime);
    let ac = []
    ac.push(calendar.getDay())
    ac.push(calendar.getDate())
    ac.push(calendar.getMonth())
    ac.push(calendar.getYear())
    ac.push(calendar.getHours())
    ac.push(calendar.getMinutes())
    ac.push(calendar.getSeconds())
    
    return ac
}

function compareGetGroup(epouchTime){
    let expected = expectedGetGroup();
    let actual = actualGetGroup(epouchTime);
    let mapCalendar = new Map()
    for(let i = 0; i<expected.length; i++ ){
        mapCalendar.set( expected[i], expected[i]===actual[i] ? "true" : "false" )
        console.log( expected[i], " === " , actual[i], " => ", mapCalendar.get(expected[i] ) )
    }
    return mapCalendar
}