const form = document.querySelector(".quiz-form");
const questionInput = document.querySelector(".question-input");
const optionsContainer = document.querySelector(".options");
const randomizeButton = document.getElementById("randomize-btn");
const submitButton = document.querySelector(".submit-btn");
const radioButtons = document.querySelectorAll(".answer-radio");
let options = [];

// Submitting the form and creating the quiz Question object
submitButton.addEventListener("click", createQuestionObject);

// Randomizing options on button click
randomizeButton.addEventListener("click", randomizeOptions);

// Adding click event listeners to radio buttons
radioButtons.forEach((radio) => {
	radio.addEventListener("click", colorizeOptions);
});

function createQuestionObject(evt) {
	evt.preventDefault();

	const question = questionInput.value;
	const options = Array.from(document.querySelectorAll(".answer-input")).map(
		(input, index) => ({
			text: input.value,
			isCorrect: document.querySelectorAll(".answer-radio")[index].checked,
		})
	);
	const explanation = document.querySelector(".explan-input").value;

	if (
		options.some((option) => option.text.trim() === "") ||
		question.trim() === "" ||
		explanation.trim() === ""
	) {
		alert("Please, fill up all the fields");
		return;
	}

	const quizQuestion = {
		id: Date.now(),
		question,
		options,
		explanation,
	};

	console.log(quizQuestion);
	form.reset();
}

function randomizeOptions() {
	const optionInputs = Array.from(document.querySelectorAll(".answer-input"));
	const radioInputs = Array.from(document.querySelectorAll(".answer-radio"));

	options = optionInputs.map((input, index) => ({
		text: input.value,
		isCorrect: radioInputs[index].checked,
	}));

	options.sort(() => Math.random() - 0.5);

	options.forEach((option, index) => {
		optionInputs[index].value = option.text;
		radioInputs[index].checked = option.isCorrect;
	});
	colorizeOptions();
}

function colorizeOptions() {
	const optionInputs = Array.from(document.querySelectorAll(".answer-input"));
	const radioInputs = Array.from(document.querySelectorAll(".answer-radio"));

	optionInputs.forEach((input, index) => {
		if (radioInputs[index].checked) {
			input.style.backgroundColor = "lightgreen";
		} else {
			input.style.backgroundColor = "lightcoral";
		}
	});
}
