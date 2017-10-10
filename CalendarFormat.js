/**
 * @param { unformedDateTime }, be null this function get current date and time
 * 
 * @param { unformedDateTime }, assigned string format "dd/mm/yyyy hh:mm:ss" to unformedDatetTime
 * @param { expectedDateForm }, when unformedDateTime not unformat assigned must put expectedDateForm example "dd[.,\/\\-_]mm[.,\/\\-_]yyyy"
 * @param { expectedTimeForm }, when unformedDateTime not unformat assigned must put expectedTimeForm example "hh[:;]mm[:;]ss"
 * @param { expectedDay }, when not assigned default is "long" when assgined put "long" or "short"
 * 
 * calendarFormat work when unformedDateTime using format "dd/mm/yyyy hh:mm:ss" 
 * calendarFormat work when unformedDateTime using another format must expectedDateForm and expecedTimeForm
 */

var calendarFormat = function ( unformedDateTime, expectedDateForm, expectedTimeForm, expectedDay ) { // day not ready to use
  const dateSplitRegExp = new RegExp(/[.,\/\\-_]/g);// ["."(dot), ","(comma), "/"(slash), "\"(blackslash), "-"(dash), "_"(underscore)]
  const timeSplitRegExp = new RegExp(/[:;]/g)
  const spaceRegExp = ' '

  unformedDateTime = unformedDateTime !== undefined ? unformedDateTime : "" +
                  leadingZero(new Date().getDate()) + '/' + leadingZero(new Date().getMonth()+1) + '/' + leadingZero(new Date().getFullYear()) + spaceRegExp +
                  leadingZero(new Date().getHours()) + ':' + leadingZero(new Date().getMinutes()) + ':' + leadingZero(new Date().getSeconds())
  
  let valid_cf = validateUnformedDateTimeAndExpectedDataSet()// handle error, finding better handle error
  let pExpData = prepareExpectedData(expectedDateForm, expectedTimeForm, expectedDay)
  
  const dateJoinExp = pExpData.dateRegExp
  const timeJoinExp = pExpData.timeRegExp
  const dateMatch = pExpData.dateMatch
  const timeMatch = pExpData.timeMatch
  const dayMatch = pExpData.dayMatch
  
  this.inputDateTime = unformedDateTime
  this.objectDateTime = calendarObjectForm()// stringDate be object like new Date()
  let $_obj = this.objectDateTime
  
  let calendarFormat = {}, $_cf = calendarFormat  
  // group's calendar 
  $_cf.calendarObject = this.objectDateTime
  $_cf.calendarDate = function () { return calendarDateForm() }
  $_cf.calendarTime = function () { return calendarTimeForm() }
  $_cf.calendarDateTime = function () { return calendarForm() }
  // group's get
  $_cf.getDay = function () { return getDay() }
  $_cf.getDate = function () { return getDate() }
  $_cf.getMonth = function () { return getMonth() }
  $_cf.getYear = function () { return getYear() }
  $_cf.getHours = function () { return getHours() }
  $_cf.getMinutes = function () { return getMinutes() }
  $_cf.getSeconds = function () { return getSeconds() }
  // group's next
  $_cf.nextDay = function (number) { return nextDay(number) }
  $_cf.nextDate = function (number) { return nextDate(number) }
  $_cf.nextWeek = function (number) { return nextWeek(number) }
  $_cf.nextMonth = function (number) { return nextMonth(number) }
  $_cf.nextYear = function (number) { return nextYear(number) }
  // group's prev
  $_cf.prevDay = function (number) { return prevDay(number) }
  $_cf.prevWeek = function (number) { return prevWeek(number) }
  $_cf.prevDate = function (number) { return prevDate(number) }
  $_cf.prevMonth = function (number) { return prevMonth(number) }
  $_cf.prevYear = function (number) { return prevYear(number) }

  return calendarFormat

  function calendarObjectForm(){
    let splitDateTime = this.inputDateTime.split(spaceRegExp)
    let dateSplit = convertDateFormat(splitDateTime[0]).split(dateSplitRegExp)// ผิดอยู่นะจ้ะ
    let timeSplit = convertTimeFormat(splitDateTime[1]).split(timeSplitRegExp)
    this.inputDateTime = [dateSplit, timeSplit].join(spaceRegExp)
    return new Date( dateSplit[2], dateSplit[1]-1, dateSplit[0], timeSplit[0], timeSplit[1], timeSplit[2] ) // this equal new Date() when unformedDateTime === undeinfed
  }

  function convertDateFormat(unformedDate){// input "dd[dateSplitRegExp]mm[dateSplitRegExp]yyyy"
    let d = new Date()
    let splitDate = unformedDate.split(dateSplitRegExp)
    d.setDate( splitDate[0] ); d.setMonth( splitDate[1]-1 ); d.setFullYear( splitDate[2] );
    return [ leadingZero( d.getDate() ), leadingZero( d.getMonth()+1 ), leadingZero( d.getFullYear() ) ].join(dateJoinExp)
  }

  function convertTimeFormat(unformedTime){// input "hh[timeSplitRegExp]mm[timeSplitRegExp]ss"
    let t = new Date()
    let splitTime = unformedTime.split(timeSplitRegExp)
    t.setHours( splitTime[0] ); t.setMinutes( splitTime[1] ); t.setSeconds( splitTime[2] );
    return [ leadingZero( t.getHours() ), leadingZero( t.getMinutes() ), leadingZero( t.getSeconds() ) ].join(timeJoinExp)
  }
  
  function calendarDateForm(){
    return convertDateFormat( [$_obj.getDate(), $_obj.getMonth()+1, $_obj.getFullYear()].join(dateJoinExp) )
  }

  function calendarTimeForm(){
    return convertTimeFormat( [$_obj.getHours(), $_obj.getMinutes(), $_obj.getSeconds()].join(timeJoinExp) )
  }
  
  function calendarForm(){
    return [calendarDateForm(), calendarTimeForm()].join(spaceRegExp)
  }
  
  function dayOfWeek(number){
    let intNumber = typeof number !== 'undefined' ? Math.floor(Math.abs(number))%7 : null
    let dayWeekLong = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    let dayWeekShort = ['Sun','Mon','Tues','Wed','Thu','Fri','Sat']
    return dayMatch == "long" ? dayWeekLong[intNumber] : 
            dayMatch == "short" ? dayWeekShort[intNumber] : "day not matched"
  }
  
  function getDay(){
    return dayOfWeek( $_obj.getDay() )
  }

  function getDate(){
    return leadingZero( $_obj.getDate() ).toString()
  }

  function getMonth(){
    return leadingZero( $_obj.getMonth() + 1 ).toString()
  }

  function getYear(){
    return $_obj.getFullYear().toString()
  }

  function getHours(){
      return leadingZero( $_obj.getHours() ).toString()
  }

  function getMinutes(){
      return leadingZero( $_obj.getMinutes() ).toString()
  }

  function getSeconds(){
      return leadingZero( $_obj.getSeconds() ).toString()
  }

  function nextDay(number){
    $_obj.setDate( $_obj.getDate() + undefinedNumberEqualOne(number) )
    return dayOfWeek( $_obj.getDay() )
  }

  function nextDate(number){
    $_obj.setDate( $_obj.getDate() + undefinedNumberEqualOne(number) )
    return convertDateFormat([ $_obj.getDate(), $_obj.getMonth()+1, $_obj.getFullYear() ].join(dateJoinExp))
  }

  function nextWeek(number){
    return nextDate(7*undefinedNumberEqualOne(number))
  }

  function nextMonth(number){
    if( $_obj.getDate() == lastDatOfMonth() ){
      $_obj.setDate( 1 )
      $_obj.setMonth( $_obj.getMonth() + undefinedNumberEqualOne(number) )
      $_obj.setDate( new Date( $_obj.getFullYear(), $_obj.getMonth() + 1, 0 ).getDate() )
    } else {
      $_obj.setMonth( $_obj.getMonth() + undefinedNumberEqualOne(number) )
    }
    return convertDateFormat([ $_obj.getDate(), $_obj.getMonth()+1, $_obj.getFullYear() ].join(dateJoinExp))
  }

  function nextYear(number){
    return nextMonth(12*undefinedNumberEqualOne(number));
  }

  function prevDay(number){
    $_obj.setDate( $_obj.getDate() - undefinedNumberEqualOne(number) )
    return dayOfWeek( $_obj.getDay() )
  }

  function prevDate(number){
    $_obj.setDate( $_obj.getDate() - undefinedNumberEqualOne(number) )
    return convertDateFormat([ $_obj.getDate(), $_obj.getMonth()+1, $_obj.getFullYear() ].join(dateJoinExp))
  }

  function prevWeek(number){
    return prevDate(7*undefinedNumberEqualOne(number))
  }

  function prevMonth(number){
    if( $_obj.getDate() == lastDatOfMonth() ){
      $_obj.setDate( 1 )
      $_obj.setMonth( $_obj.getMonth() - undefinedNumberEqualOne(number) )
      $_obj.setDate( new Date( $_obj.getFullYear(), $_obj.getMonth() + 1, 0 ).getDate() )
    } else {
      $_obj.setMonth( $_obj.getMonth() - undefinedNumberEqualOne(number) )
    }
    return convertDateFormat([ $_obj.getDate(), $_obj.getMonth()+1, $_obj.getFullYear() ].join(dateJoinExp))
  }

  function prevYear(number){
    return prevMonth(12*undefinedNumberEqualOne(number))
  }

  function undefinedNumberEqualOne(number){
    return typeof number !== 'undefined' ? Math.abs(number) : 1
  }

  function leadingZero(stringSource){//may outside this calendarFormat
    return (stringSource < 10) ? '0' + stringSource : stringSource
  }

  function lastDatOfMonth(){
    return new Date( $_obj.getFullYear(), $_obj.getMonth() + 1, 0 ).getDate()
  }

  function validateUnformedDateTimeAndExpectedDataSet(){
    let $vd = unformedDateTime.split(spaceRegExp)[0]
    let $vt = unformedDateTime.split(spaceRegExp)[1]
    $vd = $vd.match(/(\d){2}[/]{1}(\d){2}[/]{1}(\d){4}/)
    $vt = $vt.match(/(\d){2}[:]{1}(\d){2}[:]{1}(\d){2}/)

    if( expectedDateForm === undefined || expectedTimeForm === undefined ){
      if($vd === null || $vt === null)
        throw "wrong input Format"
    }
  }

  function prepareExpectedData (expectedDateForm, expectedTimeForm, expectedDay) { // note backslash \ not ready
    let dateMatch = /[d]{2}[/]{1}[m]{2}[/]{1}[y]{4}/gi // default date match
    let timeMatch = /[h]{2}[:]{1}[m]{2}[:]{1}[s]{2}/gi // default time match
    let dayMatch = "long" // default day match
    let dateRegExp = "/", timeRegExp = ":" // default dateRegExp = "/", timeRegExp = ":"
    let $_exDate = expectedDateForm,
        $_exTime = expectedTimeForm,
        $_exDay = expectedDay
    let dateNotMatched = "date not matched"
    let timeNotMatched = "time not matched"
    let dayNotMatched = "day not matched"
  
    if($_exDate !== undefined && $_exDate !== null){
                  //  dd[RegExp]mm[RegExp]yyyy
      dateRegExp = $_exDate.match(/[d]{2}[.]{1}[m]{2}[.]{1}[y]{4}/gi)==$_exDate ? '.' :
                  $_exDate.match(/[d]{2}[,]{1}[m]{2}[,]{1}[y]{4}/gi)==$_exDate ? ',' :
                  $_exDate.match(/[d]{2}[/]{1}[m]{2}[/]{1}[y]{4}/gi)==$_exDate ? '/' :
                  $_exDate.match(/[d]{2}[\\]{1}[m]{2}[\\]{1}[y]{4}/gi)==$_exDate ? '\\' :
                  $_exDate.match(/[d]{2}[-]{1}[m]{2}[-]{1}[y]{4}/gi)==$_exDate ? '-' :
                  $_exDate.match(/[d]{2}[_]{1}[m]{2}[_]{1}[y]{4}/gi)==$_exDate ? '_' :
                  //  mm[RegExp]dd[RegExp]yyyy
                  $_exDate.match(/[m]{2}[.]{1}[d]{2}[.]{1}[y]{4}/gi)==$_exDate ? '.' :
                  $_exDate.match(/[m]{2}[,]{1}[d]{2}[,]{1}[y]{4}/gi)==$_exDate ? ',' :
                  $_exDate.match(/[m]{2}[/]{1}[d]{2}[/]{1}[y]{4}/gi)==$_exDate ? '/' :
                  $_exDate.match(/[m]{2}[\\]{1}[d]{2}[\\]{1}[y]{4}/gi)==$_exDate ? '\\' :
                  $_exDate.match(/[m]{2}[-]{1}[d]{2}[-]{1}[y]{4}/gi)==$_exDate ? '-' :
                  $_exDate.match(/[m]{2}[_]{1}[d]{2}[_]{1}[y]{4}/gi)==$_exDate ? '_' :
                  //  yyyy[RegExp]mm[RegExp]dd
                  $_exDate.match(/[y]{4}[.]{1}[m]{2}[.]{1}[d]{2}/gi)==$_exDate ? '.' :
                  $_exDate.match(/[y]{4}[,]{1}[m]{2}[,]{1}[d]{2}/gi)==$_exDate ? ',' :
                  $_exDate.match(/[y]{4}[/]{1}[m]{2}[/]{1}[d]{2}/gi)==$_exDate ? '/' :
                  $_exDate.match(/[y]{4}[\\]{1}[m]{2}[\\]{1}[d]{2}/gi)==$_exDate ? '\\' :
                  $_exDate.match(/[y]{4}[-]{1}[m]{2}[-]{1}[d]{2}/gi)==$_exDate ? '-' :
                  $_exDate.match(/[y]{4}[_]{1}[m]{2}[_]{1}[d]{2}/gi)==$_exDate ? '_' : dateNotMatched
                  
                  //  dd[RegExp]mm[RegExp]yyyy
      dateMatch = $_exDate.match(/[d]{2}[.]{1}[m]{2}[.]{1}[y]{4}/gi)==$_exDate ? /[d]{2}[.]{1}[m]{2}[.]{1}[y]{4}/gi :
                  $_exDate.match(/[d]{2}[,]{1}[m]{2}[,]{1}[y]{4}/gi)==$_exDate ? /[d]{2}[,]{1}[m]{2}[,]{1}[y]{4}/gi :
                  $_exDate.match(/[d]{2}[/]{1}[m]{2}[/]{1}[y]{4}/gi)==$_exDate ? /[d]{2}[/]{1}[m]{2}[/]{1}[y]{4}/gi :
                  $_exDate.match(/[d]{2}[\\]{1}[m]{2}[\\]{1}[y]{4}/gi)==$_exDate ? /[d]{2}[\\]{1}[m]{2}[\\]{1}[y]{4}/gi :
                  $_exDate.match(/[d]{2}[-]{1}[m]{2}[-]{1}[y]{4}/gi)==$_exDate ? /[d]{2}[-]{1}[m]{2}[-]{1}[y]{4}/gi :
                  $_exDate.match(/[d]{2}[_]{1}[m]{2}[_]{1}[y]{4}/gi)==$_exDate ? /[d]{2}[_]{1}[m]{2}[_]{1}[y]{4}/gi :
                  //  mm[RegExp]dd[RegExp]yyyy
                  $_exDate.match(/[m]{2}[.]{1}[d]{2}[.]{1}[y]{4}/gi)==$_exDate ? /[m]{2}[.]{1}[d]{2}[.]{1}[y]{4}/gi :
                  $_exDate.match(/[m]{2}[,]{1}[d]{2}[,]{1}[y]{4}/gi)==$_exDate ? /[m]{2}[,]{1}[d]{2}[,]{1}[y]{4}/gi :
                  $_exDate.match(/[m]{2}[/]{1}[d]{2}[/]{1}[y]{4}/gi)==$_exDate ? /[m]{2}[/]{1}[d]{2}[/]{1}[y]{4}/gi :
                  $_exDate.match(/[m]{2}[\\]{1}[d]{2}[\\]{1}[y]{4}/gi)==$_exDate ? /[m]{2}[\\]{1}[d]{2}[\\]{1}[y]{4}/gi :
                  $_exDate.match(/[m]{2}[-]{1}[d]{2}[-]{1}[y]{4}/gi)==$_exDate ? /[m]{2}[-]{1}[d]{2}[-]{1}[y]{4}/gi :
                  $_exDate.match(/[m]{2}[_]{1}[d]{2}[_]{1}[y]{4}/gi)==$_exDate ? /[m]{2}[_]{1}[d]{2}[_]{1}[y]{4}/gi :
                  //  yyyy[RegExp]mm[RegExp]dd
                  $_exDate.match(/[y]{4}[.]{1}[m]{2}[.]{1}[d]{2}/gi)==$_exDate ? /[y]{4}[.]{1}[m]{2}[.]{1}[d]{2}/gi : 
                  $_exDate.match(/[y]{4}[,]{1}[m]{2}[,]{1}[d]{2}/gi)==$_exDate ? /[y]{4}[,]{1}[m]{2}[,]{1}[d]{2}/gi :
                  $_exDate.match(/[y]{4}[/]{1}[m]{2}[/]{1}[d]{2}/gi)==$_exDate ? /[y]{4}[/]{1}[m]{2}[/]{1}[d]{2}/gi :
                  $_exDate.match(/[y]{4}[\\]{1}[m]{2}[\\]{1}[d]{2}/gi)==$_exDate ? /[y]{4}[\\]{1}[m]{2}[\\]{1}[d]{2}/gi :
                  $_exDate.match(/[y]{4}[-]{1}[m]{2}[-]{1}[d]{2}/gi)==$_exDate ? /[y]{4}[-]{1}[m]{2}[-]{1}[d]{2}/gi :
                  $_exDate.match(/[y]{4}[_]{1}[m]{2}[_]{1}[d]{2}/gi)==$_exDate ? /[y]{4}[_]{1}[m]{2}[_]{1}[d]{2}/gi : dateNotMatched
    }
    if( dateRegExp == dateNotMatched || dateMatch == dateNotMatched ) throw dateNotMatched
  
    if($_exTime !== undefined && $_exTime !== null){
      timeRegExp = $_exTime.match(/[h]{2}[:]{1}[m]{2}[:]{1}[s]{2}/gi)==$_exTime ? ':' :
                  $_exTime.match(/[h]{2}[;]{1}[m]{2}[;]{1}[s]{2}/gi)==$_exTime ? ';' : timeNotMatched
      
      timeMatch = $_exTime.match(/[h]{2}[:]{1}[m]{2}[:]{1}[s]{2}/gi)==$_exTime ? /[h]{2}[:]{1}[m]{2}[:]{1}[s]{2}/gi :
                $_exTime.match(/[h]{2}[;]{1}[m]{2}[;]{1}[s]{2}/gi)==$_exTime ? /[h]{2}[;]{1}[m]{2}[;]{1}[s]{2}/gi : timeNotMatched
    }
    if( timeRegExp == timeNotMatched || timeMatch == timeNotMatched ) throw timeNotMatched
    
    if( $_exDay !== undefined && $_exDay !== null ) {
      dayMatch = $_exDay == "long" ? $_exDay :
                $_exDay == "short" ? $_exDay : dayNotMatched
    } 
    if( dayMatch == dayNotMatched ) throw dayNotMatched

    let expectedData = {}
    expectedData.dateMatch = dateMatch,
    expectedData.timeMatch = timeMatch,
    expectedData.dateRegExp= dateRegExp,
    expectedData.timeRegExp= timeRegExp,
    expectedData.dayMatch = dayMatch
  
    return expectedData
  }

}

  // function dateJoinExp(arrayTojoin){
  //   return joinExpression(arrayToJoin, joinExp)
  // }

  // function timeJoinExp(arrayTojoin){
  //   return joinExpression(arrayToJoin, joinExp)
  // }

  // function joinExp(arrayToJoin, joinExp){
  //   let stringToJoin = ""
  //   for(let j = 0; j < arrayToJoin.length-1; j++){
  //     stringToJoin = arrayToJoin[j] + joinExp;
  //   }
  //   return stringToJoin;
  // }