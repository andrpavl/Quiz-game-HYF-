const player1Name = document.getElementById("p1-input");
const player2Name = document.getElementById("p2-input");
const startBtn = document.getElementById("start-btn");
const playersSection = document.getElementById("players-container");
const scoreContainer = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

startBtn.addEventListener("click", startQuiz);
// Enabling of Start button
playersSection.addEventListener("change", () => {
	if (player1Name.value && player2Name.value) {
		startBtn.disabled = false;
	}
});

function startQuiz() {
	let p1Score = 0;
	let p2Score = 0;
	restartBtn.style.display = "block";

	scoreContainer.innerHTML = `
    <div>
		<h3 class="pName">${player1Name.value}</h3>
		<div class="score-buttons">
        	<button class="incr-btn p1-btn">Correct</button>
        	<span class="p1Score">${p1Score}</span>
        	<button class="decr-btn p1-btn">Wrong</button>
		</div>
	</div>

    <div>
		<h3 class="pName">${player2Name.value}</h3>
		<div class="score-buttons">
        	<button class="incr-btn p2-btn">Correct</button>
        	<span class="p2Score">${p2Score}</span>
        	<button class="decr-btn p2-btn">Wrong</button>
		<div>
	</div>
    `;

	const player1Score = document.querySelector(".p1Score");
	const player2Score = document.querySelector(".p2Score");

	const correctP1 = document.querySelector(".incr-btn.p1-btn");
	const wrongP1 = document.querySelector(".decr-btn.p1-btn");
	const correctP2 = document.querySelector(".incr-btn.p2-btn");
	const wrongP2 = document.querySelector(".decr-btn.p2-btn");

	startBtn.disabled = true;
	player1Name.disabled = true;
	player2Name.disabled = true;
	player1Name.value = "";
	player2Name.value = "";

	const updateButtonState = () => {
		correctP1.disabled = p1Score === 10;
		correctP2.disabled = p2Score === 10;

		wrongP1.disabled = p1Score === 0;
		wrongP2.disabled = p2Score === 0;

		let sound = new Audio("assets/524848__mc5__short-brass-fanfare-2.wav");
		if (p1Score === 10 || p2Score === 10) {
			sound.play();
		}
	};

	correctP1.addEventListener("click", () => {
		p1Score++;
		player1Score.textContent = p1Score;
		updateButtonState();
	});
	wrongP1.addEventListener("click", () => {
		p1Score--;
		player1Score.textContent = p1Score;
		updateButtonState();
	});
	correctP2.addEventListener("click", () => {
		p2Score++;
		player2Score.textContent = p2Score;
		updateButtonState();
	});
	wrongP2.addEventListener("click", () => {
		p2Score--;
		player2Score.textContent = p2Score;
		updateButtonState();
	});

	updateButtonState();

	// const incrementBtn = document.querySelectorAll(".incr-btn");
	// incrementBtn.forEach((btn) => {
	// 	btn.addEventListener("click", (e) => {
	// 		const playerClass = e.currentTarget.nextElementSibling.className;
	// 		if (playerClass.includes("p1Score")) {
	// 			p1Score++;
	// 		} else if (playerClass.includes("p2Score")) {
	// 			p2Score++;
	// 		}
	// 		updateButtonState();
	// 	});
	// });

	// const decrementBtn = document.querySelectorAll(".decr-btn");
	// decrementBtn.forEach((btn) => {
	// 	btn.addEventListener("click", (e) => {
	// 		const playerClass = e.currentTarget.previousElementSibling.className;
	// 		if (playerClass.includes("p1Score") && p1Score > 0) {
	// 			p1Score--;
	// 			player1Score.textContent = p1Score;
	// 		} else if (playerClass.includes("p2Score") && p2Score > 0) {
	// 			p2Score--;
	// 			player2Score.textContent = p2Score;
	// 		}
	// 		updateButtonState();
	// 	});
	// });

	// updateButtonState();
}

restartBtn.addEventListener("click", restartQuiz);

function restartQuiz() {
	scoreContainer.innerHTML = ``;

	startBtn.disabled = false;
	player1Name.disabled = false;
	player2Name.disabled = false;
	restartBtn.style.display = "none";
}
