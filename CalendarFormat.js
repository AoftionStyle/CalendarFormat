var calendarFormat = function (inputDateTime) { // input date
  let calendarFormat = {}, $_cf = calendarFormat
  
  const cfRegExpList = []
  const cfRegExp = new RegExp(/[.|,={}\:/-]/g)
  // const spaceRegExp = new RegExp(/\s/)
  const spaceRegExp = ' '
  const dateRegExp = '/'
  const timeRegExp = ':'
  const dateTimeRegExp = new RegExp(/ /)
  //const local

  // preparing input format
  this.inputDateTime = inputDateTime
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
    Date.u
    return new Date( dateSplit[2], dateSplit[1]-1, dateSplit[0], timeSplit[0], timeSplit[1], timeSplit[2] )
  }

  function convertDateFormat(unformedDate){// input "dd/mm/yyyy"
    let d = new Date()
    if( unformedDate !== 'undefined' ) {
      let splitDate = unformedDate.split(spaceRegExp)[0].split(cfRegExp)
      d.setDate( splitDate[0] ); d.setMonth( splitDate[1]-1 ); d.setFullYear( splitDate[2] )
    }
    let dZone = d.toLocaleString("en-GB", {timeZone: "Asia/Bangkok"}).split(spaceRegExp)[0].split(cfRegExp)
    return [ dZone[0], dZone[1], dZone[2] ].join(dateRegExp)
  }

  function convertTimeFormat(unformedTime){
    let t = new Date()
    if( unformedTime !== 'undefined' ) {
        let splitTime = unformedTime.split(spaceRegExp)[1].split(cfRegExp)
        t.setHours( splitTime[0] ); t.setMinutes( splitTime[1] ); t.setSeconds( splitTime[2] )
    }
    let tZone = t.toLocaleString("en-GB", {timeZone: "Asia/Bangkok"}).split(spaceRegExp)[1].split(cfRegExp) 
    return [ tZone[0], tZone[1], tZone[2] ].join(timeRegExp)
  }
  
  function calendarDateForm(){
    return convertDateFormat( [$_obj.getDate(), $_obj.getMonth()+1, $_obj.getFullYear()].join(dateRegExp) )
  }

  function calendarTimeForm(){
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
    return leadingZero( $_obj.getFullYear() ).toString()
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

}

