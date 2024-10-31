// ? =============> Global ===============>
const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const modeThem = document.getElementById("mode");
const eyeIcon = document.getElementById("eye-icon");
let isValid = false;
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
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (isValid) {
    setForm();
  }
});

form.addEventListener("input", () => {
  if (validationEmail() && validationPassword()) {
    isValid = true;
  } else {
    isValid = false;
  }
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

eyeIcon.addEventListener("click", () => {
  if (eyeIcon.classList.contains("fa-eye-slash")) {
    eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
    inputs[1].setAttribute("type", "text");
  } else {
    eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
    inputs[1].setAttribute("type", "password");
  }
});

// ! =============> Functions =============>
function setForm() {
  const user = {
    email: inputs[0].value,
    password: inputs[1].value,
  };
  loginForm(user);
}

async function loginForm(userData) {
  const api = await fetch("https://movies-api.routemisr.com/signin", {
    method: "post",
    body: JSON.stringify(userData),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const response = await api.json();

  if (response.message === "success") {
    localStorage.setItem("userToken", response.token);
    setTimeout(() => {
      location.href = "./home.html";
    }, 2000);
  } else {
    document.getElementById("msg").innerHTML = response.message;
  }
}

// * =============> Validation ============>

function validationEmail() {
  const regexStyle =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  if (regexStyle.test(inputs[0].value)) {
    inputs[0].classList.add("is-valid");
    inputs[0].classList.remove("is-invalid");
    return true;
  } else {
    inputs[0].classList.add("is-invalid");
    inputs[0].classList.remove("is-valid");
    return false;
  }
}

function validationPassword() {
  const regexStyle = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (regexStyle.test(inputs[1].value)) {
    inputs[1].classList.add("is-valid");
    inputs[1].classList.remove("is-invalid");
    return true;
  } else {
    inputs[1].classList.add("is-invalid");
    inputs[1].classList.remove("is-valid");
    return false;
  }
}
