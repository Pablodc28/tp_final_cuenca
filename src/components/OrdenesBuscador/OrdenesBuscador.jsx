import { useState, useEffect, useRef } from "react";
import { db } from "../../services/config";
import { getDocs, collection, where, query } from "firebase/firestore";

const OrdenesBuscador = () => {  
    const [ordenesRegistradas, setOrdenesRegistradas] = useState([]);    
    const [emailCliente, setEmailCliente] = useState('');
    
    const inputRef = useRef(null);

  useEffect(() => {
    // Asignar el foco al input al montar el componente
    inputRef.current.focus();
  }, []); // El array vacío asegura que useEffect se ejecute solo una vez al montar el componente


    const alCambiarInput = (event) => {
      setEmailCliente(event.target.value);
    };
  
    const accionDelFormulario = (event) => {
      event.preventDefault();
      // lo realizo desde useEffect
    };

        // Función para formatear la fecha como "dd/mm/yyyy" lo busque en internet por que no sabria como hacerlo
      const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000); 
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };
  
    useEffect(() => {
      if (!emailCliente) {
        // Evitar búsquedas vacías
        setOrdenesRegistradas([]);
        return;
      }  
      
      const MisOrdenesBuscador = query(collection(db, "ordenes"), where("cliente.email", "==", emailCliente));

      getDocs(MisOrdenesBuscador)
        .then((snapshot) => {
          let listaOrdenes = snapshot.docs.map((doc) => ({ id: doc.id,...doc.data(),}));
          // console.log("Lista ordenes", listaOrdenes);
          setOrdenesRegistradas(listaOrdenes);
        })
        .catch((error) => {
          console.error("Error al obtener las ordenes:", error);
        });
    }, [emailCliente]);




  return (
    <>
      <div>
        <div className="container">
        <h2>Ordenes y sus productos</h2>

          <form onSubmit={accionDelFormulario} role="search" className="alert alert-info row">
            <label>
              Ingrese su <u>e</u>mail:
              <input ref={inputRef}  className="form-control m-2 w-75" accessKey="e" type="search" value={emailCliente} onChange={alCambiarInput} />
            </label>    
            <div className="form-text">
              Ingrese el email para ver sus ordenes y productos.
            </div>        
          </form>

          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Orden ID:</th>
                <th scope="col">Fecha:</th>
                <th scope="col">Cliente:</th>
                <th scope="col">Total$:</th>
                <th scope="col">Productos y cantidad</th>
              </tr>
            </thead>
            <tbody>
              {ordenesRegistradas.map((orden) => (
                <tr key={orden.id}>
                  <td className="fs-6" >{orden.id}</td>
                  <td>{formatDate(orden.fecha?.seconds) || "N/A"}</td>
                  <td>{orden.cliente.apellido}, {orden.cliente.nombre}</td>
                  <td>{orden.total}</td>
                  <td>
                    <ul className="text-body-secondary">
                      {orden.items.map((item) => (
                        <li key={item.id}>
                         {item.nombre} - son: {item.cantidad} un
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};


export default OrdenesBuscador;
