
const data = window.data || data;

const container = document.getElementById("fishContainer");
const STORAGE_KEY = "fishProgressGlobal";

function getProgress(){
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

function saveProgress(progress){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function isChecked(fish){
  return getProgress().includes(fish);
}

function toggleFish(fish, checked){
  let progress = getProgress();

  if(checked){
    if(!progress.includes(fish)){
      progress.push(fish);
    }
  } else {
    progress = progress.filter(item => item !== fish);
  }

  saveProgress(progress);

  document.querySelectorAll(`[data-fish="${CSS.escape(fish)}"]`).forEach(item => {
    const checkbox = item.querySelector("input");

    checkbox.checked = checked;
    item.classList.toggle("completed", checked);
  });
}

function createFishItem(fish){
  const wrapper = document.createElement("label");
  wrapper.className = "fish-item";
  wrapper.dataset.fish = fish;

  const checked = isChecked(fish);

  if(checked){
    wrapper.classList.add("completed");
  }

  const splitIndex = fish.indexOf("(");
  const fishName = splitIndex !== -1
    ? fish.slice(0, splitIndex).trim()
    : fish;

  const fishMeta = splitIndex !== -1
    ? fish.slice(splitIndex)
    : "";

  wrapper.innerHTML = `
    <input type="checkbox" ${checked ? "checked" : ""}>
    <div class="fish-info">
      <span class="fish-name">${fishName}</span>
      <span class="fish-meta">${fishMeta}</span>
    </div>
  `;

  wrapper.querySelector("input").addEventListener("change", e => {
    toggleFish(fish, e.target.checked);
  });

  return wrapper;
}

Object.entries(data).forEach(([season, fishes]) => {
  const details = document.createElement("details");

  const summary = document.createElement("summary");
  summary.textContent = season;

  const list = document.createElement("div");
  list.className = "fish-list";

  fishes.forEach(fish => {
    list.appendChild(createFishItem(fish));
  });

  details.appendChild(summary);
  details.appendChild(list);

  container.appendChild(details);
});

document.getElementById("expandAll").addEventListener("click", () => {
  document.querySelectorAll("details").forEach(section => {
    section.open = true;
  });
});

document.getElementById("collapseAll").addEventListener("click", () => {
  document.querySelectorAll("details").forEach(section => {
    section.open = false;
  });
});

document.getElementById("search").addEventListener("input", event => {
  const value = event.target.value.toLowerCase();

  document.querySelectorAll(".fish-item").forEach(item => {
    const visible = item.textContent.toLowerCase().includes(value);

    item.classList.toggle("hidden", !visible);
  });
});

if("serviceWorker" in navigator){
  navigator.serviceWorker.register("./service-worker.js");
}
