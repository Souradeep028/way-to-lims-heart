//@ts-nocheck
'use client';

import { useState, useEffect } from 'react';

const BOARD_SIZE = 8; // Increased board size
const PLAYER_START = { x: 0, y: 0 };
const TARGET = { x: BOARD_SIZE - 1, y: BOARD_SIZE - 1 };

export default function Home() {
	const [playerPosition, setPlayerPosition] = useState(PLAYER_START);
	const [mines, setMines] = useState([]);
	const [moveCount, setMoveCount] = useState(0);
	const [explodedMine, setExplodedMine] = useState(null);

	useEffect(() => {
		generateMines();
	}, []);

	const generateMines = () => {
		const newMines = [];
		for (let i = 0; i < BOARD_SIZE; i++) {
			for (let j = 0; j < BOARD_SIZE; j++) {
				if (Math.random() < 0.15 && !(i === 0 && j === 0) && !(i === BOARD_SIZE - 1 && j === BOARD_SIZE - 1)) {
					if (!isAdjacentToMine(newMines, i, j)) {
						newMines.push({ x: i, y: j });
					}
				}
			}
		}
		setMines(newMines);
	};

	const isAdjacentToMine = (mineList, x, y) => {
		return mineList.some((mine) => Math.abs(mine.x - x) <= 1 && Math.abs(mine.y - y) <= 1);
	};

	const handleMove = (x, y) => {
		if (
			x >= 0 &&
			x < BOARD_SIZE &&
			y >= 0 &&
			y < BOARD_SIZE &&
			Math.abs(x - playerPosition.x) + Math.abs(y - playerPosition.y) === 1
		) {
			setMoveCount((prevCount) => prevCount + 1);
			if (mines.some((mine) => mine.x === x && mine.y === y)) {
				setExplodedMine({ x, y });
				setTimeout(() => {
					setPlayerPosition(PLAYER_START);
					setExplodedMine(null);
					alert('You hit a mine! Back to start. Do not give up Lim is cheering for you! 🫶🏻');
				}, 1000);
			} else {
				setPlayerPosition({ x, y });
				if (x === TARGET.x && y === TARGET.y) {
					alert(`You, my lover, have touched thy heart,
Come to Bali, where dreams can start.
Amidst the palms and ocean's sigh,
Together we'll soar, our spirits high.
Where waves kiss shores and sunsets gleam,
We'll live our love, a cherished dream. 🫶🏻❤️`);
				}
			}
		}
	};

	const resetGame = () => {
		setPlayerPosition(PLAYER_START);
		setMoveCount(0);
		setExplodedMine(null);
		generateMines();
	};

	const renderBoard = () => {
		const board = [];
		for (let y = 0; y < BOARD_SIZE; y++) {
			const row = [];
			for (let x = 0; x < BOARD_SIZE; x++) {
				const isMine = mines.some((mine) => mine.x === x && mine.y === y);
				const isPlayer = playerPosition.x === x && playerPosition.y === y;
				const isTarget = TARGET.x === x && TARGET.y === y;
				const isExploded = explodedMine && explodedMine.x === x && explodedMine.y === y;

				let content = '';
				if (isPlayer) content = '🙍🏻‍♂️';
				else if (isTarget) content = '❤️';
				else if (isExploded) content = '💥';

				const isAdjacent = Math.abs(x - playerPosition.x) + Math.abs(y - playerPosition.y) === 1;

				row.push(
					<div
						key={`${x}-${y}`}
						className={`w-12 h-12 border border-gray-300 flex items-center justify-center cursor-pointer transition-all duration-300
              ${isAdjacent ? 'hover:bg-blue-200' : 'hover:bg-gray-100'}
              ${isExploded ? 'bg-red-500 animate-pulse' : ''}
              ${isPlayer ? 'bg-yellow-200' : ''}
              ${isTarget ? 'bg-pink-200' : ''}
            `}
						onClick={() => handleMove(x, y)}>
						{content}
					</div>
				);
			}
			board.push(
				<div key={y} className='flex'>
					{row}
				</div>
			);
		}
		return board;
	};

	return (
		<div className='flex flex-col items-center p-8 bg-gradient-to-r from-cyan-500 to-blue-500 min-h-screen'>
			<h1 className='text-2xl font-bold mb-2 text-white'>Way to Lim's Heart ❤️🦋</h1>
			<div className='mb-6 text-md text-white'>Moves you have made to reach Lim's heart: {moveCount}</div>
			<div className='border-4 border-white rounded-lg shadow-2xl mb-4 bg-white bg-opacity-20 backdrop-blur-lg'>
				{renderBoard()}
			</div>
			<div className='w-full max-w-md bg-white bg-opacity-75 rounded-lg p-4 mb-4 text-sm sm:text-base'>
				<h2 className='text-lg sm:text-xl font-bold mb-2'>Game Rules:</h2>
				<ul className='list-disc pl-5 space-y-1'>
					<li>
						<span className='block'>You are Lim's lover 🙍🏻‍♂️ starting at the top-left corner.</span>
					</li>
					<li>
						<span className='block'>Your goal is to reach Lim's Heart ❤️ at the bottom-right corner.</span>
					</li>
					<li>
						<span className='block'>You can move up, down, left, or right to adjacent cells.</span>
					</li>
					<li>
						<span className='block'>Hidden mines are scattered across the board.</span>
					</li>
					<li>
						<span className='block'>If you hit a mine 💥, you'll return to the start.</span>
					</li>
					<li>
						<span className='block'>Try to reach Lim's heart in as few moves as possible!</span>
					</li>
				</ul>
			</div>
			<button
				className='bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full shadow-lg mt-4¯ transition-all duration-300 transform hover:scale-105'
				onClick={resetGame}>
				Reset Game
			</button>
		</div>
	);
}
