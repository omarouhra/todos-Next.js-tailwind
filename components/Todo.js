import { CheckCircleIcon, TrashIcon } from "@heroicons/react/outline";

function Todo({ todo, completed }) {
  return (
    <div className='flex justify-between items-center p-8 mb-3 animate-fade-in  group hover:shadow-xl transition duration-600 border rounded-md hover:border-transparent'>
      <p
        className={
          todo.id
            ? "font-semibold text-md text-green-500"
            : "font-semibold text-md "
        }>
        {todo}
      </p>
      <div className='flex space-x-2 '>
        <TrashIcon className=' hidden w-6 text-red-500 group-hover:inline-flex  ' />

        <CheckCircleIcon
          className={todo.id ? "  w-6 text-green-500  " : "w-6 "}
          onClick={completed}
        />
      </div>
    </div>
  );
}

export default Todo;
