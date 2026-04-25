
function OpeningCeremony(callback) {
  console.log("Let the Sports Day Begin!");
  
  const score = {
    Red: 0,
    Blue: 0,
    Yellow: 0,
    Green: 0
  };
  
  console.log("Initial Scores:");
  console.log(score);
  console.log("\nStarting the first event: 100M Race...\n");
  
  callback(score);
}

function Race100M(score, callback) {
  console.log("Race100M has started!");
  
  setTimeout(() => {
    const times = {
      Red: Math.random() * 2 + 10,    
      Blue: Math.random() * 2 + 10,
      Yellow: Math.random() * 2 + 10,
      Green: Math.random() * 2 + 10
    };
    
    console.log("Race Times (lower is better):");
    console.log(`Red: ${times.Red.toFixed(2)}s`);
    console.log(`Blue: ${times.Blue.toFixed(2)}s`);
    console.log(`Yellow: ${times.Yellow.toFixed(2)}s`);
    console.log(`Green: ${times.Green.toFixed(2)}s`);
    
    const sortedHouses = Object.keys(times).sort((a, b) => times[a] - times[b]);
    
    score[sortedHouses[0]] += 50;
    score[sortedHouses[1]] += 30;
    score[sortedHouses[2]] += 20;
    score[sortedHouses[3]] += 10;
    
    console.log(`\n${sortedHouses[0]} came 1st and gets 50 points!`);
    console.log(`${sortedHouses[1]} came 2nd and gets 30 points!`);
    console.log(`${sortedHouses[2]} came 3rd and gets 20 points!`);
    console.log(`${sortedHouses[3]} came 4th and gets 10 points!\n`);
    
    console.log("Updated Scores after 100M Race:");
    console.log(score);
    console.log("\nStarting the next event: Long Jump...\n");
    

    callback(score);
  }, 3000);
}

function LongJump(score, callback) {
  console.log("LongJump has started!");

  setTimeout(() => {
  
    const colors = ["Red", "Blue", "Yellow", "Green"];
    const winner = colors[Math.floor(Math.random() * colors.length)];
    
    score[winner] += 25;
    
    console.log(`\n${winner} won the Long Jump and gets 25 points!\n`);
    
    console.log("Updated Scores after Long Jump:");
    console.log(score);
    console.log("\nStarting the next event: High Jump...\n");
    

    callback(score);
  }, 2000);
}

function HighJump(score, callback) {
  console.log("HighJump has started!");
 
  const userInput = prompt("Which color house won the High Jump? (Red, Blue, Yellow, Green)").trim();
  
  if (userInput && ["Red", "Blue", "Yellow", "Green"].includes(userInput)) {
    score[userInput] += 20;
    console.log(`\n${userInput} won the High Jump and gets 20 points!\n`);
  } else {
    console.log("\nNo points awarded (invalid or no input).\n");
  }
  
  console.log("Updated Scores after High Jump:");
  console.log(score);
  console.log("\nStarting the Award Ceremony...\n");

  callback(score);
}

function AwardCeremony(score) {
  console.log("=== Award Ceremony ===");
  console.log("Final Scores:");
  console.log(score);
  
  
  const sortedHouses = Object.keys(score).sort((a, b) => score[b] - score[a]);
  
  console.log(`\nCongratulations to ${sortedHouses[0]} for winning 1st place with ${score[sortedHouses[0]]} points!`);
  console.log(`${sortedHouses[1]} came 2nd with ${score[sortedHouses[1]]} points!`);
  console.log(`${sortedHouses[2]} came 3rd with ${score[sortedHouses[2]]} points!`);
  console.log(`${sortedHouses[3]} came 4th with ${score[sortedHouses[3]]} points!`);
  
  console.log("\nThank you for participating in Sports Day!");
}

OpeningCeremony((score) => {
  Race100M(score, (score) => {
    LongJump(score, (score) => {
      HighJump(score, (score) => {
        AwardCeremony(score);
      });
    });
  });
});