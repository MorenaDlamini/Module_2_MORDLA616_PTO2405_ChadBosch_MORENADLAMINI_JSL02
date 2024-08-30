// Display a welcome message with the current date
const welcomeMessage = () => {
    const today = new Date().toDateString();
    document.getElementById('welcomeMessage').textContent = `🤸🏾‍♀️ Welcome to Your Fitness Tracker 🥗 Today is ${today}`;
};
welcomeMessage();

let workoutCount = 0; // Track the number of workouts completed
let totalCalories = 0; // Track the total calorie intake

// Function to add and display workout
const displayWorkoutRoutine = () => {
    const workoutInput = document.querySelector('#workoutInput').value.trim();
    const workoutList = document.querySelector('#workoutList');

    if (workoutInput !== '') { // Check if the input is not empty
        const newWorkout = document.createElement('li');
        newWorkout.textContent = workoutInput;

        // Increment workout count
        workoutCount++;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.style.marginLeft = '10px';
        removeButton.addEventListener('click', () => {
            workoutList.removeChild(newWorkout);
            workoutCount--; // Decrement workout count when a workout is removed
            updateProgressCharts(); // Update progress based on current state
        });

        // Append the remove button to the workout item
        newWorkout.appendChild(removeButton);
        workoutList.appendChild(newWorkout);
        document.querySelector('#workoutInput').value = ''; // Clear input after adding

        // Update progress after adding a workout
        updateProgressCharts();
    } else {
        alert('Please enter a valid workout.');
    }
};

// Add event listener to the workout submit button
document.querySelector('#submitWorkout').addEventListener('click', displayWorkoutRoutine);

// Function to add new fitness goals and remove completed ones
const addNewGoal = () => {
    const goalInput = document.querySelector('#goalInput').value.trim();
    const goalList = document.querySelector('#goalList');
    const workoutList = document.querySelector('#workoutList');

    // Check if there are any workouts listed
    const hasWorkouts = workoutList.getElementsByTagName('li').length > 0;

    if (!hasWorkouts) {
        alert('Please add a workout before adding a fitness goal.');
        return; // Exit the function if there are no workouts
    }

    // Get all existing goals
    const existingGoals = Array.from(goalList.getElementsByTagName('li'));

    // Check if the new goal is a duplicate
    const isDuplicate = existingGoals.some(goal => goal.textContent.includes(goalInput));

    if (isDuplicate) {
        alert('This goal is already on the list! Please add a different goal.');
    } else if (goalInput !== '') { // Check if the input is not empty
        const newGoal = document.createElement('li');
        newGoal.textContent = goalInput;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.style.marginLeft = '10px';
        removeButton.addEventListener('click', () => {
            goalList.removeChild(newGoal);

            // Check if all goals are removed
            if (goalList.getElementsByTagName('li').length === 0) {
                updateProgressCharts(true);  // Pass true to indicate completion
            }
        });

        // Append the remove button to the goal item
        newGoal.appendChild(removeButton);
        goalList.appendChild(newGoal);
        document.querySelector('#goalInput').value = ''; // Clear input after adding
    } else {
        alert('Please enter a valid goal.');
    }
};

// Add event listener to the goal submit button
document.querySelector('#submitGoal').addEventListener('click', addNewGoal);

// Function to add glass of water and remove glass of water
let waterIntake = 0;

const updateWaterIntake = (change) => {
    if (waterIntake + change >= 0) {  // Prevent decreasing below zero
        waterIntake += change;
        document.querySelector('#waterIntakeDisplay').textContent = `${waterIntake} glasses 💦`;
    }
};

document.querySelector('#increaseWater').addEventListener('click', () => updateWaterIntake(1));
document.querySelector('#decreaseWater').addEventListener('click', () => updateWaterIntake(-1));

// Function to update workout and calorie intake progress
const updateProgressCharts = (isCompleted = false) => {
    const workoutProgress = document.querySelector('#workoutProgress');
    const calorieIntakeProgress = document.querySelector('#calorieIntakeProgress');

    if (isCompleted || workoutCount === 0) {
        workoutProgress.textContent = 'Workout completed! 🏆';
        calorieIntakeProgress.textContent = `Your total calorie intake this week is ${totalCalories} kcal 🍽️`;
    } else {
        workoutProgress.textContent = `You have completed ${workoutCount} workout(s) this week! 💪`;
        calorieIntakeProgress.textContent = `Your total calorie intake so far is ${totalCalories} kcal 🍽️`;
    }
};

// Theme toggling functionality
const toggleTheme = () => {
    document.body.classList.toggle('dark-theme');
};

document.querySelector('#themeToggle').addEventListener('click', toggleTheme);

// Function to handle meal plan submission and track calories
const submitMealPlan = (event) => {
    event.preventDefault();
    // Here, you would collect actual calorie data from the form inputs
    // For now, assume a placeholder value for calorie intake
    let calorieIntake = 1500; // Replace this with real data from the form
    totalCalories += calorieIntake; // Accumulate the total calorie intake

    alert('Meal plan submitted successfully! 🍴');

    // Update progress after submitting the meal plan
    updateProgressCharts();
};

document.querySelector('#mealPlanForm').addEventListener('submit', submitMealPlan);
