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
    /*
    scrollTo({
        top: getElementPos(elem),
        behavior: 'smooth'
    });
    */    
    clearInterval(scroll);
    scrollOffset = document.documentElement.scrollTop || document.body.scrollTop;
    console.log(scrollOffset);
    let scrollDist = getElementPos(elem);
    console.log(scrollDist);
    let scrollUp = false;
    if(scrollDist <= scrollOffset) {
        scrollUp = true;
    }else{
        scrollUp = false;
    } 
    console.log(scrollUp);
    scroll = setInterval(()=>{
        console.log("test1");
        scrollUp ? (scrollOffset -= 30) : (scrollOffset += 30);
        
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
            
                console.log("test2" + wrapper.scrollLeft);
                clearInterval(scroll);
            }
        }else {
            if(scrollOffset >= scrollDist) {
            
                console.log("test2" + wrapper.scrollLeft);
                clearInterval(scroll);
            }      
        } 
        
    }, 10);
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

scrollLeftBtn.addEventListener('click', ()=>{
    clearInterval(scroll);
    scrollOffset = wrapper.scrollLeft;
    let wrapperWidth = wrapper.offsetWidth;
    let itemWidth = wrapperItem.offsetWidth;
    let scrollDist = wrapper.scrollLeft - itemWidth * 2;
    if(scrollDist - itemWidth * 2 <= 0) {
        scrollDist = 0;
    }    
    scroll = setInterval(()=>{
        console.log("test1");
        scrollOffset = scrollOffset -= 10;
        if(scrollOffset <= scrollDist) {
            
            scrollOffset = scrollDist;
        }
        wrapper.scrollTo({             
            left: scrollOffset
        });
        if(scrollOffset <= scrollDist) {
            console.log("test2" + wrapper.scrollLeft);
            clearInterval(scroll);
        }
    }, 10);
    /*
    wrapper.scrollTo({             
        left: scroll,
        behavior: 'smooth'
    });
    */
});

scrollRightBtn.addEventListener('click', ()=>{
    clearInterval(scroll);
    scrollOffset = wrapper.scrollLeft;
    let wrapperWidth = wrapper.offsetWidth;
    let itemWidth = wrapperItem.offsetWidth;
    let scrollDist = wrapper.scrollLeft + itemWidth * 2;
    if(scrollDist + itemWidth * 2 >= wrapper.scrollWidth - wrapper.clientWidth) {
        scrollDist = wrapper.scrollWidth - wrapper.clientWidth;
    }  
    scroll = setInterval(()=>{
        console.log("test1");
        scrollOffset = scrollOffset += 10;
        if(scrollOffset >= scrollDist) {
            
            scrollOffset = scrollDist;
        }
        wrapper.scrollTo({             
            left: scrollOffset
        });
        if(scrollOffset >= scrollDist) {
            console.log("test2" + wrapper.scrollLeft);
            clearInterval(scroll);
        }
    }, 10);
    /*
    wrapper.scrollTo({             
        left: scroll,
        behavior: 'smooth'
    });
    */
});

/*
wrapper.addEventListener('scroll', ()=>{
    //console.log(wrapper.scrollWidth - wrapper.clientWidth);
    console.log(wrapper.scrollLeft);    
});
*/
/*
const scrollContX = (isLeft, des)=>{
    clearInterval(scroll);
    scrollOffset = wrapper.scrollLeft;
    scroll = setInterval(()=>{
        console.log("test1");
        scrollOffset = isLeft ? (scrollOffset -= 10) : (scrollOffset += 10);
        if((isLeft && scrollOffset < 1) || (!isLeft && scrollOffset >= des)) {
            console.log("test2" + wrapper.scrollLeft);
            scrollOffset = isLeft ? 0 : des;
        }
        wrapper.scrollTo({             
            left: isLeft ? (scrollOffset -= 10) : (scrollOffset += 10),
            behavior: 'smooth'
        });
        if(scrollOffset < 1 || scrollOffset >= des) {
            console.log("test2" + wrapper.scrollLeft);
            clearInterval(scroll);
        }
    }, 100); 
};
/*
const scrollX = (isLeft)=>{
    let wrapperWidth = wrapper.offsetWidth;
    console.log("test");

};

scrollLeftBtn.addEventListener('click', ()=>{
    console.log("test0");
    scrollLeftBtn.setAttribute("data-click", true);
    scrollX(true);      
    scrollLeftBtn.setAttribute("data-click", false);  
});

scrollLeftBtn.addEventListener('mouseover', ()=>{
    if(scrollLeftBtn.getAttribute("data-click") === "false") {
        console.log("test0");   
        scrollContX(true); 
    }
           
});

scrollLeftBtn.addEventListener('mouseout', ()=>{
    console.log("test2");   
    clearInterval(scroll);       
});



scrollRightBtn.addEventListener('mouseover', ()=>{    
    console.log("test0");   
    scrollContX(false);  
});

scrollRightBtn.addEventListener('mouseout', ()=>{
    console.log("test2");   
    clearInterval(scroll);       
});
*/