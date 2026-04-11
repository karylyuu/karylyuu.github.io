class Particle {
	constructor(x, y, slow) {
		this.x = x
		this.y = y
		this.time = 30
		this.direction = Math.random() * 6.28318
		this.size = Math.random() * 20 + 5
		this.slow = slow
	}

	update(canvas, frameTime) {
		this.time -= frameTime * 0.05

		canvas.save()
		canvas.translate(this.x, this.y)
		canvas.rotate(this.direction)

		canvas.beginPath()
		canvas.arc(
			30 / this.slow - this.time / this.slow,
			0,
			Math.max(
				0,
				this.size * this.time / 30 * Math.min(5 - this.time / 6, 1.5)
			) / 3,
			0,
			6.283
		)

		canvas.fill()
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

		for (let event of ['mousemove', 'touchmove']) {
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
		}

		addEventListener('mousedown', e => {
			if (e.button == 0) {
				for (let i = 0; i < 5; i++) {
					this.particles.push(new Particle(this.mouseX, this.mouseY, 1))
				}
			}
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
	this.c.clearRect(0, 0, this.canvas.width, this.canvas.height)

	this.c.fillStyle = "black"
	this.c.strokeStyle = "black"

	// 🔥 속도 계산
	let dx = this.mouseX - this.pmouseX
	let dy = this.mouseY - this.pmouseY
	let dist = Math.sqrt(dx * dx + dy * dy)
	let speed = Math.min(dist / 10, 2)

	// ---------------------------
	// 1️⃣ 잔상 레이어 (핵심 추가)
	// ---------------------------
	if (!this.trails) this.trails = []

	this.trails.push({
		x: this.mouseX,
		y: this.mouseY,
		life: 1
	})

	for (let t of this.trails) {
		this.c.beginPath()
		this.c.arc(t.x, t.y, 6 * t.life, 0, 6.283)
		this.c.fillStyle = `rgba(0,0,0,${t.life * 0.15})`
		this.c.fill()

		t.life -= 0.04
	}

	this.trails = this.trails.filter(t => t.life > 0)

	// ---------------------------
	// 2️⃣ 부드러운 트레일 라인
	// ---------------------------
	if (dist > 0.5) {
		this.c.beginPath()

		let mx = (this.mouseX + this.pmouseX) / 2
		let my = (this.mouseY + this.pmouseY) / 2

		this.c.moveTo(this.pmouseX, this.pmouseY)
		this.c.quadraticCurveTo(this.pmouseX, this.pmouseY, mx, my)

		this.c.lineWidth = 1.5 + speed
		this.c.globalAlpha = 0.2 + speed * 0.2

		this.c.stroke()
		this.c.globalAlpha = 1
	}

	// ---------------------------
	// 3️⃣ 파티클 (약하게 유지)
	// ---------------------------
	if (dist > 2 && Math.random() < 0.2) {
		this.particles.push(new Particle(this.mouseX, this.mouseY, 2))
	}

	for (let p of this.particles) {
		p.update(this.c, time - this.lastTime)
	}
	this.particles = this.particles.filter(p => p.time > -1)

	// ---------------------------
	// 4️⃣ 커서 링
	// ---------------------------
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

	if (!this.isTouchDevice) {
		this.c.beginPath()
		this.c.arc(this.mouseX, this.mouseY, 8 + this.hover * 12, 0, 6.283)
		this.c.lineWidth = 2
		this.c.stroke()
	}

	// ---------------------------
	this.pmouseX = this.mouseX
	this.pmouseY = this.mouseY
	this.lastTime = time
}
