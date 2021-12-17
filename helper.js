export let deltaTime = null;
let lastTime = null;
let stop = false;

let update = null;

const updateFrame = (time) => {
    if(lastTime == null) {
        lastTime = time;        
    }

    deltaTime = time - lastTime;

    if(lastTime != time) {
        update();        
    }
    
    if(!stop) {
        lastTime = time;
        window.requestAnimationFrame(updateFrame);
    }    
}

export const startAnimation = (func)=> {
    lastTime = null;
    update = func;    
    stop = false;
    window.requestAnimationFrame(updateFrame);
}

export const stopAnimation = ()=> {
    lastTime = null;
    update = null;
    stop = true;
}

export const scrollHorizontal = (elem, dest, speed)=> {
    stopAnimation();
    if(elem.scrollLeft == dest) {
        return;
    }
    startAnimation(()=>{
        let scrollDist = elem.scrollLeft;
        if(dest > elem.scrollLeft) {
            scrollDist = Math.min(elem.scrollLeft + deltaTime * 0.1 * speed, dest);
            elem.scrollLeft = scrollDist;
            if(elem.scrollLeft >= dest) {
                stopAnimation();
            }
        } else {
            scrollDist = Math.max(elem.scrollLeft - deltaTime * 0.1 * speed, dest);
            elem.scrollLeft = scrollDist;
            if(elem.scrollLeft <= dest) {
                stopAnimation();
            }
        }       
    }); 
}

export const scrollVertical = (elem, dest, speed)=> {
    stopAnimation();
    if(elem.scrollTop == dest) {
        return;
    }
    startAnimation(()=>{
        let scrollDist = elem.scrollTop;
        if(dest > elem.scrollTop) {
            scrollDist = Math.min(elem.scrollTop + deltaTime * 0.1 * speed, dest);
            elem.scrollTop = scrollDist;
            if(elem.scrollTop >= dest) {
                stopAnimation();
            }
        } else {
            scrollDist = Math.max(elem.scrollTop - deltaTime * 0.1 * speed, dest);
            elem.scrollTop = scrollDist;
            if(elem.scrollTop <= dest) {
                stopAnimation();
            }
        }        
    }); 
}
