const carouselItems = document.querySelector('.carousel__inner');
const slides = carouselItems.querySelectorAll('.carousel__item');
let	slidesLength = slides.length;
let	firstSlide = slides[0];
let	lastSlide = slides[slidesLength - 1];
let	slideSize = firstSlide.getBoundingClientRect().width;
let	allowShift = true;
let	index = 0;
let posX1 = 0;
let	posX2 = 0;
let	posInitial;
let	posFinal;
const dots = document.querySelectorAll('.dot__item');

let slideCoord = () => carouselItems.offsetLeft;

let dotActiveRemove = () => {
	dots.forEach((item) => {
		if (item.classList.contains('dot__item--active')) {
			item.classList.remove('dot__item--active')
		}
	})
}



function dragStart (e) {
	e.preventDefault();
	posInitial = slideCoord();

	if (e.type === 'touchstart') {
		posX1 = e.touches[0].clientX;
	} else {
		posX1 = e.clientX;
		document.onmouseup = dragEnd;
		document.onmousemove = dragAction;
	}
}

function dragAction (e) {
	if (e.type === 'touchmove') {
		posX2 = posX1 - e.touches[0].clientX;
		posX1 = e.touches[0].clientX;
	} else {
		posX2 = posX1 - e.clientX;
		posX1 = e.clientX;
	}
	carouselItems.style.left = (slideCoord() - posX2) + "px";
}


function dragEnd () {
	let	threshold = 100;
	
	posFinal = slideCoord();

	if (posFinal - posInitial < -threshold) {
		shiftSlide(1, 'drag');
	} else if (posFinal - posInitial > threshold) {
		shiftSlide(-1, 'drag');
	} else {
		carouselItems.style.left = (posInitial) + "px";
	}

	document.onmouseup = null;
	document.onmousemove = null;
}


function shiftSlide(dir, action) {
	carouselItems.classList.add('shifting');

	if (allowShift) {
		if (!action) {
			posInitial = slideCoord();
		}

		if (dir === 1) {
			carouselItems.style.left = (posInitial - slideSize) + "px";
			index++;
		} else if (dir === -1) {
			carouselItems.style.left = (posInitial + slideSize) + "px";
			index--;
		}
	}

	allowShift = false;
}

function checkIndex (){
	carouselItems.classList.remove('shifting');

	if (index === -1) {
		carouselItems.style.left = -(slidesLength * slideSize) + "px";
		index = slidesLength - 1;
	}

	if (index === slidesLength) {
		carouselItems.style.left = -(1 * slideSize) + "px";
		index = 0;
	}

	allowShift = true;

	getActiveDot()
}

function getActiveDot() {
	let activeIndex = index;

	dotActiveRemove()

	dots[activeIndex].classList.add('dot__item--active')
}

function putActiveDot() {

	document.querySelector('.dots__inner').addEventListener('click', (e) => {
		if (e.target.tagName === 'BUTTON') {

			dotActiveRemove()

			e.target.closest('li').classList.add('dot__item--active');
		} else if (e.target.tagName === 'LI') {

			dotActiveRemove()

			e.target.classList.add('dot__item--active')
		}

		dots.forEach((item, itemIndex) => {
			if (item.classList.contains('dot__item--active')) {
				index = itemIndex
				carouselItems.style.left = ((-slideSize) - (slideSize * (itemIndex))) + "px";
			}
		})
	})
}


function slide(items) {

	const carousel = document.querySelector('.carousel');
	const prevBtn = document.querySelector('.prev');
	const nextBtn = document.querySelector('.next');
	let	cloneFirst = firstSlide.cloneNode(true);
	let	cloneLast = lastSlide.cloneNode(true);

	items.appendChild(cloneFirst);
	items.insertBefore(cloneLast, firstSlide);
	carousel.classList.add('loaded');

	items.onmousedown = dragStart;

	items.addEventListener('touchstart', dragStart);
	items.addEventListener('touchend', dragEnd);
	items.addEventListener('touchmove', dragAction);

	prevBtn.addEventListener('click', function () {
		shiftSlide(-1)
	});
	nextBtn.addEventListener('click', function () {
		shiftSlide(1)
	});

	items.addEventListener('transitionend', checkIndex);

	checkIndex()
	putActiveDot()
}

window.onload = slide(carouselItems);
