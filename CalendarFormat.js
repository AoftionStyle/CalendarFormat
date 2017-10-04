var calendarFormat = function (inputDateTime) { // input date
  var calendarFormat = {}
  
  const csRegExp = new RegExp(/[.|,={}\:/-]/g)
  const spaceRegExp = new RegExp(/[ ]/)
  
  // preparing input format
  this.inputDateTime = inputDateTime
  this.stringDate = calendarDateForm()
  this.stringTime = calendarTimeForm()
  this.stringDateTime = calendarForm()
  this.objectDateTime = calendarObjectForm()// stringDate be object like new Date()

  calendarFormat.calendarDate = this.stringDate
  calendarFormat.calendarTime = this.stringTime
  calendarFormat.calendarDateTime = this.stringDateTime
  calendarFormat.calendarObject = this.objectDateTime

  return calendarFormat;
  
  function calendarDateForm(){
    let d = new Date()
    if( this.inputDateTime !== 'undefined' ) {
      let splitDate = this.inputDateTime.split(spaceRegExp)[0].split(csRegExp);
      d.setDate( splitDate[0] ); d.setMonth( splitDate[1]-1 ); d.setFullYear( splitDate[2] );
    }
    return [ leadingZero( d.getDate() ), leadingZero( d.getMonth()+1 ), leadingZero( d.getFullYear() ) ].join('/')
  }

  function calendarTimeForm(){
    let t = new Date()
    if( this.inputDateTime !== 'undefined' ) {
        let splitTime = this.inputDateTime.split(spaceRegExp)[1].split(csRegExp);
        t.setHours( splitTime[0] ); t.setMinutes( splitTime[1] ); t.setSeconds( splitTime[2] );
    }
    return [ leadingZero( t.getHours() ), leadingZero( t.getMinutes() ), leadingZero( t.getSeconds() ) ].join(':')
  }
  
  function calendarForm(){
    return [calendarDateForm(), calendarTimeForm()].join(' ')// return "dd/mm/yyyy hh:mm:ss"
  }
  
  function calendarObjectForm(){
    let dateSplit = calendarDateForm().split(csRegExp)
    let timeSplit = calendarTimeForm().split(csRegExp)
    return new Date( dateSplit[2], dateSplit[1]-1, dateSplit[0], timeSplit[0], timeSplit[1], timeSplit[2] )
  }

  function leadingZero(stringSource){
    return (stringSource < 10) ? '0' + stringSource : stringSource; 
  }

}

