import { BrowserRouter, Routes, Route } from "react-router";
import Body from "./Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<div>feed Page here</div>}></Route>
            <Route path="profile" element={<Profile />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
