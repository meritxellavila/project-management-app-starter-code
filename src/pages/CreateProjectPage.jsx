import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import API_URL from '../utils/api';

function CreateProjectPage() {

  const navigate = useNavigate ()

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ...logic for creating a new Project should be here
// acceder a la API del servidor para poder crear un nuevo doc en la DB
try {
  const newProject = {
  title: title,
  description: description,
  } // data a enivar al backend
 
  const response = await axios.post(`${API_URL}/projects`, newProject)
//1 Modifica la BD donde se almacenan estos projectos
//2 a veces nos devuelve una info 
navigate("/projects")// ruta de FE

} catch (error) {
  console.log(error); 
} 

};  

const handleTitleChange = (e) => setTitle(e.target.value);

  return (
    <div className="CreateProjectPage">
      <h3>Add Project</h3>

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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateProjectPage;