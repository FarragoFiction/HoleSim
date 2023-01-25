

let bounce_container;
let holeLevel = 0;
const maxHoleLevel = 25;
let started = false;
const audioSources = ["audio/651292__f3bbbo__digging-in-wet-course-sand-1.mp3","audio/651293__f3bbbo__digging-in-wet-course-sand-2.mp3"];
window.onload = () => {
  audio.play();
  window.onclick = () => {
    const splash = document.querySelector("#splash");
    if(splash.style.display != "none"){
      splash.style.display = "none";
      const bg = document.querySelector("#fake-background");
      bg.style.filter = "brightness(1.0)";


    }

    const audio = document.querySelector("#audio");
    if(!started){
      start();

    }

    if (!audio.playing) {
      audio.play();
    }
  }
  initThemes();


}

/*
i just like the idea of parker being all repressed memories and bad impulses
and slowly showing that even if he refuses to acknowledge his past
even if he keeps it buried
he can still find healing
*/
const start = ()=>{
  for(let i = 0; i<10; i++){
    oneBadImpulse();
  }
}

const embiggenHole = ()=>{
  const audio = new Audio(pickFrom(audioSources));
  audio.play();
  holeLevel ++;
  const hole = document.querySelector("#hole");
  console.log("JR NOTE: trying to embiggen ",hole.style.width)
  hole.style.width = `${3+holeLevel}vw`
  console.log("JR NOTE: trying to embiggen ",hole.style.width)
  const body = document.querySelector("body");
  body.style.filter=`brightness(${1-holeLevel/30})`;


}

//lol bro, you have to wander eternity obsessed with something meaningless that can neither sate you nor end, get pranked

const oneBadImpulse = ()=>{
  let ele = createElementWithClass("div","bad-impulse");
  ele.innerText = "JR TEST";
  bounceTime(ele)
}



/*
Brains are weird and mushy pattern matching systems. 

Are we identical to an artificial neural net? No, of course not. 

But I think there are more similarities there than some people are comfortable with. 

I feel like anything explainable ends up being “just” something. 

It’s JUST pattern matching, its JUST symbol repetition. 

And we want our own minds to be MORE than “just” something. There has to be some ineffable quality that could never possibly be explained or reduced. 

But I think that’s looking at everything exactly the wrong way. What’s it called, the “god of the gaps” in theology, right? If the thing you value is only allowed to exist in the spaces you don’t yet understand, then understanding itself becomes a THREAT.  Something that diminishes the value.

And man, I don’t want to consider understanding a threat. I want to celebrate it. I want to say “isn’t it so cool and good that artificial neural nets are helping us understand ourselves more?”. 

I want to be excited that we’re seeing more and more what lies behind our own curtain. 
*/



//https://css-tricks.com/bounce-element-around-viewport-in-css/
const bounceTime = (ele) => {
  //multiple things we wanna do. first is just bounce it around as is
  //then give it three frames of animation (same as LOGAC) that makes it staticky
  if (!bounce_container) {
    bounce_container = document.querySelector("#bounce-container");
  }
  /*
  <div class="el-wrap x">
    <div class="el y"></div>
  </div>
  */
  //ternary is so i can debug it without it zipping about
  const xAnimations = false ? ["x-turtle"] : ["x", "x-fast", "x-zip", "x-turtle"];
  const yAnimations = false ? ["y-turtle"] : ["y", "y-fast", "y-zip", "y-turtle"];
  const elWrap = createElementWithClassAndParent("div", bounce_container, `el-wrap ${pickFrom(xAnimations)}`);
  elWrap.style.left = `${getRandomNumberBetween(0, 100)}vw`;
  elWrap.style.top = `${getRandomNumberBetween(0, 100)}vh`;
  const el = createElementWithClassAndParent("div", elWrap, `el ${pickFrom(yAnimations)}`);
  el.style.width = "50px";
  el.style.height = "50px";

  el.append(ele);

}


