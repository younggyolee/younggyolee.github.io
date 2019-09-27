// BOOTCAMP PREP WEEK7: CALENDAR PROJECT
// Coded by Younggyo

// selected month
var month;
// selected year
var year;
// today
var d = new Date();

// initialize month & year with now
month = d.getMonth();
year = d.getFullYear();

// dTempThis : First day of the current month
var dTempThis;
// dTempNext : declare a variable for the first day of the next month
var dTempNext;
// how many days are there in the selected month?
var daysOfTheMonth;
// which day (e.g. for Monday, Tuesday, ...) is the first day of the selected month?
var firstDay;
// Full date for the clicked date
var clickedFullDate;

// to return text for a certain month number (0 for January)
month_text = ['January', 'February', 'March', 'April', 'May', 
'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// to return text for a cert text number (0 for Sunday)
days_text = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// First initialization for the calendar
refresher();

// Click listeners for previous / next buttons
document.getElementById("next").addEventListener("click", nextMonthYear);
document.getElementById("prev").addEventListener("click", prevMonthYear);

// Click eventlisteners for all calendar (table) elements
for (i = 0; i < 42; i++){
    document.getElementById(i).addEventListener("click", function() { dateIsClicked(this.id); } )
}


// Select today as clicked (for initial loading)
dateIsClicked(d.getDate() + firstDay - 1)


// A function for emptying the calendar dates
function calendarInit(){
    for (var i = 0; i < 42; i++){
        document.getElementById(i).textContent=""
    };
}


// updates the screen (when next month / previous month buttons are clicked OR the calendar first loads) //
function refresher() {
    //updates month & year part//
    document.getElementById("month").textContent = month_text[month];
    document.getElementById("year").textContent = year;


    // ** Updates days for calendar **
    // This part puts dates onto the calendar starting from the first day
    
    //empties the calendar table first
    calendarInit();

    // dTempThis : First day of the current month
    dTempThis = new Date(year, month, 1);
    
    // defines dTempNext depending on the month condition
    if (month < 11){
        dTempNext = new Date(year, month+1, 1);
    }
    else if( month === 11){
        dTempNext = new Date(year+1, 0, 1);
    }

    // This part below calculates days of the current month.
    //
    // Variable "daysOfTheMonth" : days of the current month.
    // It is calculated by the formular below.
    // Using milliseconds since origin point, ((Next Month day 1) - (This Month day 1)) divided by 86400000 milliseconds/day
    //
    // Variable "firstDay" : The first day of this month's day number (e.g. 1 for Monday, 3 for Wednesday)
    daysOfTheMonth = (dTempNext-dTempThis)/86400000;
    firstDay = dTempThis.getDay();

    //Based on the variables above, this part puts dates onto the calendar
    for (var i = 0; i < daysOfTheMonth; i++){
        document.getElementById(firstDay+i).textContent = i+1
    }

    // removes all the red component from calendar
    allToWhite();
}



//These are for previous and next buttons.
//When buttons are clicked, these will change month and year variables
function nextMonthYear () {
    if (month < 11) {
        month++;
    }
    else if (month === 11) {
        month = 0;
        year++;
    }
    refresher();
}

function prevMonthYear () {
    if (month > 0) {
        month--;
    }
    else if (month === 0) {
        month = 11;
        year--;
    }
    refresher();
}


// Below are for a situation when a date is clicked:
//
// For a given id number, this function changes a background color into red
function toRed(idNumber) {
    document.getElementById(idNumber).setAttribute("style","background-color: red; color: white;");
}

// For a given id number, this function changes a background color into white
function toWhite(idNumber) {
    document.getElementById(idNumber).setAttribute("style", "background-color: transparent; color: black;")
}

// This function removes all the red components on the calendar visually
function allToWhite(){
    for (var i = 0; i < 42; i++){
        toWhite(i);
    }
}


// This function updates selectedDay & selectedDate (on the left part of the calendar)
function updateSelectedPart (clickedFullDate) {
    document.getElementById("selectedDate").textContent = clickedFullDate.getDate();
    document.getElementById("selectedDay").textContent = days_text[clickedFullDate.getDay()];
}


// This function runs when a date on the calendar is clicked
// 1. It removes all the red background colors on the calendar first
// 2. Then it changes background color of a <td> element of the given idNumber into red
// 3. It updates selectedDay & selectedDate on the left part of the calendar
function dateIsClicked(idNumber) {
    if (firstDay <= idNumber  &&  idNumber <= firstDay + daysOfTheMonth - 1) {
        clickedFullDate = new Date(year, month, idNumber - firstDay + 1);
        allToWhite();
        toRed(idNumber);
        updateSelectedPart(clickedFullDate);
    }
}
