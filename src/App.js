import { useEffect, useState } from 'react';
import './global.css';

function App() {
  let totalGridSize = 20;

  let initialSnakePosition = [
    {x: totalGridSize/2, y: totalGridSize/2},
    {x: totalGridSize/2 + 1, y: totalGridSize/2}
  ];

  const [food, setFood] = useState({ x: 5, y: 5});
  const [slowItem, setSlowItem] = useState({ x: 10, y: 10 });
  const [snake, setSnake] = useState(initialSnakePosition);
  const [direction, setDirection] = useState("UP");
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(200);

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

        //reduce speed item
        if(speed <= 180 && slowItem.x === row && slowItem.y === col){
          className = className + " slowItem";
        }

        //checks first object if true, if not then second object, etc...
        let isSnake = snake.some((ele) => ele.x === row && ele.y === col);
        if(isSnake){
          className = className + " snake";
        }
        
        //if snakehead is out of bounds
        if(snake[0].x < 0 || snake[0].y < 0 || snake[0].x > 19 || snake[0].y > 19){
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

  function speedBtn() {
    setSpeed(200);
  }

  function updateGame() {
    console.log(speed);
    let newSnake = [...snake];
    //remember the x is based on row number, so moving down adds 1 to x
    //adds a new element to the array at the beginning to move the snake
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
    //pops the element at the end of the array to keep the snake moving if not landing on food
    if(newSnake[0].x !== food.x || newSnake[0].y !== food.y){
      
      newSnake.pop();
    }
    
    setSnake(newSnake);

    //if eats the slow item
    if(newSnake[0].x == slowItem.x && newSnake[0].y == slowItem.y && speed <= 180){
      const randomX = Math.floor(Math.random() * 20);
      const randomY = Math.floor(Math.random() * 20);
      setSpeed(speed*2);
      setSlowItem({x: randomX, y: randomY});
    }

    //game over if snake touches self
    for(let i=1; i<newSnake.length; i++){
      
      if(newSnake[0].x == newSnake[i].x && newSnake[0].y == newSnake[i].y){
        setIsPaused(true);
      }
    }

    //if food is eaten
    if(newSnake[0].x == food.x && newSnake[0].y == food.y){
      const randomX = Math.floor(Math.random() * 20);
      const randomY = Math.floor(Math.random() * 20);
      setFood({x: randomX, y: randomY});
      setScore(score + 100);

      //speed according to score
      if(speed < 100){
        setSpeed(speed - 5);
      }
      else if(speed < 50){
        setSpeed(speed - 2);
      } else {
        setSpeed(speed - 10);
      }
    }
    
  }

  function startOver() {
    setSnake(initialSnakePosition);
    setFood({ x: 5, y: 5});
    setScore(0);
    setDirection("UP");
    setSpeed(200);
    setIsPaused(false);
  }

  const handleArrowKeyPress = (event) => {
    switch (event.key) {
      case 'ArrowUp':
        
        setDirection("UP")
        // Handle Arrow Up key press
        break;
      case 'ArrowDown':
        
        setDirection("DOWN")
        // Handle Arrow Down key press
        break;
      case 'ArrowLeft':
        
        setDirection("LEFT")
        // Handle Arrow Left key press
        break;
      case 'ArrowRight':
        
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

  //Updates game
  useEffect(() => {
    let interval = setInterval(updateGame, speed);
    return () => clearInterval(interval, updateGame);
  });

  return (
    <div className="container">
      <div className="score">
        Score: <span>{score}</span>
        <button onClick={speedBtn}>SPEED 200</button>
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
