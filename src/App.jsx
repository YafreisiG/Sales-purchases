import { useState, useEffect } from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db"


function App() {


   const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
   }
  //State 
  const [data] = useState(db)
  const [cart, setCart] = useState([])

  const MAX_ITEMS = 10

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(item) {
    const itemExists = cart.findIndex(guitar => guitar.id === item.id)
    if(itemExists >= 0){
      console.log('Ya Existe...')
      const updateCart = [...cart]
      updateCart[itemExists].guantity++
      setCart(updateCart)
    } else {
      item.guantity = 1
      console.log('Up! No Existe...Agregando...')
      setCart(prevCart => [...prevCart, item])
    }
    
  }

  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  function incrementoQuantity(id){
   const actualizarCart = cart.map(item =>{
    if(item.id === id && item.guantity < MAX_ITEMS ) {
      return {
        ...item,
        guantity: item.guantity + 1 
      }
    }
    return item
   })
   setCart(actualizarCart)

  }

  function decrementarQuantity(id){
    const atrasCart = cart.map(item =>{
      if(item.id === id && item.guantity < MAX_ITEMS ) {
        return {
          ...item,
          guantity: item.guantity - 1 
        }
      }
      return item
     })
     setCart(atrasCart)
  }

  function clearCart(e){
    setCart([])
  }




  return (
    <>
    <Header
      cart={cart}
      removeFromCart ={removeFromCart}
      incrementoQuantity ={incrementoQuantity}
      decrementarQuantity={decrementarQuantity}
      clearCart={clearCart}
    />
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map ((guitar) => {

            return (
               <Guitar
               
               key={guitar.id}
               guitar ={guitar}
               setCart ={setCart}
               addToCart ={addToCart}
               
               
               />
            )
          })}
         
          
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

    </>
  )
}

export default App
