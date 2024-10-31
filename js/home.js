// ? =============> Global ===============>
const loading = document.querySelector(".loading");
const modeThem = document.getElementById("mode");
getGames("mmorpg");

// ! ============> When Start ============>
if (localStorage.getItem("theme") !== null) {
  const themeData = localStorage.getItem("theme");
  if (themeData === "light") {
    modeThem.classList.replace("fa-sun", "fa-moon");
  } else {
    modeThem.classList.replace("fa-moon", "fa-sun");
  }
  document.querySelector("html").setAttribute("data-theme", themeData);
}
// * ==============> Events ===============>

document.querySelector(".logout-btn").addEventListener("click", () => {
  localStorage.removeItem("userToken");
  location.href = "./index.html";
});

modeThem.addEventListener("click", () => {
  if (modeThem.classList.contains("fa-sun")) {
    document.querySelector("html").setAttribute("data-theme", "light");
    modeThem.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "light");
  } else {
    document.querySelector("html").setAttribute("data-theme", "dark");
    modeThem.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "dark");
  }
});

document.querySelectorAll(".menu .nav-link").forEach((link) =>
  link.addEventListener("click", () => {
    document.querySelector(".menu .active").classList.remove("active");
    link.classList.add("active");
    const categoryGames = link.dataset.category;
    getGames(categoryGames);
  })
);
// ! =============> Functions =============>

async function getGames(getData) {
  document.body.classList.add("overflow-hidden");
  loading.classList.remove("d-none");
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "ad18bbdf3dmshe55c1da6a6f9dc6p1e89b5jsn2a3c10100ac1",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  const api = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${getData}`,
    options
  );
  const response = await api.json();
  displayData(response);
  document.body.classList.remove("overflow-hidden");
  loading.classList.add("d-none");
}

function displayData(data) {
  let gamesBox = "";
  for (let i = 0; i < data.length; i++) {
    const videoPath = data[i].thumbnail.replace(
      "thumbnail.jpg",
      "videoplayback.webm"
    );

    gamesBox += `
    
              <div class="col-md-6 col-lg-4 col-xl-3 g-4">

            <div onclick="showDetails(${data[i].id})" onmouseenter="startVideo(event)" onmouseleave="stopVideo(event)" class="card h-100 bg-transparent" role="button">

           <div class="card-body">

            <figure class="position-relative">
              <img class="card-img-top object-fit-cover h-100" src="${data[i].thumbnail}" alt="${data[i].title}"/>
              <video  muted="true" loop preload="none" class="d-none w-100 h-100 position-absolute top-0 start-0 z-3">
                <source src="${videoPath}" >  
              </video>
            </figure>

            <figcaption>
              <div class="d-flex justify-content-between align-items-center">
                <h3 class="h6 small">
                ${data[i].title}
                </h3>
                <span class="badge text-bg-primary p-2">free</span>
              </div>
              <p class="card-text small opacity-50 text-center">
                ${data[i].short_description}
              </p>
            </figcaption>
           </div>
           <footer class="card-footer hstack justify-content-between small">
             <span class="badge badge-color">${data[i].genre}</span>
             <span class="badge badge-color">${data[i].platform}</span>
           </footer>
            </div>
          </div>
    `;
  }
  document.getElementById("gameData").innerHTML = gamesBox;
}

function startVideo(event) {
  const videoEle = event.target.querySelector("video");
  videoEle.classList.remove("d-none");
  videoEle.muted = "true";
  videoEle.play();
}

function stopVideo(event) {
  const videoEle = event.target.querySelector("video");
  videoEle.classList.add("d-none");
  videoEle.muted = "true";
  videoEle.pause();
}

function showDetails(id) {
  window.location.href = `./details.html?id=${id}`;
}
