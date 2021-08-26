import {
  ArrowNarrowRightIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/outline";
import Head from "next/head";
import { useState, useEffect, useRef } from "react";

import Todo from "../components/Todo";
export default function Home() {
  useEffect(() => {
    getLocalTodos();
    getQuote();
    getLocalUserName();
    // getLocalThemeChoice();

    if (!userName) {
      userNameRef.current.focus();
    }
  }, []);
  useEffect(() => {
    saveLocalTodos();
    saveLocalUserName();
    // saveThemChoice();
  });
  const userNameRef = useRef("");
  const todoRef = useRef("");

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
  // const saveThemChoice = () => {
  //   localStorage.setItem("theme", JSON.stringify(isSwitched));
  // };

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
  };

  // const getLocalThemeChoice = () => {
  //   let localStorageThemeChoice = JSON.parse(localStorage.getItem("theme"));
  //   setIsSwitched(localStorageThemeChoice);
  //   console.log(isSwitched);
  // };

  // fetch quote from api
  const getQuote = async () => {
    const quote = await fetch("https://api.quotable.io/random")
      .then(res => res.json())
      .then(res => setQuote(res))
      .catch(err => console.log(err));
    return quote;
  };

  // theme swither
  const [isSwitched, setIsSwitched] = useState(false);

  const swither = () => {
    const toggle = document.querySelector("#switchTheme");
    const page = document.querySelector("html");
    if (isSwitched) {
      toggle.classList.add("translate-x-3");
      page.classList.add("dark");
    } else {
      toggle.classList.remove("translate-x-3");
      page.classList.remove("dark");
    }
    setIsSwitched(!isSwitched);
  };

  return (
    <div className='relative dark:bg-gray-900 transition duration-1000'>
      <section className='flex flex-col  realtive min-h-screen py-2 md:max-w-3xl md:m-auto  '>
        <Head>
          <title>Do it Today!</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <div className='flex items-center space-x-2 absolute top-3 left-1   '>
          <SunIcon className='w-4 text-gray-800 dark:text-gray-600 ' />
          <button
            className='w-9 h-5 bg-gray-300 rounded-full flex items-center px-1 dark:bg-white '
            onClick={swither}>
            <div id='switchTheme' className='swithDot'></div>
          </button>
          <MoonIcon className='w-4 text-gray-400 dark:text-white' />
        </div>
        {userName ? (
          <main className='flex flex-col h-screen items-center justify-center p-2 md:p-7 mt-12'>
            <p className='w-full mb-8 text-xl dark:text-white'>
              Welcome Back{" "}
              <span className='font-bold'>{userName.toLocaleUpperCase()}</span>{" "}
            </p>
            <div className='mb-12 w-full animate-fade-in dark:text-white'>
              <p className='text-sm font-semibold'>{quote.content}</p>
              <small className='text-gray-400'>{quote.author}</small>
            </div>
            <form className=' w-full flex items-start space-x-3'>
              <input
                autoFocus
                className=' w-full py-2 border-b-2 border-black bg-transparent  mb-12 focus:outline-none text-sm lg:text-3xl dark:border-white dark:text-white '
                type='text'
                value={inputText}
                ref={todoRef}
                placeholder='Do it today, TODAY! ....'
                onChange={inputTextHandler}
              />
              <button
                className=' w-8 h-8    border md:text-xl md:w-12 md:h-12 hover:bg-black hover:text-white transition duration-400 active:scale-90 hover:shadow-xl  dark:bg-white dark:hover:bg-transparent'
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
            className='flex space-x-4 items-center justify-center h-screen w-full dark:text-white'>
            <input
              type='text'
              ref={userNameRef}
              className='text-2xl md:text-4xl outline-none border-b-2 bg-transparent border-black py-2 dark:border-white'
              placeholder='YOUR NAME PLEASE!'
            />

            <button onClick={userNameHandler} type='submit'>
              <ArrowNarrowRightIcon className=' h-9 animate-bounce mt-5 p-1 hover:bg-black hover:text-white hover:shadow-xl rounded-full transition-all duration-900 dark:hover:bg-white dark:hover:text-black' />
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
