// ==================== SELECTORS ====================
const exerciseGrid = document.getElementById("exerciseGrid");
const targetList = document.getElementById("targetList");
const finalTargetList = document.getElementById("finalTargetList");
const confirmBtn = document.getElementById("confirmPlan");
const dateInput = document.getElementById("scheduleDate");
const sessionSelect = document.getElementById("sessionSelect");

// ==================== EXERCISES ====================
const exercises = [
  {name:"Pilates", img:"pilates.jpg", desc:"Core strengthening"},
  {name:"Sun Salutation", img:"sun_salutation.jpg", desc:"Full body stretch"},
  {name:"Tree Pose", img:"tree_pose.jpg", desc:"Balance improvement"},
  {name:"Warrior 2", img:"warrior2.jpg", desc:"Strength & stamina"},
  {name:"Cat-Cow", img:"cat_cow.jpg", desc:"Spinal flexibility"},
  {name:"Downward Dog", img:"downward_dog.jpg", desc:"Back & hamstring stretch"},
  {name:"Cobra Pose", img:"cobra_pose.jpg", desc:"Spinal strength"},
  {name:"Chair Pose", img:"chair_pose.jpg", desc:"Leg strength"},
  {name:"Boat Pose", img:"boat_pose.jpg", desc:"Core balance"},
  {name:"Bridge Pose", img:"bridge_pose.jpg", desc:"Glutes & back"},
  {name:"Side Plank", img:"side_plank.jpg", desc:"Core stability"},
  {name:"Mountain Pose", img:"mountain_pose.jpg", desc:"Posture improvement"},
  {name:"Seated Forward Fold", img:"seated_forward_fold.jpg", desc:"Hamstring stretch"},
  {name:"Crescent Lunge", img:"crescent_lunge.jpg", desc:"Leg flexibility"},
  {name:"Standing Forward Bend", img:"standing_forward_bend.jpg", desc:"Back stretch"},
  {name:"Eagle Pose", img:"eagle_pose.jpg", desc:"Balance & focus"},
  {name:"Triangle Pose", img:"triangle_pose.jpg", desc:"Side stretch"},
  {name:"Plank", img:"plank.jpg", desc:"Core & arms"},
  {name:"Side Stretch", img:"side_stretch.jpg", desc:"Waist flexibility"},
  {name:"Child's Pose", img:"childs_pose.jpg", desc:"Relaxation"},
  {name:"High Knees", img:"high_knees.jpg", desc:"Cardio warmup"},
  {name:"Jumping Jacks", img:"jumping_jacks.jpg", desc:"Full body cardio"},
  {name:"Burpees", img:"burpees.jpg", desc:"Full body strength"},
  {name:"Pushups", img:"pushups.jpg", desc:"Upper body strength"},
  {name:"Squats", img:"squats.jpg", desc:"Leg & glutes"}
];

// ==================== RENDER GRID ====================
exercises.forEach(ex => {
  const card = document.createElement("div");
  card.className = "exercise-card";

  const img = document.createElement("img");
  img.src = `assets/images/${ex.img}`;
  img.alt = ex.name;

  const h4 = document.createElement("h4");
  h4.textContent = ex.name;

  const p = document.createElement("p");
  p.textContent = ex.desc;

  const addBtn = document.createElement("button");
  addBtn.textContent = "Add ➕";
  addBtn.className = "add-btn";

  addBtn.addEventListener("click", () => {
    const date = dateInput.value;
    const session = sessionSelect.value;
    if(!date || !session){
      alert("Select Date and Session before adding!");
      return;
    }

    if([...targetList.children].some(li => li.textContent.includes(ex.name))){
      alert(`${ex.name} already added`);
      return;
    }

    const li = document.createElement("li");
    li.textContent = `${ex.name} | ${date} | ${session}`;
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";

    const cross = document.createElement("span");
    cross.textContent = "✖";
    cross.style.cursor = "pointer";
    cross.style.fontWeight = "bold";
    cross.addEventListener("click", ()=> li.remove());

    li.appendChild(cross);
    targetList.appendChild(li);
  });

  card.append(img, h4, p, addBtn);
  exerciseGrid.appendChild(card);
});

// ==================== CONFIRM PLAN ====================
confirmBtn.addEventListener("click", () => {
  if(targetList.children.length === 0){
    alert("Add some exercises first!");
    return;
  }

  [...targetList.children].forEach(li => {
    const clonedLi = li.cloneNode(true);
    const cross = clonedLi.querySelector("span");
    cross.addEventListener("click", () => clonedLi.remove());
    finalTargetList.appendChild(clonedLi);
  });

  targetList.innerHTML = "";
  alert("Plan confirmed! ✅ You can remove items using ✖");
});

// ==================== TIMER ====================
let timerInterval;
let remainingTime = 0;
let isPaused = false;
let initialTime = 0;
const timerDisplay = document.getElementById("timer");

function startTimer(minutes){
  clearInterval(timerInterval);
  initialTime = minutes * 60;
  remainingTime = initialTime;
  isPaused = false;

  timerInterval = setInterval(() => {
    if(!isPaused){
      const m = Math.floor(remainingTime / 60);
      const s = remainingTime % 60;
      timerDisplay.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
      remainingTime--;
      if(remainingTime < 0){
        clearInterval(timerInterval);
        timerDisplay.textContent = "00:00";
        alert("Time's up!");
      }
    }
  }, 1000);
}

document.querySelectorAll(".timer-btns button").forEach(btn => {
  btn.addEventListener("click", () => startTimer(parseInt(btn.dataset.time)));
});

document.getElementById("pauseTimer").addEventListener("click", () => {
  isPaused = !isPaused;
  document.getElementById("pauseTimer").textContent = isPaused ? "▶️ Resume" : "⏸️ Pause";
});

document.getElementById("restartTimer").addEventListener("click", () => {
  remainingTime = initialTime;
  timerDisplay.textContent = `${String(Math.floor(remainingTime/60)).padStart(2,'0')}:${String(remainingTime%60).padStart(2,'0')}`;
  isPaused = false;
  document.getElementById("pauseTimer").textContent = "⏸️ Pause";
});

document.getElementById("resetTimer").addEventListener("click", () => {
  clearInterval(timerInterval);
  remainingTime = 0;
  timerDisplay.textContent = "00:00";
  isPaused = false;
  document.getElementById("pauseTimer").textContent = "⏸️ Pause";
});

// ==================== WEATHER (local/serverless) ====================
const weatherLocation = document.getElementById("weatherLocation");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const weatherCity = document.getElementById("weatherCity");
const weatherTemp = document.getElementById("weatherTemp");
const weatherCondition = document.getElementById("weatherCondition");

getWeatherBtn.addEventListener("click", async () => {
  try {
    const res = await fetch(`{"location":{"name":"London","region":"City of London, Greater London","country":"United Kingdom","lat":51.5171,"lon":-0.1062,"tz_id":"Europe/London","localtime_epoch":1768754400,"localtime":"2026-01-18 16:40"},"current":{"last_updated_epoch":1768753800,"last_updated":"2026-01-18 16:30","temp_c":9.1,"temp_f":48.4,"is_day":0,"condition":{"text":"Light rain","icon":"//cdn.weatherapi.com/weather/64x64/night/296.png","code":1183},"wind_mph":8.9,"wind_kph":14.4,"wind_degree":76,"wind_dir":"ENE","pressure_mb":1016.0,"pressure_in":30.0,"precip_mm":0.0,"precip_in":0.0,"humidity":93,"cloud":0,"feelslike_c":6.9,"feelslike_f":44.4,"windchill_c":3.8,"windchill_f":38.8,"heatindex_c":6.6,"heatindex_f":43.8,"dewpoint_c":4.4,"dewpoint_f":39.9,"vis_km":10.0,"vis_miles":6.0,"uv":0.0,"gust_mph":12.8,"gust_kph":20.6,"air_quality":{},"short_rad":0,"diff_rad":0,"dni":0,"gti":0}}`);
    const data = await res.json();
    if(data.error) return alert(data.error);

    weatherCity.textContent = `📍 ${data.location.name}, ${data.location.country}`;
    weatherTemp.textContent = `🌡️ ${data.current.temp_c}°C`;
    weatherCondition.textContent = `⛅ ${data.current.condition.text}`;
  } catch(err){
    alert("Failed to fetch weather ⚠️");
  }
});

// ==================== HOLIDAYS (local/serverless) ====================
const holidayCountry = document.getElementById("holidayCountry");
const getHolidaysBtn = document.getElementById("getHolidaysBtn");
const holidayList = document.getElementById("holidayList");

getHolidaysBtn.addEventListener("click", async () => {
  try {
    const res = await fetch(`https://calendarific.com/api/v2/holidays?api_key=DGdVoKbVK36Mlwl87fJ17kVXi2nZis5d&country=IN&year=2026`);
    const holidays = await res.json();
    if(holidays.error) return alert(holidays.error);

    holidayList.innerHTML = "";
    holidays.forEach(h => {
      const li = document.createElement("li");
      li.textContent = `${h.date.iso} - ${h.name}`;
      holidayList.appendChild(li);
    });
  } catch(err){
    alert("Failed to fetch holidays ⚠️");
  }
});
