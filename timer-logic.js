const start = document.getElementById("start-button");
const reset = document.getElementById("reset-button");
const timer = document.getElementById("timer");

let timeRemaining = 3000; //50 minutes
let interval;

const updateTimer = () => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60; 

    timer.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}` 
    //padstart for adding 0 in front of numbers below 10. 
    // 2 to make sure it stays 2 digits
    //padstart works on strings only 
}

start.addEventListener("click", () => {

  interval = setInterval(() => {
    timeRemaining = timeRemaining - 1; //subtracted with each run
    updateTimer()   
    if (timeRemaining === 0) {
        clearInterval(interval)
    }     
    }, 1000); //runs every sec
  
  console.log(timeRemaining);
})

reset.addEventListener("click", () => {
    
})

updateTimer()