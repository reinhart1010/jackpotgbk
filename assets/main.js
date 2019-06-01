function togglePage(id1,id2) {
    var div1 = document.getElementById(id1);
    var div2 = document.getElementById(id2);
    div1.style.display = div1.style.display == "none" ? "block" : "none";
    div2.style.display = div2.style.display == "block" ? "none" : "block";
};
function shareTo(sm){
  var url = window.location.href;
  var tag = "#jackpotgbk"
  if (sm == "fb"){
    window.open("https://www.facebook.com/sharer.php?u=" + url) //Facebook
  } else if (sm == "ln"){
    window.open("https://lineit.line.me/share/ui?text=" + tag + "&url=" + url) //LINE
  } else if (sm == "tg"){
    window.open("https://t.me/share/url?text=" + tag + "&url=" + url) //Telegram
  } else if (sm == "tw"){
    window.open("https://twitter.com/intent/tweet?text=" + tag + "&url=" + url) //Twittter
  } else if (sm == "wa"){
    window.open("https://wa.me/?text=" + tag + "\n" + url) //WhatsApp
  }
}
