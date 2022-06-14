// Selector
const counters = document.querySelectorAll('.counter');
// Main function
for (let n of counters) {
	const updateCount = () => {
		const target = Number(n.getAttribute('data-target'));
		const count = Number(n.innerText);
		const speed = 2000; // speeds up counter
		const increase = target / speed;
		if (count < target) {
			n.innerText = Math.ceil(count + increase);
			setTimeout(updateCount, 1);
		} else {
			n.innerText = target;
		}
	};
	updateCount();
}
