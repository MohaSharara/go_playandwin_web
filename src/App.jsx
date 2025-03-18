import React, {Fragment, useEffect} from "react";
import LandingContextProvider from "./contexts/LandingContext";
import AppWrapper from "./AppWrapper";
import './assets/css/bootstrap.min.css';
import './assets/css/base.css';
import { detectIncognito } from "detectincognitojs";
import Tools from "./config/Tools";
import Auth from "./config/Auth";


function App() {

    const currentOperatorCode = Tools.getInitialOperatorCode()

    const heProcess = (params = {}) => {
        const heMsisdn = qS.get("msisdn") || qS.get("he-msisdn") || qS.get("customer_number");
        const isRedirected = qS.get("is-redirected");
        const authenticated =  Auth.isAuthenticated()
        const isRedirectedSaved = sessionStorage.getItem("is-redirected");

        if (heMsisdn == null && !isRedirected && !isRedirectedSaved && !authenticated) {
            let numHeaderUrl = `http://www.numheader.com`;
            let redirectUrl = `${window.location.origin}${window.location.pathname}`;
            let url
            if (currentOperatorCode === "OOREDOO_OMAN") {
                url = `${numHeaderUrl}?is_ooredoo_oman=true&red_url=${redirectUrl}`;
            } else {
                url = `${numHeaderUrl}?red_url=${redirectUrl}`;
            }
            window.location.assign(url);
            return;
        }

        if (isRedirected) {
            // Remove `?is-redirected=true` from the URL
            const url = new URL(window.location.href);
            url.searchParams.delete("is-redirected");
            window.history.replaceState({}, document.title, url.pathname + url.search);

            // Set `is-redirected` in localStorage
            sessionStorage.setItem("is-redirected", 'true');
        }
    }

    useEffect(() => {
        detectIncognito().then((result) => {
            if (!result.isPrivate && ((currentOperatorCode === "OOREDOO_ALGERIA") || (currentOperatorCode === "OOREDOO_TUNISIA") || (currentOperatorCode === "OOREDOO_OMAN") || (currentOperatorCode === "OMANTEL_OMAN"))){
                heProcess()
            }
        });
    }, []);


    return (

        <Fragment>
            <LandingContextProvider>
                <AppWrapper/>
            </LandingContextProvider>
        </Fragment>
    );
}

export default App;
