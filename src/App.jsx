import { useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { MdDoneAll } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import "./App.css";
const colors = [
  { name: "Red", hex: "#FF0000" },
  { name: "Green", hex: "#00FF00" },
  { name: "Blue", hex: "#0000FF" },
  { name: "Yellow", hex: "#FFFF00" },
  { name: "Cyan", hex: "#00FFFF" },
  { name: "Magenta", hex: "#FF00FF" },
  { name: "Orange", hex: "#FFA500" },
  { name: "Purple", hex: "#800080" },
  { name: "Pink", hex: "#FFC0CB" },
  { name: "Brown", hex: "#A52A2A" },
];

function App() {
  const [allTodo, setAllTodo] = useState([
    { id: 1, todo: "ورزش", done: false, color: "#00FFFF" },
    { id: 2, todo: "کتاب", done: false, color: "#800080" },
    { id: 3, todo: "کار", done: false, color: "#FFFF00" },
  ]);
  const [color, setColor] = useState("#FF0000");
  const [inputText, setInputText] = useState("");
  const todos = () => {
    if (inputText.length > 1) {
      const newTodo = {
        id: Math.floor(Math.random() * 500),
        todo: inputText,
        done: false,
        color: color,
      };
      setAllTodo([...allTodo, newTodo]);
      setInputText("");
    }
  };
  const delTodo = (id) => {
    setAllTodo(allTodo.filter((todo)=> todo.id !== id))
  }
  return (
    <>
      <div className="center">
        <h1>دفترچه یادداشت</h1>
      </div>
      <div className="inputs">
        <input
          type="text"
          value={inputText}
          placeholder="متن خود را وارد کنید..."
          style={{ backgroundColor: color }}
          onChange={(e) => setInputText(e.target.value)}
        />
        <CiSquarePlus size={60} onClick={() => todos()} className="addtodo" />
      </div>
      <div>
        {colors.map((color) => (
          <input
            type="radio"
            key={color.hex}
            name="color"
            style={{
              backgroundColor: color.hex,
              width: "25px",
              height: "25px",
              borderRadius: "50%",
              appearance: "none",
              cursor: "pointer",
            }}
            className="radioBtn"
            onClick={() => setColor(color.hex)}
          />
        ))}
      </div>
      <div className="grid">
        {allTodo.map((todo) => (
          <div
            className="box"
            key={todo.id}
            style={{
              backgroundColor: todo.color,
              opacity: todo.done ? 0.5 : 1,
            }}
          >
            <span className="todoText">{todo.todo}</span>
            <div className="flexBtns">
              <MdDoneAll
                size={20}
                className="donebtn"
                color="white"
                onClick={() =>
                  setAllTodo(
                    allTodo.map((t) =>
                      t.id === todo.id ? { ...t, done: !t.done } : t
                    )
                  )
                }
              />
              <FaRegTrashCan
                size={20}
                className="trashbtn"
                onClick={() => delTodo(todo.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
