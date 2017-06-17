// Rock, Paper, Scissors Game with random assigned choices for user and the machine.

// Variables
var user_choice = ["Rock", "Paper", "Scissors"]; // List of the three choices
var user_rand_pick = myArray[Math.floor(Math.random() * myArray.length)]; // User's random choice
var machine_rand_pick = myArray[Math.floor(Math.random() * myArray.length)]; // Machine's random choice


// Function for starting the game
function playGame(user_rand_pick, machine_rand_pick) {
    // Tie when user's choice is the same as the machine's
    if(user_rand_pick === machine_rand_pick)
    {
        return("It's a tie!")
    }
    // User : "Rock"
    else if(user_rand_pick === "Rock"){
        if(machine_rand_pick === "Paper")
        {
            return("You lost the game :("); // Machine : "Paper" so the user lost.
        }

        else if(machine_rand_pick === "Scissors")
        {
            return("You beat the machine!"); // Machine : "Scissors" so the user WIN!
        }
    // User : "Paper"
    else if(user_rand_pick === "Paper")
        {
            if(machine_rand_pick === "Rock")
            {
                return("You beat the machine!"); // Machine : "Rock" so the user WIN!
            }
            else if(machine_rand_pick === "Scissors")
            {
                return("Machine has a better luck this time. You lost :("); // Machine : Scissors so the user lost.
            }
        }
    // User : "Scissors"
    else if(user_rand_pick === "Scissors")
        {
            if(machine_rand_pick === "Paper")
            {
                return("You nailed the machine!"); // Machine : "Paper" so the user WIN!
            }
            else if(machine_rand_pick === "Rock")
            {
                return("Machine crushed you with the rock. You lost :("); // Machine : "Rock" so the user lost.
            }
        }
    }

}