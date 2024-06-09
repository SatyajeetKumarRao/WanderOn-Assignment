import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";
import { PrivateRoute } from "./PrivateRoute";
import { ExploreIndia } from "../pages/ExploreIndia";
import { InternationalPackage } from "../pages/InternationalPackage";
import { WeekendsTrips } from "../pages/WeekendsTrips";
import { GroupTours } from "../pages/GroupTours";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/weekend-trips" element={<WeekendsTrips />} />
        <Route path="/group-tours" element={<GroupTours />} />
        <Route
          path="/explore-india"
          element={<PrivateRoute>{<ExploreIndia />}</PrivateRoute>}
        />
        <Route
          path="/international-packages"
          element={<PrivateRoute>{<InternationalPackage />}</PrivateRoute>}
        />
      </Routes>
    </div>
  );
};

export { AllRoutes };
