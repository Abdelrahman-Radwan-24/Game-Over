// ? =============> Global ===============>
const modeThem = document.getElementById("mode");
// ! ============> When Start ============>

const searchId = location.search;
const urlParams = new URLSearchParams(searchId);
const id = urlParams.get("id");

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

// ! =============> Functions =============>

(async () => {
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "ad18bbdf3dmshe55c1da6a6f9dc6p1e89b5jsn2a3c10100ac1",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
  const api = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
    options
  );
  const response = await api.json();
  displayData(response);
})();

function displayData(data) {
  const detaildBox = `
    
                <div class="col-md-4">
              <figure>
                <img class="w-100 " src="${data.thumbnail}" alt="${data.title}">
              </figure>
            </div>

            <div class="col-md-8">
              <div>
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item text-reset"><a href="./home.html">Home</a></li>
                    <li class="breadcrumb-item text-info active" aria-current="page">${data.title}</li>
                  </ol>
                </nav>
                <h1>${data.title}</h1>
                <h3>About ${data.title}</h3>
                <p>${data.description}</p>
              </div>
            </div>
            
    
    `;
  document.getElementById("detailsData").innerHTML = detaildBox;
  const backGroundImage = data.thumbnail.replace("thumbnail", "background");
  document.body.style.cssText = `
    background-image : url(${backGroundImage}) ;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    
    `;
}
