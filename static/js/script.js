// Прогружает, когда страница готова
$(document).ready(function(){
  loadRegistedUsers();
  loadActiveUser();
});

//Создание массива
let registeredUsers = [];

var activeUser = null;
//Загрузка из localStorage
function loadRegistedUsers(){
  registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
}
//Сохранение в localStorage
function saveRegisteredUsers(){
  localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
}
//Загрузка из localStorage
function loadActiveUser(){
  activeUser = JSON.parse(localStorage.getItem("activeUser"));
}
//Сохранение в localStorage
function saveActiveUser(){
  localStorage.setItem("activeUser", JSON.stringify(activeUser));
}
//Функция регистрации
function signUp(){
  let showError = $("#showError")[0];
  let firstName = $("#firstName").val();
  let lastName = $("#lastName").val();
  let email = $("#email").val();
  let username = $("#username").val();
  let phone = $("#phone").val();
  let password = $("#password").val();
  let repassword = $("#repassword").val();
  let isBanned = false;
  showError.innerHTML = "";
  //Всякие проверки
  if (firstName == "" || lastName == "" || email == ""|| username == "" || phone == ""|| password == ""|| repassword == ""){
    showError.innerHTML = "Fill the gaps";
    return false;
  }

  if(!ValidateEmail(email)){
    showError.innerHTML = "Write email correctly!";
    return false;
  }
  if(!ValidatePhone(phone)){
    showError.innerHTML = "Write number correctly!";
    return false;
  }
  if(!ValidatePassword(password)){
    showError.innerHTML = "Your password must contain at least 8 symbols, at least 1 uppercase, 1 lowercase, 1 special symbol";
    return false;
  }
  if(repassword != password){
    showError.innerHTML = "Passwords don't match";
    return true;
  }
  if(userExists(email, username)){
    showError.innerHTML = "User already exists";
    return false;
  }
  //Заполнение функцией registerUser
  registerUser(firstName, lastName, email, username, phone, password, false);
  alert("Success reg");
  location.replace("login.html")
}
//Функция валидации
function ValidateEmail(email){
  if (/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(email)){
    return (true);
  }
  else{
    return false;
  }}

// Проверка есть ли такой в сторедже
function userExists(email, username){
  for(let i = 0; i < registeredUsers.length; i++){
    let regUser = registeredUsers[i];
    if(regUser.email == email || regUser.username == username)
     return (true);
    else{
      return false;
    }
  }
}

function ValidatePhone(phone){
  if (/^((\+7|7|8)+([0-9]){10})$/.test(phone)){
    return (true);
  }
  else{
    return false;
  }}



  function checkUser(email, password){
    for(let i = 0; i < registeredUsers.length; i++){
      let currentUser = registeredUsers[i];
      if(currentUser.email == email && currentUser.password == password)
        return currentUser;
    }
    return false;
  }

  function banPage(){
    location.replace("ban.html")
  }

  function itsadmin(){
    location.replace("admin.html")
  }

//Funcia validacii
function ValidatePassword(password){
  if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(password)){
    return (true);
  }
  else{
    return false;
  }

}

//Объект Юзер
function User(first, last, email, username, phone, password, isBanned){
  this.firstName = first;
  this.lastName = last;
  this.email = email;
  this.username = username;
  this.phone = phone;
  this.password = password;
  this.isBanned = isBanned;
}
//Функция регистрации
function registerUser(first, last, email, username, phone, password, isBanned){
  let newUser = new User(first, last, email, username, phone, password, isBanned)
  registeredUsers.push(newUser);
  saveRegisteredUsers();
}
//Функция входа
function signIn(){
  let showError = $("#showSignError")[0];
  let signEmail = $("#signEmail").val();
  let signPass = $("#signPass").val();
  showError.innerHTML = "";

  if (signEmail == ""|| signPass == ""){
    showError.innerHTML = "Fill the gaps";
    return false;
  }

  if(!ValidateEmail(signEmail)){
    showError.innerHTML = "Write email correctly!";
    return false;
  }
//Проверки входа
let user = checkUser(signEmail, signPass);
 if(signEmail == "admin@gmail.com" && signPass == "IAmAdmin!"){
 itsadmin();
 return false;
}
if(!user){
  showError.innerHTML = "User not found";
  return false;
}

activeUser = user;
if(activeUser.isBanned === true){
  banPage();
  return false;
}

alert("Hello," + " " + activeUser.firstName + ". Have a nice day!");

saveActiveUser();
location.replace("index.html")

return false;

}

