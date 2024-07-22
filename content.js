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
	const borderRadii = style
		.getPropertyValue('--highlight-border-radius')
		.split(' ')
		.map((r) => parseFloat(r) || 0)
	const [topLeft, topRight, bottomRight, bottomLeft] =
		borderRadii.length === 1
			? [borderRadii[0], borderRadii[0], borderRadii[0], borderRadii[0]]
			: borderRadii

	// Create SVG element
	const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
	svg.setAttribute('width', rect.width + 8)
	svg.setAttribute('height', rect.height + 8)
	svg.style.position = 'absolute'
	svg.style.top = '-5px'
	svg.style.left = '-5px'
	svg.style.overflow = 'visible'
	svg.style.pointerEvents = 'none'
	svg.style.zIndex = '10000' // Set higher than the pseudo-element

	// Create path
	const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
	const d = [
        `M ${topLeft},0`,
        `H ${rect.width + 8 - topRight}`,
        `A ${topRight},${topRight} 0 0 1 ${rect.width + 8},${topRight}`,
        `V ${rect.height + 8 - bottomRight}`,
        `A ${bottomRight},${bottomRight} 0 0 1 ${rect.width + 8 - bottomRight},${rect.height + 8}`,
        `H ${bottomLeft}`,
        `A ${bottomLeft},${bottomLeft} 0 0 1 0,${rect.height + 8 - bottomLeft}`,
        `V ${topLeft}`,
        `A ${topLeft},${topLeft} 0 0 1 ${topLeft},0`,
        'Z'
    ].join(' ');

	path.setAttribute('d', d)
	path.setAttribute('fill', 'none')
	path.setAttribute('stroke', 'blue')
	path.setAttribute('stroke-width', '1')

	// Calculate the total length of the path
	const pathLength = path.getTotalLength()

	// Set up the dash array and offset for animation
	path.style.strokeDasharray = pathLength
	path.style.strokeDashoffset = pathLength

	// Create animation for stroke-dashoffset to animate from pathLength to 0 and back to pathLength
	const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate')
	animate.setAttribute('attributeName', 'stroke-dashoffset')
	animate.setAttribute('values', `${pathLength};0;${-pathLength}`) // Defines the sequence of values
	animate.setAttribute('dur', '5s')
	animate.setAttribute('repeatCount', 'indefinite')
	animate.setAttribute('calcMode', 'linear') // Ensures smooth animation

	path.appendChild(animate)
	svg.appendChild(path)
	element.appendChild(svg)
}

// Initial highlight setup
highlightEpicElements()
highlightCurrentGroup()
