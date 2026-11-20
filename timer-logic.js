const start = document.getElementById("start-button");
const reset = document.getElementById("reset-button");
const timer = document.getElementById("timer");

let timeRemaining = 3000; //50 minutes
let interval;
let isRunning = false;

const updateTimer = () => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60; 

    timer.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}` 
    //padstart for adding 0 in front of numbers below 10. 
    // 2 to make sure it stays 2 digits
    //padstart works on strings only 
}

const startToPause = () => {
  if (isRunning) {
    start.dataset.state = "running";
    start.textContent = "\u2161"; //II
  } else {
    start.dataset.state = "idle";
    start.textContent = "Start";
  }
}

start.addEventListener("click", () => {
    if (isRunning) { //stop interval, timeRemaining stores its value
        clearInterval(interval)
        interval = null;
        isRunning = false;
        startToPause();
        return;
    }

    if (timeRemaining <= 0) return;

    isRunning = true;
    startToPause();
    
    interval = setInterval(() => {
        timeRemaining = timeRemaining - 1; //subtracted with each run
        updateTimer()   

    if (timeRemaining <= 0) { //safer to prevent going below 0
        clearInterval(interval)
        interval = null;
        isRunning = false;
        startToPause();
    }     
    }, 1000); //runs every sec
})

reset.addEventListener("click", () => {
   clearInterval(interval) 
   interval = null;
   isRunning = false
   timeRemaining = 50 * 60
   updateTimer();
   
   start.dataset.state = "idle";
   start.textContent = "Start";
   
})

updateTimer()