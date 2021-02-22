const carouselItems = document.querySelector('.carousel__inner');
const slides = carouselItems.querySelectorAll('.carousel__item');
let	slidesLength = slides.length;
let	firstSlide = slides[0];
let	lastSlide = slides[slidesLength - 1];
let	slideSize = firstSlide.getBoundingClientRect().width;
let	allowShift = true;
let	index = 0;
//posX1 место куда кликнули/опустили палец
let posX1 = 0;
//posX2 место где отпустили палец
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
	// console.log('Запуск функции dragStart')
	e.preventDefault();
	posInitial = slideCoord();

	// console.log('Функция dragStart, posInitial: ' + posInitial)

	if (e.type === 'touchstart') {
		posX1 = e.touches[0].clientX;
		// console.log('Функция dragStart, if posX1: ' + posX1)
	} else {
		//posX1 получаем координаты клика
		posX1 = e.clientX;
		// console.log('Функция dragStart, else posX1: ' + posX1)
		document.onmouseup = dragEnd;
		document.onmousemove = dragAction;
	}
}

function dragAction (e) {
	// console.log('Запуск функции dragAction')
	if (e.type === 'touchmove') {
		// console.log('Функция dragAction, попали во первый if');
		posX2 = posX1 - e.touches[0].clientX;

		// console.log('Функция dragAction, posX2: ' + posX2)

		posX1 = e.touches[0].clientX;

		// console.log('Функция dragAction, posX1: ' + posX1)

	} else {
		// console.log('Функция dragAction, попали в первый else');
		// console.log('Функция dragAction, posX1: ' + posX1)
		// console.log('Функция dragAction, e.clientX: ' + e.clientX)

		posX2 = posX1 - e.clientX;

		// console.log('Функция dragAction, вычислили posX2: ' + posX2)


		posX1 = e.clientX;

		// console.log('Функция dragAction, переписали posX1: ' + posX1)
	}
	// console.log('Функция dragAction, carouselItems.offsetLeft: ' + carouselItems.offsetLeft)
	// console.log('Функция dragAction, posX2: ' + posX2)


	carouselItems.style.left = (slideCoord() - posX2) + "px";
	// carouselItems.style.left = (carouselItems.offsetLeft - posX2 - slideSize) + "px";


	// console.log('Функция dragAction, вычисляем carouselItems.offsetLeft - posX2: ' + carouselItems.style.left)

}


function dragEnd () {
	let	threshold = 100;

	// console.log('Запуск функции dragEnd')
	posFinal = slideCoord();
	// posInitial = CI.left
	// posFinal = carouselItems.getBoundingClientRect().left
	// console.log('Функция dragEnd, posFinal: ' + posFinal)
	if (posFinal - posInitial < -threshold) {
		// console.log('Функция dragEnd, попали в первый if');
		// console.log('posFinal - posInitial = ' + (posFinal - posInitial))
		// console.log('-threshold = ' + (-threshold))
		shiftSlide(1, 'drag');
	} else if (posFinal - posInitial > threshold) {
		// console.log('Функция dragEnd, попали во второй if');
		// console.log('posFinal - posInitial = ' + (posFinal - posInitial))
		// console.log('-threshold = ' + (-threshold))
		shiftSlide(-1, 'drag');
	} else {
		// console.log('Функция dragEnd, попали в else');
		// console.log('posInitial = ' + posInitial)

		carouselItems.style.left = (posInitial) + "px";
		// carouselItems.style.left = (posInitial - slideSize) + "px";

		// console.log('carouselItems.style.left = ' + carouselItems.style.left)

	}

	document.onmouseup = null;
	document.onmousemove = null;
}


function shiftSlide(dir, action) {
	// console.log('Запуск функции shiftSlide')
	carouselItems.classList.add('shifting');

	if (allowShift) {
		// console.log('Функция shiftSlide, попали в if (allowShift)');

		if (!action) {
			// console.log('Функция shiftSlide, попали в if (!action)');
			posInitial = slideCoord();
			// console.log('Функция shiftSlide, posInitial ' + posInitial);
		}

		if (dir === 1) {
			// console.log('Функция shiftSlide, попали в if (dir === 1)');
			carouselItems.style.left = (posInitial - slideSize) + "px";
			// console.log('Функция shiftSlide, posInitial ' + posInitial);
			index++;
			// console.log('Функция shiftSlide, index ' + index);
		} else if (dir === -1) {
			// console.log('Функция shiftSlide, попали в else if (dir === -1)');
			carouselItems.style.left = (posInitial + slideSize) + "px";
			// console.log('Функция shiftSlide, posInitial ' + posInitial);
			index--;
			// console.log('Функция shiftSlide, index ' + index);
		}
	}

	allowShift = false;
}

function checkIndex (){
	// console.log('Запуск функции checkIndex')
	carouselItems.classList.remove('shifting');

	if (index === -1) {
		// console.log('Попали в первый if')
		carouselItems.style.left = -(slidesLength * slideSize) + "px";
		index = slidesLength - 1;
	}

	if (index === slidesLength) {
		// console.log('Попали во второй if')
		carouselItems.style.left = -(1 * slideSize) + "px";
		index = 0;
	}

	// console.log('Index = ' + index)

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

	// Clone first and last slide
	items.appendChild(cloneFirst);
	items.insertBefore(cloneLast, firstSlide);
	carousel.classList.add('loaded');

	// Mouse events
	items.onmousedown = dragStart;

	// Touch events
	items.addEventListener('touchstart', dragStart);
	items.addEventListener('touchend', dragEnd);
	items.addEventListener('touchmove', dragAction);

	// Click events
	prevBtn.addEventListener('click', function () {
		shiftSlide(-1)
	});
	nextBtn.addEventListener('click', function () {
		shiftSlide(1)
	});

	// Transition events
	items.addEventListener('transitionend', checkIndex);

	checkIndex()
	putActiveDot()
}

window.onload = slide(carouselItems);