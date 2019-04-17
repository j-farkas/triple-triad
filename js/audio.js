var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  if(!isChrome){
    $('.audioChrome').remove()
  }
  else{
     $('.audioNotChrome').remove()
  }


  // function musicChange(musicChoice){
  //   $(".music").empty();
  //   if(musicChoice !== ""){
  //     $(".music").append("<audio autoplay loop id='audioNotChrome'>  <source src='audio/" + musicChoice + ".mp3'></audio><iframe src='audio/" + musicChoice + ".mp3' allow='autoplay' id='audioChrome' style='display:none'></iframe>");
  //     document.getElementById("audioChrome").volume = (20 / 100);
  //   }
  // };
