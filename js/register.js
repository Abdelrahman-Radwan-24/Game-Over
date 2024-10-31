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
  if (
    validationName(inputs[0]) &&
    validationName(inputs[1]) &&
    validationEmail() &&
    validationPassword() &&
    validationAge()
  ) {
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
    inputs[3].setAttribute("type", "text");
  } else {
    eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
    inputs[3].setAttribute("type", "password");
  }
});

// ! =============> Functions =============>
function setForm() {
  const user = {
    first_name: inputs[0].value,
    last_name: inputs[1].value,
    email: inputs[2].value,
    password: inputs[3].value,
    age: inputs[4].value,
  };
  registerForm(user);
}

async function registerForm(userData) {
  const api = await fetch("https://movies-api.routemisr.com/signup", {
    method: "post",
    body: JSON.stringify(userData),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const response = await api.json();

  if (response.message === "success") {
    setTimeout(() => {
      location.href = "./index.html";
    }, 2000);
  } else {
    document.getElementById("msg").innerHTML = response.errors?.email.message;
  }
}

// * =============> Validation ============>

function validationName(inputName) {
  const regexStyle =
    /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/;

  if (regexStyle.test(inputName.value)) {
    inputName.classList.add("is-valid");
    inputName.classList.remove("is-invalid");
    return true;
  } else {
    inputName.classList.add("is-invalid");
    inputName.classList.remove("is-valid");
    return false;
  }
}

function validationEmail() {
  const regexStyle =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  if (regexStyle.test(inputs[2].value)) {
    inputs[2].classList.add("is-valid");
    inputs[2].classList.remove("is-invalid");
    return true;
  } else {
    inputs[2].classList.add("is-invalid");
    inputs[2].classList.remove("is-valid");
    return false;
  }
}

function validationPassword() {
  const regexStyle = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (regexStyle.test(inputs[3].value)) {
    inputs[3].classList.add("is-valid");
    inputs[3].classList.remove("is-invalid");
    return true;
  } else {
    inputs[3].classList.add("is-invalid");
    inputs[3].classList.remove("is-valid");
    return false;
  }
}

function validationAge() {
  const regexStyle = /^([1-7][0-9]|80)$/;

  if (regexStyle.test(inputs[4].value)) {
    inputs[4].classList.add("is-valid");
    inputs[4].classList.remove("is-invalid");
    return true;
  } else {
    inputs[4].classList.add("is-invalid");
    inputs[4].classList.remove("is-valid");
    return false;
  }
}
