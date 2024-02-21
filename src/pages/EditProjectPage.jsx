import { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../utils/api";
import { useParams, useNavigate } from "react-router-dom";

const EditProjectPage = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/projects/${params.projectId}`
        );
        console.log(response);

        setTitle(response.data.title);
        setDescription(response.data.description);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [params.projectId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${API_URL}/projects/${params.projectId}`, {
        title: title,
        description: description,
      });
      //tenemos la flexibilidad sobre lo que queremos que ocurra cuando se borra el documneto
      navigate(`/projects/${params.projectId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProject = () => {
    // ...delete logic should be here
    axios
      .delete(`${API_URL}/projects/${params.projectId}`)
      .then(() => {
        //tenemos la flexibilidad sobre lo que queremos que ocurra cuando se borra el documneto
        navigate("/projects");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="EditProjectPage">
      <h3>Edit the Project</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Update Project</button>
      </form>

      <button onClick={deleteProject}>Delete Project</button>
    </div>
  );
};

export default EditProjectPage;

/*
DIFERENCIA DE LAS RUTAS DE FRONTEND Y BACKEND 
RUTAS DE FRONTED : Son para navgacion del usuario en las paginas.
Son definidad en: App.jsx
Donde las usamos ? : Link, useNavigate, Navigate

Rutas de Backend: Son los accesos para buscar data externa
Son definidas por el Backend: Las vemos en el cuadro de documentacion de backend
Donde las usamos: axios o fetch
*/
