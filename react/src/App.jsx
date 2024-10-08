import React from "react";
import { Route, Routes as AppRoutes } from "react-router-dom";
import "./App.css";
import AdminDashboard from "../components/Admin/AdminDashboard";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import { AuthContextProvider } from "../context/AuthContext";
import PrivateRoute from "../routes/PrivateRoute";
import PrivateRouteSignUp from "../routes/PrivateRouteSignUp";
import NavBar from "../components/Navigation/NavBar";
import Error404Page from "../pages/Error404Page";
import LandingPage from "../pages/Landing";
import ManagerPage from "../pages/ManagerPage";
import JobPostingEditor from "../pages/JobPostingEditor";
import ProfilePage from "../pages/ProfilePage";

function App() {
  
  return (

       <AuthContextProvider>
          <div>
            <NavBar />
            <AppRoutes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/manager" element={<ManagerPage />}/>
              <Route path="/manager/edit/:jobId" element={<JobPostingEditor />}/>
              <Route path='/admin' element={<PrivateRoute />}>
                <Route path='/admin' element={<AdminDashboard />}/>
              </Route>
              <Route path='myprofilepage' element={<ProfilePage/>}/>
              <Route path="/home" element={<PrivateRoute />}>
                <Route path="/home" element={<HomePage />} />
              </Route>
              <Route path="/login"  element={<PrivateRouteSignUp />}>
                <Route path="/login" element={<Login />} />
              </Route>
              <Route path="/signup"  element={<PrivateRouteSignUp />}>
                <Route path="/signup" element={<SignUp />} />
              </Route>
              {/* <Route path="/signout" element={<SignOutButton />} /> */}
              <Route path="/*" element={<Error404Page />}></Route>
            </AppRoutes>
          </div>
      </AuthContextProvider>

  )
}

export default App

 {/* <Route path="/account" element={<PrivateRoute />}>
                <Route path="/account" element={<Account />} />
              </Route>
              <Route path="/profile" element={<PrivateRouteProfile />}>
                <Route path="/profile" element={<Profile />} />
              </Route> */}
               {/* <Route path="/profile-details/:id" element={<ProfileFullView/>}/> */}