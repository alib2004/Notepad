import { useEffect, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { MdDoneAll } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import "./App.css";

const COLORS = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#00FFFF",
  "#FF00FF",
  "#FFA500",
  "#800080",
  "#FFC0CB",
  "#A52A2A",
];

function App() {
  const [allTodo, setAllTodo] = useState([]);
  const [color, setColor] = useState("#FF0000");
  const [inputText, setInputText] = useState("");
  const [serach, setSerach] = useState("");
  const filteredTodos = allTodo.filter((todo) =>
    todo.todo.toLowerCase().includes(serach.toLowerCase())
  );
  // ✅ فقط یک بار هنگام بارگذاری، todoها را از localStorage بگیر
  useEffect(() => {
    try {
      const saved = localStorage.getItem("todo");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setAllTodo(parsed);
      }
    } catch (e) {
      console.error("Error reading todos:", e);
      localStorage.removeItem("todo"); // اگر خراب بود پاک کن
    }
  }, []);

  // ✅ هر بار که allTodo تغییر کرد، ذخیره کن
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(allTodo));
  }, [allTodo]);

  // ✅ افزودن تسک
  const addTodo = () => {
    if (inputText.trim().length < 2) return;
    const newTodo = {
      id: crypto.randomUUID(), // 🔥 یکتا و ایمن‌تر از Math.random
      todo: inputText.trim(),
      done: false,
      color,
    };
    setAllTodo((prev) => [...prev, newTodo]);
    setInputText("");
  };

  // ✅ حذف تسک
  const deleteTodo = (id) => {
    setAllTodo((prev) => prev.filter((t) => t.id !== id));
  };

  // ✅ تغییر وضعیت انجام‌شده
  const toggleDone = (id) => {
    setAllTodo((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

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
          onKeyDown={(e) => e.key === "Enter" && addTodo()} // 🔥 افزودن با Enter
        />
        <CiSquarePlus size={60} onClick={addTodo} className="addtodo" />
      </div>

      <div className="color-picker">
        {COLORS.map((c) => (
          <label key={c}>
            <input
              type="radio"
              name="color"
              checked={color === c}
              onChange={() => setColor(c)}
              style={{ display: "none" }}
            />
            <span
              style={{
                backgroundColor: c,
                width: 25,
                height: 25,
                borderRadius: "50%",
                display: "inline-block",
                cursor: "pointer",
                border: color === c ? "3px solid #333" : "1px solid #ccc",
                margin: 2,
              }}
            />
          </label>
        ))}
      </div>
      <input
        type="text"
        value={serach}
        placeholder="جستجو..."
        onChange={(e) => setSerach(e.target.value)}
        className="search-input"
      />
        <div className="grid">
  {filteredTodos.length > 0 ? (
    filteredTodos.map((todo) => (
      <div
        key={todo.id}
        className="box"
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
            onClick={() => toggleDone(todo.id)}
          />
          <FaRegTrashCan
            size={20}
            className="trashbtn"
            onClick={() => deleteTodo(todo.id)}
          />
        </div>
      </div>
    ))
  ) : (
    <p style={{ textAlign: "center", marginTop: 20 }}>یادداشتی پیدا نشد 🙁</p>
  )}
</div>
    </>
  );
}

export default App;
