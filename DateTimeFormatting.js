var dateTimeFormatting = function ({dateFormatting:String, timeFormatting:String, dayFormatting:String}) {
    let dateTimeFormatting = {}
    let global = dateTimeFormatting.prototype

    console.log( "date :" + dateFormatting );
    console.log( "time :" + timeFormatting );
    console.log( "day : " + dayFormatting);

    console.log( new Date ( 2017, 10-1, 9 ) );

    // global._date = ([
    //     "ddmmyyyy",
    //     "dd mm yyyy",
    //     "dd.mm.yyyy",
    //     "dd,mm,yyyy",
    //     "dd-mm-yyyy",
    //     "dd_mm_yyyy",
    //     "dd|mm|yyyy",
    //     "dd/mm/yyyy"
    // ])

    // global._time = ([
    //     "hhmmss",
    //     "hh mm ss",
    //     "hh:mm:ss",
    // ])

    // global._day = ([
    //     "long",
    //     "short"
    // ])

    console.log(global)
    
}