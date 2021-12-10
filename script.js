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


const getElementPos = (elem) => {
    return elem.offsetTop - home.offsetTop;    
}

const scrollToElem = (elem) => {
    scrollTo({
        top: getElementPos(elem),
        behavior: 'smooth'
    });
}

homeBtn.addEventListener('click',(e)=>{
    scrollToElem(home);
    //console.log(getElementPos(home));
});

aboutBtn.addEventListener('click',(e)=>{
    scrollToElem(about);
    //console.log(getElementPos(about));
});

skillsBtn.addEventListener('click',(e)=>{
    scrollToElem(skills);
    //console.log(getElementPos(skills));
});

contactBtn.addEventListener('click',(e)=>{
    scrollToElem(contact);
    //console.log(getElementPos(contact));
});

menuBtn.addEventListener('click', (e)=>{
    if(navBar.getAttribute("data-expanded") === "true") {
        navBar.setAttribute("data-expanded", false);
    } else {
        navBar.setAttribute("data-expanded", true);
    }
});