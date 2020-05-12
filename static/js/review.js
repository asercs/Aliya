// Прогружает, когда страница готова
$(document).ready(function(){
  loadReviews();
  showReviews();
});

// Массив отзывов
let addedReviews = [];

// Загрузка из localStorage
function loadReviews(){
  addedReviews = JSON.parse(localStorage.getItem("addedReviews")) || [];
}

//Сохранение в localStorage
function saveReviews(){
  localStorage.setItem("addedReviews", JSON.stringify(addedReviews));
}


// Добавление отзыва вызовом функции
function addReview(){
  let nick = $("#nick").val();
  let review = $("#review").val();
  addReviews(nick, review);
  alert("Review added");
}


function Reviews(nick, review){
  this.nick = nick;
  this.review = review;
}

// Сама функция добавления
function addReviews(nick, review){
  let newReview = new Reviews(nick, review);
  addedReviews.push(newReview);
  saveReviews();
}
    
// Показывать отзывы    
function showReviews(){
  for(let i = 0; i < addedReviews.length; i++){
    var blockRev = document.getElementById("blockReviews");
    var newDiv = document.createElement("div");
    newDiv.className = 'review'
    var newSpan =document.createElement('span');
    var newP =document.createElement('p');
    newSpan.innerHTML = addedReviews[i].nick;
    newP.innerHTML = addedReviews[i].review;
    newDiv.appendChild(newSpan);
    newDiv.appendChild(newP);
    blockRev.appendChild(newDiv);
  }
}