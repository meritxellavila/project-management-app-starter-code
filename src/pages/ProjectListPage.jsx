import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard"; // used to render each Project
import { useState } from "react";
import { useEffect } from "react";
import axios  from "axios";

import API_URL from '../utils/api';

function ProjectListPage() {
  //1.ESTADOS
  const [allProjects, setAllProjects] = useState(null);

  //2.usEffect
  useEffect(() => {
    //anteriormente: fetch(url:).then....
    //cambios:
    //usamos axios en vez de fetch
    //usar async/await en vez de then/catch
    axios.get(`https://project-management-api-4641927fee65.herokuapp.com/projects`)
      
      .then((response) => {
        console.log(response.data);
        setAllProjects(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);

  if (allProjects === null) {
    return <h4>...buscando</h4>;
  }

  return (
    <div className="ProjectListPage">
      <Link to="/projects/create">
        <button>Create Project</button>
      </Link>

      {/* ... list of all projects should be rendered here   */}
      {allProjects.map((eachProject) => {
       // return <ProjectCard key={eachProject.id} eachProject= {eachproject}/>
        return <ProjectCard key={eachProject.id} {...eachProject}/> //pasa los props
      })}

      {/* ... for each project, we should render one ProjectCard */}
    </div>
  );
}

export default ProjectListPage;
