import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { useRoutes, A } from 'hookrouter'
import './sass.sass'

/* _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- */


const Nav = ({ username }) => {
  console.log('Nav')
  return (
    <ul>
      <li>
        <A href="/">Home</A>
      </li>
      <li>
        <A href="/faq">Faq</A>
      </li>
      <li>
        <A href={`/user/${username}`}>Profile</A>
      </li>
    </ul>
  )
}

const Faq = () => {
  console.log('Faq')
  return (
    <div className="faq">
      <h1>faq</h1>
    </div>
  )
}

const Home = () => {
  console.log('Home')
  return (
    <div className="home">
      <h1>home</h1>
    </div>
  )
}

const NotFound = () => {
  console.log('NotFound')
  return (
    <div className="not-found">
      <h1>404</h1>
    </div>
  )
}

const User = ({ username: paramUsername }) => {
  console.log('User')

  const [{ username }, setUser] = useState({})

  useEffect(() => {
    ;(async () => {
      setUser(await (await fetch(`/api/user?username=${paramUsername}`)).json())
    })()
  }, [])

  if (!username) return null
  return (
    <div className="user">
      <h1>Profile of: {username}.</h1>
    </div>
  )
}

const dir = {
  '/': () => <Home/>,
  '/faq': () => <Faq/>,
  '/user/:username': ({ username }) => <User username={username}/>,
  '/*': () => <NotFound/>
}

const App = () => {
  console.log('App')

  const [{ username }, setUser] = useState({})
  const routes = useRoutes(dir)

  useEffect(() => {
    ;(async () => {
      setUser(await (await fetch('/api/user')).json())
    })()
  }, [])

  if (!username) return null
  return (
    <div className="wrapper">
      <Nav username={username}/>
      {routes}
    </div>
  )

}
const app = document.getElementById('app')
ReactDOM.render(<App/>, app)
