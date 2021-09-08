import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';

function App() {
  const baseUrl="http://localhost:/server/prueba_conexion.php";
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [empleadoSeleccionado, setempleadoSeleccionado]=useState({
    emple_id: '',
    emple_nombre: '',
    emple_apellido: '',
    emple_estado: ''
  });

  const handleChange=e=>{
    const {name, value}=e.target;
    setempleadoSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(empleadoSeleccionado);
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPost=async()=>{
    var f = new FormData();
    f.append("emple_nombre", empleadoSeleccionado.emple_nombre);
    f.append("emple_apellidos", empleadoSeleccionado.emple_apellidos);
    f.append("METHOD", "POST");
    await axios.post(baseUrl, f)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
      window.location.href = window.location.href;
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPut=async()=>{
    var f = new FormData();
    f.append("emple_nombre", empleadoSeleccionado.emple_nombre);
    f.append("emple_apellidos", empleadoSeleccionado.emple_apellidos);
    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, {params: {emple_id: empleadoSeleccionado.emple_id}})
    .then(response=>{
      var dataNueva= data;
      dataNueva.map(empleado=>{
        if(empleado.emple_id===empleadoSeleccionado.emple_id){
         empleado.emple_nombre=empleadoSeleccionado.emple_nombre;
          empleado.emple_apellidos=empleadoSeleccionado.emple_apellidos;
          empleado.emple_estado=empleadoSeleccionado.emple_estado;
        }
      });
      setData(dataNueva);
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete=async()=>{
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios.post(baseUrl, f, {params: {emple_id: empleadoSeleccionado.emple_id}})
    .then(response=>{
      setData(data.filter(empleado=>empleado.empleado_id!==empleadoSeleccionado.emple_id));
      abrirCerrarModalEliminar();
      window.location.href = window.location.href;
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccionarFramework=(empleado, caso)=>{
    setempleadoSeleccionado(empleado);

    (caso==="Editar")?
    abrirCerrarModalEditar():
    abrirCerrarModalEliminar()
  }

  useEffect(()=>{
    peticionGet();
  },[])

  return (
    <div style={{textAlign: 'center'}}>
<br />
      <button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()}>Insertar</button>
      <br /><br />
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Lanzamiento</th>
          <th>Desarrollador</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map(empleado=>(
          <tr key={empleado.emple_id}>
            <td>{empleado.emple_id}</td>
            <td>{empleado.emple_nombre}</td>
            <td>{empleado.emple_apellidos}</td>
            <td>{empleado.emple_estado}</td>
          <td>
          <button className="btn btn-primary" onClick={()=>seleccionarFramework(empleado, "Editar")}>Editar</button> {"  "}
          <button className="btn btn-danger" onClick={()=>seleccionarFramework(empleado, "Eliminar")}>Eliminar</button>
          </td>
          </tr>
        ))}


      </tbody> 

    </table>


    <Modal isOpen={modalInsertar}>
      <ModalHeader>Insertar Framework</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Nombre: </label>
          <br />
          <input type="text" className="form-control" name="emple_nombre" onChange={handleChange}/>
          <br />
          <label>Apellidos: </label>
          <br />
          <input type="text" className="form-control" name="emple_apellidos" onChange={handleChange}/>
          <br />
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
      </ModalFooter>
    </Modal>


    
    <Modal isOpen={modalEditar}>
      <ModalHeader>Editar empleado</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Nombre: </label>
          <br />
          <input type="text" className="form-control" name="emple_nombre" onChange={handleChange} value={empleadoSeleccionado && empleadoSeleccionado.emple_nombre}/>
          <br />
          <label>Apellidos: </label>
          <br />
          <input type="text" className="form-control" name="emple_apellidos" onChange={handleChange} value={empleadoSeleccionado && empleadoSeleccionado.emple_apellidos}/>
          <br />
          <label>Estado: </label>
          <br />
          <input type="text" readOnly className="form-control" name="emple_estado" onChange={handleChange} value={empleadoSeleccionado && empleadoSeleccionado.emple_estado}/>
          <br />
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>peticionPut()}>Editar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
      </ModalFooter>
    </Modal>

    <Modal isOpen={modalEliminar}>
        <ModalBody>
        ¿Estás seguro que deseas eliminar al empleado {empleadoSeleccionado && empleadoSeleccionado.emple_nombre}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>peticionDelete()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>abrirCerrarModalEliminar()}
          >
            No
          </button>
        </ModalFooter>
      </Modal>

    </div>
  );
}

export default App;