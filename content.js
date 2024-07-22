let currentIndex = 0
let epicGroups = []
let autoMode = false
let autoInterval

// Function to highlight elements with the same data-epic value
function highlightEpicElements() {
	const elements = document.querySelectorAll('[data-epic]')
	const groupedElements = {}

	elements.forEach((el) => {
		const epicValue = el.getAttribute('data-epic')
		if (!groupedElements[epicValue]) {
			groupedElements[epicValue] = []
		}
		groupedElements[epicValue].push(el)
	})

	epicGroups = Object.values(groupedElements).sort(
		(a, b) => a[0].getAttribute('data-epic') - b[0].getAttribute('data-epic')
	)
}

function highlightCurrentGroup() {
	epicGroups.forEach((group, index) => {
		group.forEach((el) => {
			if (index === currentIndex) {
				el.classList.add('epic-highlight')

				const beforeElement = el.querySelector('::before')
				// Dynamically set and adjust border radius
				const borderRadius = parseInt(window.getComputedStyle(el).borderRadius.replace('px', ''))
				const newBorderRadius = borderRadius + 2 === 2 ? 0 : borderRadius + 2
				el.style.setProperty('--highlight-border-radius', `${newBorderRadius}px`)

				// Create SVG element
				createSvgAnimation(el)
			} else {
				el.classList.remove('epic-highlight')
				const svg = el.querySelector('svg')
				if (svg) {
					el.removeChild(svg)
				}
			}
		})
	})
}

function nextHighlight() {
	currentIndex = (currentIndex + 1) % epicGroups.length
	highlightCurrentGroup()
}

function prevHighlight() {
	currentIndex = (currentIndex - 1 + epicGroups.length) % epicGroups.length
	highlightCurrentGroup()
}

function toggleAutoMode() {
	autoMode = !autoMode
	if (autoMode) {
		autoInterval = setInterval(nextHighlight, 3000)
	} else {
		clearInterval(autoInterval)
	}
}

document.addEventListener('keydown', (event) => {
	if (event.key === 'N' || event.key === 'n') {
		nextHighlight()
	} else if (event.key === 'P' || event.key === 'p') {
		prevHighlight()
	}
})

chrome.runtime.onMessage.addListener((message) => {
	if (message.action === 'next') {
		nextHighlight()
	} else if (message.action === 'prev') {
		prevHighlight()
	} else if (message.action === 'toggleAuto') {
		toggleAutoMode()
	}
})

function createSvgAnimation(element) {
	const rect = element.getBoundingClientRect()
	const style = window.getComputedStyle(element)

	// Parse border-radius values
	const borderRadii = style.borderRadius.split(' ').map((r) => parseFloat(r))
	const [topLeft, topRight, bottomRight, bottomLeft] =
		borderRadii.length === 1
			? [borderRadii[0], borderRadii[0], borderRadii[0], borderRadii[0]]
			: borderRadii

	// Create SVG element
	const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
	svg.setAttribute('width', rect.width + 8)
	svg.setAttribute('height', rect.height + 8)
	svg.style.position = 'absolute'
	svg.style.top = '-4px'
	svg.style.left = '-4px'
	svg.style.overflow = 'visible'
	svg.style.pointerEvents = 'none'
	svg.style.zIndex = '9999'

	// Create path
	const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
	const d = [
		`M ${topLeft + 4} 4`,
		`H ${rect.width - topRight + 4}`,
		`Q ${rect.width + 4} 4, ${rect.width + 4} ${topRight + 4}`,
		`V ${rect.height - bottomRight + 4}`,
		`Q ${rect.width + 4} ${rect.height + 4}, ${rect.width - bottomRight + 4} ${rect.height + 4}`,
		`H ${bottomLeft + 4}`,
		`Q 4 ${rect.height + 4}, 4 ${rect.height - bottomLeft + 4}`,
		`V ${topLeft + 4}`,
		`Q 4 4, ${topLeft + 4} 4`,
	].join(' ')

	path.setAttribute('d', d)
	path.setAttribute('fill', 'none')
	path.setAttribute('stroke', 'blue')
	path.setAttribute('stroke-width', '2')

	// Create animation
	const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate')
	animate.setAttribute('attributeName', 'stroke-dasharray')
	animate.setAttribute('from', '0, 99999')
	animate.setAttribute('to', '99999, 0')
	animate.setAttribute('dur', '2s')
	animate.setAttribute('repeatCount', 'indefinite')

	path.appendChild(animate)
	svg.appendChild(path)
	element.appendChild(svg)
}

// Initial highlight setup
highlightEpicElements()
highlightCurrentGroup()
