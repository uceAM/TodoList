import { useEffect, useState } from 'react'
import { TodoProvider } from "./contexts";
import { TodoForm,TodoItem } from "./components";

function App() {
  const [todos,setTodos] = useState([])
  const addTodo = (todoMsg) =>{
    setTodos([{id:Date.now(),todoMsg:todoMsg,done:false},...todos]);
  };
  // const addTodo = (todoMsg) =>{ // can also use spread syntax here, but call needs to be altered
  //   setTodos([{id:Date.now(),...todo},...todos]);
  // };
  const editTodo = (id,todoMsg) =>{
    setTodos(todos.map((todo)=>{
      return (todo.id === id ) ? {...todo,todoMsg:todoMsg}: todo;
      // if (todo.id === id) { //ternary to if
      //   return {...todo,todoMsg:todoMsg}
      // } else {
      //   return todo;
      // }
      }));
  };
  const deleteTodo = (id) =>{
    setTodos(todos.filter((todo)=>{
      return todo.id !== id;
    }));
  };
  const todoComplete = (id) =>{
    setTodos(todos.map((todo)=>{
       return (todo.id === id) ? {...todo,done:!todo.done}: todo;
      // if (todo.id === id) { //ternary to if
      //   return ({...todo,done:!todo.done})
      // } else {
      //   return todo;
      // }
      }));
  };

  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem("todos"));
      if(todos && todos.length>0){
        setTodos(todos)
      }
  },[])

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])
  return (
    <>
      <TodoProvider value = {{todos,addTodo,editTodo,deleteTodo,todoComplete}}>
        <div className="bg-[#172842] min-h-screen py-8">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">Todo</h1>
            <div className="mb-4">
              {/* Todo form goes here */} 
              <TodoForm/>
            </div>
            <div className="flex flex-wrap gap-y-3">
              {/*Loop and Add TodoItem here */}
              {todos.map((todo)=>{
                return(<div key={todo.id}
                className='w-full'>
                  <TodoItem todo={todo}/>  
                </div>)
              })}
            </div>
          </div>
        </div>
      </TodoProvider>
    </>
  )
}

export default App
