import "./App.css"
import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import RequireAuth from "./Route protection/RequireAuth";
import { useContext } from 'react';
import { UserContext } from './context/userContext';

function App() {

    const { user } = useContext(UserContext)

    const LazyLogin = React.lazy(() => import("./Routes/Login/login"))
    const LazyRegister = React.lazy(() => import("./Routes/Register/Register"))
    const LazyProfile = React.lazy(() => import("./Routes/Profile/profile"))
    const LazyHome = React.lazy(() => import("./Routes/home/Home"))
    //
    return (
        <>
            <Navbar />
            <main className="background">
                <div className="overlay"/>
                <Routes>
                    <Route path={"/"} element={
                        <RequireAuth>
                            <React.Suspense fallback={"Loading..."}>
                                <LazyHome />
                            </React.Suspense>
                        </RequireAuth>} />
                    {
                        !user &&
                        <>
                            <Route path={"/register"} element={
                                <React.Suspense fallback={"Loading..."}>
                                    <LazyRegister />
                                </React.Suspense>}
                            />
                            <Route path={"/login"} element={
                                <React.Suspense fallback={"Loading..."}>
                                    <LazyLogin />
                                </React.Suspense>
                            } />
                        </>
                    }
                    <Route path={"/profile"} element={<RequireAuth>
                        <React.Suspense fallback={"Loading..."}>
                            <LazyProfile />
                        </React.Suspense>
                    </RequireAuth>} />
                </Routes>
            </main>

        </>


    );
}

export default App;
