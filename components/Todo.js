import { CheckCircleIcon, TrashIcon } from "@heroicons/react/outline";
import { useState } from "react";

function Todo({ todo, todos, setTodos }) {
  const deleteHandler = () => {
    setTodos(todos.filter(el => el.id !== todo.id));
  };

  const completedHandler = () => {
    setTodos(
      todos.map(item => {
        if (item.id === todo.id) {
          return {
            ...item,
            isCompleted: !item.isCompleted,
          };
        }
        return item;
      })
    );
    console.log(todos);
  };

  return (
    <div className='flex justify-between items-center p-8 mb-3 animate-fade-in  group hover:shadow-xl transition duration-600 border rounded-md hover:border-transparent'>
      <p
        className={
          todo.isCompleted
            ? "font-semibold text-md text-green-500 line-through"
            : "font-semibold text-md "
        }>
        {todo.text}
      </p>
      <div className='flex space-x-2 '>
        <TrashIcon
          className=' hidden w-6 text-red-500 group-hover:inline-flex'
          onClick={deleteHandler}
        />

        <CheckCircleIcon
          className={todo.isCompleted ? "  w-6 text-green-500  " : "w-6 "}
          onClick={completedHandler}
        />
      </div>
    </div>
  );
}

export default Todo;
