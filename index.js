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
