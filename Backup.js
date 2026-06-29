// Workout Tracker v1.0

let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

document.addEventListener("DOMContentLoaded", () => {

    const date = document.getElementById("date");

    if(date){
        date.value = new Date().toISOString().split("T")[0];
    }

    refresh();

});

function saveWorkout(){

    const workout = {

        date: document.getElementById("date").value,
        program: document.getElementById("program").value,
        duration: Number(document.getElementById("duration").value),
        calories: Number(document.getElementById("calories").value),
        avgHR: Number(document.getElementById("avgHR").value),
        maxHR: Number(document.getElementById("maxHR").value),
        weight: Number(document.getElementById("weight").value),
        waist: Number(document.getElementById("waist").value),
        notes: document.getElementById("notes").value

    };

    workouts.unshift(workout);

    localStorage.setItem(
        "workouts",
        JSON.stringify(workouts)
    );

    clearForm();

    refresh();

    alert("Workout Saved ✅");

}

function clearForm(){

    document.getElementById("duration").value="";
    document.getElementById("calories").value="";
    document.getElementById("avgHR").value="";
    document.getElementById("maxHR").value="";
    document.getElementById("weight").value="";
    document.getElementById("waist").value="";
    document.getElementById("notes").value="";

}

function refresh(){

    loadHistory();

    updateStats();

}

function loadHistory(){

    const history=document.getElementById("history");

    history.innerHTML="";

    workouts.forEach(w=>{

        history.innerHTML+=`

        <tr>

        <td>${w.date}</td>

        <td>${w.program}</td>

        <td>${w.calories}</td>

        <td>${w.avgHR}</td>

        <td>${w.weight}</td>

        </tr>

        `;

    });

}

function updateStats(){

    document.getElementById("totalWorkouts").innerText=workouts.length;

    let calories=0;

    let hr=0;

    workouts.forEach(w=>{

        calories+=w.calories;

        hr+=w.avgHR;

    });

    document.getElementById("totalCalories").innerText=calories;

    document.getElementById("averageHR").innerText=

        workouts.length
        ?

        Math.round(hr/workouts.length)

        :

        0;

}
