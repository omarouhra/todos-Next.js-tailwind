import Head from "next/head";
import { useState, useEffect } from "react";
import Todo from "../components/Todo";

export default function Home() {
  useEffect(() => {
    getLocalTodos();
  }, []);
  useEffect(() => {
    saveLocalTodos();
  });
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);

  const inputTextHandler = e => {
    setInputText(e.target.value);
  };

  const submitForm = e => {
    e.preventDefault();

    if (inputText.trim()) {
      setTodos([
        ...todos,
        {
          text: inputText.toLocaleUpperCase(),
          isCompleted: false,
          id: Math.random() * 10,
        },
      ]);
    }
    setInputText("");
  };
  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let localStorageTodos = JSON.parse(localStorage.getItem("todos"));
      setTodos(localStorageTodos);
    }
  };

  return (
    <div className='flex flex-col realtive min-h-screen py-2 md:max-w-2xl md:m-auto '>
      <Head>
        <title>Do it Today!</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {todos.length > 0 ? (
        <div className='flex items-center justify-center w-7 h-7 absolute top-3 right-3  bg-black rounded-full animate-fade-in lg:right-1/4'>
          <p className=' text-white '>{todos.length}</p>
        </div>
      ) : (
        <p></p>
      )}
      <main className='flex flex-col h-screen items-center justify-center p-7 '>
        <form className=' w-full flex items-start space-x-3'>
          <input
            className=' w-full border-b-2 border-black  mb-12 focus:outline-none text-sm lg:text-3xl '
            type='text'
            value={inputText}
            placeholder='Do it today, TODAY! ....'
            onChange={inputTextHandler}
          />
          <button
            className=' w-8 h-8    border md:text-xl md:w-12 md:h-12 hover:bg-black hover:text-white transition duration-400 active:scale-90 hover:shadow-xl'
            type='submit'
            onClick={submitForm}>
            +
          </button>
        </form>
        <section className=' h-2/3  w-full overflow-auto'>
          {todos.map(todo => (
            <Todo key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />
          ))}
        </section>
      </main>
    </div>
  );
}
