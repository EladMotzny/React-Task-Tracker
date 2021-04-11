import { useState } from 'react' //Hook
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'


const App = () => {

  const [showTaskForm, setShowTaskForm] = useState(false)

  const [tasks, setTasks] = useState([
    {
        id: 1,
        text: 'Send Resume',
        day: 'Apr 11th at 17:45',
        reminder: true,
    },
    {
        id: 2,
        text: 'Send forms',
        day: 'Apr 12th at 18:00',
        reminder: false,
    },
    {
        id: 3,
        text: 'Call grandpa',
        day: 'Apr 11th at 12:00',
        reminder: true,
    }
])

  //Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) +1
    const newTask = {id, ...task}
    setTasks([...tasks, newTask])
  }


  //Delete task, passing it all the way down to Task.js (App.js -> Tasks.js -> Task.js) which calls this function when there is a click on the X
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Toggle reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task))
  }

  return (
    <div className="container">
      <Header onAdd={() => setShowTaskForm(!showTaskForm)} showForm={showTaskForm}/>
      {showTaskForm && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'There are no tasks'}
    </div>
  );
}

export default App;
