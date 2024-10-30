import { useState } from 'react'
import { Plus, Clock } from 'lucide-react'
import { Input } from "@nextui-org/input"
import { Card, CardHeader, CardBody} from "@nextui-org/card"
import { Button } from "@nextui-org/button"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function TaskQueue() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [taskTime, setTaskTime] = useState(new Date())

  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        name: newTask.trim(),
        time: taskTime
      }
      setTasks([...tasks, task])
      setNewTask('')
      setTaskTime(new Date())
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card
        className=' min-h-96'
      >
        <CardHeader>
          <h3 className="text-2xl font-bold text-center">Task Queue System</h3>
        </CardHeader>
        <CardBody>
          <div className="flex space-x-2 mb-4">
            <Input
              type="text"
              placeholder="Enter new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="flex-grow"
            />
            <DatePicker
              selected={taskTime}

              onChange={(date) => setTaskTime(date)}
              showTimeSelect
              dateFormat="Pp"
              className="flex-grow ab"
            />
            <Button onClick={addTask}>
              <Plus className=" h-4 " /> Add Task
            </Button>
          </div>
          <div className="space-y-2">
            {tasks.map((task, index) => (
              <Card key={task.id} className="bg-blue">
                <CardBody className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-2">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <span className="font-medium">{task.name}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>{task.time.toLocaleString()}</span>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}