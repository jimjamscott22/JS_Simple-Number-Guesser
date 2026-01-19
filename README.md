# Advanced Guess the Number Game

A fun and interactive number guessing game with advanced features like difficulty levels, hints, scoring, and a leaderboard.

## 🎮 Features

- **Multiple Difficulty Levels**:
  - Easy (1–50, unlimited guesses)
  - Medium (1–100, max 10 guesses)
  - Hard (1–200, max 7 guesses)
- **Hints System**:
  - Odd/Even clues
  - Divisibility hints
  - Last-digit reveal
- **Scoring System**:
  - Based on speed and accuracy
- **Leaderboard**:
  - Top 5 scores saved in-browser
- **Sound & Visual Feedback**:
  - Win/lose sounds
  - Shake animation on wrong guesses

## 🧩 How to Play

1. Select a difficulty level.
2. Enter your guess in the input field.
3. Submit your guess and receive feedback:
   - "Too high" or "Too low"
   - Hints appear after every 3 wrong guesses
4. Try to guess the number with as few attempts as possible!
5. Your score is calculated based on:
   - Time taken
   - Number of attempts
6. Beat your high score and climb the leaderboard!

## 🧰 Technologies Used

- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**
  - `localStorage` for saving leaderboard
  - Audio feedback with `Web Audio API`
  - DOM manipulation for gameplay

## ▶️ How to Run

1. Clone or download this repository.
2. Open `index.html` in your browser.
3. No build tools required – it runs directly in the browser!

## 🧪 Example Gameplay

```
🧠 Guess the Number
Select difficulty: Medium (1–100)
Enter guess: 50 → 📉 Too Low!
Enter guess: 75 → 📈 Too High!
Enter guess: 63 → 🎉 Correct! You guessed it in 3 tries.
🏆 Score: 920
```

## 🏆 Leaderboard

Scores are stored locally and displayed in descending order. Try to beat the top score!

## 🛠 Future Enhancements

- Themes (Dark Mode, Retro, etc.)
- Multiplayer mode via WebSocket
- Global leaderboard with Firebase
- Mobile app version using Capacitor or React Native

## 📄 License

MIT License – See `LICENSE` file for details.

---

Enjoy the game and happy guessing! 🎲
