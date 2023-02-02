<summary>
    Returns a trivia question following the category passed in.
</summary>
export async function getTriviaQuestion(category) {
    let response = await fetch(`https://the-trivia-api.com/api/questions?limit=20&categories=${category}&difficulty=medium`, {
        headers: {
          'Content-Type': 'application/json'
        },
    });

    response = await response.json();
    console.log("Before processing JSON: " + response);
    response = processTriviaQuestionJSON(response);
    console.log("After processing JSON: " + JSON.stringify(response));
    return response;
}

const processTriviaQuestionJSON = (questionJSON) => {
    const questionText = questionJSON[0]["question"];
    const incorrectAnswers = questionJSON[0]["incorrectAnswers"];
    const correctAnswer = questionJSON[0]["correctAnswer"];
    const possibleAnswers = [3];
    /* Append all incorrect answers into the possibleAnswers array */
    incorrectAnswers.map((
        incorrectAnswer, index) => 
            possibleAnswers[index] = {
                text: incorrectAnswer,
                isCorrect: false
        }
    );

    /* Append the correct answer to the possibleAnswers array */
    possibleAnswers[3] = {
        text: correctAnswer,
        isCorrect: true
    };

    const processedQuestionJSON = {
        question: questionText,
        answers: shuffleArray(possibleAnswers),
        category: questionJSON[0]["category"],
        difficulty: questionJSON[0]["difficulty"]
    }
    return processedQuestionJSON;
}

<summary>
    Returns an array of all trivia categories.
</summary>
export async function getAllTriviaCategories() {
    let response = await fetch(`https://the-trivia-api.com/api/categories`, {
        headers: {
          'Content-Type': 'application/json'
        },
    });

    response = await response.json();
    response = processAllTriviaCategoriesJSON(response);
    return response;
}

const processAllTriviaCategoriesJSON = (categoriesJSON) => {
    const categories = Object.entries(categoriesJSON);
    const processedCategories = categories.map(
        (category, index) => {
            const categoryName = category[0];
            const categoryId = categoryName.replace(" & ", "_and_").replace(" ", "_").toLowerCase();
            return {"label": categoryName, "id": categoryId}
        }
    )

    return processedCategories;
}


/* Helper Functions */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(array) {
    let index = array.length,
      randomIndex;
  
    // While there remain elements to shuffle.
    while (index !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * index);
      index--;
  
      // And swap it with the current element.
      [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
    }
  
    return array;
}

export async function getRandomTriviaCategory(amount) {
    let randCategories = [amount];
    let allCategories = await getAllTriviaCategories();
    // console.log("All categories: " + JSON.stringify(tempCategories));
    let tempCategories = allCategories;

    for(let i = 0; i < amount; i++){
        let randIndex = getRandomInt(0, tempCategories.length - 1)
        let randCategory = tempCategories[randIndex];
        tempCategories.splice(randIndex, 1);
        randCategories[i] = randCategory;
    }
    
    return randCategories;
}