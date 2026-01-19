let randomNumber, maxGuesses, attempts, startTime, timerInterval, score, hintsUsed = 0;
const leaderboardKey = "guessTheNumberLeaderboard";

function initGame() {
    const difficulty = document.getElementById("difficulty").value;
    switch(difficulty) {
        case "easy": maxGuesses = Infinity; break;
        case "medium": maxGuesses = 10; break;
        case "hard": maxGuesses = 7; break;
    }

    randomNumber = Math.floor(Math.random() * (difficulty === "hard" ? 200 : difficulty === "medium" ? 100 : 50)) + 1;
    attempts = 0;
    hintsUsed = 0;
    startTime = new Date();
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);

    document.getElementById("message").textContent = "";
    document.getElementById("hint").textContent = "";
    document.getElementById("score").textContent = "🏆 Score: 0";
    document.querySelector("button").disabled = false;
    document.getElementById("guessInput").value = "";
}

function updateTimer() {
    const elapsed = Math.floor((new Date() - startTime) / 1000);
    document.getElementById("timer").textContent = `⏱️ Time: ${elapsed}s`;
}

function checkGuess() {
    const userGuess = parseInt(document.getElementById("guessInput").value);
    const diff = document.getElementById("difficulty").value;

    if (isNaN(userGuess) || userGuess < 1 || (diff === "easy" && userGuess > 50) ||
        (diff === "medium" && userGuess > 100) || (diff === "hard" && userGuess > 200)) {
        alert("Invalid input for selected difficulty.");
        return;
    }

    attempts++;
    const elapsed = Math.floor((new Date() - startTime) / 1000);
    let points = 1000 - elapsed * 5 - attempts * 20;
    if (points < 0) points = 0;
    document.getElementById("score").textContent = `🏆 Score: ${points}`;

    if (userGuess === randomNumber) {
        document.getElementById("message").innerHTML = `🎉 Correct! You guessed it in ${attempts} tries.`;
        document.getElementById("message").style.color = "green";
        document.querySelector("button").disabled = true;
        clearInterval(timerInterval);
        saveScore(points);
        document.getElementById("winSound").play();
        return;
    }

    document.getElementById("message").innerHTML = userGuess < randomNumber ? "📉 Too Low!" : "📈 Too High!";
    document.getElementById("message").style.color = "red";
    document.body.classList.add("shake");
    setTimeout(() => document.body.classList.remove("shake"), 500);

    // Give hint every 3 wrong guesses
    if (attempts % 3 === 0) {
        giveHint(randomNumber);
    }

    if (attempts >= maxGuesses) {
        document.getElementById("message").innerHTML = `💥 Game Over! The number was ${randomNumber}.`;
        document.getElementById("loseSound").play();
        document.querySelector("button").disabled = true;
        clearInterval(timerInterval);
    }
}

function giveHint(num) {
    const hintBox = document.getElementById("hint");
    if (hintsUsed === 0) {
        hintBox.innerHTML = `💡 Hint: It's ${num % 2 === 0 ? 'even' : 'odd'}.`;
    } else if (hintsUsed === 1) {
        hintBox.innerHTML += `<br>💡 Also divisible by 3? ${num % 3 === 0 ? 'Yes' : 'No'}.`;
    } else {
        hintBox.innerHTML += `<br>💡 Last digit is ${num % 10}.`;
    }
    hintsUsed++;
}

function saveScore(score) {
    let leaderboard = JSON.parse(localStorage.getItem(leaderboardKey)) || [];
    leaderboard.push({ score, date: new Date().toLocaleString() });
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 5); // Top 5
    localStorage.setItem(leaderboardKey, JSON.stringify(leaderboard));
    displayLeaderboard();
}

function displayLeaderboard() {
    const board = document.getElementById("leaderboard");
    board.innerHTML = "";
    const scores = JSON.parse(localStorage.getItem(leaderboardKey)) || [];
    scores.forEach(entry => {
        const li = document.createElement("li");
        li.textContent = `${entry.score} pts — ${entry.date}`;
        board.appendChild(li);
    });
}

function resetGame() {
    initGame();
    displayLeaderboard();
}

window.onload = () => {
    initGame();
    displayLeaderboard();
};
