import React from "react"
import ChatRoom from "./component/ChatRoom"
import ColorSchemesExample from "./component/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from
        'react-router-dom'
import CekAdmin from "./component/CekAdmin";
import User from "./service/User";
import AllUser from "./component/AllUser";
import MessageUser from "./component/MessageUser";
import {Logout} from "./component/Logout";

const App = () => {
    const currentUser = User()
  return (
      <Router>
          <ColorSchemesExample></ColorSchemesExample>
          <Routes>
              <Route exact path='/' element={<ChatRoom/>} />
              <Route path='logout' element={<Logout />} />
              <Route path='/admin' element={currentUser ? <Navigate to='/user' /> : <CekAdmin />} />
              <Route path='/user' element={currentUser ? <AllUser/> : <Navigate to='/admin' />} />
              <Route path='/message/:nama' element={currentUser ? <MessageUser/> : <Navigate to='/admin' />} />
              <Route path='*' element={<Navigate to='/' />} />
          </Routes>
      </Router>
  )
}
export default App;
