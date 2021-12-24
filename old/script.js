import { startAnimation, stopAnimation, deltaTime, scrollHorizontal, scrollVertical } from "./helper.js";

const home = document.querySelector(".home");
const about = document.querySelector(".about");
const skills = document.querySelector(".skills");
const contact = document.querySelector(".contact");

const homeBtn = document.querySelector(".homeBtn");
const aboutBtn = document.querySelector(".aboutBtn");
const skillsBtn = document.querySelector(".skillsBtn");
const contactBtn = document.querySelector(".contactBtn");

const navBar = document.querySelector(".nav-bar");
const menuBtn = document.querySelector(".menuBtn");

const wrapper = document.querySelector(".wrapper");
const wrapperItem = wrapper.querySelector("div");
const scrollContainer = document.querySelector(".scroll-container");
const scrollLeftBtn = scrollContainer.querySelector(".left");
const scrollRightBtn = scrollContainer.querySelector(".right");

let scroll = null;
let scrollOffset = 0;

const getElementPos = (elem) => {
    return elem.offsetTop - home.offsetTop;    
}

const scrollToElem = (elem) => {    
    scrollOffset = document.documentElement.scrollTop || document.body.scrollTop;
    let scrollDist = getElementPos(elem);
    let speed = 20;
    if(Math.abs(scrollDist-scrollOffset) >= home.offsetHeight) {
        speed = 30;
    }
    if(Math.abs(scrollDist-scrollOffset) >= home.offsetHeight * 2) {
        speed = 40;
    } 
    if (document.body.scrollTop) {
        scrollVertical(document.body, scrollDist, speed);
    } else {
        scrollVertical( document.documentElement, scrollDist, speed);
    }
    
}

homeBtn.addEventListener('click',(e)=>{
    scrollToElem(home); 
    navBar.setAttribute("data-expanded", false); 
});

aboutBtn.addEventListener('click',(e)=>{
    scrollToElem(about);   
    navBar.setAttribute("data-expanded", false); 
});

skillsBtn.addEventListener('click',(e)=>{
    scrollToElem(skills); 
    navBar.setAttribute("data-expanded", false); 
});

contactBtn.addEventListener('click',(e)=>{
    scrollToElem(contact); 
    navBar.setAttribute("data-expanded", false);  
});

menuBtn.addEventListener('click', (e)=>{
    if(navBar.getAttribute("data-expanded") === "true") {
        navBar.setAttribute("data-expanded", false);
    } else {
        navBar.setAttribute("data-expanded", true);
    }
});

const scrollLeft = (speed = 4.5, toStart = false)=>{
    scrollOffset = wrapper.scrollLeft; 
    let itemWidth = wrapperItem.offsetWidth;
    let scrollDist = wrapper.scrollLeft - itemWidth * 2;
    if(scrollDist - itemWidth * 2 <= 0 || toStart) {
        scrollDist = 0;
    }     
    scrollHorizontal(wrapper, scrollDist, speed);
};

const scrollRight = (speed = 4.5, toEnd = false)=>{    
    scrollOffset = wrapper.scrollLeft;
    let itemWidth = wrapperItem.offsetWidth;
    let scrollDist = wrapper.scrollLeft + itemWidth * 2;
    if(scrollDist + itemWidth * 2 >= wrapper.scrollWidth - wrapper.clientWidth || toEnd) {
        scrollDist = wrapper.scrollWidth - wrapper.clientWidth;
    } 
    scrollHorizontal(wrapper, scrollDist, speed);
};

scrollLeftBtn.addEventListener('click', ()=>{
    if(wrapper.scrollLeft === 0) {
        scrollRight(20, true);
    } else {
        scrollLeft(9);
    }
});
scrollRightBtn.addEventListener('click', ()=>{  
    if(wrapper.scrollLeft >= (wrapper.scrollWidth - wrapper.clientWidth - wrapperItem.offsetWidth)){
        scrollLeft(20, true);
    } else {
        scrollRight(9);
    }     
});