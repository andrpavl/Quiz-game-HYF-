const quizQuestion = {
	id: 1,
	question: "What is the capital of Denmark?",
	options: [
		{ text: "Berlin", isCorrect: false },
		{ text: "Copenhagen", isCorrect: true },
		{ text: "Madrid", isCorrect: false },
		{ text: "Rome", isCorrect: false },
	],
	explanation: "Copenhagen is the capital of Denmark.",
};

const form = document.querySelector(".quiz-form");
const arrayOfOptions = quizQuestion.options;

// Function for creating of markup
function renderOptions() {
	form.innerHTML = `<fieldset>
        <legend class="quiz-question">${quizQuestion.question}</legend>
        ${arrayOfOptions
					.map(
						(option, index) => `<label class="answer-option">
                <input type="radio" name="option" value="${option.text}" id="option${index}" data-correct="${option.isCorrect}">
                ${option.text}
            </label>`
					)
					.join("")}
    </fieldset>`;

	form.appendChild(randomizeBtn);

	const answerOption = document.querySelectorAll(".answer-option");
	answerOption.forEach((option) => {
		option.addEventListener("click", defineCorrectAnswer);
	});
}

// Adding button "Randomize!"
const randomizeBtn = document.createElement("button");
randomizeBtn.textContent = "Randomize!";
randomizeBtn.type = "button";
randomizeBtn.classList.add("randomize-btn");
randomizeBtn.addEventListener("click", randomizeOptions);

// Function of definning of correct answer
function defineCorrectAnswer(event) {
	const selectedInput = event.currentTarget.querySelector("input");
	const isCorrect = selectedInput.dataset.correct === "true";

	if (isCorrect) {
		event.currentTarget.style.background = "green";
		setTimeout(() => {
			event.target.style.background = "beige";
			form.reset();
		}, 1500);
	} else {
		event.currentTarget.style.background = "red";
		setTimeout(() => {
			event.target.style.background = "beige";
			form.reset();
		}, 1500);
	}
}

// Function for randomizing of options, by using of Fisher-Yates shuffle method
function randomizeOptions() {
	for (let i = arrayOfOptions.length - 1; i > 0; i--) {
		const randomIndex = Math.floor(Math.random() * (i + 1));
		[arrayOfOptions[i], arrayOfOptions[randomIndex]] = [
			arrayOfOptions[randomIndex],
			arrayOfOptions[i],
		];
	}

	renderOptions();
}

renderOptions();
