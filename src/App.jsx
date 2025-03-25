import React, { Fragment } from "react";
import LandingContextProvider from "./contexts/LandingContext";
import AppWrapper from "./AppWrapper";
import Tools from "./config/Tools";
import Auth from "./config/Auth";
import useHEProcess from './hooks/useHEProcess';
import useIPRangeChecker from './hooks/useIPRangeChecker';
import useIncognitoDetection from './hooks/useIncognitoDetection';

function App() {
    const heMsisdn = qS.get("msisdn") || qS.get("MSISDN") || qS.get("he-msisdn") || qS.get("customer_number");
    const isRedirected = qS.get("is-redirected");
    const authenticated = Auth.isAuthenticated();
    const isRedirectedSaved = sessionStorage.getItem("is-redirected");
    const isPrivate = useIncognitoDetection();
    const currentOperatorCode = Tools.getInitialOperatorCode();
    const general = currentOperatorCode === "GENERAL";
    const isKuwait = currentOperatorCode === "OOREDOO_KUWAIT"
    const isInRange = (isKuwait && !isPrivate) ? useIPRangeChecker() : true;
    const shouldProcessHE = !isPrivate && isInRange && !heMsisdn && !isRedirected && !authenticated && !isRedirectedSaved && !general;

    console.log("isPrivate", isPrivate)
    console.log("isKuwait", isKuwait)
    console.log("isInRange", isInRange)
    console.log("shouldProcessHE", shouldProcessHE)

    if (shouldProcessHE) {
        useHEProcess(currentOperatorCode);
    } else if (isRedirected) {
        const url = new URL(window.location.href);
        url.searchParams.delete("is-redirected");
        window.history.replaceState({}, document.title, url.pathname + url.search);

        // Mark as redirected in sessionStorage
        sessionStorage.setItem("is-redirected", "true");
    }

    return (
        <Fragment>
            <LandingContextProvider>
                <AppWrapper />
            </LandingContextProvider>
        </Fragment>
    );
}

export default App;