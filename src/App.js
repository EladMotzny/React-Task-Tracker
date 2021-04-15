import { useState, useEffect } from 'react' //Hook
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'


const App = () => {

  const [showTaskForm, setShowTaskForm] = useState(false)

  const [tasks, setTasks] = useState([])

  //useEffect is used when you want something to happen when the page loads.
  //In this case, pull the tasks from the json server
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  //Fetch tasks from server
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  //Get a specific task using the id
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }


  //Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const data = await res.json()

    setTasks([...tasks, data])
    /*const id = Math.floor(Math.random() * 10000) +1
    const newTask = {id, ...task}
    setTasks([...tasks, newTask])*/
  }


  //Delete task, passing it all the way down to Task.js (App.js -> Tasks.js -> Task.js) which calls this function when there is a click on the X
  const deleteTask = async (id) => {
    //From server
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = { ...taskToToggle, 
      reminder: !taskToToggle.reminder}
    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()

    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))
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
