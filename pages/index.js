import { ArrowNarrowRightIcon } from "@heroicons/react/outline";
import Head from "next/head";
import { useState, useEffect, useRef } from "react";

import Todo from "../components/Todo";
export default function Home() {
  useEffect(() => {
    getLocalTodos();
    getQuote();
    getLocalUserName();
  }, []);
  useEffect(() => {
    saveLocalTodos();
    saveLocalUserName();
  });
  const userNameRef = useRef("");

  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [quote, setQuote] = useState("");
  const [userName, setUserName] = useState("");

  const inputTextHandler = e => {
    setInputText(e.target.value);
  };
  const userNameHandler = e => {
    e.preventDefault();

    const form = document.querySelector("#userNameForm");
    form.classList.add("animate-fade-out");
    setTimeout(() => {
      setUserName(userNameRef.current.value.trim().toLocaleUpperCase());
    }, 800);
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
  const saveLocalUserName = () => {
    localStorage.setItem("userName", JSON.stringify(userName));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let localStorageTodos = JSON.parse(localStorage.getItem("todos"));
      setTodos(localStorageTodos);
    }
  };

  const getLocalUserName = () => {
    let localStorageUserName = JSON.parse(localStorage.getItem("userName"));
    setUserName(localStorageUserName);
    console.log(localStorageUserName);
  };

  // fetch quote from api
  const getQuote = async () => {
    const quote = await fetch("https://api.quotable.io/random")
      .then(res => res.json())
      .then(res => setQuote(res))
      .catch(err => console.log(err));
    return quote;
  };

  return (
    <div className='flex flex-col realtive min-h-screen py-2 md:max-w-3xl md:m-auto '>
      <Head>
        <title>Do it Today!</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {userName ? (
        <main className='flex flex-col h-screen items-center justify-center p-2 md:p-7 '>
          <p className='w-full mb-24 text-xl'>
            Welcome Back{" "}
            <span className='font-bold'>{userName.toLocaleUpperCase()}</span>{" "}
          </p>
          <div className='mb-12 w-full animate-fade-in'>
            <p className='text-sm font-semibold'>{quote.content}</p>
            <small className='text-gray-400'>{quote.author}</small>
          </div>
          <form className=' w-full flex items-start space-x-3'>
            <input
              className=' w-full py-2 border-b-2 border-black  mb-12 focus:outline-none text-sm lg:text-3xl '
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
              <Todo
                key={todo.id}
                todo={todo}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
          </section>
        </main>
      ) : (
        <form
          id='userNameForm'
          className='flex space-x-4 items-center justify-center h-screen w-full '>
          <input
            type='text'
            ref={userNameRef}
            className='text-2xl md:text-4xl outline-none border-b-2 border-black py-2 '
            placeholder='YOUR NAME PLEASE!'
          />

          <button onClick={userNameHandler} type='submit'>
            <ArrowNarrowRightIcon className=' h-9 animate-bounce mt-5 p-1 hover:bg-black hover:text-white hover:shadow-xl hover:rounded-full transition-all duration-900' />
          </button>
        </form>
      )}
    </div>
  );
}
