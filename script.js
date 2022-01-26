gsap.registerPlugin(ScrollToPlugin);

const home = document.querySelector(".home");
const about = document.querySelector(".about");
const skills = document.querySelector(".skills");
const projects = document.querySelector(".projects");
const contact = document.querySelector(".contact");

const message = document.querySelector(".message");
const messageBtn = document.querySelector(".message>button");

const aboutContent = document.querySelector(".about>.content");

const homeBtn = document.querySelector(".homeBtn");
const aboutBtn = document.querySelector(".aboutBtn");
const skillsBtn = document.querySelector(".skillsBtn");
const projectsBtn = document.querySelector(".projectsBtn");
const contactBtn = document.querySelector(".contactBtn");

const navBar = document.querySelector(".nav-bar");
const menuBtn = document.querySelector(".menuBtn");

const wrapper = document.querySelector(".wrapper");
const wrapperItem = wrapper.querySelector("div");
const skillsContainer = document.querySelector(".skills-container");
const scrollLeftBtn = document.querySelector(".scroll-control.left");
const scrollRightBtn = document.querySelector(".scroll-control.right");
//animation

const getElementPos = (elem) => {
    return elem.offsetTop - home.offsetTop;    
}

let homeTl = gsap.timeline();
homeTl.fromTo(".home-text", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: Power2.easeOut });
homeTl.fromTo(".home-img", { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: Power2.easeOut }, "<");
homeTl.fromTo(".home-img>img", { y: 0 }, { y: -20, duration: .8, yoyo: true, repeat: -1, ease: Power2.easeOut });
homeTl.fromTo(".shadow", { scale: 1 , opacity: 1}, { scale: 0.8, opacity: 0.8, duration: .8, yoyo: true, repeat: -1, ease: Power2.easeOut }, "<");
homeTl.fromTo(".message", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: .5, ease: Power2.easeOut }, "<");

const aboutObserver = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    let abourTl = gsap.timeline();
    abourTl.fromTo(".about-text", { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: .8, ease: Power2.easeOut });
    
    aboutObserver.unobserve(entries[0].target);
}, {
    threshold: 1
});

aboutObserver.observe(aboutContent.querySelector(".about-text"));



messageBtn.addEventListener('click', (e)=>{
    gsap.fromTo(".message", { y: 0, opacity: 1 }, { y: 40, opacity: 0, duration: .8, ease: Power2.easeOut }).then(()=>{
        message.style.display = "none";
    });   
});

menuBtn.addEventListener('click', (e)=>{
    if(menuBtn.getAttribute("data-expanded") === "true") {
        menuBtn.setAttribute("data-expanded", false);
    } else {
        menuBtn.setAttribute("data-expanded", true);
    }
});

//scrolling
homeBtn.addEventListener('click', (e) => {
    gsap.to(window, { duration: 1, scrollTo: { y: 0 }, ease: Power2.easeOut });
    menuBtn.setAttribute("data-expanded", false);
});

aboutBtn.addEventListener('click', (e) => {
    gsap.to(window, { duration: 1, scrollTo: getElementPos(about), ease: Power2.easeOut });
    menuBtn.setAttribute("data-expanded", false);
});

skillsBtn.addEventListener('click', (e) => {
    gsap.to(window, { duration: 1, scrollTo: getElementPos(skills), ease: Power2.easeOut });
    menuBtn.setAttribute("data-expanded", false);
});

projectsBtn.addEventListener('click', (e) => {
    gsap.to(window, { duration: 1, scrollTo: getElementPos(projects), ease: Power2.easeOut });
    menuBtn.setAttribute("data-expanded", false);
});

contactBtn.addEventListener('click', (e) => {
    gsap.to(window, { duration: 1, scrollTo: getElementPos(contact), ease: Power2.easeOut });
    menuBtn.setAttribute("data-expanded", false);
});

const scrollLeft = (duration = 1, toStart = false)=>{   
    let itemWidth = wrapperItem.offsetWidth;
    let scrollDist = wrapper.scrollLeft - itemWidth * 2;
    if(scrollDist - itemWidth * 2 <= 0 || toStart) {
        scrollDist = 0;
    } 
    gsap.to(wrapper, { duration: duration, scrollTo: {x: scrollDist}, ease: Power2.easeOut });
};

const scrollRight = (duration = 1, toEnd = false)=>{
    let itemWidth = wrapperItem.offsetWidth;
    let scrollDist = wrapper.scrollLeft + itemWidth * 2;
    if(scrollDist + itemWidth * 2 >= wrapper.scrollWidth - wrapper.clientWidth || toEnd) {
        scrollDist = wrapper.scrollWidth - wrapper.clientWidth;
    }
    gsap.to(wrapper, { duration: duration, scrollTo: {x: scrollDist}, ease: Power2.easeOut });
};

scrollLeftBtn.addEventListener('click', (e)=>{
    if(wrapper.scrollLeft === 0) {
        scrollRight(0.5, true);
    } else {
        scrollLeft();
    }
    e.target.blur();
});
scrollRightBtn.addEventListener('click', (e)=>{  
    if(wrapper.scrollLeft >= (wrapper.scrollWidth - wrapper.clientWidth - wrapperItem.offsetWidth)){
        scrollLeft(0.5, true);
    } else {
        scrollRight();
    }     
});

let resizeTimer;

window.addEventListener("resize", () => {
  document.body.classList.add("cancel-resize-transition");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("cancel-resize-transition");
  }, 400);
});