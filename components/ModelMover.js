import { gsap } from 'https://cdn.skypack.dev/gsap'

const modelMove = (positionArr = [], item) => {
	const sections = document.querySelectorAll('.section')
	let currentSection

	sections.forEach((section) => {
		const rect = section.getBoundingClientRect()
		if (rect.top <= window.innerHeight / 3) {
			currentSection = section.id
		}
	})

	let position_active = positionArr.findIndex((val) => val.id == currentSection)
	if (position_active >= 0) {
		let new_coordinates = positionArr[position_active]

		gsap.to(item.position, {
			x: new_coordinates.position.x,
			y: new_coordinates.position.y,
			z: new_coordinates.position.z,
			duration: 3,
			ease: 'power1.out',
		})

		gsap.to(item.rotation, {
			x: new_coordinates.rotation.x,
			y: new_coordinates.rotation.y,
			z: new_coordinates.rotation.z,
			duration: 3,
			ease: 'power1.out',
		})

		gsap.to(item.scale, {
			x: new_coordinates.scale.x,
			y: new_coordinates.scale.y,
			z: new_coordinates.scale.z,
			duration: 3,
			ease: 'power1.out',
		})
	}
}
export default modelMove
