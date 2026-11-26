// NusaStat router — hash routes, no network, no framework.
// Routes: #/ overview, #/penduduk, #/ekonomi, #/kesehatan, #/pendidikan, #/provinsi.

import {
  viewOverview, drawOverview,
  viewPopulation, drawPopulation,
  viewEconomy, drawEconomy,
  viewHealth, drawHealth,
  viewEducation, drawEducation,
  viewRegions, drawRegions,
} from "./views.js";

const ROUTES = {
  "": ["overview", viewOverview, drawOverview],
  "penduduk": ["population", viewPopulation, drawPopulation],
  "ekonomi": ["economy", viewEconomy, drawEconomy],
  "kesehatan": ["health", viewHealth, drawHealth],
  "pendidikan": ["education", viewEducation, drawEducation],
  "provinsi": ["regions", viewRegions, drawRegions],
};

function render() {
  const hash = (location.hash || "#/").replace(/^#\/?/, "").split("?")[0];
  const [, view, draw] = ROUTES[hash] || ROUTES[""];
  const app = document.getElementById("app");
  app.innerHTML = view();
  document.querySelectorAll(".mainnav a").forEach((a) => {
    a.classList.toggle("active", a.dataset.route === (ROUTES[hash] || ROUTES[""])[0]);
  });
  draw();
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", render);
render();
