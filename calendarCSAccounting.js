function callCalendarCSAccounting(inputDate){
    d = calendarCSAccounting(inputDate);
    console.log("calendarCSAccounting ",d)
    return inputDate;
}

var calendarCSAccounting = function (inputDate) {
    var csReg = new RegExp(/[.|,={}\:/-]/);
    var stringDate = calendarCSAccountingSetup(inputDate);
    // console.log("after stringDate convert :",stringDate);
    
    return {
        // calendarCSAccounting: calendarCSAccountingFormat(stringDate),
        // Date: calendarCSAccountingDate(stringDate),
        // Time: calendarCSAccountingTime(stringDate),
        // convertToCalendarCSAccounting: converToCalendarCSAccountingFormat(stringDate), // beta soon
        // convertDate: convertToCalendarCSAccountingDate(stringDate),
        // convertTime: convertToCalendarCSAccountingTime(stringDate),
        // getDay: getDay(stringDate),
        // getDate: getDate(stringDate),
        // getMonth: getMonth(stringDate),
        // getYear: getYear(stringDate),
        // getHours: getHours(stringDate),
        // getMinutes: getMinutes(stringDate),
        // getSeconds: getSeconds(stringDate),
        
        // for below function have problem
        // nextDay : function(intNumber) { 
        //     
        //     return nextDay(stringDate, intNumber) 
        // },
        // nextDate: function(intNumber) { return nextDate(stringDate, intNumber) },
        // nextMonth: nextMonth(stringDate, intNumber),
        // nextYear: function(intNumber) { nextYear(stringDate, intNumber) }
    }

    function converToCalendarCSAccountingFormat(stringDate){//convertDate dd/mm/yyyy HH:mm:ss 24hrs
        return [calendarCSAccountingDate(stringDate), calendarCSAccountingTime(stringDate)].join(' ');
    }

    function convertToCalendarCSAccountingDate(stringDate){//converDate dd/mm/yyyy
        var d = stringDate;
        return [zeroPrefix(d.getDate()), zeroPrefix(d.getMonth()+1), d.getFullYear()].join('/');
    }

    function convertToCalendarCSAccountingTime(stringDate){//converTime HH:mm:ss 24hrs
        var t = stringDate;
        return [zeroPrefix(t.getHours()), zeroPrefix(t.getMinutes()), zeroPrefix(t.getSeconds())].join(':');
    }

    function calendarCSAccountingSetup(stringDate) {//input "dd+{csReg}+mm+{csReg}+yyyy+' '+HH+{csReg}+mm+{csReg}ss" // time display 24hrs
        if( stringDate !== 'undefined' ) {
            var dateSplit = stringDate.split(' ')[0].split(csReg);
            var timeSplit = stringDate.split(' ')[1].split(csReg);
            
            return new Date( dateSplit[2], dateSplit[1]-1, dateSplit[0], timeSplit[0], timeSplit[1], timeSplit[2], 0 );
        } 
        return new Date();
    }

    function calendarCSAccountingFormat(stringDate) {//convertDate dd/mm/yyyy HH:mm:ss 24hrs
        return converToCalendarCSAccountingFormat(stringDate);
    }

    function calendarCSAccountingDate(stringDate){//converDate dd/mm/yyyy
        return convertToCalendarCSAccountingDate( stringDate );
    }

    function calendarCSAccountingTime(stringDate){//converTime HH:mm:ss 24hrs
        return convertToCalendarCSAccountingTime( stringDate );
    }

    function dayOfWeek(intNumber){
        intNumber = typeof intNumber !== 'undefined' ? intNumber%7 : null;
        var listSevenDays = ['Sunday','Monday','Tuesday','Wendsday','Thursday','Friday','Saturday'];
        return listSevenDays[intNumber]
    }

    function getDay(stringDate){
        return dayOfWeek( stringDate.getDay() );
    }

    function getDate(stringDate){
        return stringDate.getDate();
    }

    function getMonth(stringDate){
        return stringDate.getMonth() + 1;
    }

    function getYear(stringDate){
        return stringDate.getFullYear();
    }

    function getHours(stringDate){
        return stringDate.getHours();
    }

    function getMinutes(stringDate){
        return stringDate.getMinutes();
    }

    function getSeconds(stringDate){
        return stringDate.getSeconds();
    }

    function nextDay(stringDate, intNumber){
        
        // return dayOfWeek( calendarCSAccountingSetup ( stringDate ).getDay() + undefinedEqualOne(intNumber) );
    }

    function nextDate(stringDate, intNumber){
        return calendarCSAccountingFormat( new Date( new Date().setDate( getDate(stringDate) + undefinedEqualOne(intNumber) ) ) );
    }

    function nextMonth(stringDate, intNumber){
        return calendarCSAccountingFormat( new Date( new Date(stringDate).setMonth( getMonth(stringDate) + undefinedEqualOne(intNumber) - 1 ) ) );
    }

    function nextYear(stringDate, intNumber){
        return calendarCSAccountingFormat( new Date( 
            getYear(stringDate) + undefinedEqualOne(intNumber), getMonth(stringDate) - 1, getDate(stringDate)
        ));
    }

    function prevDay(stringDate, intNumber){
        return dayOfWeek( new Date( calendarCSAccountingFormat(stringDate) ).getDay() - undefinedEqualOne(intNumber) );
    }

    function prevDate(stringDate, intNumber){   
        return calendarCSAccountingFormat( new Date( new Date().setDate( getDate(stringDate) - undefinedEqualOne(intNumber) ) ) );
    }

    function undefinedEqualOne(intNumber){
        return typeof intNumber !== 'undefined' ? Math.abs(intNumber) : 1;
    }

    function zeroPrefix(stringDate) { 
        return (stringDate < 10) ? '0' + stringDate : stringDate; 
    }

};
