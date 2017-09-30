function callCalendarCSAccounting(){
    var inputDate = "31/12/2015 23:23:12"
    //console.log("default :", new Date(inputDate) );
    d = calendarCSAccounting(inputDate);

    var get = [d.getDay(), d.getDate(), d.getMonth(), d.getYear(), d.getHours(), d.getMinutes(), d.getSeconds()];
    console.log("get :", get.toString())
    return inputDate;
}

function calendarCSAccounting(stringDate){
    console.log("stringDate ;",stringDate)
    stringDate = calendarCSAccountingSetup(stringDate);
    
    return {
        calendarCSAccounting: function(){
            return calendarCSAccountingSetup(stringDate);
        },
        calendarCSAccountingFormat: function(){
            return calendarCSAccountingFormat(stringDate);
        },
        calendarCSAccountingDate: function(){
            return calendarCSAccountingDate();
        },
        calendarCSAccountingTime: function(){
            return calendarCSAccountingTime();
        },
        convertToCalendarCSAccountingFormat: function(){
            return converToCalendarCSAccountingFormat(stringDate);
        },
        convertToCalendarCSAccountingDate: function(){
            return convertToCalendarCSAccountingDate(stringDate);
        },
        convertToCalendarCSAccountingTime: function(){
            return convertToCalendarCSAccountingTime(stringDate);
        },
        getDay: function(){
            return getDay(stringDate);
        },
        getDate: function(){
            return getDate(stringDate);
        },
        getMonth: function(){
            return getMonth(stringDate);
        },
        getYear: function(){
            return getYear(stringDate);
        },
        getHours: function(){
            return getHours(stringDate);
        },
        getMinutes: function(){
            return getMinutes(stringDate);
        },
        getSeconds: function(){
            return getSeconds(stringDate);
        },
        nextDate: function(intNumber){
            return nextDate(stringDate, intNumber);
        },
        nextMonth: function(intNumber){
            return nextMonth(stringDate, intNumber);
        },
        nextYear: function(intNumber){
            return nextYear(stringDate, intNumber);
        }
    }
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
    var inputDate = ""+stringDate;
    var dateSplit = inputDate.split(' ')[0].split('/');
    var timeSplit = inputDate.split(' ')[1].split(':');
    var newDate = new Date( dateSplit[2], dateSplit[1], dateSplit[0], timeSplit[0], timeSplit[1], timeSplit[2], 0 );
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
    return dayOfWeek( new Date( stringDate ).getDay() );
}

function getDate(stringDate){
    return new Date( stringDate ).getDate();
}

function getMonth(stringDate){
    return new Date ( stringDate ).getMonth() + 1;
}

function getYear(stringDate){
    return new Date ( stringDate ).getFullYear();
}

function getHours(stringDate){
    return new Date ( stringDate ).getHours();
}

function getMinutes(stringDate){
    return new Date ( stringDate ).getMinutes();
}

function getSeconds(stringDate){
    return new Date ( stringDate).getSeconds();
}

function nextDay(stringDate, intNumber){
    return dayOfWeek( new Date( stringDate ).getDay() + undefinedEqualOne(intNumber) );
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