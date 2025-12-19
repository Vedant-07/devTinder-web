import { BrowserRouter, Routes, Route } from "react-router";
import Body from "./Body";
import Feed from "./components/Feed";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Request from "./components/Request";
import Connection from "./components/Connection";
import Chat from "./components/Chat";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed/>}></Route>
            <Route path="profile" element={<Profile />} />
            <Route path="login" element={<Login />} />
            <Route path="request" element={<Request/>}></Route>
            <Route path="connection" element={<Connection/>}></Route>
            <Route path="chat/:userId" element={<Chat/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
