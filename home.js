header = document.querySelector("header")
window.addEventListener("scroll", function() {
    x = window.pageYOffset;
    if (x > 1) {
        header.classList.add("sticky")
    } else {
        header.classList.remove("sticky")
    }
})


/**--------------------------------------------------------------------- */
const imgPosition = document.querySelectorAll(".aspect-ratio-169 img")
const imgContainer = document.querySelector(".aspect-ratio-169")
const dotItem = document.querySelectorAll(".dot")
let imgNumber = imgPosition.length
let index = 0;
// console.log(imgPosition);


function slider(index) {
    imgContainer.style.left = "-" + index * 100 + "%"
    const dotActive = document.querySelector(".active")
    dotActive.classList.remove("active")
    dotItem[index].classList.add("active")
}

function imgSlide() {
    index++;
    if (index >= imgNumber) {
        index = 0;
    }
    slider(index);
}

imgPosition.forEach(function(image, index) {
    image.style.left = index * 100 + "%" //Sắp hình theo chiều ngang
    dotItem[index].addEventListener("click", function() {
        slider(index)
    })
})
setInterval(imgSlide, 5000)