function callCalendarCSAccounting(inputDate){
    d = calendarCSAccounting(inputDate);
    
    //var get = [d.getDay(), d.getDate(), d.getMonth(), d.getYear(), d.getHours(), d.getMinutes(), d.getSeconds()];
    return inputDate;
}

var calendarCSAccounting = function (inputDate) {
    // var stringDate = calendarCSAccountingSetup(inputDate); // make object
    // var stringDate = inputDate; // not make object
    
    return {
        calendarCSAccounting: calendarCSAccountingSetup(stringDate),
        calendarCSAccountingFormat: calendarCSAccountingFormat(stringDate),
        calendarCSAccountingDate: calendarCSAccountingDate(stringDate),
        calendarCSAccountingTime: calendarCSAccountingTime(stringDate),
        convertToCalendarCSAccountingFormat: converToCalendarCSAccountingFormat(stringDate),
        convertToCalendarCSAccountingDate: convertToCalendarCSAccountingDate(stringDate),
        convertToCalendarCSAccountingTime: convertToCalendarCSAccountingTime(stringDate),
        getDay: getDay(stringDate),
        getDate: getDate(stringDate),
        getMonth: getMonth(stringDate),
        getYear: getYear(stringDate),
        getHours: getHours(stringDate),
        getMinutes: getMinutes(stringDate),
        getSeconds: getSeconds(stringDate),

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
        var d = calendarCSAccountingSetup(stringDate);
        return [zeroPrefix(d.getDate()), zeroPrefix(d.getMonth()+1), d.getFullYear()].join('/');
    }

    function convertToCalendarCSAccountingTime(stringDate){//converTime HH:mm:ss 24hrs
        var t = calendarCSAccountingSetup(stringDate);
        return [zeroPrefix(t.getHours()), zeroPrefix(t.getMinutes()), zeroPrefix(t.getSeconds())].join(':');
    }

    function calendarCSAccountingSetup(stringDate) {//input dd/mm/yyyy HH:mm:ss 24hrs
        // return typeof stringDate !== 'undefined' ? new Date(stringDate) : new Date();
        // console.log("stringDate :",stringDate)
        var inputDate = stringDate;
        console.log("inputDate1 :",inputDate)
        var csReg = new RegExp(/[.|,\:/-]/)
        var dateSplit = inputDate.split(' ')[0].split(csReg);
        console.log('dateSplit: ', dateSplit);
        var timeSplit = inputDate.split(' ')[1].split(':');
        // console.log('timeSplit: ', timeSplit);
        var newDate = new Date( dateSplit[2], dateSplit[1]-1, dateSplit[0], timeSplit[0], timeSplit[1], timeSplit[2], 0 );
        // console.log('newDate: ', newDate);
        return typeof stringDate !== 'undefined' ? newDate : new Date();
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
        return dayOfWeek( calendarCSAccountingSetup ( stringDate ).getDay() );
    }

    function getDate(stringDate){
        return calendarCSAccountingSetup ( stringDate ).getDate();
    }

    function getMonth(stringDate){
        return calendarCSAccountingSetup ( stringDate ).getMonth() + 1;
    }

    function getYear(stringDate){
        return calendarCSAccountingSetup ( stringDate ).getFullYear();
    }

    function getHours(stringDate){
        return calendarCSAccountingSetup ( stringDate ).getHours();
    }

    function getMinutes(stringDate){
        return calendarCSAccountingSetup ( stringDate ).getMinutes();
    }

    function getSeconds(stringDate){
        return calendarCSAccountingSetup ( stringDate).getSeconds();
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
