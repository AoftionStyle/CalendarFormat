var calendarFormat = function (inputDateTime) { // input date
  if( !isInputDateTimeForm() ){ return false }
  var csRegExp = new RegExp(/[.|,={}\:/-]/)
  //var spaceRegExp = new RegExp(/[/\s/g]/)
  var spaceRegExp = new RegExp(/[ ]/)

  // preparing input format
  this.inputDateTime = inputDateTime
  this.stringDate = calendarDateForm()
  this.stringTime = calendarTimeForm()
  this.stringDateTime = calendarForm()
  this.objectDate = calendarCSAccountingSetup()// stringDate be object like new Date()

  function isInputDateTimeForm() {
    if( this.inputDateTime.split(spaceRegExp) != 2 ){ return false }

    var dateSplit = this.inputDateTime.split(spaceRegExp)[0].split(csRegExp)
    var timeSplit = this.inputDateTime.split(spaceRegExp)[1].split(csRegExp)

    if( dateSplit.length != 3 && timeSplit.length != 3 ){ return false }

    var boolDate = dateSplit.toString().split(csRegExp).length == 3 ? true : false
    var boolTime = timeSplit.toString().split(csRegExp).length == 3 ? true : false

    return boolDate && boolTime
  }

  function calendarFormatObject(){
    var dateSplit = calendarDate()
    var timeSplit = calendarDate()
    return new Date( dateSplit[2], dateSplit[1]-1, dateSplit[0], timeSplit[0], timeSplit[1], timeSplit[2], 0 )
  }

  function calendarForm(){
    return [calendarDate(), calendarTime()].join(' ')// return "dd/mm/yyyy hh:mm:ss"
  }

  function calnedarDate(){
    var d = new Date()
    if( this.inputDateTime !== 'undefined' ) {
        var splitDate = this.inputDateTime.split(csRegExp);
        d.setDate( splitDate[0] ); d.setMonth( splitDate[1]-1 ); d.setFullYear( splitDate[2] );
    }
    return [ zeroPrefix( d.getDate() ), zeroPrefix( d.getMonth()+1 ), zeroPrefix( d.getFullYear() ) ].join('/')
  }

  function calendarTime(){
    var t = new Date()
    if( this.inputDateTime !== 'undefined' ) {
        var splitTime = this.inputDateTime.split(csRegExp);
        t.setHours( splitTime[0] ); t.setMinutes( splitTime[1] ); t.setSeconds( splitTime[2] );
    }
    return [ zeroPrefix( t.getDate() ), zeroPrefix( t.getMonth() ), zeroPrefix( t.getFullYear() ) ].join(':')
  }

}

