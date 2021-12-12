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
    clearInterval(scroll);
    scrollOffset = document.documentElement.scrollTop || document.body.scrollTop;
    let scrollDist = getElementPos(elem);   
    let scrollUp = false;
    let speed = 30;
    if(Math.abs(scrollDist-scrollOffset) >= home.offsetHeight) {
        speed = 50;
    }
    if(Math.abs(scrollDist-scrollOffset) >= home.offsetHeight * 2) {
        speed = 100;
    }
    if(scrollDist <= scrollOffset) {
        scrollUp = true;
    }else{
        scrollUp = false;
    }
    scroll = setInterval(()=>{   
        scrollUp ? (scrollOffset -= speed) : (scrollOffset += speed);
        
        if(scrollUp) {
            if(scrollOffset <= scrollDist) {
            
                scrollOffset = scrollDist;
            }
        }else {
            if(scrollOffset >= scrollDist) {
            
                scrollOffset = scrollDist;
            }
        }
        
        scrollTo({             
            top: scrollOffset
        });
        
        if(scrollUp) {
            if(scrollOffset <= scrollDist) { 
                clearInterval(scroll);
            }
        }else {
            if(scrollOffset >= scrollDist) {
                clearInterval(scroll);
            }      
        } 
        
    }, 10);
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

const scrollLeft = (speed = 20, toStart = false)=>{
    clearInterval(scroll);
    scrollOffset = wrapper.scrollLeft;
    let wrapperWidth = wrapper.offsetWidth;
    let itemWidth = wrapperItem.offsetWidth;
    let scrollDist = wrapper.scrollLeft - itemWidth * 2;
    if(scrollDist - itemWidth * 2 <= 0 || toStart) {
        scrollDist = 0;
    }    
    scroll = setInterval(()=>{     
        scrollOffset = scrollOffset -= speed;
        if(scrollOffset <= scrollDist) {
            
            scrollOffset = scrollDist;
        }
        wrapper.scrollTo({             
            left: scrollOffset
        });
        if(scrollOffset <= scrollDist) {          
            clearInterval(scroll);
        }
    }, 10);  
};

const scrollRight = (speed = 20, toEnd = false)=>{
    clearInterval(scroll);
    scrollOffset = wrapper.scrollLeft;
    let wrapperWidth = wrapper.offsetWidth;
    let itemWidth = wrapperItem.offsetWidth;
    let scrollDist = wrapper.scrollLeft + itemWidth * 2;
    if(scrollDist + itemWidth * 2 >= wrapper.scrollWidth - wrapper.clientWidth || toEnd) {
        scrollDist = wrapper.scrollWidth - wrapper.clientWidth;
    }  
    scroll = setInterval(()=>{      
        scrollOffset = scrollOffset += speed;
        if(scrollOffset >= scrollDist) {
            
            scrollOffset = scrollDist;
        }
        wrapper.scrollTo({             
            left: scrollOffset
        });
        if(scrollOffset >= scrollDist) {         
            clearInterval(scroll);
        }
    }, 10);
};

scrollLeftBtn.addEventListener('click', ()=>{
    if(wrapper.scrollLeft === 0) {
        scrollRight(60, true);
    } else {
        scrollLeft();
    }    
});

scrollRightBtn.addEventListener('click', ()=>{  
    if(wrapper.scrollLeft >= (wrapper.scrollWidth - wrapper.clientWidth - wrapperItem.offsetWidth)){
        scrollLeft(60, true);
    } else {
        scrollRight();
    }    
});
