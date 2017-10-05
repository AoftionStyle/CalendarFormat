var calendarFormat = function (inputDateTime) { // input date
  var calendarFormat = {}, $_cf = calendarFormat
  
  const cfRegExp = new RegExp(/[.|,={}\:/-]/g)
  // const spaceRegExp = new RegExp(/\s/)
  const spaceRegExp = /\s/
  const dateRegExp = "/"
  const timeRegExp = ":"
  const dateTimeRegExp = new RegExp(/ /)

  // preparing input format
  this.inputDateTime = inputDateTime
  this.objectDateTime = calendarObjectForm()// stringDate be object like new Date()
  let $_obj = this.objectDateTime
  this.stringDate = calendarDateForm()
  this.stringTime = calendarTimeForm()
  this.stringDateTime = calendarForm()
  
  // group's calendar 
  $_cf.calendarObject = this.objectDateTime
  $_cf.calendarDate = function() { return calendarDateForm() }
  $_cf.calendarTime = this.stringTime
  $_cf.calendarDateTime = this.stringDateTime
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
    if( unformedDate !== 'undefined' ) {
      let splitDate = unformedDate.split(spaceRegExp)[0].split(cfRegExp)
      d.setDate( splitDate[0] ); d.setMonth( splitDate[1]-1 ); d.setFullYear( splitDate[2] );
    }
    return [ leadingZero( d.getDate() ), leadingZero( d.getMonth()+1 ), leadingZero( d.getFullYear() ) ].join(dateRegExp)
  }

  function convertTimeFormat(unformedTime){
    let t = new Date()
    if( unformedTime !== 'undefined' ) {
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
    console.log("dateForm :",calendarDateForm() );
    console.log("timeForm :",[calendarDateForm(), joinTime].join(spaceRegExp));
    return convertTimeFormat( [calendarDateForm(), joinTime].join(spaceRegExp) )
  }
  
  function calendarForm(){

    //return [calendarDateForm(), calendarTimeForm()].join(' ')// return "dd/mm/yyyy hh:mm:ss"
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
    return $_obj.getDate()
  }

  function getMonth(){
    return $_obj.getMonth() + 1
  }

  function getYear(){
    return $_obj.getFullYear()
  }

  function getHours(){
      return $_obj.getHours()
  }

  function getMinutes(){
      return $_obj.getMinutes()
  }

  function getSeconds(){
      return $_obj.getSeconds()
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

