// https://stackoverflow.com/a/47321988
function scrollTo(element) {
  window.scroll({
    behavior: 'smooth',
    left: 0,
    top: element.offsetTop
  });
}

// const requestAnimationFrame =
//   window.requestAnimationFrame ||
//   window.webkitRequestAnimationFrame ||
//   window.mozRequestAnimationFrame ||
//   window.oRequestAnimationFrame ||
//   window.msRequestAnimationFrame;

// const EasingFunctions = {
//   // no easing, no acceleration
//   linear: function (t) { return t },
//   // accelerating from zero velocity
//   easeInQuad: function (t) { return t*t },
//   // decelerating to zero velocity
//   easeOutQuad: function (t) { return t*(2-t) },
//   // acceleration until halfway, then deceleration
//   easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
//   // accelerating from zero velocity
//   easeInCubic: function (t) { return t*t*t },
//   // decelerating to zero velocity
//   easeOutCubic: function (t) { return (--t)*t*t+1 },
//   // acceleration until halfway, then deceleration
//   easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
//   // accelerating from zero velocity
//   easeInQuart: function (t) { return t*t*t*t },
//   // decelerating to zero velocity
//   easeOutQuart: function (t) { return 1-(--t)*t*t*t },
//   // acceleration until halfway, then deceleration
//   easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
//   // accelerating from zero velocity
//   easeInQuint: function (t) { return t*t*t*t*t },
//   // decelerating to zero velocity
//   easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
//   // acceleration until halfway, then deceleration
//   easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t },

//   simpleEase: function(t) { return 0.5 * (1 - Math.cos(Math.PI * t)) }
// }

// https://stackoverflow.com/a/54971309
// function scrollTo(element, easeFunc = 'simpleEase') {
//   const to = element.offsetTop
//   const start = window.scrollY || window.pageYOffset;
//   const time = Date.now();
//   const duration = Math.abs(start - to) / 3;

//   (function step() {
//     var dx = Math.min(1, (Date.now() - time) / duration);
//     const func = EasingFunctions[easeFunc] || EasingFunctions['simpleEase'];
//     var pos = start + (to - start) * func(dx);

//     window.scrollTo(0, pos);

//     if (dx < 1) {
//       requestAnimationFrame(step);
//     }
//   })();
// }

export default scrollTo;
