function callCalendarCSAccounting(inputDate){
    var d = calendarCSAccounting(inputDate);
    console.log("calendarCSAccounting ",d.nextDate())
    return inputDate;
}

var calendarCSAccounting = function (inputDate) {
    var csRegExp = new RegExp(/[.|,={}\:/-]/);
    var stringDate = converToCalendarCSAccountingFormat(inputDate);
    var objectDate = calendarCSAccountingSetup(inputDate);// stringDate be object like new Date()
    console.log("string setup :",stringDate)
    console.log("object setup :",objectDate);
    return {
        // will delete // convertDate: calendarCSAccountingDate(stringDate),//stringDate input format "dd/mm/yyyy"
        // will delete // convertTime: calendarCSAccountingTime(stringDate),
        // not sure //convertToCalendarCSAccounting: converToCalendarCSAccountingFormat(stringDate), 

        // calendarCSAccounting: converToCalendarCSAccountingFormat(stringDate),// input is stringFormat "dd/mm/yyyy HH:mm:ss" or use csRegExp
        // calendarDate: convertToCalendarCSAccountingDate(stringDate),// beta
        // calendarTime: convertToCalendarCSAccountingTime(stringDate),// beta
        // getDay: getCalendarCSAccountingDay(objectDate),
        // getDate: getCalendarCSAccountingDate(objectDate),
        // getMonth: getCalendarCSAccountingMonth(objectDate),
        // getYear: getCalendarCSAccountingYear(objectDate),
        // getHours: getCalendarCSAccountingHours(objectDate),
        // getMinutes: getCalendarCSAccountingMinutes(objectDate),
        // getSeconds: getCalendarCSAccountingSeconds(objectDate),
        // nextDay: function (intNumber) { return nextDay(objectDate, intNumber) },
        
        // for below function have problem
        nextDate: function(intNumber) { return nextDate(objectDate, intNumber) },
        // nextMonth: function(intNumber) { return nextMonth(objectDate, intNumber) },
        // nextYear: function(intNumber) { nextYear(objectDate, intNumber) }
    }

    function converToCalendarCSAccountingFormat(stringDate){//convertDate dd/mm/yyyy HH:mm:ss 24hrs or use csRegExp
        var dateSplit = stringDate.split(' ')[0]
        var timeSplit = stringDate.split(' ')[1]
        return [convertToCalendarCSAccountingDate(dateSplit), convertToCalendarCSAccountingTime(timeSplit)].join(' ');
    }

    function convertToCalendarCSAccountingDate(stringDate){//input "dd-mm-yyyy" or use csRegExp
        if( stringDate !== 'undefined' ) {
            var splitDate = stringDate.split(csRegExp);
            var d = new Date()
            // splitDate =  [ zeroPrefix(splitDate[0]), zeroPrefix(splitDate[1]) ,zeroPrefix(splitDate[2]) ].join('/')
            // return splitDate;// result "dd/mm/yyyy"
            return [ zeroPrefix(splitDate[0]), zeroPrefix(splitDate[1]) ,zeroPrefix(splitDate[2]) ].join('/')
        }
        console.log("date :",stringDate);
        var d = calendarCSAccountingSetup();
        return [ zeroPrefix(d.getDate()), zeroPrefix(d.getMonth()), zeroPrefix(d.getFullYear()) ]
    }

    function convertToCalendarCSAccountingTime(stringDate){//input "HH:mm:ss" or use csRegExp
        if( stringDate !== 'undefined' ) {
            var splitTime = stringDate.split(csRegExp)
            // splitTime = [ zeroPrefix(splitTime[0]), zeroPrefix(splitTime[1]) ,zeroPrefix(splitTime[2]) ].join(':');
            // return splitTime;// result "HH:mm:ss" //display 24hrs
            return [ zeroPrefix(splitTime[0]), zeroPrefix(splitTime[1]) ,zeroPrefix(splitTime[2]) ].join(':');
        }
        console.log("time :",stringDate);
        var d = calendarCSAccountingSetup();
        return [ [ zeroPrefix(d.getHours()), zeroPrefix(d.getMinutes()), zeroPrefix(d.getSeconds()) ] ].join(':');
    }

    function calendarCSAccountingSetup(stringDate) {
        if( stringDate !== 'undefined' ) {
            var dateSplit = convertToCalendarCSAccountingDate(stringDate.split(' ')[0]).split(csRegExp);
            var timeSplit = convertToCalendarCSAccountingTime(stringDate.split(' ')[1]).split(csRegExp);
            return new Date( dateSplit[2], dateSplit[1]-1, dateSplit[0], timeSplit[0], timeSplit[1], timeSplit[2], 0 );
        }
        return new Date();
    }

    /* cancel
    function calendarCSAccountingSetup(stringDate) {//input "dd+{csReg}+mm+{csReg}+yyyy+' '+HH+{csReg}+mm+{csReg}ss" // time display 24hrs
        if( stringDate !== 'undefined' ) {
            stringDate = stringDate + " " + "00:00:00"
            var dateSplit = stringDate.split(' ')[0].split(csRegExp);
            var timeSplit = stringDate.split(' ')[1].split(csRegExp) //!== 'undefined' ? stringDate.split(' ')[1].split(csReg);
            
            // var csDate = convertToCalendarCSAccountingDate(stringDate);
            // var csTime = convertToCalendarCSAccountingTime(stringDate);

            return new Date( dateSplit[2], dateSplit[1]-1, dateSplit[0], timeSplit[0], timeSplit[1], timeSplit[2], 0 );
        } 
        return new Date();
    }
    */

    /* it duplicated function
    // function calendarCSAccountingFormat(stringDate) {//convertDate dd/mm/yyyy HH:mm:ss 24hrs
    //     return converToCalendarCSAccountingFormat(stringDate);
    // }

    // function calendarCSAccountingDate(stringDate){
    //     return convertToCalendarCSAccountingDate( stringDate );//converDate to "dd/mm/yyyy"
    // }

    // function calendarCSAccountingTime(stringDate){//converTime HH:mm:ss 24hrs
    //     return convertToCalendarCSAccountingTime( stringDate );
    // }
    */

    function dayOfWeek(intNumber){
        intNumber = typeof intNumber !== 'undefined' ? intNumber%7 : null;
        var listSevenDays = ['Sunday','Monday','Tuesday','Wendsday','Thursday','Friday','Saturday'];
        return listSevenDays[intNumber]
    }

    function getCalendarCSAccountingDay(objectDate){
        return dayOfWeek( objectDate.getDay() );
    }

    function getCalendarCSAccountingDate(objectDate){
        return objectDate.getDate();
    }

    function getCalendarCSAccountingMonth(objectDate){
        return objectDate.getMonth() + 1;
    }

    function getCalendarCSAccountingYear(objectDate){
        return objectDate.getFullYear();
    }

    function getCalendarCSAccountingHours(objectDate){
        return objectDate.getHours();
    }

    function getCalendarCSAccountingMinutes(objectDate){
        return objectDate.getMinutes();
    }

    function getCalendarCSAccountingSeconds(objectDate){
        return objectDate.getSeconds();
    }

    function nextDay(objectDate, intNumber){
        return dayOfWeek( stringDate.getDay() + undefinedEqualOne(intNumber) );
    }

    function nextDate(objectDate, intNumber){
        var csDate = [ getCalendarCSAccountingDate(objectDate)+1, getCalendarCSAccountingMonth(objectDate), getCalendarCSAccountingYear(objectDate) ];
        csDate = convertToCalendarCSAccountingDate(csDate.toString())
        var csTime = [ getCalendarCSAccountingHours(objectDate), getCalendarCSAccountingMinutes(objectDate), getCalendarCSAccountingSeconds(objectDate) ];
        csTime = convertToCalendarCSAccountingTime(csTime.toString())
        return [ csDate, csTime ].join(' ');
    }
    
    function nextMonth(objectDate, intNumber){
        // var current = stringDate;
        // var next = getMonth(stringDate);
        // console.log("current :",current)
        // console.log("next :",next);
        //return calendarCSAccountingSetup( stringDate.setMonth( stringDate.getMonth() + undefinedEqualOne(intNumber) ) );
        // return calendarCSAccountingFormat( new Date( new Date(stringDate).setMonth( getMonth(stringDate) + undefinedEqualOne(intNumber) - 1 ) ) );

        var csDate = [ getCalendarCSAccountingDate(objectDate)+1, getCalendarCSAccountingMonth(objectDate), getCalendarCSAccountingYear(objectDate) ];
        csDate = convertToCalendarCSAccountingDate(csDate.toString())
        var csTime = [ getCalendarCSAccountingHours(objectDate), getCalendarCSAccountingMinutes(objectDate), getCalendarCSAccountingSeconds(objectDate) ];
        csTime = convertToCalendarCSAccountingTime(csTime.toString())
        return [ csDate, csTime ].join(' ');
    }

    function nextYear(objectDate, intNumber){
        return calendarCSAccountingFormat( new Date( 
            getYear(stringDate) + undefinedEqualOne(intNumber), getMonth(stringDate) - 1, getDate(stringDate)
        ));
    }

    function prevDay(objectDate, intNumber){
        return dayOfWeek( new Date( calendarCSAccountingFormat(stringDate) ).getDay() - undefinedEqualOne(intNumber) );
    }

    function prevDate(objectDate, intNumber){   
        return calendarCSAccountingFormat( new Date( new Date().setDate( getDate(stringDate) - undefinedEqualOne(intNumber) ) ) );
    }

    function undefinedEqualOne(intNumber){
        return typeof intNumber !== 'undefined' ? Math.abs(intNumber) : 1;
    }

    function zeroPrefix(stringDate) { 
        return (stringDate < 10) ? '0' + stringDate : stringDate; 
    }

};
