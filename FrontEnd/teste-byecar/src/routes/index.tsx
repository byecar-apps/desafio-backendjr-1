import { Routes, Route } from "react-router-dom";
import { LoginAndRegister } from "../pages/loginAndRegister";
import { Home } from "../pages/home";

export default function MakeRoutes(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginAndRegister />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}
