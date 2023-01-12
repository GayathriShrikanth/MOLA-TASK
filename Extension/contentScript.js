var prevCount = -1;

// Running function everytime page is scrolled
var page_was_scrolled = false;
document.addEventListener("scroll", (e) => {
  page_was_scrolled = true;
  doSomething();
});

// setInterval(doSomething, 1000);

function callAPIs(tweets) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    list: tweets,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    "https://molalabs.uw.r.appspot.com/api/language-detection",
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data);
      onlyEng = [];
      for (let i = 0; i < data.list.length; i++) {
        if (data.list[i].is_english == "True") {
          onlyEng.push(data.list[i]);
        }
      }
      var raw = JSON.stringify({
        list: onlyEng,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "https://molalabs.uw.r.appspot.com/api/sentiment-score",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          for (let i = 0; i < result.list.length; i++) {
            var mood = document.getElementById(result.list[i].tweetid + "mood");
            if (!mood) {
              var tweetdiv = document.getElementById(result.list[i].tweetid);
              var mySpan = document.createElement("span");
              var newid = result.list[i].tweetid + "mood";
              mySpan.setAttribute("id", newid);
              classes_to_add = [
                "css-901oao",
                "css-1hf3ou5",
                "r-14j79pv",
                "r-18u37iz",
                "r-37j5jr",
                "r-a023e6",
                "r-16dba41",
                "r-rjixqe",
                "r-bcqeeo",
                "r-qvutc0",
              ];
              mySpan.classList.add(...classes_to_add);
              mySpan.style.marginLeft = "5px";
              console.log(result.list[i]);
              console.log(result.list[i].detected_mood);
              if (result.list[i].detected_mood == "pos") {
                mySpan.innerHTML = "Detected Mood: " + "😊";
              } else if (result.list[i].detected_mood == "neg") {
                mySpan.innerHTML = "Detected Mood: " + "☹️";
              } else {
                mySpan.innerHTML = "Detected Mood: " + "😐";
              }
              tweetdiv.appendChild(mySpan);
            }
          }
          console.log("updating prev count");
          prevCount = tweets.length;
        })
        .catch((error) => console.log("error", error));
    })
    .catch((error) => console.log("error", error));
}

function doSomething() {
  var articles = document.querySelectorAll("article");
  var tweets = [];
  for (let art of articles) {
    let tweet = art.querySelector('[data-testid="tweetText"]');
    let divClass = art.querySelector('[data-testid="User-Names"]');
    tweets.push({
      tweet_text: tweet.innerText,
      tweetid: divClass.getAttribute("id"),
    });
  }
  if (tweets.length != prevCount) {
    callAPIs(tweets);
  }
}

// Running function when the page may have never been scrolled but you can still see the first tweet....
if (!page_was_scrolled) {
  setTimeout(doSomething, 5000);
}
