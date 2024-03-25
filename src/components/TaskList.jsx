import { useEffect, useReducer, useRef, useState } from "react";
import { Task } from "./Task";
import { TaskContext } from "../TaskContext";
import { taskReducer } from "../reducers/TaskReducer";
import { useTaskOp } from "../hooks/useTaskOp";

export const TaskList = (props) => {

    const [{tasks}, dispatch] = useReducer(taskReducer, {tasks: []});
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [addTask, , ] = useTaskOp();

  
    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };


    function handleAddTask() {
        const newTask = addTask(titleRef.current.value.trim(), descriptionRef.current.value.trim());
        dispatch({type:"addTask", payload:newTask});
        
        closePopup();
    };

    useEffect(() => {
        const localStorageData = localStorage.getItem("tasks");
        const storedTasks = JSON.parse(localStorageData);
        if (storedTasks !== null) {
            dispatch({ type: "loadTasks", payload: storedTasks });
        }
       
    }, [])

    return (
        <ul>
            <div>
                <button onClick={openPopup}>Add Task</button>
                <TaskContext.Provider value={{ tasks, dispatch }}>
                    {tasks != null  && tasks.length > 0 && tasks.map((task, index) => (
                    task && <div key={task.title}>
                                <Task key={task.title} title={task.title} description={task.description} state={task.state} />
                             </div>
                    ))}
                </TaskContext.Provider>

            </div>
            {isPopupOpen && (
                <div className="popup">
                    <h2>Add New Task</h2>
                    <input
                        type="text"
                        placeholder="Enter title"
                        ref={titleRef}
                    />
                    <input
                        type="text"
                        placeholder="Enter description"
                        ref={descriptionRef}
                    />
                    <button onClick={handleAddTask}>Add Task</button>
                    <button onClick={closePopup}>Cancel</button>
                </div>
            )}

        </ul>
    )
}