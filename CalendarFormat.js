/**
 * @param { unformedDateTime }, be null this function get current date and time
 * 
 * @param { unformedDateTime }, assigned string format "dd/mm/yyyy hh:mm:ss" to unformedDatetTime
 * @param { dateTimeFormatting }, when unformedDateTime not unformat assigned must put expectedDateForm example "dd-mm-yyyy hh:mm:ss"
 * 
 * calendarFormat work when unformedDateTime using format "dd/mm/yyyy hh:mm:ss" 
 * calendarFormat work when unformedDateTime using another format must expectedDateForm and expecedTimeForm
 */

var calendarFormat = function ( unformedDateTime, dateTimeFormatting = {expectedDateForm: undefined, expectedTimeForm: undefined, day: undefined} ) { // input date
  let calendarFormat = {}, $_cf = calendarFormat
  const spaceRegExp = " "

  console.log("dateTimeFormatting :",dateTimeFormatting);

  let valid_cf = validateUnformedDateTime()
  if( valid_cf === null ) return false // handle error, finding better handle error
  
  // let $pData = preparingData(dateTimeFormatting)
  
  // let dateRegExp = $pData.dateRegExp
  // let timeRegExp = $pData.timeRegExp
  // let expectedDateForm = $pData.dateForm
  // let expectedTimeForm = $pData.timeForm
    
  
  const cfRegExp = new RegExp(/[.|,\:/-]/g)
  // const spaceRegExp = new RegExp(/\s/)
  
  const dateTimeRegExp = new RegExp(/ /)

  // preparing input format
  let ud = unformedDateTime.split(spaceRegExp)[0]
  let ut = unformedDateTime.split(spaceRegExp)[1]
  
  // console.log("ud :", ud);
  // console.log("unformedDateTime match = "+ud.match(/^(\d{2})\/(\d{2})\/(\d{4})$/));

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
    let dateSplit = convertDateFormat(this.inputDateTime).split(cfRegExp)
    let timeSplit = convertTimeFormat(this.inputDateTime).split(cfRegExp)
    this.inputDateTime = [dateSplit, timeSplit].join(spaceRegExp)
    return new Date( dateSplit[2], dateSplit[1]-1, dateSplit[0], timeSplit[0], timeSplit[1], timeSplit[2] )
  }

  function convertDateFormat(unformedDate){// input "dd/mm/yyyy"
    let d = new Date()
    if( unformedDate !== undefined ) {
      let splitDate = unformedDate.split(spaceRegExp)[0].split(cfRegExp)
      d.setDate( splitDate[0] ); d.setMonth( splitDate[1]-1 ); d.setFullYear( splitDate[2] );
    }
    return [ leadingZero( d.getDate() ), leadingZero( d.getMonth()+1 ), leadingZero( d.getFullYear() ) ].join(dateRegExp)
  }

  function convertTimeFormat(unformedTime){
    let t = new Date()
    if( unformedTime !== undefined ) {
        let splitTime = unformedTime.split(spaceRegExp)[1].split(cfRegExp)
        t.setHours( splitTime[0] ); t.setMinutes( splitTime[1] ); t.setSeconds( splitTime[2] );
    }
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
    let listSevenDays = ['Sunday','Monday','Tuesday','Wendsday','Thursday','Friday','Saturday']
    return listSevenDays[intNumber]
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

  /*
  function preparingData (dateTimeFormatting) {
    console.log("dateTimeFormatting :", dateTimeFormatting);
    let dateForm = "dd/mm/yyyy", timeForm = "hh:mm:ss",
        dateRegExp = "/", timeRegExp = ":"
    let $exDate = dateTimeFormatting.expectedDateForm,
        $exTime = dateTimeFormatting.expectedTimeForm

    let dateRegExpList = ['/', '-', '_', ',', '.']
    let timeRegExpList = [':', '; ']

    if($exDate !== undefined && $exDate !== null){
      dateForm = $exDate !== undefined ? $exDate : dateForm
      // console.log("dateForm.match(/[0-9]{2}.{1}[0-9]{2}.{1}[0-9]{4}/) :",dateForm.match(/[d]{2}[.]{1}[m]{2}[.]{1}[y]{4}/) );
      // dateRegExp = dateForm.match(/[d]{2}[/]{1}[m]{2}[/]{1}[y]{4}/) ? '/' :
      //             dateForm.match(/[d]{2}[-]{1}[m]{2}[-]{1}[y]{4}/) ? '-'  :
      //             dateForm.match(/[d]{2}[_]{1}[m]{2}[_]{1}[y]{4}/) ? '_'  :
      //             dateForm.match(/[d]{2}[,]{1}[m]{2}[,]{1}[y]{4}/) ? ','  :
      //             dateForm.match(/[d]{2}[.]{1}[m]{2}[.]{1}[y]{4}/) ? '.'  : "not matched"

      // console.log(dateForm.match(new RegExp(/[0-9]{2}.{1}[0-9]{2}.{1}[0-9]{4}/)))
      // dateRegExp = dateForm.match(/[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}/) !== null ? '/' :
      //             dateForm.match(/[0-9]{2}[|]{1}[0-9]{2}[|]{1}[0-9]{4}/) !== null ? '/' :
      //             dateForm.match(/[0-9]{2}.{1}[0-9]{2}.{1}[0-9]{4}/) !== null ? '/' :
      //             "not matched"

      console.log("input dateForm :",dateForm);
      for( let dre in dateRegExpList ){
        dateRegExp = dateRegExpList[dre]
        // dateForm = dateForm.match(/[d]{2}[dateRegExp]{1}[m]{2}[dateRegExp]{1}[y]{4}/)
        dateForm = dateForm.match("/[d]{2}["+dateRegExp+"]{1}[m]{2}["+dateRegExp+"]{1}[y]{4}/")
        console.log("for dateForm :",dateForm.match("/[d]{2}["+dateRegExp+"]{1}[m]{2}["+dateRegExp+"]{1}[y]{4}/") );
        if ( dateForm !== null ) {
          console.log("dre :",dateRegExp)
          break ;
        }
      }
    }
    console.log("output dateForm :",dateForm);

    if($exTime !== undefined && $exTime !== null){
      timeForm = $exTime !== undefined ? $exTime : timeForm
      console.log("timeForm :", timeForm);
      timeRegExp = timeForm.match(':') ? ':':
      timeForm.match(';') ? ';' :
      timeForm.match('.') ? '.' :
      timeForm.match(',') ? ',' :
      timeForm.match('|') ? '|' : "not matched"
      console.log("timeRegExp :",timeRegExp);
    }

    dateForm = dateForm.match(/[0-9]{2}[dateRegExp]{1}[0-9]{2}[dateRegExp]{1}[0-9]{4}/) // dd{dateRegExp}mm{dateRegExp}yyyy
    timeForm = timeForm.match(/[0-9]{2}[timeRegExp]{1}[0-9]{2}[timeRegExp]{1}[0-9]{2}/) // hh{timeRegExp}mm{timeRegExp}ss
    dateForm = dateForm !== null ? dateForm : "dd/mm/yyyy"
    timeForm = timeForm !== null ? timeForm : "hh:mm:ss"

    return {
      dateForm: dateForm,
      timeForm: timeForm,
      dateRegExp: dateRegExp,
      timeRegExp: timeRegExp
    }
  }
  */

  function validateUnformedDateTime(){
    let $vd = unformedDateTime.split(spaceRegExp)[0]
    let $vt = unformedDateTime.split(spaceRegExp)[1]
    $vd = $vd.match(/(\d){2}[/]{1}(\d){2}[/]{1}(\d){4}/)
    $vt = $vt.match(/(\d){2}[:]{1}(\d){2}[:]{1}(\d){2}/)

    console.log("$vd :", $vd);
    console.log("$vt :", $vt);
    console.log("dateForm :",dateTimeFormatting.expectedDateForm);
    console.log("timeForm :",dateTimeFormatting.expectedTimeForm);

    console.log("asd :",$vd===null || $vt===null && dateTimeFormatting.expectedDateForm === undefined && dateTimeFormatting.expectedTimeForm === undefined);

    if(dateTimeFormatting.expectedDateForm === undefined || dateTimeFormatting.expectedTimeForm === undefined){
      if($vd === null || $vt === null)
        throw "wrong input Format"
    }
  }

}

