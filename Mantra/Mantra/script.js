const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const audio = document.getElementById("mantra");
const countInput = document.getElementById("countInput");
const pauseInput = document.getElementById("pauseInput");
const soundInput = document.getElementById("soundInput");
const fileInput = document.getElementById("fileInput");
const counter = document.getElementById("counter");
const controls = document.getElementById("controls");
const run = document.getElementById("run");

let remaining = 0;
let total = 0;
let interval = 0;
let stopped = false;
let startTime = null;
let totalDuration = 0;
let timer = null;
let customSoundUrl = null;

soundInput.addEventListener("change", () => {
  if (soundInput.value === "custom") {
    fileInput.classList.add("visible");
    return;
  }

  fileInput.classList.remove("visible");
  fileInput.value = "";

  audio.src = soundInput.value;
  audio.load();
});

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];

  if (!file) return;

  if (customSoundUrl) {
    URL.revokeObjectURL(customSoundUrl);
  }

  customSoundUrl = URL.createObjectURL(file);
  audio.src = customSoundUrl;
  audio.load();
});

audio.src = soundInput.value;

startBtn.addEventListener("click", async () => {
  if (soundInput.value === "custom" && !fileInput.files[0]) {
    return;
  }

  total = parseInt(countInput.value, 10);
  remaining = total;
  interval = parseFloat(pauseInput.value) * 1000;

  if (isNaN(total) || total <= 0) return;
  if (isNaN(interval) || interval < 7000) interval = 7000;

  stopped = false;
  updateCounter();

  if (!Number.isFinite(audio.duration)) {
    await new Promise(resolve => {
      audio.addEventListener("loadedmetadata", resolve, { once: true });
    });
  }

  totalDuration = total * interval;
  startTime = performance.now();

  controls.style.display = "none";
  run.style.display = "flex";
  updateLastUsed();

  playNext();
});

resetBtn.addEventListener("click", () => {
  stopped = true;
  remaining = 0;
  total = 0;

  clearTimeout(timer);
  timer = null;

  audio.pause();
  audio.currentTime = 0;

  updateCounter();
  controls.style.display = "flex";
  run.style.display = "none";
});

function playNext() {
  if (remaining <= 0 || stopped) return;

  remaining--;
  updateCounter();

  audio.currentTime = 0;
  audio.play();

  if (remaining > 0) {
    timer = setTimeout(() => {
      playNext();
    }, interval);
  }
}

function updateCounter() {
  const done = total - remaining;
  counter.textContent = `${done} / ${total}`;

  if (total > 0) {
    const progress = done / total;
    const offset = 314 - (314 * progress);
    circle.style.strokeDashoffset = offset;
  }
}

function animateProgress() {
  if (stopped) return;

  const now = performance.now();
  const elapsed = now - startTime;
  const progress = Math.min(elapsed / totalDuration, 1);

  const offset = 314 - (314 * progress);
  circle.style.strokeDashoffset = offset;

  if (progress < 1) {
    requestAnimationFrame(animateProgress);
  }
}

const circle = document.getElementById("progressCircle");

function saveCount() {
  localStorage.setItem("count", countInput.value);
}

function loadCount() {
  const saved = localStorage.getItem("count");

  if (saved !== null) {
    countInput.value = saved;
  }
}

countInput.addEventListener("change", saveCount);
window.addEventListener("DOMContentLoaded", loadCount);
loadCount();

const lastUsed = document.getElementById("lastUsed");

function updateLastUsed() {
  const count = localStorage.getItem("count");
  const date = localStorage.getItem("lastDate");

  if (count && date) {
    const d = new Date(date);
    const formatted = d.toLocaleDateString();
    lastUsed.textContent = `last: ${count} (${formatted})`;
  }
}

updateLastUsed();
