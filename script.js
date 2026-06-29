// ===============================
// Reduce Belly Fat
// Version 2.0 - Part 1
// ===============================

let workouts = JSON.parse(localStorage.getItem("rbf_workouts")) || [];

document.addEventListener("DOMContentLoaded", init);

function init(){

    document.getElementById("today").innerHTML =
        new Date().toLocaleDateString(
            "en-US",
            {
                weekday:"long",
                month:"long",
                day:"numeric"
            }
        );

    document.getElementById("date").value =
        new Date().toISOString().split("T")[0];

    document
        .getElementById("save")
        .addEventListener("click", saveWorkout);

    refreshDashboard();

    loadHistory();

}

function saveWorkout(){

    const workout={

        date:
        document.getElementById("date").value,

        program:
        document.getElementById("program").value,

        duration:
        Number(document.getElementById("duration").value),

        calories:
        Number(document.getElementById("calories").value),

        avgHR:
        Number(document.getElementById("avgHR").value),

        maxHR:
        Number(document.getElementById("maxHR").value),

        weight:
        Number(document.getElementById("weight").value),

        waist:
        Number(document.getElementById("waist").value),

        notes:
        document.getElementById("notes").value,

        created:
        Date.now()

    };

    workouts.unshift(workout);

    localStorage.setItem(
        "rbf_workouts",
        JSON.stringify(workouts)
    );

    clearForm();

    refreshDashboard();

    loadHistory();

    alert("Workout Saved ✅");

}

function clearForm(){

    document.getElementById("duration").value="";

    document.getElementById("calories").value="";

    document.getElementById("avgHR").value="";

    document.getElementById("maxHR").value="";

    document.getElementById("notes").value="";

}

function refreshDashboard(){

    let totalCalories=0;

    let totalHR=0;

    workouts.forEach(w=>{

        totalCalories+=w.calories;

        totalHR+=w.avgHR;

    });

    document.getElementById("totalCalories").innerHTML=
        totalCalories;

    document.getElementById("totalWorkouts").innerHTML=
        workouts.length;

    document.getElementById("avgHeartRate").innerHTML=
        workouts.length
        ?
        Math.round(totalHR/workouts.length)
        :
        0;

}

function loadHistory(){

    const history=document.getElementById("history");

    if(workouts.length===0){

        history.innerHTML="No workouts yet.";

        return;

    }

    history.innerHTML="";

    workouts.forEach(w=>{

        history.innerHTML+=`

<div style="background:#2c2c2e;
padding:16px;
border-radius:16px;
margin-bottom:14px;">

<b>${w.program}</b>

<br>

${w.date}

<br>

🔥 ${w.calories} kcal

<br>

❤️ Avg ${w.avgHR}

&nbsp;&nbsp;

⬆ ${w.maxHR}

<br>

⚖ ${w.weight} lb

&nbsp;&nbsp;

📏 ${w.waist}"

</div>

`;

    });

}
