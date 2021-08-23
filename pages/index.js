// TODO create an input
// TODO add the target value to an array

import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);

  const inputTextHandler = e => {
    setInputText(e.target.value);
  };

  const submitForm = e => {
    e.preventDefault();
    setTodos([
      ...todos,
      {
        text: inputText,
        isCompleted: false,
        id: Math.random() * 10,
      },
    ]);

    setInputText("");
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
        <form className='w-[400px]'>
          <input
            className='border-b border-black w-full focus:outline-none text-5xl '
            type='text'
            placeholder='Enter your task'
            value={inputText}
            onChange={inputTextHandler}
          />
          <button hidden type='submit' onClick={submitForm}>
            GO
          </button>
        </form>

        {todos.map(todo => (
          <p key={todo.id}>{todo.text}</p>
        ))}
      </main>
    </div>
  );
}
