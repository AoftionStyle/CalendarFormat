// UnitOfWork_StateUnderTest_ExpectedBehavior
// MethodName_StateUnderTest_ExpectedBehavior

// Unit of work คือ use case ของระบบที่เราต้องการทดสอบ
// Method name คือ ชื่อ method ที่เราต้องการทดสอบ
// State under test คือ สถานะของการทดสอบย ซึ่งสัมพันธ์กับ input ที่เราใส่เข้าไป
// Expected behaviour คือ ผลลัพธ์ที่คาดหวังของการทำงานจาก input ที่เรากำหนด

function expected(){
    var rc = []
    rc.push("01/02/2016")
    rc.push("23:23:12")
    rc.push("01/02/2016 23:23:12")
    rc.push(new Date( 2016, 2-1, 01, 23, 23, 12 ).toString())

    return rc
}

function actual(inputDateTime){
    var calendar = calendarFormat(inputDateTime);
    var ac = []
    ac.push(calendar.calendarDate)
    ac.push(calendar.calendarTime)
    ac.push(calendar.calendarDateTime)
    ac.push(calendar.calendarObject.toString())
    
    return ac
}

function compare(expectedCalendar, actualCalendar){
    var mapCalendar = new Map()
    for(var i = 0; i<expectedCalendar.length; i++ ){
        mapCalendar.set( expectedCalendar[i], expectedCalendar[i]===actualCalendar[i] ? "true" : "false" )
        document.write( expectedCalendar[i], " === " , actualCalendar[i], " => ", mapCalendar.get(expectedCalendar[i] ) )
        document.write("<br>")
    }
    return mapCalendar
}