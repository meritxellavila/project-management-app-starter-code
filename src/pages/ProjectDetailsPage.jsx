import { Link, useParams } from "react-router-dom";
import AddTask from "../components/AddTask"; // for rendering Task Add Form
import TaskCard from "../components/TaskCard"; // for rendering Task List
import { useState } from "react";
import axios from "axios";
import React, { useEffect } from "react";

import API_URL from '../utils/api';

function ProjectDetailsPage() {

  const params = useParams()
  console.log(params)
  
  const [details, setDetails] = useState(null)

  useEffect(() => {
    getData()
  }, []);

  //funcion de => async
  const getData = async () => {
    try {
     // const response = await axios.get(`https://project-management-api-4641927fee65.herokuapp.com/projects/${params.id}`);
      const response = await axios.get(`${API_URL}/projects/${params.projectId}?_embed=tasks`);
      // con ?_embed=tasks le pedimos adicionalmente todas las tareas relacionadas con este proyecto.
      console.log(response.data)
      setDetails(response.data)
      
    } catch (error) { 
      console.log(error)
    }
  }
  if (details === null) {
    return <h4>...buscando</h4>
  }

  return (
    <div className="ProjectDetailsPage">
      
        <div>
          <h1>{details.title}</h1>
          <p>{details.description}</p>
        </div>
      

      {/* ... list of all Tasks for this Project should be rendered here */}
{details.tasks.map ((eachTask) => {
  return <TaskCard key= {eachTask.id} {...eachTask}/> 
})}


      {/* ... form for adding a new Task should be rendered here    */}
<AddTask projectId = {details.projectId} getData = {getData}/>

      <Link to="/projects">
        <button>Back to projects</button>
      </Link>

      <Link to={`/projects/edit/${details.id}`}>
        <button>Edit Project</button>
      </Link>
    </div>
  );
}

export default ProjectDetailsPage;
