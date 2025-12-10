import { useState } from "react";

// Player Component
function Player({ name, symbol, isActive, onChangeName }) {
	const [isEditing, setIsEditing] = useState(false);
	const [playerName, setPlayerName] = useState(name);

	function handleEditClick() {
		setIsEditing((editing) => !editing);
		if (isEditing) {
			onChangeName(symbol, playerName);
		}
	}

	function handleChange(event) {
		setPlayerName(event.target.value);
	}

	return (
		<li className={isActive ? "active" : undefined}>
			<span className="player">
				{isEditing ? (
					<input
						type="text"
						required
						value={playerName}
						onChange={handleChange}
					/>
				) : (
					<span className="player-name">{playerName}</span>
				)}
				<span className="player-symbol">{symbol}</span>
			</span>
			<button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
		</li>
	);
}

// GameBoard Component
function GameBoard({ onSelectSquare, board }) {
	return (
		<div id="game-board">
			<ol>
				{board.map((row, rowIndex) => (
					<li key={rowIndex}>
						<ol>
							{row.map((playerSymbol, colIndex) => (
								<li key={colIndex}>
									<button
										onClick={() => onSelectSquare(rowIndex, colIndex)}
										disabled={playerSymbol !== null}
									>
										{playerSymbol}
									</button>
								</li>
							))}
						</ol>
					</li>
				))}
			</ol>
		</div>
	);
}

// Log Component
function Log({ turns }) {
	return (
		<ol id="log">
			{turns.map((turn, index) => (
				<li key={`${turn.square.row}${turn.square.col}`}>
					{turn.player} selected {turn.square.row},{turn.square.col}
				</li>
			))}
		</ol>
	);
}

// GameOver Component
function GameOver({ winner, onRestart }) {
	return (
		<div id="game-over">
			<h2>Game Over!</h2>
			{winner && <p>{winner} won!</p>}
			{!winner && <p>It's a draw!</p>}
			<button onClick={onRestart}>Rematch!</button>
		</div>
	);
}

// Helper function to derive winner
function deriveWinner(gameBoard, players) {
	const winningCombinations = [
		// Rows
		[
			{ row: 0, col: 0 },
			{ row: 0, col: 1 },
			{ row: 0, col: 2 },
		],
		[
			{ row: 1, col: 0 },
			{ row: 1, col: 1 },
			{ row: 1, col: 2 },
		],
		[
			{ row: 2, col: 0 },
			{ row: 2, col: 1 },
			{ row: 2, col: 2 },
		],
		// Columns
		[
			{ row: 0, col: 0 },
			{ row: 1, col: 0 },
			{ row: 2, col: 0 },
		],
		[
			{ row: 0, col: 1 },
			{ row: 1, col: 1 },
			{ row: 2, col: 1 },
		],
		[
			{ row: 0, col: 2 },
			{ row: 1, col: 2 },
			{ row: 2, col: 2 },
		],
		// Diagonals
		[
			{ row: 0, col: 0 },
			{ row: 1, col: 1 },
			{ row: 2, col: 2 },
		],
		[
			{ row: 0, col: 2 },
			{ row: 1, col: 1 },
			{ row: 2, col: 0 },
		],
	];

	for (const combination of winningCombinations) {
		const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
		const secondSquareSymbol =
			gameBoard[combination[1].row][combination[1].col];
		const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];

		if (
			firstSquareSymbol &&
			firstSquareSymbol === secondSquareSymbol &&
			firstSquareSymbol === thirdSquareSymbol
		) {
			return players[firstSquareSymbol];
		}
	}

	return null;
}

// Helper function to derive game board
function deriveGameBoard(gameTurns) {
	let gameBoard = [
		[null, null, null],
		[null, null, null],
		[null, null, null],
	];

	for (const turn of gameTurns) {
		const { square, player } = turn;
		const { row, col } = square;

		gameBoard[row][col] = player;
	}

	return gameBoard;
}

// Helper function to derive active player
function deriveActivePlayer(gameTurns) {
	let currentPlayer = "X";

	if (gameTurns.length > 0 && gameTurns[0].player === "X") {
		currentPlayer = "O";
	}

	return currentPlayer;
}

// Main App Component
export default function App() {
	const [players, setPlayers] = useState({
		X: "Max",
		O: "Manuel",
	});
	const [gameTurns, setGameTurns] = useState([]);

	const activePlayer = deriveActivePlayer(gameTurns);
	const gameBoard = deriveGameBoard(gameTurns);
	const winner = deriveWinner(gameBoard, players);
	const hasDraw = gameTurns.length === 9 && !winner;

	function handleSelectSquare(rowIndex, colIndex) {
		setGameTurns((prevTurns) => {
			const currentPlayer = deriveActivePlayer(prevTurns);

			const updatedTurns = [
				{ square: { row: rowIndex, col: colIndex }, player: currentPlayer },
				...prevTurns,
			];

			return updatedTurns;
		});
	}

	function handleRestart() {
		setGameTurns([]);
	}

	function handlePlayerNameChange(symbol, newName) {
		setPlayers((prevPlayers) => {
			return {
				...prevPlayers,
				[symbol]: newName,
			};
		});
	}

	return (
		<>
			<header>
				<img src="/game-logo.png" alt="Tic-Tac-Toe game board" />
				<h1>Tic-Tac-Toe</h1>
			</header>
			<main>
				<div id="game-container">
					<ol id="players" className="highlight-player">
						<Player
							name={players.X}
							symbol="X"
							isActive={activePlayer === "X"}
							onChangeName={handlePlayerNameChange}
						/>
						<Player
							name={players.O}
							symbol="O"
							isActive={activePlayer === "O"}
							onChangeName={handlePlayerNameChange}
						/>
					</ol>
					{(winner || hasDraw) && (
						<GameOver winner={winner} onRestart={handleRestart} />
					)}
					<GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
				</div>
				<Log turns={gameTurns} />
			</main>
		</>
	);
}
