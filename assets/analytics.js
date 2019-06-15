// Analytics tagger

// This snippet is from https://codepen.io/SitePoint/pen/rQGWpP

function getAllUrlParams(url) {
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  var obj = {};

  if (queryString) {
    queryString = queryString.split('#')[0];
    var arr = queryString.split('&');

    for (var i = 0; i < arr.length; i++) {
      var a = arr[i].split('=');
      var paramName = a[0];
      var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

      paramName = paramName.toLowerCase();
      if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

      if (paramName.match(/\[(\d+)?\]$/)) {
        var key = paramName.replace(/\[(\d+)?\]/, '');
        if (!obj[key]) obj[key] = [];

        if (paramName.match(/\[\d+\]$/)) {
          var index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          obj[key].push(paramValue);
        }
      } else {
        if (!obj[paramName]) {
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === 'string'){
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          obj[paramName].push(paramValue);
        }
      }
    }
  }

  return obj;
}
// END snippet

function startTracker(){
  var trackdata = {
    "host" : "",
    "time" : "",
  };
  var url = location.href;
  var host = location.hostname;
  if (getAllUrlParams(url).tracking != "false"){
    if (host == "reinhart1010.github.io" || host == "reinhart1010.gitlab.io"){
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-142190053-1');
      console.log("Tracking is enabled.")
    } else {
      console.log("Tracking is disabled because this site is hosted other than reinhart1010.github.io and reinhart1010.gitlab.io")
    }
  } else {
    console.log("Tracking is disabled because the user prefers to disable tracking from the URL parameter")
  }
}
