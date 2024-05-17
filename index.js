function seperateAnimation(query, animation) {
	let i = 0
	let target = document.querySelector(query)
	let nodes = []
	for(let node of target.childNodes) nodes.push(node.cloneNode())
	target.textContent = ''
	target.style.whiteSpace = 'pre-wrap'
	for(let node of nodes) {
		if(node.nodeName == '#text') for(let text of node.nodeValue.split('')) {
			let element = document.createElement('span')
			element.textContent = text
			element.style.display = 'inline-block'
			animation(element, i)
			document.querySelector(query).append(element)
			i++
		} else {
			target.append(node)
		}
	}
}

let intersectionObserver = new IntersectionObserver((entries, observer) => {
	for(let [i, entry] of entries.entries()) {
		if(entry.target.tagName == 'SECTION') {
			let button = document.querySelector(`#menu-button-${entry.target.id}`)
			if(entry.isIntersecting) button.classList.add('highlighted')
			else button.classList.remove('highlighted')
			if(entry.target.id == 'about' && !entry.isIntersecting) document.querySelector('#character').dataset.sleep = document.querySelector('#character').dataset.sleep == 'false'
		} else if(entry.isIntersecting) {
			setTimeout(() => entry.target.classList.remove('hide') , (i + 1) * 100)
			observer.unobserve(entry.target)
		}
	}
}, {threshold: 0.1} )

function addMenuButton(id, subtitle) {
	let menuButton = document.createElement('div')
	menuButton.id = `menu-button-${id.toLowerCase()}`
	menuButton.classList.add('menu-button')
	menuButton.style.animationDelay = `${(document.getElementsByClassName('menu-button').length + 3) / 10}s`
	menuButton.textContent = id
	menuButton.onclick = () => {
		document.querySelector(`#${id.toLowerCase()}`).scrollIntoView()
		document.querySelector('#menu-toggle').classList.toggle('toggled')
	}
	menuButton.dataset.subtitle = `${subtitle}/`
	document.querySelector('nav').append(menuButton)
}

function loadContents(list, sectionId, subtitle, createElement, hideButton) {
	let section = document.querySelector(`#${sectionId.toLowerCase()}`)
	if(!hideButton) {
		let header = document.createElement('h2')
		header.textContent = sectionId
		header.classList.add('hide')
		section.append(header)
		intersectionObserver.observe(header)
		intersectionObserver.observe(section)
		addMenuButton(sectionId, subtitle)
	}
	let container = document.createElement('div')
	container.classList.add('container')
	section.append(container)
	for(let item of list) {
		let element = createElement(item)
		element.classList.add('hide')
		intersectionObserver.observe(element)
		container.append(element)
	}
}
