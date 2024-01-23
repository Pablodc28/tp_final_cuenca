
const productos = [
           { id:"1",  nombre: "Pantalon", precio: 2500 , img: '/img/pantalon.jpg', idCat:"1" }, 
           { id: "2", nombre: "Remera", precio: 1500 , img: '/img/Remera.jpg', idCat:"2" }, 
           { id: "3", nombre: "Camisa", precio: 1700 , img: '/img/Camisa.jpg', idCat:"2" }, 
           { id: "4", nombre: "Zapato", precio: 3500 , img: '/img/Zapato.jpg', idCat:"3" }, 
           { id: "5", nombre: "Guantes", precio: 1200 , img: '/img/Guantes.jpg', idCat:"3" }, 
]


export const getProductos = () => {
           return new Promise( (resolve) => {
                      setTimeout(() => {
                                 resolve(productos)    
                      }, 2000);
           })
}

export const getUnProducto = (id) => {
           return new Promise( (resolve) => {
                      setTimeout(() => {
                                 const producto = productos.find(prod  => prod.id === id );
                                 resolve(producto);
                      }, 2000)
           })
}

export const getProductosPorCategoria = (idCategoria) =>{
           return new Promise(resolve =>{
                      setTimeout(() =>{
                                 const productosCategoria = productos.filter(prod  => prod.idCat === idCategoria );
                                 resolve(productosCategoria);          
                      }, 2000)

           })
}


