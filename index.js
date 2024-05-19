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

addMenuButton('About', '개요')
intersectionObserver.observe(document.getElementById('about'))

loadContents(links, 'Links', '링크', item => {
	let link = document.createElement('a')
	link.classList.add('link')
	link.textContent = item.name
	link.href = item.link
	link.target = '_blank'
	return link
}, true)

loadContents(works, 'Works', '작품', item => {
	let project = document.querySelector('#project').content.firstElementChild.cloneNode(true)
	project.querySelector('h3').textContent = item.name
	project.querySelector('p').textContent = item.description
	project.querySelector('img').src = item.src
	project.querySelector('a').href = item.link
	return project
})

loadContents(projects, 'Projects', '프로젝트', item => {
	let project = document.querySelector('#project').content.firstElementChild.cloneNode(true)
	project.querySelector('h3').textContent = item.name
	project.querySelector('p').textContent = item.description
	project.querySelector('img').src = item.src
	project.querySelector('a').href = item.link
	return project
})

function loadMedia(item) {
	let media = document.querySelector('#media').content.firstElementChild.cloneNode(true)
	media.querySelector(item.src.endsWith('.mp4')? 'img' :'video').remove()
	let mediaElement = media.querySelector('img, video')
	mediaElement.addEventListener((!item.src.endsWith('.mp4'))? 'load' : 'loadeddata', e => {
		e.target.parentElement.style.setProperty('--aspect', (e.target.naturalWidth / e.target.naturalHeight) || (e.target.videoWidth / e.target.videoHeight))
	})
	mediaElement.src = item.src
	if(item.link) {
		let a = document.createElement('a')
		a.href = item.link
		a.target = '_blank'
		media.append(a)
		media.classList.add('media-link')
	}
	if(item.pixel) mediaElement.classList.add('pixel')
	media.querySelector('.media-name').textContent = item.info.split(' / ')[0]
	media.querySelector('.media-date').textContent = item.info.split(' / ')[1]
	return media
}

loadContents(creations, 'Creations', '창작', loadMedia)
loadContents(illustrations, 'Illustrations', '일러스트', loadMedia)

document.querySelector('nav > img').onclick = () => {
	document.querySelector(`#about`).scrollIntoView()
	document.querySelector('#menu-toggle').classList.toggle('toggled')
}

seperateAnimation('#works > h2', (element, i) => { element.style.transitionDelay = `${i * 0.05}s` })
seperateAnimation('#projects > h2', (element, i) => { element.style.transitionDelay = `${i * 0.05}s` })
seperateAnimation('#creations > h2', (element, i) => { element.style.transitionDelay = `${i * 0.05}s` })
seperateAnimation('#illustrations > h2', (element, i) => { element.style.transitionDelay = `${i * 0.05}s` })

let mouseEffect = new MouseEffect('mouse-effect', 'a, .menu-button, #menu-toggle')
mouseEffect.mouseX = -1000

function draw(time) {
	requestAnimationFrame(draw)
    
    if(document.querySelector('#character').dataset.sleep == 'true') sprite.play('sleep')
    else {
        let box = sprite.element.getBoundingClientRect()
        let dir = Math.atan2(mouseEffect.mouseY - (box.top + box.bottom) / 2, mouseEffect.mouseX - (box.left + box.right) / 2)
        let dist = Math.sqrt(Math.pow(mouseEffect.mouseY -  (box.top + box.bottom) / 2, 2) + Math.pow(mouseEffect.mouseX - (box.left + box.right) / 2, 2))
        
        if(dist < 100) {
            sprite.play('center')
        } else if(dir < Math.PI * 0.25 && dir >= -Math.PI * 0.25) {
            sprite.play('right')
        } else if(dir < Math.PI * 0.75 && dir >= Math.PI * 0.25) {
            sprite.play('down')
        } else if(dir < -Math.PI * 0.75 || dir >= Math.PI * 0.25) {
            sprite.play('left')
        } else {
            sprite.play('up')
        }
    }
	
    sprite.update(time)
	if(!mouseEffect.updated) mouseEffect.update(time)
}
