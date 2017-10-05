// UnitOfWork_StateUnderTest_ExpectedBehavior
// MethodName_StateUnderTest_ExpectedBehavior

// Unit of work คือ use case ของระบบที่เราต้องการทดสอบ
// Method name คือ ชื่อ method ที่เราต้องการทดสอบ
// State under test คือ สถานะของการทดสอบย ซึ่งสัมพันธ์กับ input ที่เราใส่เข้าไป
// Expected behaviour คือ ผลลัพธ์ที่คาดหวังของการทำงานจาก input ที่เรากำหนด

function expectedCalendar(){
    let rc = []
    rc.push("01/02/2016")
    rc.push("23:23:01")
    rc.push("01/02/2016 23:23:01")
    rc.push(new Date( 2016, 2-1, 01, 23, 23, 01 ).toString())

    return rc
}

function actualCalendar(inputDateTime){
    let calendar = calendarFormat(inputDateTime);
    let ac = []
    ac.push(calendar.calendarDate())
    ac.push(calendar.calendarTime())
    ac.push(calendar.calendarDateTime())
    ac.push(calendar.calendarObject.toString())
    
    return ac
}

function compareCalendar(inputDateTime){
    let expected = expectedCalendar();
    let actual = actualCalendar(inputDateTime);
    let mapCalendar = new Map()
    for(let i = 0; i<expected.length; i++ ){
        mapCalendar.set( expected[i], expected[i]===actual[i] ? "true" : "false" )
        // document.write( expectedCalendar[i], " === " , actualCalendar[i], " => ", mapCalendar.get(expectedCalendar[i] ) )
        // document.write("<br>")
        console.log( expected[i], " === " , actual[i], " => ", mapCalendar.get(expected[i] ) )
    }
    return mapCalendar
}