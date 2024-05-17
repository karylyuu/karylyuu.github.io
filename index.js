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
