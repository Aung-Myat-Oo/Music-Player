let musicBox = document.getElementsByClassName("music-box")[0];
let music = document.querySelector("audio");
let index = 0;
let pauseBtn = document.querySelector(".pause");
let playBtn = document.querySelector(".play");
let nextBtn = document.querySelector(".next");
let backBtn = document.querySelector(".back");
let timeText = document.getElementsByClassName("timeText")[0];
let bar=document.getElementsByClassName("bar")[0];
const musics = [
  { musicId: "audios/ghost.mp3", title: "GHOST" },
  { musicId: "audios/right-now.mp3", title: "Right Now" },
  { musicId: "audios/snap.mp3", title: "SNAP" },
  { musicId: "audios/strong.mp3", title: "STRONG" },
];
let musicInside = "";
for (let i = 0; i < musics.length; i++) {
  musicInside = document.createElement("div");
  musicInside.textContent = musics[i].title;
  musicInside.classList.add("music");
  musicBox.append(musicInside);
  musicInside.addEventListener("click", () => {
    index = i;
    musicPlay();
    pauseBtnTag();
  });
}
let resultTotalTime="00:00";
let totalTime=0;
music.addEventListener("loadeddata", () => {
  totalTime = Math.floor(music.duration);
  resultTotalTime= time(totalTime);
});
music.addEventListener("timeupdate", () => {
  const currentTime = Math.floor(music.currentTime);
  const resultCurrentTime =time(currentTime);
  const result=resultTotalTime+" / "+resultCurrentTime;
  timeText.textContent=result;
  let currentBar=(500/totalTime)*currentTime;
  bar.style.width=currentBar+"px";
})

let timeValue;
const time = (millisecond) => {
  const minute = Math.floor(millisecond / 60);
  const second = Math.floor(millisecond % 60);
  const minuteText = minute < 10 ? "0" + minute : minute;
  const secondText = second < 10 ? "0" + second : second;
  return minuteText+":"+secondText;
};
const musicPlay = () => {
  music.setAttribute("src", musics[index].musicId);
  music.play();
  isPlay = true;
};
let isPlay = false;

playBtn.addEventListener("click", () => {
  if(totalTime===0){
    musicPlay();
  }else{
    isPlay=true;
    music.play();
  }
  pauseBtnTag();
});
pauseBtn.addEventListener("click", () => {
  music.pause();
  isPlay = false;
  pauseBtnTag();
});
backBtn.addEventListener("click", () => {
  if (index === 0) {
    return;
  }
  index -= 1;
  musicPlay();
  pauseBtnTag();
});
nextBtn.addEventListener("click", () => {
  if (index === musics.length - 1) {
    return;
  }
  index += 1;
  musicPlay();
  pauseBtnTag();
});
const pauseBtnTag = () => {
  if (isPlay) {
    pauseBtn.style.display = "inline";
    playBtn.style.display = "none";
  } else {
    pauseBtn.style.display = "none";
    playBtn.style.display = "inline";
  }
};
