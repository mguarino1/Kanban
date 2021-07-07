import React, { useState } from 'react'
import './App.css'

function App() {
  
  type CardState = "Blocked" | "Next" | "InProgress" | "Completed";
  const states = ["Blocked", "Next", "InProgress", "Completed"] as const;

  interface Card {
    text: string;
    id: number;
    column: CardState;
  }

  const [taskList, setTaskList] = useState<Card[]>([
    {text: "Test: Test Card", id: 0, column: "Next"}
  ]);
  const [inputs, setInputs] = useState({
    task: '',
    desc: '',
  });

  const submit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    alert(inputs.task + ' ' + inputs.desc)
    const newTask: Card = {
      text: inputs.task+': '+inputs.desc,
      id: taskList.length,
      column: states[1],
    };
    setTaskList(taskList => [...taskList, newTask]) 
  }

  const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));
  }

  const back = (target: number) => {
    let copy = JSON.parse(JSON.stringify(taskList));
    for(var i=0; i<copy.length; i++) {
      if(copy[i].id===target && copy[i].column !== "Blocked") {
        copy[i].column = states[states.indexOf(copy[i].column)-1]
      }
    }
    setTaskList(copy);
  }

  const forward = (target: number) => {
    let copy = JSON.parse(JSON.stringify(taskList));
    for(var i=0; i<copy.length; i++) {
      if(copy[i].id===target && copy[i].column !== "Completed") {
        copy[i].column = states[states.indexOf(copy[i].column)+1]
      }
    }
    setTaskList(copy);
  }

  return (
    <div className="App">
      <div className="Container">
        <div className="AddTask">
          <form onSubmit={submit}>
            <label>
              Task Name:
              <input 
                type="text"
                placeholder="Task"
                name="task"
                value={inputs.task}
                onChange={handleInputChange}
                />
            </label>
            <label>
              Description:
              <input
                type="text"
                placeholder="Description"
                name="desc"
                value={inputs.desc}
                onChange={handleInputChange}
                />
            </label>
            <button type="submit">Add Task</button>
          </form>
        </div>
        <div className="Tasks">
          <div className="TaskColumn">
          {taskList.map((entry) => {
              if(entry.column==="Blocked") {
                return(
                <div className="TaskItem" key={entry.id}>
                  <button onClick={() => back(entry.id)} name="back"/>
                  <button onClick={() => forward(entry.id)} name="forward"/>
                  {entry.text}
                </div>)
              }
            })}
          </div>
          <div className="TaskColumn">
            {taskList.map((entry) => {
              if(entry.column==="Next") {
                return(
                <div className="TaskItem" key={entry.id}>
                  <button onClick={() => back(entry.id)} name="back"/>
                  <button onClick={() => forward(entry.id)} name="forward"/>
                  {entry.text}
                </div>)
              }
            })}
          </div>
          <div className="TaskColumn">
          {taskList.map((entry) => {
              if(entry.column==="InProgress") {
                return(
                <div className="TaskItem" key={entry.id}>
                  <button onClick={() => back(entry.id)} name="back"/>
                  <button onClick={() => forward(entry.id)} name="forward"/>
                  {entry.text}
                </div>)
              }
            })}
          </div>
          <div className="TaskColumn">
          {taskList.map((entry) => {
              if(entry.column==="Completed") {
                return(
                <div className="TaskItem" key={entry.id}>
                  <button onClick={() => back(entry.id)} name="back"/>
                  <button onClick={() => forward(entry.id)} name="forward"/>
                  {entry.text}
                </div>)
              }
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
