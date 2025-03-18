import React, {Fragment, useEffect, useState, useContext, lazy, Suspense} from "react";
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import Auth from "./config/Auth";
import Subscribe from "./pages/Subscribe";
import {LandingContext} from "./contexts/LandingContext";
import {ToastContainer} from "react-toastify";
import Header from "./pages/Header";
import 'react-toastify/dist/ReactToastify.css';
import constants from "./common/constants";
import Tools from "./config/Tools";
import Landing from "./pages/Landing";
import LandingWrapper from "./pages/LandingWrapper";
import SubscribeWrapper from "./pages/SubscribeWrapper";
import Play from "./pages/Play";
import Terms from "./pages/Terms";
import NotAvailable from "./pages/NotAvailable";

const AppWrapper = () => {

        const {landingData, currentOperatorCode, languageProperties} = useContext(LandingContext);
        const [loading, setLoading] = useState(true);
        const general = currentOperatorCode === "GENERAL";


        const protectedRoute = (component) => {
            if (Auth.isAuthenticated()) {
                return component
            }
            return <Subscribe/>
        }


        return (
            <Fragment>
                <ToastContainer autoClose={3000} closeOnClick/>

                {/*<link rel="stylesheet" href='assets/css/mainStyle.css'/>*/}
                <link rel="stylesheet" href='assets/css/app-styling.css'/>

                <div id="main-container" className={"position-relative"} style={{background: "gray"}}>
                    {general ?
                        <Fragment>
                            <BrowserRouter>

                                <div className={'mainBody'} dir="ltr">
                                    <Routes>
                                        <Route
                                            path={constants.ROUTES.LANDING}
                                            element={<NotAvailable/>}
                                        />
                                    </Routes>

                                </div>

                            </BrowserRouter>
                        </Fragment>:
                        <Fragment>
                        {landingData && languageProperties && localStorage.getItem("lang") &&
                            <Fragment>
                                <BrowserRouter>

                                    <div className={'mainBody'}>
                                        <div dir={languageProperties.dir}>
                                            <Header/>
                                            <Routes>
                                                <Route path={constants.ROUTES.LANDING}
                                                       element={Auth.isAuthenticated() ?
                                                           <LandingWrapper/> :
                                                           <SubscribeWrapper/>}
                                                       exact/>
                                                <Route path={constants.ROUTES.PLAY}
                                                       element={<Play/>}
                                                       exact/>
                                                <Route path={constants.ROUTES.TERMS}
                                                       element={<Terms/>}
                                                       exact/>
                                            </Routes>

                                        </div>
                                    </div>

                                </BrowserRouter>

                            </Fragment>
                        }
                        </Fragment>
                    }


                </div>

            </Fragment>

        )


    }
;


export default AppWrapper;
