import { Routes, Route } from "react-router-dom";
import { LoginAndRegister } from "../pages/loginAndRegister";
import { Home } from "../pages/home";
import { HomeSocial } from "../pages/homeSocial";

export default function MakeRoutes(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginAndRegister />} />
        <Route path="/home/:id" element={<HomeSocial />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}
