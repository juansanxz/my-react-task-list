import { useState, useContext, useRef } from "react";
import { TaskContext } from "../TaskContext";
import { useTaskOp } from "../hooks/useTaskOp";


export const Task = (props) => {
    const { title, description, state} = props;
    const {dispatch} = useContext(TaskContext); 
    const [, editTask, deleteTask] = useTaskOp();
   
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const editTitleRef = useRef(null);
    const editDescriptionRef = useRef(null);

    function handleSelectCheckBox() {
       dispatch({type:"toggle", taskTitle:title});
    }


    const handleDeleteClick = () => {
        deleteTask(title);
        dispatch({type: "deleteTask", taskTitle: title})
    };

    const handleEditClick = () => {
        openEditPopup();
    };

    const handleEditTask = () => {
        const newTaskTitle = editTitleRef.current.value.trim();
        const newTaskDescription = editDescriptionRef.current.value.trim();
        const editedTask = editTask(title, newTaskTitle, newTaskDescription);
        dispatch({ type: "updateTask", taskTitle: title, editedTask: editedTask });
        closeEditPopup();
    };


    const openEditPopup = () => {
        setIsEditPopupOpen(true);
    };

    const closeEditPopup = () => {
        setIsEditPopupOpen(false);
    };


    return (
        <div>
            <input type="checkbox" checked={state} onChange={handleSelectCheckBox}/>
            <span>{title}</span> <br></br>
            <span>Description: {description}</span><br></br>
            <button onClick={handleEditClick}>Edit task</button>
            <button onClick={handleDeleteClick}>Delete task</button>
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
        </div>
    )
}