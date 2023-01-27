

let bounce_container;
let holeLevel = 0;
let hole;
const maxHoleLevel = 25;
let started = false;
const audioSources = ["audio/651292__f3bbbo__digging-in-wet-course-sand-1.mp3", "audio/651293__f3bbbo__digging-in-wet-course-sand-2.mp3"];
window.onload = () => {
  hole = document.querySelector("#hole");

  audio.play();
  window.onclick = () => {
    const splash = document.querySelector("#splash");
    if (splash.style.display != "none") {
      splash.style.display = "none";
      const bg = document.querySelector("#fake-background");
      bg.style.filter = "brightness(1.0)";


    }

    const audio = document.querySelector("#audio");
    if (!started) {
      started = true;
      start();

    } else {
      if (holeLevel < maxHoleLevel) {
        oneBadImpulse();
      }
    }

    if (!audio.playing) {
      audio.play();
    }
  }
  initThemes();


}


const collisionDectionLoop = () => {
  //good or bad
  let impulses = document.querySelectorAll(".impulse");
  let holeRect = hole.getClientRects()[0];
  for (let impulse of impulses) {
    //does the middle of the impulse touch any part of the hole?
    let impulseRect = impulse.getClientRects()[0]; //get rect
    const middleX = impulseRect.x + impulseRect.width / 2;
    const middleY = impulseRect.y + impulseRect.height / 2;
    //console.log("JR NOTE: debug: ",{middleX, middleY, holeX: holeRect.x, holeY: holeRect.y, holeWidth: holeRect.width, holeHeight: holeRect.height})
    //wiggle around the middle. 

    const wiggleWidth = holeRect.width / 2;
    const wiggleHeight = holeRect.height / 2;
    const middleHorizontal = () => {

      if (middleX + wiggleWidth > holeRect.x && middleX + wiggleWidth < holeRect.x + holeRect.width) {
        return true;
      }

      if (middleX - wiggleWidth > holeRect.x && middleX - wiggleWidth < holeRect.x + holeRect.width) {
        return true;
      }
      return false;
    }

    const middleVertical = () => {
      if (middleY + wiggleHeight > holeRect.y && middleY + wiggleHeight < holeRect.y + holeRect.height) {
        return true;
      }

      if (middleY - wiggleHeight > holeRect.y && middleY - wiggleHeight < holeRect.height + holeRect.height) {
        return true;
      }
      return false;
    }

    if (middleHorizontal() && middleVertical()) {
      impulse.remove();
      embiggenHole();
      oneBadImpulse();
    }
  }
  if (holeLevel < maxHoleLevel) {
    setTimeout(collisionDectionLoop, 500)
  }
}

/*
i just like the idea of parker being all repressed memories and bad impulses
and slowly showing that even if he refuses to acknowledge his past
even if he keeps it buried
he can still find healing
*/
const start = () => {
  oneBadImpulse();
  collisionDectionLoop();

}

const embiggenHole = () => {
  const audio = new Audio(pickFrom(audioSources));
  audio.play();
  holeLevel++;
  console.log("JR NOTE: trying to embiggen ", hole.style.width)
  hole.style.width = `${5 + holeLevel}vw`
  console.log("JR NOTE: trying to embiggen ", hole.style.width)
  const body = document.querySelector("body");
  body.style.filter = `brightness(${1 - holeLevel / 30})`;


}

//lol bro, you have to wander eternity obsessed with something meaningless that can neither sate you nor end, get pranked

const oneBadImpulse = () => {
  let ele = createElementWithClass("div", "bad-impulse");
  
  ele.innerText = pickFrom(bad_impulses);
  bounceTime(ele, false);
  if (holeLevel < maxHoleLevel) {
    setTimeout(oneBadImpulse, 10000)
  }

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


const debugTime = (ele) => {
  console.log("JR NOTE: debug time")
  const container = document.querySelector("body");
  const offset = 25;
  if (container && ele) {
    console.log("JR NOTE: gonna set up a mouse move on", container, ele)
    container.onmousemove = (event) => {
      console.log(event);
      ele.style.top = `${event.offsetY + offset}px`;
      ele.style.left = `${event.offsetX + offset}px`;
    }
  }
}

//https://stackoverflow.com/questions/8897289/how-to-check-if-an-element-is-off-screen
const eleIsOffScreen = (el) => {
  const rect = el.getBoundingClientRect();
  return (
    (rect.x + rect.width) < 0
    || (rect.y + rect.height) < 0
    || (rect.x > window.innerWidth || rect.y > window.innerHeight)
  );
}

const eleIsOffScreenX = (el) => {
  const rect = el.getBoundingClientRect();
  return ((rect.x + rect.width) < 0 || (rect.x > window.innerWidth));
}

const eleIsOffScreenY = (el) => {
  const rect = el.getBoundingClientRect();
  return ( (rect.y + rect.height) < 0 || rect.y > window.innerHeight)
}

const bounceTime = (ele, debug) => {
  if (!bounce_container) {
    bounce_container = document.querySelector("#bounce-container");
  }
  const elWrap = createElementWithClassAndParent("div", bounce_container, `el-wrap impulse`);
  const el = createElementWithClassAndParent("div", elWrap, `el`);


  el.append(ele);
  if (debug) {
    debugTime(elWrap);
  } else {
    elWrap.style.left = `${getRandomNumberBetween(0, window.innerWidth-100)}px`;
    elWrap.style.top = `${getRandomNumberBetween(0, window.innerHeight-100)}px`;
  }

  let xDirection = pickFrom([1, -1]);
  let yDirection = pickFrom([1, -1]);
  let xSpeed = getRandomNumberBetween(10, 30)
  let ySpeed = getRandomNumberBetween(10, 30)

  //lol this is so un-functional. so many side effects. catharsis
  const resetVectorsX = () => {
    xDirection = xDirection * -1;
    yDirection = pickFrom([1, -1]);
    xSpeed = getRandomNumberBetween(10, 30)
    ySpeed = getRandomNumberBetween(10, 30)
  }

  const resetVectorsY = () => {
    xDirection = pickFrom([1, -1]);
    yDirection = yDirection * -1;
    xSpeed = getRandomNumberBetween(10, 30)
    ySpeed = getRandomNumberBetween(10, 30)
  }


  const bounce = () => {
    if (eleIsOffScreenX(elWrap)) {
      resetVectorsX();
    }
    //NOT else, can be off screen in a corner

    if (eleIsOffScreenY(elWrap)) {
      resetVectorsY();
    }
    elWrap.style.top = `${parseInt(elWrap.style.top) + 10 * yDirection}px`;
    elWrap.style.left = `${parseInt(elWrap.style.left) + 10 * xDirection}px`;
    setTimeout(() => { requestAnimationFrame(bounce) }, 300)


  }
  bounce();

}


//https://css-tricks.com/bounce-element-around-viewport-in-css/
//:( :( :( this doens't work with collision detection)))
const bounceTimeOld = (ele, debug) => {
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
  const xAnimations = debug ? [""] : ["x", "x-fast"];
  const yAnimations = debug ? [""] : ["y", "y-fast"];
  const elWrap = createElementWithClassAndParent("div", bounce_container, `el-wrap ${pickFrom(xAnimations)} impulse`);

  if (!debug) {
    elWrap.style.left = `${getRandomNumberBetween(0, 50)}vw`;
    elWrap.style.top = `${getRandomNumberBetween(0, 50)}vh`;
  }
  //elWrap.style.left = `50vw`; (hole location)
  //elWrap.style.top = `54vh`;
  const el = createElementWithClassAndParent("div", elWrap, `el ${pickFrom(yAnimations)}`);
  el.style.width = "50px";
  el.style.height = "50px";

  el.append(ele);
  if (debug) {
    debugTime(elWrap);
  }

}


