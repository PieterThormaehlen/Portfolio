import '../scss/styles.scss'
import 'web-animations-js'

const nav = document.querySelector('nav')
const content = document.querySelectorAll('main > *:not(#Einleitung)')
const einleitung = document.querySelector('#Einleitung')
const einleitungRows = einleitung.querySelectorAll('span')
// const einleitungHighlights = einleitung.querySelectorAll('strong')

window.addEventListener('DOMContentLoaded', () => {
	if (window.location.hash) {
		element = document.querySelector(`${window.decodeURI(window.location.hash)}`)
		element.scrollIntoView({ behavior: 'smooth', block: 'start' })
		return
	}
	if (scrollY > window.innerHeight * 0.2) return
	window.scrollTo({ top: 1, left: 0, behavior: 'smooth' })
	einleitungRows.forEach((row, index) => {
		const delay = [250, 1000, 2250]
		row.style.opacity = 0
		row.animate([{ opacity: 0 }, { opacity: 1 }], { delay: delay[index], duration: 500, easing: 'ease-out', fill: 'forwards' })
	})
	// einleitungHighlights.forEach((element) => {
	// 	element.style.color = '#2d64b6'
	// 	element.animate([{ color: '#1f69d8' }], { delay: 2500, duration: 500, easing: 'ease-in-out', fill: 'forwards' })
	// })
	const mediaQuery = matchMedia('(min-width: 40rem)')
	const animationOptions = { delay: 3750, duration: 1500, easing: 'ease-in-out', fill: 'forwards' }
	content.forEach((element) => {
		element.style.transform = 'translateY(40vh)'
		element.animate([{ transform: 'translateY(40vh)' }, { transform: 'translateY(0)' }], animationOptions)
	})
	einleitung.style.transform = 'translateY(10vh)'
	einleitung.animate([{ transform: 'translateY(10vh)' }, { transform: 'translateY(0)' }], animationOptions)
	try {
		mediaQuery.addEventListener('change', () => {
			if (mediaQuery.matches) {
				nav.style.top = 'calc(60vh + 4rem)'
				nav.style.position = 'absolute'
				nav.style.transform = 'translateY(40vh)'
			} else {
				nav.style.top = ''
				nav.style.position = ''
				nav.style.transform = ''
			}
		})
		mediaQuery.dispatchEvent(new Event('change'))
		if (mediaQuery.matches) nav.animate([{ transform: 'translateY(40vh)' }, { transform: 'translateY(0)' }], animationOptions)
		const observerOptions = { rootMargin: '-25% 0px 0px 0px', threshold: 1.0 }
		const observer = new IntersectionObserver((entries, observer) => {
			if (!entries[0].isIntersecting && entries[0].boundingClientRect.top < window.innerHeight / 4) {
				nav.style.top = ''
				nav.style.position = ''
			}
		}, observerOptions)
		observer.observe(nav)
	} catch {
		nav.style.opacity = 0
		nav.animate([{ opacity: 0 }, { opacity: 1 }], animationOptions)
	}
})
