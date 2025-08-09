// console.log("Hello, World!!!");
import {loginRequest, registerRequest, getDashboardData} from "./apis.js";

let formFunction = "Login";

function renderHTML() {
  const mainHTML = `
    <section class="login-section">
      <h3>
        <span class="register-span">Register</span>
        <span>/</span>
        <span class="login-span">Login</span>
      </h3>
      <form>
        <div>
          <label for="username">Username:</label>
          <input type="text" name="username" placeholder="username" id="username">
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" name="password" placeholder="password" id="password">
        </div>
        <span class="message-span"></span>
        <button class="submit-btn">${formFunction}</button>
      </form>
    </section>
    <section class="dashboard-section">
      <h3>Dashboard</h3>
      <div class="dashboard-content-wrapper">
        <div class="dashboard-data"></div>
        <button class="get-data-btn">Get Data</button>
      </div>
    </section>
  `;

  const mainElem = document.querySelector("main");
  mainElem.innerHTML = mainHTML;

  const  
    userNameElem = document.querySelector("main .login-section form input[type='text']"),
    passwordElem = document.querySelector("main .login-section form input[type='password']"), 
    submitBtnElem = document.querySelector("main .login-section form .submit-btn"),
    dashboardDataElem = document.querySelector("main .dashboard-section .dashboard-content-wrapper .dashboard-data"), 
    getDataBtnElem = document.querySelector("main .dashboard-section .dashboard-content-wrapper .get-data-btn"),
    loginSpanElem = document.querySelector("main .login-section h3 .login-span"),
    registerSpanElem = document.querySelector("main .login-section h3 .register-span");
    const messageSpanElem = document.querySelector("main .login-section form .message-span");

  if(formFunction === "Login") 
    loginSpanElem.classList.add("selected");
  else {
    registerSpanElem.classList.add("selected");
  }
  
  loginSpanElem.addEventListener("click", e => {
    if(formFunction === "Login") return;
    registerSpanElem.classList.remove("selected");

    formFunction = "Login";
    renderHTML();
  })

  registerSpanElem.addEventListener("click", e => {
    if(formFunction === "Register") return;
    loginSpanElem.classList.remove("selected");

    formFunction = "Register";
    renderHTML();
  })

  submitBtnElem.addEventListener("click", submitAction);
  getDataBtnElem.addEventListener("click", updateDashboard);

  
  
  let setTimer;
  async function submitAction(e) {
    e.preventDefault();
    const username = userNameElem.value;
    const password = passwordElem.value;

    let result;
    if(formFunction === "Login") {
      result = await loginRequest({username, password});
    }
    if(formFunction === "Register") {
      result = await registerRequest({username, password});
    }

    const {success, data} = result;
    if(!success) {
      messageSpanElem.innerText = data.msg || "Something went wrong, please try again later...";
      messageSpanElem.style.color = "red";
      console.log(data);
      localStorage.removeItem("token");

    } else {
      localStorage.setItem("token", data.token);
      messageSpanElem.innerText = data.msg;
      messageSpanElem.style.color = "green";
      updateDashboard();
    }

    clearTimeout(setTimer);
    setTimer = setTimeout(() => {
      messageSpanElem.innerText = "";
    }, 2000)
  }

  async function updateDashboard() {
    const token = localStorage.getItem("token");
    const {success, data:result} = await getDashboardData(token);
    let {msg, data} = result;
    if(!success) {
      dashboardDataElem.innerHTML = msg || "Something went wrong, please try again later..."
      dashboardDataElem.style.color = "red";
      console.log(result);
      return;
    }
    dashboardDataElem.style.color = "initial";
    const html = data 
    ? 
    `
      <p class="msg">${msg}</p>
      <p>Welcome to Dashboard <span class="data">Mr/Ms ${data.username}</span>, and</p>
      <p>your hashed password is: <sapn class="data">${data.password}</span></p>
    ` 
    :
    "No data";
    dashboardDataElem.innerHTML = html;
  }
}
renderHTML();

