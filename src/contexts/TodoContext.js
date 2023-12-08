import { createContext,useContext } from "react";

export const todoContext = createContext({
    todos:[
        //todo = {
            //id :id
            //todoMsg = todoMsg
            //done = bool
        //}
    ],
    addTodo: (todoMsg) => {},
    editTodo: (id,todoMsg) => {},
    deleteTodo: (id) => {},
    todoComplete: (id) => {}
});

export const useTodo = ()=>{
    return useContext(todoContext);
}

export const TodoProvider = todoContext.Provider;