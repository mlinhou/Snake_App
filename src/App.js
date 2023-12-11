import { useEffect, useState } from 'react';
import './global.css';

function App() {
  let totalGridSize = 20;

  let initialSnakePosition = [
    {x: totalGridSize/2, y: totalGridSize/2},
    {x: totalGridSize/2 + 1, y: totalGridSize/2}
  ];

  const [food, setFood] = useState({ x: 5, y: 5});
  const [snake, setSnake] = useState(initialSnakePosition);
  const [direction, setDirection] = useState("UP");
  const [isPaused, setIsPaused] = useState(false);

  function renderBoard() {
    let cellArray = [];
    for(let row=0; row<totalGridSize; row++){
      for(let col=0; col<totalGridSize; col++){
        let className = "cell";

        //spawns food as red
        let isFood = food.x === row && food.y === col;
        if(isFood){
          className = className + " food";
        }

        //checks first object if true, if not then second object, etc...
        let isSnake = snake.some((ele) => ele.x === row && ele.y === col);
        if(isSnake){
          className = className + " snake";
        }
        
        //if snakehead is out of bounds
        if(snake[0].x < 0 || snake[0].y < 0 || snake[0].x > 20 || snake[0].y > 20){
          setIsPaused(true);
        }

        let isSnakeHead = snake[0].x === row && snake[0].y === col;
        if(isSnakeHead){
          className = className + " snakehead";
        }

        let cell = <div className={className} key={`${row}-${col}`}></div>
        cellArray.push(cell);
      }
    }

    return cellArray;
  }

  function updateGame() {
    let newSnake = [...snake];
    //remember the x is based on row number, so moving down adds 1 to x
    switch(direction){
      case "LEFT":
        newSnake.unshift({ x: newSnake[0].x , y: newSnake[0].y - 1});
        break;
      case "RIGHT":
        newSnake.unshift({ x: newSnake[0].x, y: newSnake[0].y + 1});
        break;
      case "UP":
        newSnake.unshift({ x: newSnake[0].x - 1, y: newSnake[0].y});
        break;
      case "DOWN":
        newSnake.unshift({ x: newSnake[0].x + 1, y: newSnake[0].y});
        break;
    }
    newSnake.pop();
    setSnake(newSnake);
  }

  function startOver() {
    setSnake(initialSnakePosition);
    setIsPaused(false);
  }

  const handleArrowKeyPress = (event) => {
    switch (event.key) {
      case 'ArrowUp':
        console.log('Arrow Up key pressed!');
        setDirection("UP")
        // Handle Arrow Up key press
        break;
      case 'ArrowDown':
        console.log('Arrow Down key pressed!');
        setDirection("DOWN")
        // Handle Arrow Down key press
        break;
      case 'ArrowLeft':
        console.log('Arrow Left key pressed!');
        setDirection("LEFT")
        // Handle Arrow Left key press
        break;
      case 'ArrowRight':
        console.log('Arrow Right key pressed!');
        setDirection("RIGHT")
        // Handle Arrow Right key press
        break;
    }
  };

  useEffect(() => {
    // Add event listener when the component mounts
    window.addEventListener('keydown', handleArrowKeyPress);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleArrowKeyPress);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    let interval = setInterval(updateGame, 300);
    return () => clearInterval(interval, updateGame);
  });

  return (
    <div className="container">
      <div className="score">
        Score: <span>30</span>
      </div>
      {!isPaused ? 
        <div className="board">
          {renderBoard()}
        </div>
        :  
        <div className="game-over-popup">
          <p>Game Over!</p>
          <button onClick={startOver}>New Game</button>
        </div>}
    </div>
  );
}

export default App;
