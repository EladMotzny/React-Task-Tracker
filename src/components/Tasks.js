//import { useState } from 'react' //Hook
import Task from './Task'

const Tasks = ({ tasks, onDelete, onToggle }) => {

    /*const [tasks, setTasks] = useState([
        .....
    ])
       whats inside the () is the default (see App.js)
       State is immutable, can't change directly, you need to recreate and send it down
       Its not really a good idea to have it here because we might want to access the useState from other components.
       For a solution you can use the context API or Redux. For this project I will put it in the App.js and then we can pass it down to any component that we want as props
    */
    return (
        <>
            {tasks.map((task) => (
            <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
            ))} {/* Make sure each iteration has a unique key, in this case its the id */}
        </>
    )
}

export default Tasks
