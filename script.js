let loginForm = document.querySelector('.loginFormContainer');
document.querySelector('#login-btn').onclick = () =>{
    loginForm.classList.toggle('active');
}
document.querySelector('#closeLoginBtn').onclick = () =>{
    loginForm.classList.remove('active');
}




const chapter = document.querySelector(".chapter"),
firstImg = chapter.querySelectorAll("img")[0],
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    
    let scrollWidth = chapter.scrollWidth - chapter.clientWidth; 
    arrowIcons[0].style.display = chapter.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = chapter.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the carousel scroll left else add to it
        chapter.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
    });
});

const autoSlide = () => {
    // if there is no image left to scroll then return from here
    if(chapter.scrollLeft - (chapter.scrollWidth - chapter.clientWidth) > -1 || chapter.scrollLeft <= 0) return;

    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    // getting difference value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;

    if(chapter.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
        return chapter.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // if user is scrolling to the left
    chapter.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    // updatating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = chapter.scrollLeft;
}

const dragging = (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    chapter.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    chapter.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    chapter.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}


chapter.addEventListener("mousedown", dragStart);
chapter.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
chapter.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
chapter.addEventListener("touchend", dragStop);

