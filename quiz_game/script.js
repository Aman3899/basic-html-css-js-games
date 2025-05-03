const gameContainer = document.getElementById('game-container');
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const questionCountSelect = document.getElementById('question-count');
const startBtn = document.getElementById('start-btn');
const questionDisplay = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const currentQuestionDisplay = document.getElementById('current-question');
const totalQuestionsDisplay = document.getElementById('total-questions');
const scoreDisplay = document.getElementById('score');
const resultModal = document.getElementById('result-modal');
const resultScore = document.getElementById('result-score');
const resultPercentage = document.getElementById('result-percentage');
const answersModal = document.getElementById('answers-modal');
const answersList = document.getElementById('answers-list');
const loadingScreen = document.querySelector('.loading');

// Static set of 100 questions
const questions = [
    {
        "question": "What is the capital of France?",
        "options": ["Paris", "London", "Berlin", "Madrid"],
        "answer": "Paris"
    },
    {
        "question": "Which planet is known as the Red Planet?",
        "options": ["Earth", "Mars", "Jupiter", "Venus"],
        "answer": "Mars"
    },
    {
        "question": "What is 2 + 2?",
        "options": ["3", "4", "5", "6"],
        "answer": "4"
    },
    {
        "question": "Which element has the symbol H?",
        "options": ["Helium", "Hydrogen", "Hafnium", "Holmium"],
        "answer": "Hydrogen"
    },
    {
        "question": "Who wrote 'Romeo and Juliet'?",
        "options": ["Shakespeare", "Dickens", "Austen", "Hemingway"],
        "answer": "Shakespeare"
    },
    {
        "question": "What is the largest ocean?",
        "options": ["Atlantic", "Indian", "Arctic", "Pacific"],
        "answer": "Pacific"
    },
    {
        "question": "Which gas do plants absorb?",
        "options": ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"],
        "answer": "Carbon Dioxide"
    },
    {
        "question": "What is the square root of 16?",
        "options": ["2", "4", "6", "8"],
        "answer": "4"
    },
    {
        "question": "Who discovered gravity?",
        "options": ["Newton", "Einstein", "Galileo", "Tesla"],
        "answer": "Newton"
    },
    {
        "question": "What is the chemical symbol for Gold?",
        "options": ["Au", "Ag", "Fe", "Cu"],
        "answer": "Au"
    },
    {
        "question": "What year did WW2 end?",
        "options": ["1943", "1944", "1945", "1946"],
        "answer": "1945"
    },
    {
        "question": "Who painted the Mona Lisa?",
        "options": ["Da Vinci", "Michelangelo", "Raphael", "Donatello"],
        "answer": "Da Vinci"
    },
    {
        "question": "What is the speed of light?",
        "options": ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
        "answer": "300,000 km/s"
    },
    {
        "question": "In what year did the Titanic sink?",
        "options": ["1910", "1912", "1914", "1916"],
        "answer": "1912"
    },
    {
        "question": "What is the powerhouse of the cell?",
        "options": ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
        "answer": "Mitochondria"
    },
    {
        "question": "What is the boiling point of water in Celsius?",
        "options": ["80", "90", "100", "110"],
        "answer": "100"
    },
    {
        "question": "Who is the founder of Microsoft?",
        "options": ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Jeff Bezos"],
        "answer": "Bill Gates"
    },
    {
        "question": "What is the chemical formula for water?",
        "options": ["CO2", "NaCl", "H2O", "O2"],
        "answer": "H2O"
    },
    {
        "question": "Which country is home to the Eiffel Tower?",
        "options": ["Italy", "Spain", "France", "Germany"],
        "answer": "France"
    },
    {
        "question": "What is the currency of Japan?",
        "options": ["Dollar", "Euro", "Yen", "Pound"],
        "answer": "Yen"
    },
    {
        "question": "What is the capital of Australia?",
        "options": ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        "answer": "Canberra"
    },
    {
        "question": "Which programming language is often used for AI?",
        "options": ["Java", "C++", "Python", "JavaScript"],
        "answer": "Python"
    },
    {
        "question": "Who developed the theory of relativity?",
        "options": ["Newton", "Einstein", "Hawking", "Curie"],
        "answer": "Einstein"
    },
    {
        "question": "What is the largest planet in our solar system?",
        "options": ["Saturn", "Jupiter", "Uranus", "Neptune"],
        "answer": "Jupiter"
    },
    {
        "question": "What is the first element on the periodic table?",
        "options": ["Helium", "Lithium", "Hydrogen", "Oxygen"],
        "answer": "Hydrogen"
    },
    {
        "question": "Which U.S. president served during the Civil War?",
        "options": ["Washington", "Jefferson", "Lincoln", "Roosevelt"],
        "answer": "Lincoln"
    },
    {
        "question": "Which animal is known as the 'King of the Jungle'?",
        "options": ["Elephant", "Tiger", "Lion", "Cheetah"],
        "answer": "Lion"
    },
    {
        "question": "What is the value of Pi (π) to two decimal places?",
        "options": ["3.12", "3.14", "3.16", "3.18"],
        "answer": "3.14"
    },
    {
        "question": "What does 'AI' stand for?",
        "options": ["Artificial Intellect", "Artificial Intelligence", "Automated Instruction", "Advanced Interface"],
        "answer": "Artificial Intelligence"
    },
    {
        "question": "What is the name of the first cloned mammal?",
        "options": ["Dolly", "Daisy", "Molly", "Polly"],
        "answer": "Dolly"
    },
    {
        "question": "What is the most abundant gas in Earth's atmosphere?",
        "options": ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
        "answer": "Nitrogen"
    },
    {
        "question": "In what year did the first humans land on the Moon?",
        "options": ["1965", "1969", "1973", "1977"],
        "answer": "1969"
    },
    {
        "question": "Who is considered the 'father of computer science'?",
        "options": ["Bill Gates", "Alan Turing", "Steve Jobs", "Linus Torvalds"],
        "answer": "Alan Turing"
    },
    {
        "question": "What is the smallest bone in the human body?",
        "options": ["Femur", "Tibia", "Stapes", "Humerus"],
        "answer": "Stapes"
    },
    {
        "question": "What is the capital of Canada?",
        "options": ["Toronto", "Montreal", "Vancouver", "Ottawa"],
        "answer": "Ottawa"
    },
    {
        "question": "What is the main component of natural gas?",
        "options": ["Ethane", "Propane", "Methane", "Butane"],
        "answer": "Methane"
    },
    {
        "question": "Who developed the polio vaccine?",
        "options": ["Marie Curie", "Albert Einstein", "Jonas Salk", "Alexander Fleming"],
        "answer": "Jonas Salk"
    },
    {
        "question": "What is the hardest natural substance on Earth?",
        "options": ["Gold", "Steel", "Diamond", "Titanium"],
        "answer": "Diamond"
    },
    {
        "question": "Which author wrote the 'Harry Potter' series?",
        "options": ["J.R.R. Tolkien", "C.S. Lewis", "J.K. Rowling", "George R.R. Martin"],
        "answer": "J.K. Rowling"
    },
    {
        "question": "What is the main function of red blood cells?",
        "options": ["Fight infections", "Carry oxygen", "Clot blood", "Digest food"],
        "answer": "Carry oxygen"
    },
    {
        "question": "Which country won the FIFA World Cup in 2014?",
        "options": ["Brazil", "Germany", "Spain", "Argentina"],
        "answer": "Germany"
    },
    {
        "question": "Who invented the telephone?",
        "options": ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Guglielmo Marconi"],
        "answer": "Alexander Graham Bell"
    },
    {
        "question": "What is the chemical symbol for silver?",
        "options": ["Si", "Ag", "Fe", "Sn"],
        "answer": "Ag"
    },
    {
        "question": "What is the name of the largest desert in the world?",
        "options": ["Sahara", "Arabian", "Gobi", "Antarctic"],
        "answer": "Antarctic"
    },
    {
        "question": "Which planet is closest to the Sun?",
        "options": ["Venus", "Earth", "Mercury", "Mars"],
        "answer": "Mercury"
    },
    {
        "question": "In what year did the Berlin Wall fall?",
        "options": ["1987", "1989", "1991", "1993"],
        "answer": "1989"
    },
    {
        "question": "What is the primary function of the liver?",
        "options": ["Pump blood", "Filter waste", "Digest food", "Store energy"],
        "answer": "Filter waste"
    },
    {
        "question": "Which artist painted 'The Starry Night'?",
        "options": ["Monet", "Van Gogh", "Picasso", "Rembrandt"],
        "answer": "Van Gogh"
    },
    {
        "question": "What is the highest mountain in the world?",
        "options": ["K2", "Kangchenjunga", "Mount Everest", "Lhotse"],
        "answer": "Mount Everest"
    },
    {
        "question": "What is the name of the first artificial satellite launched into space?",
        "options": ["Apollo 1", "Sputnik 1", "Explorer 1", "Vostok 1"],
        "answer": "Sputnik 1"
    },
    {
        "question": "Who is known as the 'father of modern physics'?",
        "options": ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Niels Bohr"],
        "answer": "Albert Einstein"
    },
    {
        "question": "What is the name of the largest moon of Saturn?",
        "options": ["Europa", "Ganymede", "Titan", "Callisto"],
        "answer": "Titan"
    },
    {
        "question": "Which chemical element is the main component of sand?",
        "options": ["Carbon", "Silicon", "Iron", "Calcium"],
        "answer": "Silicon"
    },
    {
        "question": "What is the name of the longest river in the world?",
        "options": ["Amazon", "Nile", "Yangtze", "Mississippi"],
        "answer": "Nile"
    },
    {
        "question": "Who developed the first successful vaccine against smallpox?",
        "options": ["Louis Pasteur", "Robert Koch", "Edward Jenner", "Alexander Fleming"],
        "answer": "Edward Jenner"
    },
    {
        "question": "What is the name of the force that opposes motion between surfaces?",
        "options": ["Gravity", "Inertia", "Friction", "Magnetism"],
        "answer": "Friction"
    },
    {
        "question": "Which ancient civilization built the pyramids of Giza?",
        "options": ["Roman", "Greek", "Egyptian", "Persian"],
        "answer": "Egyptian"
    },
    {
        "question": "What is the name of the process by which plants make their own food?",
        "options": ["Respiration", "Photosynthesis", "Transpiration", "Digestion"],
        "answer": "Photosynthesis"
    },
    {
        "question": "Who wrote the play 'Hamlet'?",
        "options": ["Charles Dickens", "Jane Austen", "William Shakespeare", "Mark Twain"],
        "answer": "William Shakespeare"
    },
    {
        "question": "What is the name of the smallest country in the world?",
        "options": ["Monaco", "Liechtenstein", "Maldives", "Vatican City"],
        "answer": "Vatican City"
    },
    {
        "question": "In which sport would you perform a slam dunk?",
        "options": ["Tennis", "Soccer", "Basketball", "Golf"],
        "answer": "Basketball"
    },
    {
        "question": "What is the name of the famous clock tower in London?",
        "options": ["Eiffel Tower", "Big Ben", "Leaning Tower of Pisa", "Statue of Liberty"],
        "answer": "Big Ben"
    },
    {
        "question": "What type of galaxy is the Milky Way?",
        "options": ["Elliptical", "Irregular", "Spiral", "Lenticular"],
        "answer": "Spiral"
    },
    {
        "question": "Who was the first woman to travel into space?",
        "options": ["Sally Ride", "Valentina Tereshkova", "Eileen Collins", "Judith Resnik"],
        "answer": "Valentina Tereshkova"
    },
    {
        "question": "Which famous scientist formulated the laws of motion?",
        "options": ["Albert Einstein", "Galileo Galilei", "Stephen Hawking", "Isaac Newton"],
        "answer": "Isaac Newton"
    },
    {
        "question": "What is the name of the nearest star to our solar system?",
        "options": ["Sirius", "Vega", "Proxima Centauri", "Alpha Centauri"],
        "answer": "Proxima Centauri"
    },
    {
        "question": "In cricket, what is the term for a score of 100 runs in a single innings?",
        "options": ["Century", "Ton", "Home Run", "Grand Slam"],
        "answer": "Century"
    },
    {
        "question": "What is the name of the first cryptocurrency?",
        "options": ["Ethereum", "Litecoin", "Ripple", "Bitcoin"],
        "answer": "Bitcoin"
    },
    {
        "question": "Which search engine was originally called 'BackRub'?",
        "options": ["Bing", "Yahoo", "Google", "DuckDuckGo"],
        "answer": "Google"
    },
    {
        "question": "What is the name of the theory that explains the expansion of the universe?",
        "options": ["String Theory", "Big Bang Theory", "Theory of Everything", "General Relativity"],
        "answer": "Big Bang Theory"
    },
    {
        "question": "Who invented the World Wide Web?",
        "options": ["Bill Gates", "Steve Jobs", "Tim Berners-Lee", "Mark Zuckerberg"],
        "answer": "Tim Berners-Lee"
    },
    {
        "question": "In what year was the European Union established?",
        "options": ["1983", "1993", "2003", "2013"],
        "answer": "1993"
    },
    {
        "question": "What is the name of the first genetically engineered human?",
        "options": ["It is currently illegal and unconfirmed.", "Bob", "Eve", "Adam"],
        "answer": "It is currently illegal and unconfirmed."
    },

    {
        "question": "What programming language is used to build iPhones",
        "options": ["Swift", "Java", "Javascript", "C"],
        "answer": "Swift"
    },

    {
        "question": "What is a group of crows called",
        "options": ["Caw", "Murder", "Flock", "Molt"],
        "answer": "Murder"
    },
    {
        "question": "What is the capital of Spain?",
        "options": ["Paris", "London", "Berlin", "Madrid"],
        "answer": "Madrid"
    },
    {
        "question": "Which planet is known as the Blue Planet?",
        "options": ["Earth", "Mars", "Jupiter", "Venus"],
        "answer": "Earth"
    },
    {
        "question": "What is 5 + 5?",
        "options": ["8", "9", "10", "11"],
        "answer": "10"
    },
    {
        "question": "Which element has the symbol O?",
        "options": ["Osmium", "Oxygen", "Ohansesoon", "Orgon"],
        "answer": "Oxygen"
    },
    {
        "question": "Who wrote 'Pride and Prejudice'?",
        "options": ["Shakespeare", "Dickens", "Austen", "Hemingway"],
        "answer": "Austen"
    },
    {
        "question": "What is the smallest continent?",
        "options": ["Atlantic", "Indian", "Arctic", "Australia"],
        "answer": "Australia"
    },
    {
        "question": "Which gas do humans breath out?",
        "options": ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"],
        "answer": "Carbon Dioxide"
    },
    {
        "question": "What is the square root of 25?",
        "options": ["3", "4", "5", "6"],
        "answer": "5"
    },
    {
        "question": "Who discovered penicillin?",
        "options": ["Newton", "Einstein", "Fleming", "Tesla"],
        "answer": "Fleming"
    },
    {
        "question": "What is the chemical symbol for lead?",
        "options": ["Au", "Ag", "Fe", "Pb"],
        "answer": "Pb"
    },
    {
        "question": "What year did WW1 end?",
        "options": ["1915", "1916", "1917", "1918"],
        "answer": "1918"
    },
    {
        "question": "What is the smallest country in Europe?",
        "options": ["Paris", "London", "Vatican City", "Monaco"],
        "answer": "Vatican City"
    },
    {
        "question": "What is the smallest country in America?",
        "options": ["Saint Kitts and Nevis", "Vatican City", "Monaco", "Aruba"],
        "answer": "Saint Kitts and Nevis"
    },
    {
        "question": "What is the second element on the periodic table?",
        "options": ["Hydrogen", "Lithium", "Carbon", "Helium"],
        "answer": "Helium"
    },
    {
        "question": "What is the first element of the human life",
        "options": ["Water", "Oxygen", "Air", "Love"],
        "answer": "Oxygen"
    }
]

// Placeholder for full 100 questions (you can expand this list)
for (let i = questions.length; i < 100; i++) {
    questions.push({
        question: `Sample Question ${i + 1}?`,
        options: [`Option A${i}`, `Option B${i}`, `Option C${i}`, `Option D${i}`],
        answer: `Option A${i}`
    });
}

let selectedQuestions = [], currentQuestionIndex = 0, score = 0, userAnswers = [];

setTimeout(() => loadingScreen.classList.add('hidden'), 1500);

function startQuiz() {
    const count = parseInt(questionCountSelect.value);
    selectedQuestions = shuffleArray([...questions]).slice(0, count);
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    totalQuestionsDisplay.textContent = count;
    scoreDisplay.textContent = score;
    loadQuestion();
}

function loadQuestion() {
    const question = selectedQuestions[currentQuestionIndex];
    currentQuestionDisplay.textContent = currentQuestionIndex + 1;
    questionDisplay.textContent = question.question;
    optionsContainer.innerHTML = '';
    nextBtn.classList.add('hidden');

    question.options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.addEventListener('click', () => selectAnswer(option, btn));
        optionsContainer.appendChild(btn);
    });
}

function selectAnswer(selectedOption, btn) {
    const question = selectedQuestions[currentQuestionIndex];
    const buttons = optionsContainer.querySelectorAll('.option-btn');
    buttons.forEach(b => b.disabled = true);
    btn.classList.add('selected');

    if (selectedOption === question.answer) {
        score++;
        scoreDisplay.textContent = score;
        btn.classList.add('correct');
    } else {
        btn.classList.add('incorrect');
        buttons.forEach(b => {
            if (b.textContent === question.answer) b.classList.add('correct');
        });
    }

    userAnswers.push({ question: question.question, selected: selectedOption, correct: question.answer });
    nextBtn.classList.remove('hidden');
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    quizScreen.classList.add('hidden');
    resultScore.textContent = `Score: ${score} / ${selectedQuestions.length}`;
    resultPercentage.textContent = `Percentage: ${Math.round((score / selectedQuestions.length) * 100)}%`;
    resultModal.classList.add('active');
}

function retryQuiz() {
    resultModal.classList.remove('active');
    answersModal.classList.remove('active');
    startScreen.classList.remove('hidden');
}

function showAnswers() {
    resultModal.classList.remove('active');
    answersList.innerHTML = '';
    userAnswers.forEach((answer, index) => {
        const div = document.createElement('div');
        div.className = 'mb-4';
        div.innerHTML = `
            <p class="text-lg font-semibold">${index + 1}. ${answer.question}</p>
            <p class="text-green-400">Correct: ${answer.correct}</p>
            <p class="${answer.selected === answer.correct ? 'text-green-400' : 'text-red-400'}">Your Answer: ${answer.selected}</p>
        `;
        answersList.appendChild(div);
    });
    answersModal.classList.add('active');
}

function closeAnswers() {
    answersModal.classList.remove('active');
    startScreen.classList.remove('hidden');
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);