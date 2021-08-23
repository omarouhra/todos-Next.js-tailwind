import { CheckCircleIcon, TrashIcon } from "@heroicons/react/outline";

function Todo({ todo, todos, setTodos }) {
  const deleteHandler = () => {
    setTodos(todos.filter(el => el.id !== todo.id));
  };

  return (
    <div className='flex justify-between items-center p-8 mb-3 animate-fade-in  group hover:shadow-xl transition duration-600 border rounded-md hover:border-transparent'>
      <p className='font-semibold text-md text-green-500'>{todo.text}</p>
      <div className='flex space-x-2 '>
        <TrashIcon
          className=' hidden w-6 text-red-500 group-hover:inline-flex'
          onClick={deleteHandler}
        />

        <CheckCircleIcon
          className={todo.isCompleted ? "  w-6 text-green-500  " : "w-6 "}
          onClick={() => {}}
        />
      </div>
    </div>
  );
}

export default Todo;
