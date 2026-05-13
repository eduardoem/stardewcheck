
const data = {
  "Primavera": [
    "Pez sol (Río, 6-19, soleado)",
    "Pez gato (Río/Bosque Secreto, 6-24, lluvia)",
    "Sábalo (Río, 9-2, lluvia)",
    "Perca (Lago Montaña, 6-19, cualquiera)",
    "Carpa (Lago Montaña, todo el día, cualquiera)",
    "Siluro (Lago Montaña, todo el día, cualquiera)",
    "Sardina (Océano, 6-19, cualquiera)",
    "Anguila (Océano, 16-2, lluvia)",
    "Pez fantasma (Minas pisos 20/60, todo el día)",
    "Lenguado (Estanque Desierto, 6-22)",
    "Muyu (Bosque Secreto/Granja Forestal, todo el día)",
    "Cangrejo de río (Trampa agua dulce)",
    "Caracol (Trampa agua dulce)",
    "Bígaro (Trampa agua dulce)",
    "Langosta (Trampa océano)",
    "Cangrejo (Trampa océano)",
    "Berberecho (Trampa océano)",
    "Gamba (Trampa océano)",
    "Ostra (Trampa océano)",
    "Almeja (Trampa océano)",
    "Mejillón (Trampa océano)"
  ],
  "Verano": [
    "Pez sol (Río, 6-19, soleado)",
    "Pez gato (Bosque Secreto, 6-24, lluvia)",
    "Sábalo (Río, 9-2, lluvia)",
    "Perca (Lago Montaña, 6-19, cualquiera)",
    "Carpa (Lago Montaña, todo el día, cualquiera)",
    "Siluro (Lago Montaña, todo el día, cualquiera)",
    "Esturión (Lago Montaña, 6-19, cualquiera)",
    "Atún (Océano, 6-19, cualquiera)",
    "Pargo colorado (Océano, 6-19, lluvia)",
    "Tilapia (Océano, 6-14, cualquiera)",
    "Besugo (Río, 18-2, cualquiera)",
    "Pez globo (Océano, 12-16, soleado)",
    "Pez fantasma (Minas pisos 20/60, todo el día)",
    "Lenguado (Estanque Desierto, 6-22)",
    "Muyu (Bosque Secreto/Granja Forestal, todo el día)",
    "Cangrejo de río (Trampa agua dulce)",
    "Caracol (Trampa agua dulce)",
    "Bígaro (Trampa agua dulce)",
    "Langosta (Trampa océano)",
    "Cangrejo (Trampa océano)",
    "Berberecho (Trampa océano)",
    "Gamba (Trampa océano)",
    "Ostra (Trampa océano)",
    "Almeja (Trampa océano)",
    "Mejillón (Trampa océano)"
  ],
  "Otoño": [
    "Pez gato (Río/Bosque Secreto, 6-24, lluvia)",
    "Sábalo (Río, 9-2, lluvia)",
    "Trucha tigre (Río, 6-19, cualquiera)",
    "Perca (Lago Montaña, 6-19, cualquiera)",
    "Carpa (Lago Montaña, todo el día, cualquiera)",
    "Siluro (Lago Montaña, todo el día, cualquiera)",
    "Sardina (Océano, 6-19, cualquiera)",
    "Pargo colorado (Océano, 6-19, lluvia)",
    "Tilapia (Océano, 6-14, cualquiera)",
    "Lucio (Río/Lago/Estanque Bosque Tizón, 12-2, lluvia)",
    "Besugo (Río, 18-2, cualquiera)",
    "Anguila (Océano, 16-2, lluvia)",
    "Pez fantasma (Minas pisos 20/60, todo el día)",
    "Lenguado (Estanque Desierto, 6-22)",
    "Muyu (Bosque Secreto/Granja Forestal, todo el día)",
    "Cangrejo de río (Trampa agua dulce)",
    "Caracol (Trampa agua dulce)",
    "Bígaro (Trampa agua dulce)",
    "Langosta (Trampa océano)",
    "Cangrejo (Trampa océano)",
    "Berberecho (Trampa océano)",
    "Gamba (Trampa océano)",
    "Ostra (Trampa océano)",
    "Almeja (Trampa océano)",
    "Mejillón (Trampa océano)"
  ],
  "Invierno": [
    "Trucha tigre (Río, 6-19, cualquiera)",
    "Siluro (Lago Montaña, todo el día, cualquiera)",
    "Esturión (Lago Montaña, 6-19, cualquiera)",
    "Sardina (Océano, 6-19, cualquiera)",
    "Atún (Océano, 6-19, cualquiera)",
    "Lucio (Río/Lago/Estanque Bosque Tizón, 12-2, requiere Tótem de Lluvia)",
    "Besugo (Río, 18-2, cualquiera)",
    "Pez fantasma (Minas pisos 20/60, todo el día)",
    "Lenguado (Estanque Desierto, 6-22)",
    "Muyu (Bosque Secreto/Granja Forestal, todo el día)",
    "Cangrejo de río (Trampa agua dulce)",
    "Caracol (Trampa agua dulce)",
    "Bígaro (Trampa agua dulce)",
    "Langosta (Trampa océano)",
    "Cangrejo (Trampa océano)",
    "Berberecho (Trampa océano)",
    "Gamba (Trampa océano)",
    "Ostra (Trampa océano)",
    "Almeja (Trampa océano)",
    "Mejillón (Trampa océano)"
  ]
};

const container = document.getElementById("fishContainer");

function createFishItem(fish, season){
  const saved = JSON.parse(localStorage.getItem("fishProgress") || "{}");
  const checked = saved[season]?.includes(fish);

  const wrapper = document.createElement("label");
  wrapper.className = "fish-item";

  wrapper.innerHTML = `
    <input type="checkbox" ${checked ? "checked" : ""}>
    <div class="fish-info">
      <span class="fish-name">${fish.split("(")[0].trim()}</span>
      <span class="fish-meta">${fish.includes("(") ? "(" + fish.split("(")[1] : ""}</span>
    </div>
  `;

  wrapper.querySelector("input").addEventListener("change", e => {
    const progress = JSON.parse(localStorage.getItem("fishProgress") || "{}");

    if(!progress[season]) progress[season] = [];

    if(e.target.checked){
      progress[season].push(fish);
    } else {
      progress[season] = progress[season].filter(f => f !== fish);
    }

    localStorage.setItem("fishProgress", JSON.stringify(progress));
  });

  return wrapper;
}

Object.entries(data).forEach(([season, fishes]) => {
  const details = document.createElement("details");

  const summary = document.createElement("summary");
  summary.textContent = season;

  const list = document.createElement("div");
  list.className = "fish-list";

  fishes.forEach(fish => list.appendChild(createFishItem(fish, season)));

  details.appendChild(summary);
  details.appendChild(list);

  container.appendChild(details);
});

document.getElementById("expandAll").addEventListener("click", () => {
  document.querySelectorAll("details").forEach(d => d.open = true);
});

document.getElementById("collapseAll").addEventListener("click", () => {
  document.querySelectorAll("details").forEach(d => d.open = false);
});

document.getElementById("search").addEventListener("input", e => {
  const value = e.target.value.toLowerCase();

  document.querySelectorAll(".fish-item").forEach(item => {
    item.classList.toggle(
      "hidden",
      !item.textContent.toLowerCase().includes(value)
    );
  });
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js');
}
