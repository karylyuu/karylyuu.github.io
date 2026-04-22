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
	isWindowActive = true
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

				const isChar = window.__characterHitTest
					? window.__characterHitTest(this.mouseX, this.mouseY)
					: false

				const isDragging = window.__characterDragging === true

				this.onHoverTarget = isChar || isDragging

				// 🔥 핵심: 캐릭터 위 or 드래그 중이면 잔상 끊기
				if (this.onHoverTarget) {
					this.pmouseX = this.mouseX
					this.pmouseY = this.mouseY
				}

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

		// ✅ 문법 수정 핵심 (constructor 내부 함수 형태)
		this.resetTrail = () => {
			this.pmouseX = this.mouseX
			this.pmouseY = this.mouseY
		}

		window.addEventListener('blur', () => {
			this.isWindowActive = false
			this.onHoverTarget = false
			this.hover = 0
			this.resetTrail()
		})

		window.addEventListener('focus', () => {
			this.isWindowActive = true
			this.updated = false
		})

		document.addEventListener('mouseleave', () => {
			this.onHoverTarget = false
			this.resetTrail()
		})

		document.addEventListener('visibilitychange', () => {
			if (document.hidden) {
				this.isWindowActive = false
				this.onHoverTarget = false
				this.resetTrail()
			} else {
				this.isWindowActive = true
				this.updated = false
			}
		})
	}

	update(time) {
		this.c.fillStyle = "black"
		this.c.strokeStyle = "black"

		this.c.clearRect(0, 0, this.canvas.width, this.canvas.height)

		if (
			(this.mouseX != this.pmouseX || this.mouseY != this.pmouseY) &&
			this.hover < 0.2
		) {
			this.particleColddown += time - this.lastTime
		}

		while (this.particleColddown > 50) {
			this.particleColddown -= 50
			this.particles.push(new Particle(this.mouseX, this.mouseY, 2))
		}

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

		const canDrawCursor =
			!this.isTouchDevice &&
			this.isWindowActive &&
			!this.onHoverTarget &&
			Number.isFinite(this.mouseX) &&
			Number.isFinite(this.mouseY)

		if (canDrawCursor) {
			this.c.beginPath()
			this.c.arc(this.mouseX, this.mouseY, 8 + this.hover * 10, 0, 6.28318)
			this.c.stroke()
		}

		let dx = this.mouseX - this.pmouseX
		let dy = this.mouseY - this.pmouseY
		let dist = Math.sqrt(dx * dx + dy * dy)

		if (canDrawCursor && dist > 1) {
			let speed = Math.min(dist / 10, 2)

			this.c.globalAlpha = 0.3 + speed * 0.3
			this.c.lineWidth = 1.5

			this.c.beginPath()
			this.c.moveTo(this.pmouseX, this.pmouseY)

			let segments = 6
			for (let i = 1; i <= segments; i++) {
				let t = i / segments
				let x = this.pmouseX + (this.mouseX - this.pmouseX) * t
				let y = this.pmouseY + (this.mouseY - this.pmouseY) * t

				let offset = (Math.random() - 0.5) * 10 * speed
				x += offset
				y += offset

				this.c.lineTo(x, y)
			}

			this.c.stroke()

			if (Math.random() < 0.25) {
				this.c.beginPath()
				this.c.moveTo(this.mouseX, this.mouseY)

				let length = 10 + Math.random() * 20
				let angle = Math.random() * Math.PI * 2

				this.c.lineTo(
					this.mouseX + Math.cos(angle) * length,
					this.mouseY + Math.sin(angle) * length
				)

				this.c.stroke()
			}

			this.c.globalAlpha = 1
		}
		
		for (let p of this.particles) {
			p.update(this.c, time - this.lastTime)
		}

		this.particles = this.particles.filter(p => p.time > -1)

		this.pmouseX = this.mouseX
		this.pmouseY = this.mouseY
		this.lastTime = time
	}
}
