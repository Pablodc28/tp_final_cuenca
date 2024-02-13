/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, createContext } from "react";


export const CarritoContext = createContext({
           carrito: [],
           total:0,
           cantidadTotal: 0
})

// Provider del Contexto de Carrito
export const CarritoProvider = ({ children }) => {
    // Estado para el carrito y la cantidad total de productos en el carrito .
    const [carrito, setCarrito] = useState([])                    
    const [total, setTotal] = useState(0);
    const [cantidadTotal, setCantidadTotal] = useState(0);  

    
      const agregarAlCarrito = (item, cantidad) =>{
            const productoExistente = carrito.find(prod => prod.item.id === item.id )  
                        

            if (!productoExistente){                                            
                      setCarrito(prev => [...prev, {item,cantidad}] )
                      setCantidadTotal(prev => prev + cantidad )
                      setTotal(prev => prev + ( item.precio * cantidad ) )
            }else{
                      const carritoActualizado = carrito.map( prod => {
                                  if(prod.item.id === item.id){
                                            return { ...prod , cantidad: prod.cantidad + cantidad};                                                              
                                  }else{
                                            return prod
                                  }
                      })

                      setCarrito(carritoActualizado)
                      setCantidadTotal(prev => prev+ cantidad )
                      setTotal(prev => prev + ( item.precio * cantidad ) )
            }
                                
      }

    

      const eliminarProducto = (id) => {        
        const productoEliminado = carrito.find(prod  => prod.item.id === id)

                      const carritoActualizado = carrito.filter(prod => prod.item.id !== id) ;

                      setCarrito(carritoActualizado)
                      setCantidadTotal( prev => prev - productoEliminado.cantidad)
                      setTotal( prev => prev - ( productoEliminado.item.precio * productoEliminado.cantidad ))                      
      }


           //       vaciar carito
      const vaciarCarrito = ()=>{
        setCarrito([])
        setCantidadTotal(0)
        setTotal(0)
      }

      

      return (

                      <CarritoContext.Provider value={{ carrito, total, cantidadTotal, agregarAlCarrito , vaciarCarrito, eliminarProducto}}>
                                 {children}
                      </CarritoContext.Provider>
      )







}
        