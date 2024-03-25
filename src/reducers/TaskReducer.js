export const taskReducer = (state, action) => {
    switch (action.type) {
        case "loadTasks":
            return {
                ...state,
                tasks: action.payload
            };
            break;

        case "addTask":
            localStorage.setItem("tasks", JSON.stringify([...state.tasks, action.payload]));
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            };
            break;

        case "updateTask":
            const updatedTasks = state.tasks.map((task) => {
                if (action.taskTitle == task.title) {

                    return action.editedTask;
                }
                return task;
            });
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            return {
                ...state,
                tasks: updatedTasks
            };
            break;

        case "deleteTask":
            const deletedTask = state.tasks.filter((task) => task.title !== action.taskTitle);
            localStorage.setItem("tasks", JSON.stringify(deletedTask));
            return {
                ...state,
                tasks: deletedTask
            };
            break;

        case "toggle":
            const updatedToogleTasks = state.tasks.map((task) => {
                if (action.taskTitle == task.title) {

                    return { ...task, state: !task.state };
                }
                return task;
            });
            localStorage.setItem("tasks", JSON.stringify(updatedToogleTasks));
            return {
                ...state,
                tasks: updatedToogleTasks
            };
            break;
    }
    return state;
};
