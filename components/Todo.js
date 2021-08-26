import { CheckCircleIcon, TrashIcon } from "@heroicons/react/outline";

function Todo({ todo, todos, setTodos }) {
  const deleteHandler = () => {
    const todoContainer = document.querySelector("#todoContainer");
    todoContainer.classList.remove("animate-fade-in");
    todoContainer.classList.add("animate-fade-out");
    setTimeout(() => {
      setTodos(todos.filter(el => el.id !== todo.id));
    }, 500);
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
    <div
      id='todoContainer'
      className='flex justify-between items-center h-8 md:h-auto px-2 py-5 sm:p-3 mb-3 md:p-5 xl:p-8 border border-gray-200 animate-fade-in  group hover:shadow-xl transition duration-200  rounded-md hover:border-transparent dark:text-white dark:shadow-2xl  dark:border-transparent '>
      <p
        className={
          todo.isCompleted
            ? "font-semibold text-md text-green-500 line-through "
            : "font-semibold text-md transition-text "
        }>
        {todo.text}
      </p>
      <div className='flex space-x-2 '>
        <TrashIcon
          className=' hidden w-6 text-red-500 group-hover:inline-flex cursor-pointer active:scale-90 transition duration-150'
          onClick={deleteHandler}
        />

        <CheckCircleIcon
          className={
            todo.isCompleted
              ? "  w-6 text-green-500 cursor-pointer transition-all duration-900 active:scale-90  "
              : "w-6 cursor-pointer transition-all duration-900 active:scale-90  "
          }
          onClick={completedHandler}
        />
      </div>
    </div>
  );
}

export default Todo;
