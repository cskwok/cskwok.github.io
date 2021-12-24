gsap.registerPlugin(ScrollToPlugin);

const message = document.querySelector(".message");
const messageBtn = document.querySelector(".message>button");

const aboutContent = document.querySelector(".about>.content");

const homeBtn = document.querySelector(".homeBtn");
const aboutBtn = document.querySelector(".aboutBtn");
const skillsBtn = document.querySelector(".skillsBtn");
const contactBtn = document.querySelector(".contactBtn");

const navBar = document.querySelector(".nav-bar");
const menuBtn = document.querySelector(".menuBtn");

const wrapper = document.querySelector(".wrapper");
const wrapperItem = wrapper.querySelector("div");
const skillsContainer = document.querySelector(".skills-container");
const scrollLeftBtn = document.querySelector(".scroll-control.left");
const scrollRightBtn = document.querySelector(".scroll-control.right");
//animation

let homeTl = gsap.timeline();
homeTl.fromTo(".home-text", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: Power2.easeOut });
homeTl.fromTo(".home-img", { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: Power2.easeOut }, "<");
homeTl.fromTo(".home-img>img", { y: 0 }, { y: -20, duration: .8, yoyo: true, repeat: -1, ease: Power2.easeOut });
homeTl.fromTo(".message", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: .5, ease: Power2.easeOut }, "<");

const aboutObserver = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    let abourTl = gsap.timeline();
    abourTl.fromTo(".about>.content>h2", { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: .8, ease: Power2.easeOut });
    abourTl.fromTo(".about>.content>p", { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: .8, ease: Power2.easeOut }, "<");
    aboutObserver.unobserve(entries[0].target);
}, {
    threshold: 1
});

aboutObserver.observe(aboutContent.querySelector("p"));



messageBtn.addEventListener('click', (e)=>{
    gsap.fromTo(".message", { y: 0, opacity: 1 }, { y: 40, opacity: 0, duration: .8, ease: Power2.easeOut }).then(()=>{
        message.style.display = "none";
    });
        
   
});

//scrolling
homeBtn.addEventListener('click', (e) => {
    gsap.to(window, { duration: 1, scrollTo: { y: 0 }, ease: Power2.easeOut });
    navBar.setAttribute("data-expanded", false);
});

aboutBtn.addEventListener('click', (e) => {
    gsap.to(window, { duration: 1, scrollTo: ".about", ease: Power2.easeOut });
    navBar.setAttribute("data-expanded", false);
});

skillsBtn.addEventListener('click', (e) => {
    gsap.to(window, { duration: 1, scrollTo: ".skills", ease: Power2.easeOut });
    navBar.setAttribute("data-expanded", false);
});

contactBtn.addEventListener('click', (e) => {
    gsap.to(window, { duration: 1, scrollTo: ".contact", ease: Power2.easeOut });
    navBar.setAttribute("data-expanded", false);
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

scrollLeftBtn.addEventListener('click', ()=>{
    if(wrapper.scrollLeft === 0) {
        scrollRight(0.5, true);
    } else {
        scrollLeft();
    }
});
scrollRightBtn.addEventListener('click', ()=>{  
    if(wrapper.scrollLeft >= (wrapper.scrollWidth - wrapper.clientWidth - wrapperItem.offsetWidth)){
        scrollLeft(0.5, true);
    } else {
        scrollRight();
    }     
});