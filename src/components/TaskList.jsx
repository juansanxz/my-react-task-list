import { useEffect, useRef, useState } from "react";
import { Task } from "./Task";

export const TaskList = (props) => {
    const [list, setList] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const editTitleRef = useRef(null);
    const editDescriptionRef = useRef(null);
    const [currentTaskToEdit, setCurrentTaskToEdit] = useState(0);


    const handleToggleState = (taskTitle) => {
        const updatedTasks = list.map((task) => {
            if ( taskTitle == task.title) {
                return { ...task, state: !task.state };
            }
            return task;
        });
        setList(updatedTasks); 
    };

    const handleDeleteClick = (taskTitle) => {
        const updatedTasks = list.filter((task) => taskTitle != task.title );
        setList(updatedTasks); 
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    const handleEditClick = (taskTitle) => {
        setCurrentTaskToEdit(taskTitle);
        openEditPopup();
    };

    const handleEditTask = () => {
        const newTaskTitle = editTitleRef.current.value.trim();
        const newTaskDescription = editDescriptionRef.current.value.trim();
        const updatedTasks = list.map((task) => {
            if (currentTaskToEdit == task.title) {
                
                return { ...task, title: newTaskTitle, description: newTaskDescription };
            }
            return task;
        });
        setList(updatedTasks); 
        closeEditPopup();
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };


    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const openEditPopup = () => {
        setIsEditPopupOpen(true);
    };

    const closeEditPopup = () => {
        setIsEditPopupOpen(false);
    };

    function addTask() {
        const newTaskTitle = titleRef.current.value.trim();
        const newTaskDescription = descriptionRef.current.value.trim();
        let updatedTasks = [...list];
        if (newTaskDescription !== "") {
            const newTask = {
                title: newTaskTitle,
                description: newTaskDescription,
                state: false
            };
            updatedTasks = [...updatedTasks, newTask];
            setList([...list, newTask]);
            closePopup();
            
        }
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    useEffect(() => {
        const localStorageData = localStorage.getItem("tasks");
        const storedTasks = JSON.parse(localStorageData);
        setList(storedTasks);
    }, [])


    return (
        <ul>
            <div>
                <button onClick={openPopup}>Add Task</button>
                {list.map((task) => (
                    <Task key={task.title} title={task.title} description={task.description} state={task.state} onToggleState={handleToggleState} onDeleteClick={handleDeleteClick} onEditClick={handleEditClick} />
                ))}
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
                    <button onClick={addTask}>Add Task</button>
                    <button onClick={closePopup}>Cancel</button>
                </div>
            )}
            {isEditPopupOpen && (
                <div className="editpopup">
                    <h2>Edit task</h2>
                    <input 
                        type="text" 
                        placeholder="Enter new title" 
                        ref={editTitleRef} 
                    />
                    <input
                        type="text" 
                        placeholder="Enter new description" 
                        ref={editDescriptionRef} 
                    />
                    <button onClick={handleEditTask}>Edit Task</button>
                    <button onClick={closeEditPopup}>Cancel</button>
                </div>
            )}
            
        </ul>
    )
}