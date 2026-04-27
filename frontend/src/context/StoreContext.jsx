import { createContext, useState, useEffect } from "react"
import axios from "axios"

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

  const [cartItems, setCartItems] = useState({})
  const [token, setToken] = useState("")
  const [food_list, setFoodList] = useState([])

  const url = "http://localhost:4000"

  // ================= ADD TO CART =================
  const addToCart = async (itemId) => {

    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }))

    if (token) {
      try {
        await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { token } }
        )
      } catch (err) {
        console.log("Add to cart error:", err)
      }
    }
  }

  // ================= REMOVE FROM CART =================
  const removeFromCart = async (itemId) => {

    setCartItems((prev) => {
      const updated = { ...prev }

      if (!updated[itemId]) return prev

      updated[itemId] -= 1

      if (updated[itemId] <= 0) {
        delete updated[itemId]
      }

      return updated
    })

    if (token) {
      try {
        await axios.post(
          url + "/api/cart/remove",
          { itemId },
          { headers: { token } }
        )
      } catch (err) {
        console.log("Remove cart error:", err)
      }
    }
  }

  // ================= TOTAL PRICE =================
  const getTotalCartAmount = () => {
    let total = 0

    for (const itemId in cartItems) {
      const itemInfo = food_list.find(
        (product) => product._id === itemId
      )

      if (itemInfo) {
        total += itemInfo.price * cartItems[itemId]
      }
    }

    return total
  }

  // ================= FETCH FOOD LIST =================
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list")
      setFoodList(response.data.data)
    } catch (error) {
      console.log("Food list error:", error)
    }
  }

  // ================= LOAD CART FROM BACKEND =================
  const loadCartData = async (token) => {
    try {
      const response = await axios.get(
        url + "/api/cart/get",
        { headers: { token } }
      )

      if (response.data.success) {
        setCartItems(response.data.cartData || {})
      }

    } catch (error) {
      console.log("Cart load error:", error)
    }
  }

  // ================= SAVE CART (LOCALSTORAGE BACKUP) =================
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }, [cartItems])

  // ================= INITIAL LOAD (FIXED LOGIC) =================
  useEffect(() => {

    const loadData = async () => {

      await fetchFoodList()

      const storedToken = localStorage.getItem("token")

      if (storedToken) {
        setToken(storedToken)

        // 🔥 ONLY BACKEND CART (source of truth when logged in)
        await loadCartData(storedToken)

      } else {
        // 🔥 GUEST CART ONLY FROM LOCAL STORAGE
        const savedCart = localStorage.getItem("cartItems")
        if (savedCart) {
          setCartItems(JSON.parse(savedCart))
        }
      }
    }

    loadData()

  }, [])

  // ================= CONTEXT VALUE =================
  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider