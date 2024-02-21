
import { useState } from "react";
import axios from "axios";
import API_URL from '../utils/api';

function AddTask(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    // ...logic for creating a new Task should be here
    // ... the ID of the Project should be part of the Task data
const newTask = {
title: title,
description: description,
projectId: props.projectId // esta es la propiedad que identifica que esta tarea es del proyecto que estamos viendo.
}
axios.post (`${API_URL}/tasks`, newTask)
.then((response) =>{
  console.log("todo bien, task creado", response);

  //podemos redireccionar ? no
  //podemos refresccar la data (volverla a solicitar)
  props.getData()

  //opcional, borrar los campos con los setTitle y setDescription
})
.catch ((error) => {
  console.log(error)
})
  };
  
  return (
    <div className="AddTask">
      <h3>Add New Task</h3>
      
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddTask;