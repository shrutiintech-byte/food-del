import React, { useState, useContext } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"

const LoginPopup = ({ setShowLogin }) => {

  const { url, setToken } = useContext(StoreContext)

  const [currentState, setCurrentState] = useState("Login")

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const onChangeHandler = (event) => {
    const { name, value } = event.target

    setData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const onLogin = async (event) => {
    event.preventDefault()

    try {
      // ✅ Clean URL
      const newUrl =
        currentState === "Login"
          ? `${url}/api/user/login`
          : `${url}/api/user/register`

      // ✅ FIXED PAYLOAD
      const payload =
        currentState === "Login"
          ? {
              email: data.email,
              password: data.password
            }
          : data

      console.log("URL:", newUrl)
      console.log("Payload:", payload)

      const response = await axios.post(newUrl, payload)

      console.log("Response:", response.data)

      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem("token", response.data.token)

        // ✅ Clear form
        setData({
          name: "",
          email: "",
          password: ""
        })

        setShowLogin(false)
      } else {
        alert(response.data.message)
      }

    } catch (error) {
      console.log("FULL ERROR:", error.response?.data || error.message)
      alert(error.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <div className='login-popup'>

      <form onSubmit={onLogin} className="login-popup-container">

        {/* TITLE */}
        <div className="login-popup-title">
          <h2>{currentState}</h2>

          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="close"
          />
        </div>

        {/* INPUTS */}
        <div className="login-popup-input">

          {currentState === "Sign Up" && (
            <input
              name='name'
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Name"
              required
            />
          )}

          <input
            name='email'
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Email"
            required
          />

          <input
            name='password'
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />

        </div>

        {/* BUTTON */}
        <button type='submit'>
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {/* TERMS */}
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {/* SWITCH */}
        {currentState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrentState("Sign Up")}>
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Login")}>
              Login here
            </span>
          </p>
        )}

      </form>

    </div>
  )
}

export default LoginPopup