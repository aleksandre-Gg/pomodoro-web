const start = document.getElementById("start-button");
const reset = document.getElementById("reset-button");
const timer = document.getElementById("timer");
const ring =  document.getElementById("ring");
const timeFocus = document.getElementById("focus")
const timeBreak = document.getElementById("break")

const total = 3000; //50 minutes
let timeRemaining = total;

let interval;
let isRunning = false;

const updateTimer = () => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60; 

    timer.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}` 
    updateRing();
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

const updateRing = () => ring.style.strokeDashoffset = -(1 - timeRemaining / total); //pathlength 1; 1=3000

start.addEventListener("click", () => {
    if (isRunning) { //pause event! stop interval, timeRemaining stores its value
        clearInterval(interval)
        interval = null;
        isRunning = false;
        timeFocus.classList.add("font-light", "text-neutral-800/80")

        startToPause();
        return;
    }

    if (timeRemaining <= 0) return;

    isRunning = true; //start event
    timeFocus.classList.remove("font-light", "text-neutral-800/80");
    timeFocus.classList.add("font-bold", "text-neutral-800") 

    startToPause();
    
    interval = setInterval(() => {
        timeRemaining = timeRemaining - 1; //subtracted with each run
        updateTimer()   

    if (timeRemaining <= 0) { //timer is finished, safer to prevent going below 0
        clearInterval(interval)
        interval = null;
        isRunning = false;

        timeFocus.classList.remove("font-bold", "text-neutral-800"); 
        timeFocus.classList.add("font-light", "text-neutral-800/80");
        
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

   timeFocus.classList.add("font-light", "text-neutral-800/80")
})

updateTimer()