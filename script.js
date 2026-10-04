// Get all needed Dom elements 
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

// Track Attendance
let count = 0;
const maxCount = 50;

// handle form submission
form.addEventListener("submit", function(event){
event.preventDefault();

// Get form values 
const name = nameInput.value;
const team = teamSelect.value;
const teamName = teamSelect.options[teamSelect.selectedIndex].text;

console.log(name, team, teamName);

// Increment attendance count
count++;
console.log("Attendance count:", count);

// Update progress bar
const percentage = Math.round((count / maxCount) * 100) + "%";
console.log("Progress:", percentage);

//Update Team counter 
const teamCounter = document.getElementById(team + "Counter");
teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

// Show Welcome Message
const message = `Welcome, ${name} from ${teamName}!`;
console.log(message);

form.reset();

}
)