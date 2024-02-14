import { useState, useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";

import { db } from "../../services/config";
import { collection, addDoc, updateDoc, getDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";
import "./CheckoutStyle.css";
import { Link  } from "react-router-dom"


const Checkout = () => {
  const { carrito, vaciarCarrito, total, eliminarProducto } = useContext(CarritoContext);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirmacion, setEmailConfirmacion] = useState("");

  const [ordenId, setOrdenId] = useState("");
  const [error, setError] = useState("");


  const manejadorSubmit =(event) =>{
    event.preventDefault()

    if( !nombre || !apellido || !telefono || !email || !emailConfirmacion){
      setError("IMPORTANTE: Por favor completa todos los campos ! ");
      return
    }

    // Validamos que el email coincida:
    if(email !== emailConfirmacion) {
       setError("Los emails no coinciden, verifique los email ingresados")
       return
    }

    const orden = {
      items: carrito.map(producto =>({
        id: producto.item.id,
        nombre: producto.item.nombre,
        cantidad: producto.cantidad
      })),
      total,
      fecha: new Date(),
      cliente:{
        nombre,
        apellido,
        telefono,
        email
      }
    };


    Swal.fire({
      title: `Hola ${nombre}, ${apellido} `,
      text: `Confirmar la Orden por el importe Total de: ${total}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Confirmar!"
      
    }).then((result) => {                            
      if (result.isConfirmed) {
        Promise.all(
          orden.items.map( async(productoOrden) =>{
  
              const productoRef = doc(db, "productos", productoOrden.id);
              const productoDoc = await getDoc(productoRef);
              const stockActual = productoDoc.data().stock;
  
              await updateDoc( productoRef, {stock: stockActual - productoOrden.cantidad}  );
  
          })   
          
        ).then(()=>{
            addDoc(collection(db,"ordenes"), orden)
            .then(docRef =>{
              setOrdenId(docRef.id)
              vaciarCarrito();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Orden Registrada",
                text: "Gracias por su compra !!",
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 1500
              });
            })
            .catch(error => console.log("Error al guardar la orden en el servidor", error))
        })
        .catch( error => {
          console.log("Hubo un problema con los datos de los productos", error)        
          setError("Error  al procesar su pedido");
        });

         
      }
    })    

  
  }
 



  


  return (

    <div className="container">
      <h2>Checkout -Finalizar compra</h2>

      <table className="table table-striped table-hover my-3">
        <thead>
          <tr>          
            <th scope="col">Imagen</th>
            <th scope="col">Nombre</th>
            <th className="text-end" scope="col">Precio Un</th>
            <th className="text-end" scope="col">Cantidad</th>     
            <th className="text-end" scope="col">SubTotal:</th>     
            <th className="text-end" scope="col">Proceso:</th>    
          </tr>
        </thead>
        <tbody>
          {carrito.map((prod) => (   
            <tr key={prod.item.id}>            
              <td> <Link to={`/item/${prod.item.id}`} > <img src={prod.item.img}  className=" object-fit-cover  rounded-circle mx-auto " alt={prod.item.nombre} /> </Link> </td> 
              <td>  {prod.item.nombre} </td>
              <td className="fw-bold text-end"> $ {prod.item.precio} </td>     
              <td className="text-end">  {prod.cantidad} </td>
              <td className="text-end"> $ {Number(prod.cantidad) * Number(prod.item.precio)} </td>
              <td> 
                  <button className="btn btn-outline-danger" onClick={()=>                           
                  Swal.fire({
                    title: `Eliminar el producto ${prod.item.nombre}? `,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si, Eliminar!"                
                  }).then((result) => {                            
                    if (result.isConfirmed) {
                        eliminarProducto(prod.item.id)                             
                        Swal.fire({
                            title: `Producto ${prod.item.nombre} Eliminado!`,
                            text: "el Producto ha sido eliminado ",
                            icon: "success",
                            timer: 1400,
                            timerProgressBar: true,
                          });
                    }
                  })   
                }
                >  <i className="bi bi-trash"></i> </button>
             </td>
            </tr>        
          ))}
        </tbody>
        </table>

        <p className="my-1 fw-bold ms-auto p-2 text-end fs-3 alert alert-info " >TOTAL:  $ {total}</p>

          <hr />
     

      <form className="card p-2">

       

        <div className="row g-2">
        <div className="col-sm-6">  
          <label htmlFor="nombre">Nombre:</label>          
          <input className="form-control"
            type="text"     id="nombre"     name="nombre"
            onChange={(e) => setNombre(e.target.value)}
            required/>
        </div>
        <div className="col-sm-6">
          <label htmlFor="apellido">Apellido:</label>          
          <input className="form-control"
            type="text"    id="apellido"    name="apellido"
            onChange={(e) => setApellido(e.target.value)}
            required/>
        </div>
        </div>
        
        <div>
          <label htmlFor="telefono">Telefono:</label>          
          <input className="form-control"
            type="text"     id="telefono"       name="telefono"
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>

        <div className="row g-2">
        <div className="col-sm-6">
          <label htmlFor="email">Email:</label>          
          <input className="form-control"
            type="email"    id="email"    name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="col-sm-6">
          <label htmlFor="emailConf">Email de Confirmacion:</label>          
          <input className="form-control"
            type="email" id="emailConf"  name="emailConf"
            onChange={(e) => setEmailConfirmacion(e.target.value)}
            required
          />
        </div>
        </div>



          {
            error && <p style={{'color':'red'}}>{error}</p>
          }

          {
           
            ordenId && 
            <div className="alert alert-success my-2 p-3">
              <strong>  Gracias por su compra {nombre} !! Tu numero de Orden es el siguiente: {ordenId} </strong>
              <p id="ordenId" >{ordenId}</p>
            </div> 
          }

          <div className="d-grid gap-2 d-md-block my-5" >
            <button className="btn btn-info  btn-lg mx-5 w-50" disabled={carrito.length===0} onClick={manejadorSubmit}>Finalizar Orden</button>
            <button className="btn btn-warning mx-5 " type="reset">Borrar datos del formulario</button>
          </div>
          
          
      </form>


    </div>
  );
};

export default Checkout;
