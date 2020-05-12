function recommendFilm(mood, wish){
  if(mood == "bored" && wish == "calm"){
    location.replace("results/result4.html")
  }
  if(mood == "bored" && wish == "haveafun"){
    location.replace("results/result3.html")
  }
  if(mood == "bored" && wish == "testnerves"){
    location.replace("results/result6.html")
  }
  if(mood == "bored" && wish == "nothing"){
    location.replace("results/result3.html")
  }
   if(mood == "sad" && wish == "calm"){
    location.replace("results/result5.html")
  }
  if(mood == "sad" && wish == "haveafun"){
    location.replace("results/result5.html")
  }
  if(mood == "sad" && wish == "testnerves"){
    location.replace("results/result.html")
  }
  if(mood == "sad" && wish == "nothing"){
    location.replace("results/result2.html")
  }
   if(mood == "angry" && wish == "calm"){
    location.replace("results/result4.html")
  }
  if(mood == "angry" && wish == "haveafun"){
    location.replace("results/result5.html")
  }
  if(mood == "angry" && wish == "testnerves"){
    location.replace("results/result6.html")
  }
  if(mood == "angry" && wish == "nothing"){
    location.replace("results/result3.html")
  }
}

// Проверка на чекед
function isChecked(){
  let moodRadio = document.querySelector('input[name="q1"]:checked');
  let wishRadio = document.querySelector('input[name="q2"]:checked');
  if(moodRadio != null && wishRadio != null){
    let mood = moodRadio.value;
    let wish = wishRadio.value;
    recommendFilm(mood, wish);
  }
  else{
    alert("CHOOSE SOMETHING");
  }
}