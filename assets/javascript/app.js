



var Questions = [{"Question": "In our solar system which two planets are known as the ice giants",
"ChoiceOne": "Uranus and Neptune", "ChoiceTwo": "Saturn and Jupiter", "ChoiceThree": "Uranus and Saturn", 
"ChoiceFour": "Jupiter and Neptune", "Answer": "Uranus and Neptune", "GIPHYID": "planets+neptune"},

{"Question": "The Great Red Spot is a gigantic storm located on which planet in our solar system?", "ChoiceOne": "Earth", "ChoiceTwo": "Venus", 
"ChoiceThree": "Jupiter", "ChoiceFour": "Uranus", "Answer": "Jupiter", "GIPHYID": "planets+jupiter+storm"}, 

{"Question": "Which planet in our solar system has an axis that is titled by 98 degrees?", "ChoiceOne": "Venus", 
"ChoiceTwo": "Earth", "ChoiceThree": "Saturn", "ChoiceFour": "Uranus", 
"Answer": "Uranus", "GIPHYID": "planets+uranus+neil"}, 

{"Question": "Which planet in our solar system has the most oxygen?",
"ChoiceOne": "Jupiter", "ChoiceTwo": "Earth", "ChoiceThree": "Mars", "ChoiceFour": "Venus", 
"Answer": "Earth", "GIPHYID": "planets+earth"},

{"Question": "How many planets in our solar system have moons?",
"ChoiceOne": "One", "ChoiceTwo": "Eight", "ChoiceThree": "Seven", "ChoiceFour": "Six", 
"Answer": "Six", "GIPHYID": "planets+moon"}, 

{"Question": "Which planet is farthest from the sun?",
"ChoiceOne": "Uranus", "ChoiceTwo": "Pluto", "ChoiceThree": "Neptune", "ChoiceFour": "Earth", "Answer": "Neptune", 
"GIPHYID": "planets+neptune"},

{"Question": "What planet in our solar system has the most gravity?",
"ChoiceOne": "Jupiter", "ChoiceTwo": "Earth", "ChoiceThree": "Saturn", "ChoiceFour": "Neptune", 
"Answer": "Jupiter", "GIPHYID": "planets+jupiter"},

{"Question": "Callisto is the name of a moon orbiting what planet in our solar system?",
"ChoiceOne": "Saturn", "ChoiceTwo": "Jupiter", "ChoiceThree": "Mars", "ChoiceFour": "Neptune", 
"Answer": "Jupiter", "GIPHYID": "planets+jupiter+moon"},

{"Question": "What is the hottest planet in our solar system?",
"ChoiceOne": "Mercury", "ChoiceTwo": "Earth", "ChoiceThree": "Venus", "ChoiceFour": "Jupiter", 
"Answer": "Venus", "GIPHYID": "planets+venus"}, 

{"Question": "Which is the largest of Mars' two moons?",
"ChoiceOne": "Phobos", "ChoiceTwo": "Deimos", "ChoiceThree": "Titan", "ChoiceFour": "Europa", 
"Answer": "Phobos", "GIPHYID": "planets+mars"},

{"Question": "In 1781, what was the first planet to be discovered using the telescope?",
"ChoiceOne": "Mercury", "ChoiceTwo": "Jupiter", "ChoiceThree": "Neptune", 
"ChoiceFour": "Uranus", "Answer": "Uranus", "GIPHYID": "uranus"},

{"Question": "Of the four rocky planets in our solar system, which is the largest and most dense?",
"ChoiceOne": "Earth", "ChoiceTwo": "Venus", "ChoiceThree": "Mars", "ChoiceFour": "Mercury", 
"Answer": "Earth", "GIPHYID": "planets+earth"},

{"Question": "Which planet in our solar system spins the fastest?",
"ChoiceOne": "Earth", "ChoiceTwo": "Mars", "ChoiceThree": "Jupiter", "ChoiceFour": "Mercury", 
"Answer": "Jupiter", "GIPHYID": "planets+jupiter"}, 

{"Question": "What planet in our solar system has the longest day?",
"ChoiceOne": "Neptune", "ChoiceTwo": "Uranus", "ChoiceThree": "Venus", 
"ChoiceFour": "Earth", "Answer": "Venus", "GIPHYID": "planets+venus"}];

var Quotes = ["“Intelligent life on other planets? Im not even sure there is on earth!”-Einstein",
"That means nothing. People like us, who believe in physics, know that the distinction between past, present, and future is only a stubbornly persistent illusion.",
"“Science is a wonderful thing if one does not have to earn one's living at it.”-Einstein"
];

var Correct = 0;
var Wrong = 0;
var NoAnswer = 0;
var QuestionsAsked = 0;
var QuestionsToAnswer = 10;
var TimeToAnswer = 15;
var Limit = 5;
var Result = 1;
var Ticker = 1;

function replaceOpeningScreen(){
	$("#opening-screen").addClass("hidden");
	$("#question-screen").removeClass("hidden");
}

function shuffleArray(arr){
	for(var i = 1; i < arr.length; i++) {
		var random = Math.floor(Math.random() * (i + 1));
		if(random !== i) {
			var dummy = arr[random];
			arr[random] = arr[i];
			arr[i] = dummy;
		}
	}
	return arr;
}

function populateQA(){
	QuestionsAsked++;
	if(QuestionsAsked <= QuestionsToAnswer) {
		$("#time").text(TimeToAnswer);
		Ticker = 0;
		var Choices = [Questions[QuestionsAsked].ChoiceOne, 
		Questions[QuestionsAsked].ChoiceTwo, Questions[QuestionsAsked].ChoiceThree,
		Questions[QuestionsAsked].ChoiceFour];
		Choices = shuffleArray(Choices);
		$("#question").text(Questions[QuestionsAsked].Question);
		$("#choice-a").text(Choices[0]);
		$("#choice-b").text(Choices[1]);
		$("#choice-c").text(Choices[2]);
		$("#choice-d").text(Choices[3]);
		parseAnswer();
	}
	else {
		$("#result-screen").addClass("hidden");
		$("#final-statistics").removeClass("hidden");
		if(Correct >= 6)
			$("#verdict").text("Whoa, are you an astronomer?");
		else if(Correct <= 1)
			$("#verdict").text("That's too bad!")
		else
			$("#verdict").text("Someone paid attention in High School Science!");
		$("#Correct-tally").text(Correct);
		$("#Wrong-tally").text(Wrong);
		$("#NoAnswer-tally").text(NoAnswer);
		$(document).on("click", function(){
			$(document).unbind("click");
			Correct = 0;
		    Wrong = 0;
			NoAnswer = 0;
			QuestionsAsked = 0;
			Questions = shuffleArray(Questions);
			Quotes = shuffleArray(Quotes);
			$("#final-statistics").addClass("hidden");
			$("#question-screen").removeClass("hidden");
			populateQA();
		});
	}
}

function countdown(){
	if(Ticker != 1) {
		TimeToAnswer--;
		$("#time").text(TimeToAnswer);
		if(TimeToAnswer === 0) {
			TimeToAnswer = 15;
			Ticker = 1;
			openTimeUpScreen();
		}
	}
}

function parseAnswer(){
	$(".answer-container").on("click", function() {
		$(".answer-container").unbind("click");
		Ticker = 1;
		TimeToAnswer = 15;
		var userChoice = $(this).attr("choice");
		$("#question-screen").addClass("hidden");
		$("#result-screen").removeClass("hidden")
		if($("#choice-" + userChoice).text() === Questions[QuestionsAsked].Answer) {
			$("#result").text("Correct!");
			$("#Correct-answer").text(Quotes[QuestionsAsked]);
			Correct++;
		}
		else {
			$("#result").text("Wrong!");
			$("#Correct-answer").text("Correct answer: " + Questions[QuestionsAsked].Answer);
		    Wrong++;
		}
		embedGIF();
		setTimeout(function(){
			if(QuestionsAsked < QuestionsToAnswer) {
				$("#result-screen").addClass("hidden");
				$("#question-screen").removeClass("hidden");
			}
			populateQA();}, 5000*Result);
	});
}

function embedGIF(){
	$.ajax({
		url: "https://api.giphy.com/v1/gifs/search?q=" + Questions[QuestionsAsked].GIPHYID
		+ "&api_key=61TKqzUDPHfv40Bqr6iEsqqBCfa360mt&limit=" + Limit,
		method: "GET"
	}).then(function(response) {
		var random = Math.floor(Math.random()*Limit);
		while(response.data[random].embed_url === "")
			random = Math.floor(Math.random()*Limit);
		var gifSelection = response.data[random];
		$("#gif").html("<iframe src='" + gifSelection.embed_url + "' width='" + gifSelection.images["480w_still"]["width"] +
			"' height='" + gifSelection.images["480w_still"]["height"] + "' alt='" + Questions[QuestionsAsked].GIPHYID + 
			"'>");
	});
}

function openTimeUpScreen(){
	$(".answer-container").unbind("click");
	$("#question-screen").addClass("hidden");
	$("#result-screen").removeClass("hidden");
	$("#result").text("Time's Up!");
	$("#Correct-answer").text("Correct answer: " + Questions[QuestionsAsked].Answer);
	embedGIF();
	NoAnswer++;
	setTimeout(function(){
		if(QuestionsAsked < QuestionsToAnswer) {
			$("#result-screen").addClass("hidden");
			$("#question-screen").removeClass("hidden");
		}
		populateQA();}, 5000*Result);
}

$(document).ready(function(){
	$(document).on("click", function(){
		$(document).unbind("click");
		Questions = shuffleArray(Questions);
		Quotes = shuffleArray(Quotes);
		replaceOpeningScreen();
		setInterval(countdown, 5000);
		populateQA();
	});
});