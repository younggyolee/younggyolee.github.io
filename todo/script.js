// BOOTCAMP PREP WEEK7: CALENDAR PROJECT
// Coded by Younggyo

// initialize month & year with now
var d = new Date();
// selected month
var month = d.getMonth();
// selected year
var year = d.getFullYear();
// today

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




// *** Variables for To-do list ***
// for dates
var dayTwoDigits;
var monthTwoDigits;
var clickedDateStr;

// Declare & initialize database container for Todo list
var todoDataBase = {};

// Which list is displayed now?
// ("allList", "incompleteList" or "completeList")
var displayedList = "allList"


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
    document.getElementById(i).addEventListener("click", function(event) { dateIsClicked(event.target.id); } )
}


// Select today as clicked (for initial loading)
dateIsClicked(d.getDate() + firstDay - 1)


// A function for emptying the calendar dates
function calendarInit(){
    for (var i = 0; i < 42; i++){
        document.getElementById(i).textContent = "";
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

// var dateClicked;

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
    remember();
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
    remember();
}



// remember the previously clicked date if it is on the selected month
function remember () {
    var prevDate = clickedFullDate.getDate();
    var prevMonth = clickedFullDate.getMonth();
    var prevYear = clickedFullDate.getFullYear();
    if (month === prevMonth && year === prevYear) {
        toRed(prevDate + firstDay - 1);
    }
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
// 4. It updates variables for To-do list

function dateIsClicked(idNumber) {
    if (firstDay <= idNumber  &&  idNumber <= firstDay + daysOfTheMonth - 1) {
        clickedFullDate = new Date(year, month, idNumber - firstDay + 1);
        allToWhite();
        toRed(idNumber);
        updateSelectedPart(clickedFullDate);

        // set display filter to "All" (allList)
        displayedList = "allList";

        todoLoad();
    }
}


// Initialise Todo list database for a clicked date
function initDataBase () {
    todoDataBase[clickedDateStr] = {};
}


// Clear button :
// changes the status of all items for a selected day into "complete"
function clearFunc (event) {
    var size = Object.keys(todoDataBase[clickedDateStr]).length;
    for (var i = 0; i < size; i++) {
        var itemId = Object.keys(todoDataBase[clickedDateStr])[i];
        if (event.target.checked) {
          todoDataBase[clickedDateStr][itemId][0] = "completeList";
        }
        else {
          todoDataBase[clickedDateStr][itemId][0] = "incompleteList";
        }
        // change the status into complete

    }

    // update the screen
    todoRefresher();
}

//event listener for clear function
document.getElementById("clearButton").addEventListener("click", clearFunc);

// This function loads To do list for a certain date
function todoLoad () {

    // This updates date variables for todo list
    dayTwoDigits = makeTwoDigits(clickedFullDate.getDate());
    // This creates two digits month number (e.g. "01" for January, "08" for August) for todo list
    monthTwoDigits = makeTwoDigits(clickedFullDate.getMonth()+1);
    clickedDateStr = year.toString() + monthTwoDigits + dayTwoDigits;
    console.log(clickedDateStr);

    // If database for "clickedDateStr" doesn't exist, this initializes the database
    if (!todoDataBase[clickedDateStr]){
        initDataBase();
    }


    // This updates month & date on the todo list
    document.getElementById("todoDate").textContent = clickedFullDate.getDate() + " " + month_text[month];


    // remove check mark on clear button
    document.getElementById("clearButton").checked = false;


    // mark date is clicked if selected date is on the month



    // This displays todo list items for the clicked date
    todoRefresher()

}


// "Add" button for To do list
document.getElementById("addButton").addEventListener("click", addList);

// This adds "Enter" key input listener for "mainInput"
document.getElementById("mainInput").addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        addList();
    }
});



function addList () {
    //This adds text on input into list
    var inputText = document.getElementById("mainInput").value;

    //This clears input text in the input box
    document.getElementById("mainInput").value = "";


    // This function finds the largest number of keys
    var keyList = Object.keys(todoDataBase[clickedDateStr]);
    // function for sorting descending order
    keyList.sort(function(a,b){return (b-a);});

    // If todoDatabase[clickedDateStr] had elements in it, then largestKey gets a value
    if (keyList.length > 0){
        var largestKey = Number(keyList[0]);
    }
    // If todoDatabase[clickedDateStr] didn't have elements in it,
    // then keyList[0] is undefined. Thus we manually give a value to variable "largestKey"
    else {
        var largestKey = Number(0);
    }

    //Add the item with a unique key (1 larger than the current largest one.)
    //(e.g. if the current largest key is 43, then a new key for an added item is 44.)
    todoDataBase[clickedDateStr][largestKey+1] = ["incompleteList", inputText];
    todoRefresher();
}




function todoRefresher () {
    // empty the todo items on the screen
    document.getElementById("todoList").innerHTML="";

    // Initialise the left items counter
    var leftCounter = 0;

    var size = Object.keys(todoDataBase[clickedDateStr]).length;
    for (var i = 0; i < size; i++) {
        var itemId = Object.keys(todoDataBase[clickedDateStr])[i];
        var itemStatus = todoDataBase[clickedDateStr][itemId][0];


        if (itemStatus == "incompleteList"){
            // increase the left items counter if an item is incomplete
            leftCounter++;
        }

        // gate for filtering
        if ((displayedList === "incompleteList" || displayedList === "completeList") && itemStatus !== displayedList) {
            continue;
        }


        // making visual elements for a selected item
        var temp = document.createElement("li");

        //done button
        temp.innerHTML = "<input type='checkbox' class = 'doneButton'>";

        //add item content text
        var spanContent = document.createElement("SPAN");
        var itemContent = Object.values(todoDataBase[clickedDateStr][itemId])[1];
        var itemContentText = document.createTextNode(itemContent);
        spanContent.className = "itemContent";
        spanContent.appendChild(itemContentText);
        spanContent.contentEditable = true;
        temp.appendChild(spanContent);

        // add 'delete' button
        var spanDelete = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        spanDelete.className = "deleteButton";
        spanDelete.appendChild(txt);
        temp.appendChild(spanDelete);


        if (itemStatus == "completeList"){
            // add visual elements for done items
            temp.style.textDecoration = "line-through";
            temp.style.color = "gray";
            temp.getElementsByClassName('doneButton')[0].checked = true;
        }


        temp.class = itemStatus;
        temp.id = itemId;

        // done button event listener
        temp.getElementsByClassName("doneButton")[0].addEventListener("click", doneFunc);

        function doneFunc(event) {
            var itemId = event.target.parentElement.id;
            var doneStatus = todoDataBase[clickedDateStr][itemId][0];
            // // Change the itemStatus of an item (incomplete > complete)
            if (todoDataBase[clickedDateStr][itemId][0] === "incompleteList"){
              todoDataBase[clickedDateStr][itemId][0] = "completeList";
            }
            else {
              todoDataBase[clickedDateStr][itemId][0] = "incompleteList";
            }
            todoRefresher();
          }


        // I WANT TO ADD "Select All" Function when text field is clicked!


        // add event listener onto item text fields
        temp.getElementsByClassName("itemContent")[0].addEventListener("keydown", editFunc);

        // function for item text edit
        function editFunc (event) {

          // if enter is pressed
          if (event.keyCode === 13){
            // <li> tag element
            var ce = event.target
            // gets input from user
            var editedText = ce.textContent;
            var itemId = event.target.parentElement.id;
            // enter edited text into database
            todoDataBase[clickedDateStr][itemId][1] = editedText;

            todoRefresher();
          }

          // if esc is pressed, editing is cancelled
          else if (event.keyCode === 27){
            console.log(event.keyCode);
            var ce = event.target;
            var itemId = event.target.parentElement.id;
            //turn off the cursor on the edit area
            event.target.blur();
            //load unedited text from database
            ce.textContent = todoDataBase[clickedDateStr][itemId][1];

            todoRefresher();
          }
        }


        // delete button event listener
        temp.getElementsByClassName("deleteButton")[0].addEventListener("click", deleteFunc);
        function deleteFunc(event) {
            // "p" tag's id (which corresponds to the item's id number in the database)
            var itemId = event.target.parentElement.id;
            // Element's coordniate in the database (in string format)
            var itemCoordinate = "todoDataBase["+clickedDateStr+"]['"+itemId+"']";
            // Remove the element from database
            eval("delete " + itemCoordinate);
            // Refresh the screen
            todoRefresher();
        }

        // add this item onto the screen
        document.getElementById("todoList").appendChild(temp);
    }

    // update left items counter
    document.getElementById("leftItemsCounter").textContent = leftCounter + " items left";

    // focus on input field
    document.getElementById("mainInput").focus();

}




// This function changes x (number) into y (string) which always has two digits
// (e.g. makeTwoDigits(3) === "03" )
function makeTwoDigits (x) {
    if (x >= 10){
        y = x.toString();
        return y;
    }
    else if (x < 10){
        y = "0" + x.toString()
        return y;
    }
}


// These are for buttons to change lists (all / incomplete / complete)
document.getElementById("allButton").addEventListener("click", function(){
    displayedList = "allList"
    todoRefresher();
});

document.getElementById("incompleteButton").addEventListener("click", function(){
    displayedList = "incompleteList"
    todoRefresher();
});

document.getElementById("completeButton").addEventListener("click", function(){
    displayedList = "completeList"
    todoRefresher();
});





//change all "itemStatus" into boolean
