const start = document.getElementById("start-button");
const reset = document.getElementById("reset-button");
const timer = document.getElementById("timer");
const ring =  document.getElementById("ring");
const timeFocus = document.getElementById("focus")
const timeBreak = document.getElementById("break")

let mode = "focus"

const durations = {
   focus: 50 * 60,
   break: 10 * 60
}

let total = durations[mode];
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

const dimLabels = () => {
    timeFocus.classList.add("font-light","text-neutral-800/80")
    timeBreak.classList.add("font-light","text-neutral-800/80")
    timeFocus.classList.remove("font-bold","text-neutral-800")
    timeBreak.classList.remove("font-bold","text-neutral-800")
}
const updateModeLabels = () => {
    dimLabels()

    if (mode === "focus") {
        timeFocus.classList.remove("font-light","text-neutral-800/80")
        timeFocus.classList.add("font-bold", "text-neutral-800")
    } else if (mode === "break") {
        timeBreak.classList.remove("font-light","text-neutral-800/80")
        timeBreak.classList.add("font-bold", "text-neutral-800")
    }
}

start.addEventListener("click", () => {
    if (isRunning) { //pause event! stop interval, timeRemaining stores its value
        clearInterval(interval)
        interval = null;
        isRunning = false;

        startToPause();
        dimLabels();
        return;
    }

    if (timeRemaining <= 0) return;

    isRunning = true; //start event
    startToPause();
    updateModeLabels();
    
    interval = setInterval(() => {
        timeRemaining = timeRemaining - 1; //subtracted with each run
        updateTimer()   

    if (timeRemaining < 0) { //timer is below 0, switching to break/focus
        if (mode === "focus") {
            mode = "break"
        } else {
            mode = "focus"
        }
        total = durations[mode]
        timeRemaining = total
        updateTimer()
        startToPause();
        updateModeLabels();
    }     
    }, 1000); //runs every sec
})

reset.addEventListener("click", () => {
   clearInterval(interval) 
   interval = null;
   isRunning = false
   mode = "focus"
   total = durations[mode]
   timeRemaining = total;
   updateTimer();
   dimLabels();

   start.dataset.state = "idle";
   start.textContent = "Start";
   

})

updateTimer()
dimLabels()