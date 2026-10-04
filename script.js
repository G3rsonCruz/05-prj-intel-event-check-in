// Get the form elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

// Get the attendance elements
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");

// Get the message elements
const greeting = document.getElementById("greeting");
const celebration = document.getElementById("celebration");

// Get the team counter elements
const waterCount = document.getElementById("waterCount");
const zeroCount = document.getElementById("zeroCount");
const powerCount = document.getElementById("powerCount");

// Get the attendee list
const attendeeList = document.getElementById("attendeeList");

// Attendance goal
const maxCount = 50;


// Get saved attendance count from local storage
let count = Number(localStorage.getItem("attendanceCount")) || 0;


// Get saved team counts from local storage
let teamCounts = JSON.parse(localStorage.getItem("teamCounts")) || {
  water: 0,
  zero: 0,
  power: 0
};


// Get saved attendee list from local storage
let attendees = JSON.parse(localStorage.getItem("attendees")) || [];


// Save everything to local storage
function saveProgress() {

  localStorage.setItem(
    "attendanceCount",
    count
  );

  localStorage.setItem(
    "teamCounts",
    JSON.stringify(teamCounts)
  );

  localStorage.setItem(
    "attendees",
    JSON.stringify(attendees)
  );
}


// Find the winning team
function getWinningTeam() {

  // Find the highest team score
  const highestCount = Math.max(
    teamCounts.water,
    teamCounts.zero,
    teamCounts.power
  );

  // Store possible winning teams
  let winners = [];

  // Check Water Wise
  if (teamCounts.water === highestCount) {
    winners.push("Team Water Wise");
  }

  // Check Net Zero
  if (teamCounts.zero === highestCount) {
    winners.push("Team Net Zero");
  }

  // Check Renewables
  if (teamCounts.power === highestCount) {
    winners.push("Team Renewables");
  }

  // Return the winning team or teams
  return winners.join(" and ");
}


// Display the attendee list
function displayAttendees() {

  // Clear the current list
  attendeeList.innerHTML = "";

  // If nobody has checked in yet
  if (attendees.length === 0) {

    const message = document.createElement("p");

    message.className = "empty-list";

    message.textContent =
      "No attendees have checked in yet.";

    attendeeList.appendChild(message);

    return;
  }


  // Loop through each attendee
  attendees.forEach(function(attendee) {

    // Create the attendee row
    const attendeeItem =
      document.createElement("div");

    attendeeItem.className =
      "attendee-item";


    // Create the name
    const name =
      document.createElement("span");

    name.textContent =
      attendee.name;


    // Create the team name
    const team =
      document.createElement("span");

    team.textContent =
      attendee.teamName;


    // Add the name and team to the row
    attendeeItem.appendChild(name);

    attendeeItem.appendChild(team);


    // Add the row to the attendee list
    attendeeList.appendChild(
      attendeeItem
    );
  });
}


// Update everything shown on the page
function updatePage() {

  // Update total attendance
  attendeeCount.textContent = count;


  // Update team counters
  waterCount.textContent =
    teamCounts.water;

  zeroCount.textContent =
    teamCounts.zero;

  powerCount.textContent =
    teamCounts.power;


  // Calculate progress percentage
  let percentage =
    (count / maxCount) * 100;


  // Do not let the bar go above 100%
  if (percentage > 100) {
    percentage = 100;
  }


  // Update the progress bar
  progressBar.style.width =
    percentage + "%";


  // Update attendee list
  displayAttendees();


  // Check if the attendance goal was reached
  if (count >= maxCount) {

    const winningTeam =
      getWinningTeam();

    celebration.textContent =
      "🎉 Attendance goal reached! Winning team: " +
      winningTeam +
      "!";

    celebration.style.display =
      "block";

  } else {

    celebration.style.display =
      "none";
  }
}


// Handle form submission
form.addEventListener(
  "submit",
  function(event) {

    // Stop the page from refreshing
    event.preventDefault();


    // Get attendee name
    const name =
      nameInput.value.trim();


    // Get selected team value
    const team =
      teamSelect.value;


    // Make sure both fields are filled out
    if (name === "" || team === "") {
      return;
    }


    // Get the full team name
    const teamName =
      teamSelect.options[
        teamSelect.selectedIndex
      ].text;


    // Increase total attendance
    count++;


    // Increase the selected team's count
    teamCounts[team]++;


    // Add attendee to the attendee list
    attendees.push({
      name: name,
      teamName: teamName
    });


    // Show personalized greeting
    greeting.textContent =
      "Welcome, " +
      name +
      " from " +
      teamName +
      "!";

    greeting.className =
      "success-message";

    greeting.style.display =
      "block";


    // Save everything
    saveProgress();


    // Update the page
    updatePage();


    // Clear the form
    form.reset();
  }
);


// Load saved information when the page opens
updatePage();