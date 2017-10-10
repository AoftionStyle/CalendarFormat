/**
 * @param { unformedDateTime }, be null this function get current date and time
 * 
 * @param { unformedDateTime }, assigned string format "dd/mm/yyyy hh:mm:ss" to unformedDatetTime
 * @param { dateTimeFormatting }, when unformedDateTime not unformat assigned must put expectedDateForm example "dd-mm-yyyy hh:mm:ss"
 * 
 * calendarFormat work when unformedDateTime using format "dd/mm/yyyy hh:mm:ss" 
 * calendarFormat work when unformedDateTime using another format must expectedDateForm and expecedTimeForm
 */

var calendarFormat = function ( unformedDateTime, expectedDateForm, expectedTimeForm, day ) { // day not ready to use
  const spaceRegExp = ' '
  unformedDateTime = unformedDateTime !== undefined ? unformedDateTime : "" +
                  leadingZero(new Date().getDate()) + '/' + leadingZero(new Date().getMonth()+1) + '/' + leadingZero(new Date().getFullYear()) + spaceRegExp +
                  leadingZero(new Date().getHours()) + ':' + leadingZero(new Date().getMinutes()) + ':' + leadingZero(new Date().getSeconds())
  console.log("unformedDateTime :",unformedDateTime)
  let valid_cf = validateUnformedDateTimeNotUndefined()// handle error, finding better handle error
  let $_pData = preparingData(expectedDateForm, expectedTimeForm, day)
  
  let dateRegExp = $_pData.dateRegExp
  let timeRegExp = $_pData.timeRegExp
  let calendarFormat = {}, $_cf = calendarFormat  
  expectedDateForm = $_pData.dateMatch
  expectedTimeForm = $_pData.timeMatch

  // const cfRegExp = new RegExp(/[.|,\:/-]/g)
  // const cfRegExp = new RegExp(/[.|,]/g);
  
  const dateTimeRegExp = new RegExp(/ /)

  this.inputDateTime = unformedDateTime
  this.objectDateTime = calendarObjectForm()// stringDate be object like new Date()
  let $_obj = this.objectDateTime
  this.stringDate = calendarDateForm()
  this.stringTime = calendarTimeForm()
  this.stringDateTime = calendarForm()
  
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
    console.log("calendarObjectForm this.inputDateTime :",this.inputDateTime)
    let dateSplit = convertDateFormat(this.inputDateTime).split(dateRegExp)
    let timeSplit = convertTimeFormat(this.inputDateTime).split(timeRegExp)
    this.inputDateTime = [dateSplit, timeSplit].join(spaceRegExp)
    return new Date( dateSplit[2], dateSplit[1]-1, dateSplit[0], timeSplit[0], timeSplit[1], timeSplit[2] ) // this equal new Date() when unformedDateTime === undeinfed
  }

  function convertDateFormat(unformedDate){// input "dd/mm/yyyy"
    let d = new Date()
    // if( unformedDate !== undefined ) {
      console.log("convertDateFormat unformedDate :",unformedDate)
      let splitDate = unformedDate.split(spaceRegExp)[0].split(dateRegExp)
      // console.log("splitDate :", splitDate)
      console.log("split[0,1,2] :",splitDate[0], " ", splitDate[1]-1 , " ", splitDate[2])
      d.setDate( splitDate[0] ); d.setMonth( splitDate[1]-1 ); d.setFullYear( splitDate[2] );
      // console.log("new date set :", d )
    // }
    return [ leadingZero( d.getDate() ), leadingZero( d.getMonth()+1 ), leadingZero( d.getFullYear() ) ].join(dateRegExp)
  }

  function convertTimeFormat(unformedTime){
    let t = new Date()
    //if( unformedTime !== undefined ) {
      console.log("converTimeFormat unfomedTime :", unformedTime)
        let splitTime = unformedTime.split(spaceRegExp)[1].split(timeRegExp)
        console.log("splitTime :", splitTime)
        t.setHours( splitTime[0] ); t.setMinutes( splitTime[1] ); t.setSeconds( splitTime[2] );
        console.log("split[0,1,2] :",splitTime[0], " ", splitTime[1], " ", splitTime[2])
    //}
    return [ leadingZero( t.getHours() ), leadingZero( t.getMinutes() ), leadingZero( t.getSeconds() ) ].join(timeRegExp)
  }
  
  function calendarDateForm(){
    return convertDateFormat( [$_obj.getDate(), $_obj.getMonth()+1, $_obj.getFullYear()].join(dateRegExp) )
  }

  function calendarTimeForm(){
    // return convertTimeFormat(this.inputDateTime)
    let joinTime = [$_obj.getHours(), $_obj.getMinutes(), $_obj.getSeconds()].join(timeRegExp)
    return convertTimeFormat( [calendarDateForm(), joinTime].join(spaceRegExp) )
  }
  
  function calendarForm(){
    return [calendarDateForm(), calendarTimeForm()].join(' ')// return "dd/mm/yyyy hh:mm:ss"
  }
  
  function dayOfWeek(number){
    let intNumber = typeof number !== 'undefined' ? Math.floor(Math.abs(number))%7 : null
    let dayWeekLong = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    let dayWeekShort = ['Sun','Mon','Tues','Wed','Thu','Fri','Sat']
    // return day == "long" ? dayWeekLong[intNumber] : 
    //         day == "short" ? dayWeekShort[intNumber] : "day not matched"
    return dayWeekLong[intNumber]
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
    return convertDateFormat([ $_obj.getDate(), $_obj.getMonth()+1, $_obj.getFullYear() ].join(dateRegExp))
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
    return convertDateFormat([ $_obj.getDate(), $_obj.getMonth()+1, $_obj.getFullYear() ].join(dateRegExp))
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
    return convertDateFormat([ $_obj.getDate(), $_obj.getMonth()+1, $_obj.getFullYear() ].join(dateRegExp))
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
    return convertDateFormat([ $_obj.getDate(), $_obj.getMonth()+1, $_obj.getFullYear() ].join(dateRegExp))
  }

  function prevYear(number){
    return prevMonth(12*undefinedNumberEqualOne(number))
  }

  function undefinedNumberEqualOne(number){
    return typeof number !== 'undefined' ? Math.abs(number) : 1
  }

  function leadingZero(stringSource){
    return (stringSource < 10) ? '0' + stringSource : stringSource
  }

  function lastDatOfMonth(){
    return new Date( $_obj.getFullYear(), $_obj.getMonth() + 1, 0 ).getDate()
  }

  // function preparingData(){

  // }

  function validateUnformedDateTimeNotUndefined(){
    if( unformedDateTime !== undefined ){
      let $vd = unformedDateTime.split(spaceRegExp)[0]
      let $vt = unformedDateTime.split(spaceRegExp)[1]
      $vd = $vd.match(/(\d){2}[/]{1}(\d){2}[/]{1}(\d){4}/)
      $vt = $vt.match(/(\d){2}[:]{1}(\d){2}[:]{1}(\d){2}/)

      console.log("$vd :", $vd);
      console.log("$vt :", $vt);
      console.log("valid() expectedDateForm :",expectedDateForm);
      console.log("valid() expectedTimeForm :",expectedTimeForm);

      if( expectedDateForm === undefined || expectedTimeForm === undefined ){
        if($vd === null || $vt === null)
          throw "wrong input Format"
      }
    }
  }

}

function preparingData (expectedDateForm, expectedTimeForm, day) {
  //let defaultDateForm = "dd/mm/yyyy"
  //let defaultTimeForm = "hh:mm:ss" // default dateForm and timeForm
  let defaultDateMatch = /[d]{2}[/]{1}[m]{2}[/]{1}[y]{4}/gi
  let defaultTimeMatch = /[h]{2}[:]{1}[m]{2}[:]{1}[s]{2}/gi
  let dateMatch = defaultDateMatch
  let timeMatch = defaultTimeMatch
  let dateRegExp = "/", timeRegExp = ":" // default dateRegExp = "/", timeRegExp = ":"
  let $exDate = expectedDateForm,
      $exTime = expectedTimeForm

  if($exDate !== undefined && $exDate !== null){
                
    console.log($exDate, "== /" ,$exDate.match(/[d]{2}[/]{1}[m]{2}[/]{1}[y]{4}/gi)==$exDate)
    console.log($exDate, "== -" ,$exDate.match(/[d]{2}[-]{1}[m]{2}[-]{1}[y]{4}/gi)==$exDate)
    console.log($exDate, "== _" ,$exDate.match(/[d]{2}[_]{1}[m]{2}[_]{1}[y]{4}/gi)==$exDate)
    console.log($exDate, "== ," ,$exDate.match(/[d]{2}[,]{1}[m]{2}[,]{1}[y]{4}/gi)==$exDate)
    console.log($exDate, "== ." ,$exDate.match(/[d]{2}[.]{1}[m]{2}[.]{1}[y]{4}/gi)==$exDate)
                //  dd[RegExp]mm[RegExp]yyyy
    dateRegExp = $exDate.match(/[d]{2}[/]{1}[m]{2}[/]{1}[y]{4}/gi)==$exDate ? '/' :
                $exDate.match(/[d]{2}[-]{1}[m]{2}[-]{1}[y]{4}/gi)==$exDate ? '-' :
                $exDate.match(/[d]{2}[_]{1}[m]{2}[_]{1}[y]{4}/gi)==$exDate ? '_' :
                $exDate.match(/[d]{2}[,]{1}[m]{2}[,]{1}[y]{4}/gi)==$exDate ? ',' :
                $exDate.match(/[d]{2}[.]{1}[m]{2}[.]{1}[y]{4}/gi)==$exDate ? '.' :
                //  yyyy[RegExp]mm[RegExp]dd
                $exDate.match(/[y]{4}[/]{1}[m]{2}[/]{1}[d]{2}/gi)==$exDate ? '/' :
                $exDate.match(/[y]{4}[-]{1}[m]{2}[-]{1}[d]{2}/gi)==$exDate ? '-' :
                $exDate.match(/[y]{4}[_]{1}[m]{2}[_]{1}[d]{2}/gi)==$exDate ? '_' :
                $exDate.match(/[y]{4}[,]{1}[m]{2}[,]{1}[d]{2}/gi)==$exDate ? ',' :
                $exDate.match(/[y]{4}[.]{1}[m]{2}[.]{1}[d]{2}/gi)==$exDate ? '.' : "date not matched"

                //  dd[RegExp]mm[RegExp]yyyy
    dateMatch = $exDate.match(/[d]{2}[/]{1}[m]{2}[/]{1}[y]{4}/gi)==$exDate ? /[d]{2}[/]{1}[m]{2}[/]{1}[y]{4}/gi :
                $exDate.match(/[d]{2}[-]{1}[m]{2}[-]{1}[y]{4}/gi)==$exDate ? /[d]{2}[-]{1}[m]{2}[-]{1}[y]{4}/gi :
                $exDate.match(/[d]{2}[_]{1}[m]{2}[_]{1}[y]{4}/gi)==$exDate ? /[d]{2}[_]{1}[m]{2}[_]{1}[y]{4}/gi :
                $exDate.match(/[d]{2}[,]{1}[m]{2}[,]{1}[y]{4}/gi)==$exDate ? /[d]{2}[,]{1}[m]{2}[,]{1}[y]{4}/gi :
                $exDate.match(/[d]{2}[.]{1}[m]{2}[.]{1}[y]{4}/gi)==$exDate ? /[d]{2}[.]{1}[m]{2}[.]{1}[y]{4}/gi :
                //  yyyy[RegExp]mm[RegExp]dd
                $exDate.match(/[y]{4}[/]{1}[m]{2}[/]{1}[d]{2}/gi)==$exDate ? /[y]{4}[/]{1}[m]{2}[/]{1}[d]{2}/gi :
                $exDate.match(/[y]{4}[-]{1}[m]{2}[-]{1}[d]{2}/gi)==$exDate ? /[y]{4}[-]{1}[m]{2}[-]{1}[d]{2}/gi :
                $exDate.match(/[y]{4}[_]{1}[m]{2}[_]{1}[d]{2}/gi)==$exDate ? /[y]{4}[_]{1}[m]{2}[_]{1}[d]{2}/gi :
                $exDate.match(/[y]{4}[,]{1}[m]{2}[,]{1}[d]{2}/gi)==$exDate ? /[y]{4}[,]{1}[m]{2}[,]{1}[d]{2}/gi :
                $exDate.match(/[y]{4}[.]{1}[m]{2}[.]{1}[d]{2}/gi)==$exDate ? /[y]{4}[.]{1}[m]{2}[.]{1}[d]{2}/gi : "date not matched"
  }
  console.log("dateRegExp :",dateRegExp)
  console.log("output dateForm :",dateMatch);

  if($exTime !== undefined && $exTime !== null){
    timeRegExp = $exTime.match(/[h]{2}[:]{1}[m]{2}[:]{1}[s]{2}/gi)==$exTime ? ':' :
                $exTime.match(/[h]{2}[;]{1}[m]{2}[;]{1}[s]{2}/gi)==$exTime ? ';' : "time not matched"
    
    timeMatch = $exTime.match(/[h]{2}[:]{1}[m]{2}[:]{1}[s]{2}/gi)==$exTime ? /[h]{2}[:]{1}[m]{2}[:]{1}[s]{2}/gi :
              $exTime.match(/[h]{2}[;]{1}[m]{2}[;]{1}[s]{2}/gi)==$exTime ? /[h]{2}[;]{1}[m]{2}[;]{1}[s]{2}/gi : "time not matched"
  }
  console.log("timeRegExp :",timeRegExp);
  console.log("output timeForm :",timeMatch);

  // dateForm = dateForm.match(/[0-9]{2}[dateRegExp]{1}[0-9]{2}[dateRegExp]{1}[0-9]{4}/) // dd{dateRegExp}mm{dateRegExp}yyyy
  // timeForm = timeForm.match(/[0-9]{2}[timeRegExp]{1}[0-9]{2}[timeRegExp]{1}[0-9]{2}/) // hh{timeRegExp}mm{timeRegExp}ss
  // dateForm = dateForm !== null ? dateForm : "dd/mm/yyyy"
  // timeForm = timeForm !== null ? timeForm : "hh:mm:ss"

  return {
    dateMatch: dateMatch,
    timeMatch: timeMatch,
    dateRegExp: dateRegExp,
    timeRegExp: timeRegExp
  }
}