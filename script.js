'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector("#section--1")

const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector(".operations__tab-container")
const tabsContent = document.querySelectorAll('.operations__content')

const nav = document.querySelector('.nav') 


const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});



btnScrollTo.addEventListener('click', function(e){

  const s1coords = section1.getBoundingClientRect()
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset, 
  //   top: section1.top + window.pageYOffset,
  //   behavior: 'smooth'
  // })

  section1.scrollIntoView({behavior:'smooth'})

})

//page navigation 
// document.querySelectorAll('.nav__link').forEach( el => el.addEventListener('click', function(e){
//   e.preventDefault()
//   const id = this.getAttribute('href')
//   document.querySelector(id).scrollIntoView({behavior:'smooth'})
// }))  // primitive way, not efficient while dealing with large quantity 

document.querySelector('.nav__links').addEventListener('click', function(e){
  e.preventDefault()
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({behavior:'smooth'})
  }
})
// const h1 = document.querySelector('h1')
// h1.closest('.header').style.background = 'var(--gradient-secondary)'
// accessing to parent element

//Tabbed component 



tabsContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab')
 console.log(clicked);
  // Guard clause 
  if(!clicked) return

  tabs.forEach( t => t.classList.remove('operations__tab--active'))
  tabsContent.forEach( c => c.classList.remove('operations__content--active'))
  clicked.classList.add('operations__tab--active')

  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})



// manu fade animation
const handleHover = function(e, opacity){
  if(e.target.classList.contains('nav__link')){
    const link = e.target 
 
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')
  
    const logo = link.closest('.nav').querySelector('img')
  
    siblings.forEach(el => {if(el !== link) el.style.opacity = opacity})
    logo.style.opacity = opacity
  }
}

nav.addEventListener('mouseover', function(e){
  handleHover(e, 0.5)
})
nav.addEventListener('mouseout', function(e){
  handleHover(e, 1)
})


// sticky navigation
const header = document.querySelector('.header')
const navHeight = nav.getBoundingClientRect().height
const observer = new IntersectionObserver( entries =>{
  const [entry] = entries
  if(!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
  // if(!entry.isIntersecting) nav.classList.add('sticky')
}, {
  root: null,
  threshold: 0,
  rootMargin: `${-navHeight}px`
})
observer.observe(header)

// reveal Sections
const allSections = document.querySelectorAll('.section')
const sectionObserver = new IntersectionObserver( entries => {
    entries.forEach( entry =>{
      if(!entry.isIntersecting) return
       entry.target.classList.remove('section--hidden')
       observer.unobserve(entry.target)
    })
}, {
  root: null,
  threshold: 0.15,
})

allSections.forEach( section => {
  sectionObserver.observe(section)
  section.classList.add('section--hidden')
})

//Lazy loading images 
const imgTarged = document.querySelectorAll('img[data-src]')
const imgObserver = new IntersectionObserver( entries => {
  const [entry] = entries
  entry.target.src = entry.target.dataset.src
  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img')
  })
  observer.unobserve(entry.target)  
}, {
  root: null,
  threshold: 0,
  rootMargin: '-200px'
})


imgTarged.forEach(img =>{
  imgObserver.observe(img)
})


// Slider 

const slides = document.querySelectorAll('.slide')
const slider = document.querySelector('.slider')

const btnRight = document.querySelector('.slider__btn--right')
const btnLeft = document.querySelector('.slider__btn--left')

let curSlide = 0;
const maxSlide = slides.length
slides.forEach((s, i) => s.style.transform = `translateX(${100*i}%)`)

const goToSlide=  function(slide){
  slides.forEach((s, i) => s.style.transform = `translateX(${100*(i-slide)}%)`)
}
goToSlide(0)

const nextSlide = function (){
  if(curSlide === maxSlide-1){
    curSlide = 0
  }else{
    curSlide++
  }
  goToSlide(curSlide)
}

const prevSlide = function (){
  if(curSlide === 0){
    curSlide = maxSlide-1
  }else{
    curSlide--
  }
  goToSlide(curSlide)
}


// slide dots
const createDots = function (){
  slides.forEach((_,i)=>{
    
  })
}

btnRight.addEventListener('click', nextSlide)
btnLeft.addEventListener('click', prevSlide)

document.addEventListener('keydown', function (e) {
 
  if(e.key === 'ArrowRight') nextSlide()
  if(e.key === 'ArrowLeft') prevSlide() 
})