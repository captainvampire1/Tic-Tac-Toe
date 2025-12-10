# Tic-Tac-Toe using React

An interactive and dynamic Tic-Tac-Toe game built with **React**. This project demonstrates core React concepts like state management, component composition, and derived state to create a fully functional game with player customization and history tracking.

## 🚀 Features

-   **Interactive Game Board**: A 3x3 grid that updates instantly upon interaction.
-   **Player Customization**: Players can edit their names in real-time.
-   **Game Log**: Tracks every move made during the game (e.g., "Max selected 1,1").
-   **Winner Detection**: Automatically detects winning combinations (rows, columns, diagonals) or a draw.
-   **Rematch System**: Allows players to reset the board and play again without losing player names.

## 🛠️ Tech Stack

-   **React**: Component-based UI library.
-   **Vite**: Fast build tool and development server.
-   **CSS Modules**: Scoped styling for components.

## 💡 Key Concepts Explained

### 1. Lifting State Up
In React, data flows down. If two components (like the `GameBoard` and the `Log`) need to share the same data (the list of turns), that state must be moved up to their common parent (`App`).

**Simple Example:**
Imagine two siblings want to play with the same toy. If one keeps it in their room, the other can't use it. The parent (App) puts the toy in the living room (Shared State) so both siblings (Components) can see and play with it.

### 2. Derived State
Instead of storing everything in state (which can cause bugs), we calculate values on the fly.
-   **Winner**: We don't store "X won" in a state variable. Instead, every time the board updates, we check the board array against winning combinations to *derive* if there is a winner.
-   **Active Player**: We don't store `activePlayer`. We look at the `gameTurns` array. If the last move was 'X', the current player must be 'O'.

This ensures the game state is always consistent and never out of sync.

## 📦 How to Run

1.  Navigate to the project directory:
    ```bash
    cd tic-tac-toe
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open the local URL provided (usually `http://localhost:5173`) in your browser.
