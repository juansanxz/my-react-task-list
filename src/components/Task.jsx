export const Task = (props) => {
    const { description } = props;

    return (
    <div>
            <input type="checkbox" />
            <span>{description}</span>
        </div>
    )

}