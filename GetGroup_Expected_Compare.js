function expectedGetGroup(){
    let rc = []
    rc.push("Monday")
    rc.push("01")
    rc.push("02")
    rc.push("2016")
    rc.push("23")
    rc.push("23")
    rc.push("01")

    return rc
}

function actualGetGroup(inputDateTime){
    let calendar = calendarFormat(inputDateTime);
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

function compareGetGroup(inputDateTime){
    let expected = expectedGetGroup();
    let actual = actualGetGroup(inputDateTime);
    let mapCalendar = new Map()
    for(let i = 0; i<expected.length; i++ ){
        mapCalendar.set( expected[i], expected[i]===actual[i] ? "true" : "false" )
        // document.write( expectedCalendar[i], " === " , actualCalendar[i], " => ", mapCalendar.get(expectedCalendar[i] ) )
        // document.write("<br>")
        console.log( expected[i], " === " , actual[i], " => ", mapCalendar.get(expected[i] ) )
    }
    return mapCalendar
}