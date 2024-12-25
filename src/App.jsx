import { BrowserRouter, Routes, Route } from "react-router";
import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="profile" element={<Profile/>} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
