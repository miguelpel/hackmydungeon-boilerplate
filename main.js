'use strict';

// the IIFE that redirects the logs and error of the console to the game console.
(function() {
    let _log = console.log;
    let _error = console.error;

    console.error = function(errMessage) {
        document.getElementById('console').innerHTML = 'Error: ' + errMessage;
        _error.apply(console, arguments);
    };

    console.log = function(logMessage) {
        document.getElementById('console').innerHTML = logMessage;
        _log.apply(console, arguments);
    };
})();


const sourceBtn = document.getElementById('viewSource');
const runBtn = document.getElementById('runCode');
const cons = document.getElementById('console');
let xhr;

sourceBtn.addEventListener('click', displaySourceCode);
runBtn.addEventListener('click', runCode);

document.onkeypress = function(e) {
    e = e || window.event;
    // use e.keyCode
    if (e.keyCode === 13) runCode();
};

function displaySourceCode() {
    xhr = new XMLHttpRequest();
    // Open the request
    xhr.open("GET", './rooms/room.js', true);
    xhr.responseType = 'text';
    xhr.send();
    xhr.onreadystatechange = processRequest;
}

function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
        // console.log(xhr.responseText);
        cons.innerHTML = xhr.responseText.toString();
        // cons.classList.add('wrap')
        prismify();
        // rainbowfy();
    }
}

function runCode() {
    let inpt = document.getElementsByTagName('input')[0];
    //console.log(inpt.value);
    try {
        eval(inpt.value);
    } catch (error) {
        console.log(error)
    }
    inpt.value = '';
}