class Particle {
	constructor(x, y, slow) {
		this.x = x
		this.y = y
		this.time = 60
		this.direction = Math.random() * 6.28318
		this.size = Math.random() * 30 + 10
		this.slow = slow
	}

	update(canvas, frameTime) {
		this.time -= frameTime * 0.05

		canvas.save()
		canvas.translate(this.x, this.y)
		canvas.rotate(this.direction)

		canvas.globalAlpha = this.time / 60

		canvas.beginPath()
		canvas.arc(
			30 / this.slow - this.time / this.slow,
			0,
			Math.max(0, this.size * this.time / 60) / 3,
			0,
			6.283
		)
		canvas.fill()

		canvas.globalAlpha = 1
		canvas.restore()
	}
}

class MouseEffect {
	mouseX = 0
	mouseY = 0
	pmouseX = 0
	pmouseY = 0
	hover = 0
	onHoverTarget = false
	isTouchDevice = false
	particles = []
	particleColddown = 0
	lastTime = 0
	updated = false

	constructor(id, hoverTarget) {
		this.canvas = document.createElement('canvas')
		this.canvas.setAttribute('id', id)
		this.canvas.setAttribute(
			'style',
			`position: fixed; top: 0px; width: 100lvw; height: 100lvh; pointer-events: none; z-index: 2;`
		)
		document.body.append(this.canvas)

		this.c = this.canvas.getContext('2d')
		this.canvas.width = this.canvas.clientWidth * devicePixelRatio
		this.canvas.height = this.canvas.clientHeight * devicePixelRatio
		this.c.scale(devicePixelRatio, devicePixelRatio)

		this.c.lineWidth = 3

		addEventListener('resize', () => {
			this.canvas.width = this.canvas.clientWidth * devicePixelRatio
			this.canvas.height = this.canvas.clientHeight * devicePixelRatio
			this.c.scale(devicePixelRatio, devicePixelRatio)
		})

		for (let event of ['mousemove', 'touchmove'])
			addEventListener(event, e => {
				this.mouseX = event.startsWith('touch')
					? e.touches[0].clientX
					: e.clientX
				this.mouseY = event.startsWith('touch')
					? e.touches[0].clientY
					: e.clientY
				this.onHoverTarget =
					e.target.matches(hoverTarget) && !event.startsWith('touch')
				this.updated = false
			})

		addEventListener('mousedown', e => {
			if (e.button == 0)
				for (let i = 0; i < 10; i++)
					this.particles.push(new Particle(this.mouseX, this.mouseY, 1))
			this.updated = false
		})

		addEventListener('touchstart', e => {
			this.isTouchDevice = true
			this.mouseX = e.touches[0].clientX
			this.mouseY = e.touches[0].clientY
		})

		document.addEventListener('mouseleave', () => (this.onHoverTarget = false))
		window.addEventListener('scroll', () => (this.onHoverTarget = false))
	}


	update(time) {

	// ❗ 완전 삭제 → ❌
	// this.c.clearRect(0, 0, this.canvas.width, this.canvas.height)

	// ✅ 반투명으로 덮어서 잔상 남기기 (핵심)
	this.c.fillStyle = "rgba(255,255,255,0.08)"
	this.c.fillRect(0, 0, this.canvas.width, this.canvas.height)

	// 색상
	this.c.fillStyle = "black"
	this.c.strokeStyle = "black"

	// 글로우
	this.c.shadowBlur = 15
	this.c.shadowColor = "rgba(0,0,0,0.2)"

	// hover 계산 (기존 유지)
	this.hover = Math.min(
		Math.max(
			this.hover +
				(((this.onHoverTarget ? 1 : 0) - this.hover) *
					(time - this.lastTime) *
					0.01),
			0
		),
		1
	)

	// 🟢 커서 (유지)
	if (!this.isTouchDevice) {
		this.c.beginPath()
		this.c.arc(this.mouseX, this.mouseY, 8 + this.hover * 10, 0, 6.28318)

		this.c.fillStyle = "rgba(0,0,0,0.15)"
		this.c.fill()
		this.c.stroke()
	}

	// ✨ 트레일 (추가 핵심)
	let dx = this.mouseX - this.pmouseX
	let dy = this.mouseY - this.pmouseY
	let dist = Math.sqrt(dx * dx + dy * dy)

	for (let i = 0; i < dist; i += 3) {
		let x = this.pmouseX + (dx * i) / dist
		let y = this.pmouseY + (dy * i) / dist

		this.c.beginPath()
		this.c.arc(x, y, 2, 0, 6.283)
		this.c.fill()
	}

	// ✨ 파티클 강화
	if (dist > 5) {
		this.particles.push(new Particle(this.mouseX, this.mouseY, 2))
	}

	for (let p of this.particles) {
		p.update(this.c, time - this.lastTime)
	}

	this.particles = this.particles.filter(p => p.time > 0)

	this.pmouseX = this.mouseX
	this.pmouseY = this.mouseY
	this.lastTime = time
}
