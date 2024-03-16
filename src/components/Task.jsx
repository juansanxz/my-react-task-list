export const Task = (props) => {
    const { title, description, state, onToggleState, onDeleteClick, onEditClick} = props;


    function handleSelectCheckBox() {
        onToggleState(title);
    }

    function handleDeleteClick() {
        onDeleteClick(title);
    }

    function handleEditClick() {
        onEditClick(title);
    }

    return (
        <div>
            <input type="checkbox" checked={state} onChange={handleSelectCheckBox}/>
            <span>{title}</span> <br></br>
            <span>Description: {description}</span>
            <button onClick={handleEditClick}>Edit task</button>
            <button onClick={handleDeleteClick}>Delete task</button>
        </div>
    )
}