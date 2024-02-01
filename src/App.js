
import './App.css';
import Card from './Components/Card';
import React, { useEffect, useState } from 'react';

let timerInterval;

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}


function App() {
  const [arr, setArr] = useState([]);
  const [restart, setRestart ] = useState(1);
  const [flips, setFlips] = useState([-1,-1]);
  const [timetaken,setTimetaken] = useState(0);
  const [game,setGame] = useState(1);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if(restart>1)
    {
      setGame(1);
      setTimetaken(0);
      clearInterval(timerInterval);
      setArr(shuffleArray(Array.from({ length: 16 }, (_, index) => [Math.ceil((index + 1) / 2), 2])));
      timerInterval = setInterval(() => {
        setTimetaken((timetaken) => timetaken + 1);
      }, 1000);
    }
  }, [restart]);
  useEffect(() => {
    if (flips[0] !== -1 && flips[1] !== -1) {

      if (!isChecking) {
        setIsChecking(true);
        setTimeout(() => {
        
          if (arr[flips[0]][0] === arr[flips[1]][0]) {
            let newarr = [...arr];
            newarr[flips[0]][1] = 3;
            newarr[flips[1]][1] = 3;
            setArr(newarr);
            if(arr.every((element) => element[1]===3))
            {
              setGame(0);
              clearInterval(timerInterval);
              let score = localStorage.getItem('bestScore');
              score = parseInt(score,10);
              console.log(score);
              if(!score || score>timetaken)
              {
                console.log("score");
                localStorage.setItem('bestScore', timetaken.toString());
              }
            }
          }
          else {
            let newarr = [...arr];
            newarr[flips[0]][1] = 2;
            newarr[flips[1]][1] = 2;
            setArr(newarr);
          }

          let newflips = [-1, -1];
          setFlips(newflips);
          setIsChecking(false);
        }, 500);
      }
    }
  }, [flips, arr]);
  return (
    <div className="App">
      <h1 className='blue'>Card Game</h1>
      <div className='cards'>
      {arr.map((card, index) => (
        <Card key={index} value={card[0]} status={card[1]} index={index} handleClick={function handleClick(ind){
          if (!isChecking) {
          let newarr = arr;
                newarr[index][1] = 1;
                setArr(newarr);
                if(flips[0]===-1)
                {
                  let newflips = [...flips];
                  newflips[0] = ind;
                  setFlips(newflips);
                }
                else{
                  let newflips = [...flips];
                  newflips[1] = ind;
                  setFlips(newflips);
                }
                console.log(arr,flips);
          }
        }}  />
      ))}
      
      </div>

      {game === 1 ? (<p>Time: {timetaken} seconds</p>) 
      : (<div><h3 className='red'>Game Over</h3><p className='green'>Score: {timetaken} seconds</p></div>)}

      <p className='green'>Best Score: {localStorage['bestScore']}</p>

      {restart === 1 ? (<button onClick={() => setRestart(restart + 1)}>Start</button>) 
        : (<button onClick={() => setRestart(restart + 1)}>Restart</button>)}
      

    </div>
   
  );
}

export default App;
