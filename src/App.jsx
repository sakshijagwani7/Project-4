import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
// ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

function App() {
  const [todo, setTodo] = useState("")  //this will handle input
  const [todos, setTodos] = useState([])  //this will handle array
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, [])

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const toggleFinished = (e) => {
    setShowFinished(!showFinished);
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo);
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos);
    saveToLS
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos);
    saveToLS
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("");
    console.log(todos);
    saveToLS
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    console.log(`The id is ${id}`);
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    console.log(index);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    console.log(newTodos, todos)
    saveToLS
  }

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 bg-blue-100 rounded-xl p-5 min-h-[80vh] md:w-[35%]">
        <h1 className='font-bold text-center text-2xl'>iTask-Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-xl font-bold'>Add a Todo</h2>
          <div className="flex">
            <input onChange={handleChange} value={todo} type="text" className='w-full px-5 py-1 rounded-full' />
            <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-blue-800 hover:bg-blue-950 rounded-full text-white disabled:bg-blue-600 p-4 py-2 mx-2 text-md'>Save</button>
          </div>
        </div>
        <input type="checkbox" checked={showFinished} onChange={toggleFinished} className='my-4' />
        <label className='mx-2' htmlFor="show">Show Finished</label>
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        <h2 className='text-lg font-bold'>Your Todos</h2>

        <div className="todos">
          {todos.length === 0 && <div className='mx-2'>No Todos To Display!</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex  justify-between my-3">
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id='' />

                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div>
              </div>

              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-blue-800 hover:bg-blue-950 rounded-md text-white p-2 py-1 mx-1 text-md '><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-blue-800 hover:bg-blue-950 rounded-md text-white p-2 py-1 mx-1 text-md'><RiDeleteBin7Fill /></button>
              </div>

            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
