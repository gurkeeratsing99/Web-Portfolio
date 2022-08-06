// AOS initialize
AOS.init();
AOS.init({
  offset: 120, // offset (in px) from the original trigger point
  delay: 70, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease-in-sine', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: true, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});

// var changeH = $('.nav-item .active').html();
//
// $("#headChnage").replaceWith(changeH);
