import { useState } from 'react';

function Square({value, onSquareClick}) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

function Board({xIsNext, squares, onPlay}) {

  function handleClick(i) {
    // squares, setSquares 是内部函数访问外部函数定义的变量和函数
    // 这不就是闭包嘛
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    // 将更新后的squares数组传递给onPlay
    onPlay(nextSquares);
  }

  // react文档上把这段计算直接写在了这里。
  // 相当于是可以计算得出的变量，不需要放在state中
  const winner = calculateWinner(squares);
  let status = winner ? 'Winner:' + winner : 'Next player: ' + (xIsNext ? "X" : "O");

  // 如何将i传递给handleClick呢？
  // onSquareClick={handleClick} 是绑定这个函数
  // onSquareClick={handleClick(0)} 可以理解为是绑定这个函数调用的结果，会导致死循环
  // 正解：onSquareClick={() => handleClick(0)} , 这是一个箭头函数, 它是定义函数的
  // 一种更短的方式，当点击发生时，会运行=>之后的代码，就调用了handleClick(0)
  // 在 React 中，通常将 onSomething 名称用于表示事件的属性，将 handleSomething 用于处理这些事件的函数定义.
  return (
    <>
      <div className="status">{ status }</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() =>handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() =>handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() =>handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() =>handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() =>handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() =>handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() =>handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() =>handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() =>handleClick(8)}/>
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={()=>jumpTo(move)}>{description}</button>
      </li>
    )
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++){
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
