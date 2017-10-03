function callCalendarCSAccounting(inputDate){
    var d = calendarCSAccounting(inputDate);
    console.log("calendarCSAccounting :",d)
    return inputDate;
}

var calendarCSAccounting = function (inputDate) {
    var csRegExp = new RegExp(/[.|,={}\:/-]/);
    var spaceRegExp = new RegExp(/[/\s/g]/)
    // preparing input format
    var stringDate = converToCalendarCSAccountingFormat(inputDate);
    var objectDate = calendarCSAccountingSetup(inputDate);// stringDate be object like new Date()

    return {
        // will delete // convertDate: calendarCSAccountingDate(stringDate),//stringDate input format "dd/mm/yyyy"
        // will delete // convertTime: calendarCSAccountingTime(stringDate),
        // not sure //convertToCalendarCSAccounting: converToCalendarCSAccountingFormat(stringDate), 

        // calendarCSAccounting: converToCalendarCSAccountingFormat(stringDate),// input is stringFormat "dd/mm/yyyy HH:mm:ss" or use csRegExp
        calendarDate: convertToCalendarCSAccountingDate(stringDate),// beta
        // calendarTime: convertToCalendarCSAccountingTime(stringDate),// beta

        // getDay: getDay(objectDate),
        // getDate: getDate(objectDate),
        // getMonth: getMonth(objectDate),
        // getYear: getYear(objectDate),
        // getHours: getHours(objectDate),
        // getMinutes: getMinutes(objectDate),
        // getSeconds: getSeconds(objectDate),
        nextDay: function (intNumber) { return nextDay(objectDate, intNumber) },
        // nextDate: function(intNumber) { return nextDate(objectDate, intNumber) },
        // nextMonth: function(intNumber) { return nextMonth(objectDate, intNumber) },
        // nextYear: function(intNumber) { return nextYear(objectDate, intNumber) },
        // prevDay: function (intNumber) { return prevDay(objectDate, intNumber) },
        // prevDate: function (intNumber) { return prevDate(objectDate, intNumber) },
        // prevMonth: function (intNumber) { return prevMonth(objectDate, intNumber) },
        // prevYear: function (intNumber) { return prevYear(objectDate, intNumber) }
    }

    function converToCalendarCSAccountingFormat(stringDate){//convertDate dd/mm/yyyy HH:mm:ss 24hrs or use csRegExp
        // var spaceRegExp = new RegExp(/[/\s/g]/)
        var dateSplit = stringDate.split(spaceRegExp)[0]
        var timeSplit = stringDate.split(spaceRegExp)[1]
        console.log(dateSplit," format :",convertToCalendarCSAccountingDate(dateSplit));
        console.log(timeSplit," time :",convertToCalendarCSAccountingTime(timeSplit));
        return [convertToCalendarCSAccountingDate(dateSplit), convertToCalendarCSAccountingTime(timeSplit)].join(' ');
    }

    //initial Date
    function convertToCalendarCSAccountingDate(stringDate){//input "dd-mm-yyyy" or use csRegExp
        var d = new Date();
        if( stringDate !== 'undefined' ) {
            var splitDate = stringDate.split(csRegExp);
            d = new Date( splitDate[2], splitDate[1]-1, splitDate[0] );
            console.log("d2 :",d);
        }
        return [ zeroPrefix( d.getDate() ), zeroPrefix( d.getMonth()+1 ), zeroPrefix( d.getFullYear() ) ].join('/')
    }

    //initial Time
    function convertToCalendarCSAccountingTime(stringDate){//input "HH:mm:ss" or use csRegExp
        var t = new Date();
        if( stringDate !== 'undefined' ) {
            var splitTime = stringDate.split(csRegExp);
            console.log("splitTime :",splitTime);
            t.setHours( splitTime[0] ); t.setMinutes( splitTime[1] ); t.setSeconds( splitTime[2] )
        }
        return [ zeroPrefix( t.getDate() ), zeroPrefix( t.getMonth() ), zeroPrefix( t.getFullYear() ) ].join(':')
    }

    function calendarCSAccountingSetup(stringDate) {
        if( stringDate !== 'undefined' ) {
            var dateSplit = convertToCalendarCSAccountingDate(stringDate.split(spaceRegExp)[0]).split(csRegExp);
            var timeSplit = convertToCalendarCSAccountingTime(stringDate.split(spaceRegExp)[1]).split(csRegExp);
            return new Date( dateSplit[2], dateSplit[1]-1, dateSplit[0], timeSplit[0], timeSplit[1], timeSplit[2], 0 );
        }
        return new Date();
    }

    function dayOfWeek(intNumber){
        intNumber = typeof intNumber !== 'undefined' ? intNumber%7 : null;
        var listSevenDays = ['Sunday','Monday','Tuesday','Wendsday','Thursday','Friday','Saturday'];
        return listSevenDays[intNumber]
    }

    function getDay(objectDate){
        return dayOfWeek( objectDate.getDay() );
    }

    function getDate(objectDate){
        return objectDate.getDate();
    }
getCalendarCSAccountingMonth
    function getMonth(objectDate){
        return objectDate.getMonth() + 1;
    }

    function getYear(objectDate){
        return objectDate.getFullYear();
    }

    function getHours(objectDate){
        return objectDate.getHours();
    }

    function getMinutes(objectDate){
        return objectDate.getMinutes();
    }

    function getSeconds(objectDate){
        return objectDate.getSeconds();
    }

    function nextDay(objectDate, intNumber){
        return dayOfWeek( objectDate.getDay() + undefinedEqualOne(intNumber) );
    }

    function nextDate(objectDate, intNumber){
        objectDate.setDate( objectDate.getDate() + undefinedEqualOne(intNumber) );
        return convertToCalendarCSAccountingDate([ objectDate.getDate(), objectDate.getMonth()+1, objectDate.getFullYear() ].join('/'));
    }
    
    function nextMonth(objectDate, intNumber){
        var lastDateOfMonth = new Date( objectDate.getFullYear(), objectDate.getMonth() + 1, 0 ).getDate();
        if( objectDate.getDate() == lastDateOfMonth ){
            objectDate.setDate( 1 );
            objectDate.setMonth( objectDate.getMonth() + undefinedEqualOne(intNumber) );
            objectDate.setDate( new Date( objectDate.getFullYear(), objectDate.getMonth() + 1, 0 ).getDate() );
        } else {
            objectDate.setMonth( objectDate.getMonth() + undefinedEqualOne(intNumber) )
        }
        return convertToCalendarCSAccountingDate([ objectDate.getDate(), objectDate.getMonth()+1, objectDate.getFullYear() ].join('/'));
    }

    function nextYear(objectDate, intNumber){
        var getStringDate = nextMonth(objectDate, intNumber*12);
        return getStringDate;
    }

    function prevDay(objectDate, intNumber){
        return dayOfWeek( objectDate.getDay() - undefinedEqualOne(intNumber) );
    }

    function prevDate(objectDate, intNumber){
        objectDate.setDate( objectDate.getDate() - undefinedEqualOne(intNumber) );
        return convertToCalendarCSAccountingDate([ objectDate.getDate(), objectDate.getMonth()+1, objectDate.getFullYear() ].join('/'));
    }

    function prevMonth(objectDate, intNumber){
        var lastDateOfMonth = new Date( objectDate.getFullYear(), objectDate.getMonth() + 1, 0 ).getDate();
        if( objectDate.getDate() == lastDateOfMonth ){
            objectDate.setDate( 1 );
            objectDate.setMonth( objectDate.getMonth() - undefinedEqualOne(intNumber) );
            objectDate.setDate( new Date( objectDate.getFullYear(), objectDate.getMonth() + 1, 0 ).getDate() );
        } else {
            objectDate.setMonth( objectDate.getMonth() - undefinedEqualOne(intNumber) )
        }
        return convertToCalendarCSAccountingDate([ objectDate.getDate(), objectDate.getMonth()+1, objectDate.getFullYear() ].join('/'));
    }

    function prevYear(objectDate, intNumber){
        var getStringDate = prevMonth(objectDate, intNumber*12);
        return getStringDate;
    }

    function undefinedEqualOne(intNumber){
        return typeof intNumber !== 'undefined' ? Math.abs(intNumber) : 1;
    }

    function zeroPrefix(stringDate) { 
        return (stringDate < 10) ? '0' + stringDate : stringDate; 
    }

};
