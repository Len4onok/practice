import './App.css';
import React, { useState } from 'react';
import DragAndDropDiv from './DragAndDropDiv';

function App() {
  const questions = [
    {
      id: 1,
      eng: 'The children play football in the playground',
      rus: 'Дети играют в футбол на детской площадке',
    },
    {
      id: 2,
      eng: 'Antony has decorated the house today',
      rus: 'Энтони украсил дом сегодня',
    },
    {
      id: 3,
      eng: 'Does Marschall like olives?',
      rus: 'Маршал любит оливки?',
    },
  ];

  const [numQuestion, setNumQuestion]=useState(1);
  const [engArr, setEngArr]=useState(getEngArr(numQuestion));
  const [result, setResult]=useState('');

  let rusPhrase = getProperty(questions, 'rus', numQuestion);
  
  function getEngArr(numQuestion) {
    let engPhrase = getProperty(questions, 'eng', numQuestion);
    let shaffleArr = shuffle(engPhrase.split(' '));
    let resArr = [];
    shaffleArr.map((elem, index) => {
      resArr = [...resArr, { id: String(index), name: elem }]
    })
    return resArr;
  }

  // вспомогательная функция по извлечению данных из массива
function getProperty(arr, prop, id) {
	let property;
	arr.map(elem => {
		if (elem.id === id) {
			property = elem[prop];
		}
	})
	return property;
}
// вспомогательная функция по перемешиванию массива
function shuffle(arr) {
	let result = [];
	while (arr.length > 0) {
		let random = getRandomInt(0, arr.length - 1);
		let elem = arr.splice(random, 1)[0];
		result.push(elem);
	}
	return result;
}
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function nextQuestion() {
  setNumQuestion(numQuestion+1); 
  setEngArr(getEngArr(numQuestion+1));
  setResult('');
}

function checkAnswer() {
  let engPhrase = getProperty(questions, 'eng', numQuestion);
  let answer = [];
  engArr.map(elem=>{
    answer=[...answer, elem.name]
  });
  return (engPhrase===answer.join(' '));
}

function correctAnswer() {
setResult(<span className="result right">Right!</span>); 
}


  return <div>
    <header>Translate this sentence</header>
    <p id="rusDiv">{rusPhrase}</p>
    <DragAndDropDiv engArr={engArr} setEngArr={setEngArr}></DragAndDropDiv>
    <p id="result">{result}</p>

    <button id="checkButton" onClick={()=>{
      checkAnswer()? 
      correctAnswer():
      setResult(<span className="result wrong">Something wrong!</span>)
      }}>Check</button>

    <button id="nextButton" onClick={()=>{
      numQuestion<questions.length? 
      nextQuestion():
      setResult(<span className="result">Test over!</span>);
      }}>Next</button>

  </div>
}

export default App;
