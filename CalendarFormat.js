var calendarFormat = function (inputDateTime) { // input date
  var calendarFormat = {}, $_cf = calendarFormat
  
  const cfRegExp = new RegExp(/[.|,={}\:/-]/g)
  const spaceRegExp = new RegExp(/[ ]/)
  const dateRegExp = "/"
  const timeRegExp = ":"
  
  // preparing input format
  this.inputDateTime = inputDateTime
  this.stringDate = calendarDateForm()
  this.stringTime = calendarTimeForm()
  this.stringDateTime = calendarForm()
  this.objectDateTime = calendarObjectForm()// stringDate be object like new Date()
  let $_obj = this.objectDateTime

  $_cf.calendarDate = this.stringDate
  $_cf.calendarTime = this.stringTime
  $_cf.calendarDateTime = this.stringDateTime
  $_cf.calendarObject = this.objectDateTime
  $_cf.getDay = getDay()
  $_cf.getDate = getDate()
  $_cf.getMonth = getMonth()
  $_cf.getYear = getYear()
  $_cf.getHours = getHours()
  $_cf.getMinutes = getMinutes()
  $_cf.getSeconds = getSeconds()

  $_cf.nextDay = nextDay()
  $_cf.nextDate = nextDate()
  $_cf.nextWeek = nextWeek()
  $_cf.nextMonth = nextMonth()
  $_cf.nextYear = nextYear()

  $_cf.prevDay = prevDay()
  $_cf.prevWeek = prevWeek()
  $_cf.prevDate = prevDate()
  $_cf.prevMonth = prevMonth()
  $_cf.prevYear = prevYear()

  return calendarFormat;
  
  function calendarDateForm(){
    return convertDateFormat(this.inputDateTime)
  }

  function calendarTimeForm(){
    return convertTimeFormat(this.inputDateTime)
  }
  
  function calendarForm(){
    return [calendarDateForm(), calendarTimeForm()].join(' ')// return "dd/mm/yyyy hh:mm:ss"
  }
  
  function calendarObjectForm(){
    let dateSplit = this.stringDate.split(cfRegExp)
    let timeSplit = this.stringDate.split(cfRegExp)
    return new Date( dateSplit[2], dateSplit[1]-1, dateSplit[0], timeSplit[0], timeSplit[1], timeSplit[2] )
  }

  function convertDateFormat(unformedDate){// input "dd/mm/yyyy"
    let d = new Date()
    if( unformedDate !== 'undefined' ) {
      let splitDate = unformedDate.split(spaceRegExp)[0].split(cfRegExp)
      d.setDate( splitDate[0] ); d.setMonth( splitDate[1]-1 ); d.setFullYear( splitDate[2] )
    }
    return [ leadingZero( d.getDate() ), leadingZero( d.getMonth()+1 ), leadingZero( d.getFullYear() ) ].join(dateRegExp)
  }

  function convertTimeFormat(unformedTime){
    let t = new Date()
    if( unformedTime !== 'undefined' ) {
        let splitTime = unformedTime.split(spaceRegExp)[1].split(cfRegExp)
        t.setHours( splitTime[0] ); t.setMinutes( splitTime[1] ); t.setSeconds( splitTime[2] )
    }
    return [ leadingZero( t.getHours() ), leadingZero( t.getMinutes() ), leadingZero( t.getSeconds() ) ].join(timeRegExp)
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
    $_obj.setDate( $_obj.getDate() - undefinedNumberEqualOne(number) );
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

