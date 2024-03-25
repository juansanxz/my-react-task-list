import { useEffect, useContext } from "react";
import { TaskContext } from "../TaskContext";

export function useTaskOp() {
    const {tasks, dispatch} = useContext(TaskContext);


    function addTask(titleRef, descriptionRef) {
   
        console.log(JSON.stringify(tasks));


        let newTask;

        if (descriptionRef !== "") {
            newTask = {
                title: titleRef,
                description: descriptionRef,
                state: false
            };
        }
        
        
        return newTask;
    };

    function editTask(taskTitle, newTaskTitle, newTaskDescription){
        const updatedTask = tasks.find((task) => task.title === taskTitle);
        if (updatedTask) {
            const editedTask = { ...updatedTask, title: newTaskTitle, description: newTaskDescription };
            return editedTask;
        }
         return null;

    }

    function deleteTask(taskTitle) {
        const updatedTasks = tasks.filter((task) => taskTitle != task.title);

    }




    return [addTask, editTask, deleteTask];
}