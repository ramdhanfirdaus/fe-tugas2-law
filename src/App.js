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
              <Route path='/' element={<ChatRoom/>} />
              <Route path='logout' element={<Logout />} />
              {currentUser ? (
                  <>
                      <Route path='/admin' element={<Navigate to='/user' />} />
                      <Route path='/user' element={<AllUser/>} />
                      <Route path='/message/:nama' element={<MessageUser />} />
                  </>
              ) : (
                  <>
                      <Route path='/admin' element={<CekAdmin/>} />
                      <Route path='*' element={<Navigate to='/admin' />} />
                  </>
              )}
          </Routes>
      </Router>
  )
}
export default App;
