import React from 'react'

import Navbar from './components/Navbar'
import Routes from './Routes'
import DemoApp from './components/Calendar'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <DemoApp />
    </div>
  )
}

export default App
