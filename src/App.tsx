import React, { useState, useRef } from 'react';

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string,
  done: boolean,
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>('');
  const [tasks, setTasks] = useState<ITask[]>([]);
  const inputTask = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask('');
    inputTask.current?.focus();
  }

  const addTask = (name: string): void => {
    const newTasks: ITask[] = [...tasks, { name, done: false }]
    setTasks(newTasks);
  }

  const togleDoneTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks)
  }

  const removeTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(i,1);
    setTasks(newTasks);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  onChange={e => setNewTask(e.target.value)}
                  value={newTask}
                  className='form-control'
                  ref={inputTask}
                  autoFocus
                />
                <button className='btn btn-success btn-block mt-2'>
                  Save
                </button>
              </form>
            </div>
          </div>
          {
            tasks.map((t: ITask, i: number) => (
              <div className="card card-body mt-2" key={i}>
                <h2 style={{ textDecoration: t.done ? 'line-through' : '' }}>{t.name}</h2>
                <div>
                  <button className='btn btn-secundary' onClick={() => togleDoneTask(i)}>
                    {t.done ? '✗' : '✓'}
                    </button>
                    <button className='btn btn-danger ml-4' onClick={() => removeTask(i)}>
                    🗑
                    </button>
                </div>
              </div>
            )
            )}
        </div>
      </div>
    </div>
  );
}

export default App;
