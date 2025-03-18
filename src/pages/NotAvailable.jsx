import React, { Fragment, useContext, useEffect } from "react";
import { LandingContext } from "../contexts/LandingContext";
import Tools from "../config/Tools";
import constants from "../common/constants";
import { isIOS } from "react-device-detect";

const NotAvailable = () => {
    const { operators, countryCode } = useContext(LandingContext);
    const translation_obj = Tools.getTranslationObj("GENERAL");

    useEffect(() => {
        console.log("NotAvailable", operators);
    }, []);

    const getCountryImagePath = (countryName) => {
        return `/assets/images/flags/${countryName}.png`;
    };

    const getOperatorImagePath = (operatorName) => {
        return `/assets/images/operators/${operatorName}.png`;
    };

    const sendAnalytics = (label) => {
        Tools.analyticsOperatorBtnClickedEvent(label, countryCode);
    };

    return (
        <Fragment>
            <div className="container p-5">
                <div className="col-12 logo-container position-relative headerLeftSide p-0 mb-5">
                    <img
                        src={constants.IMAGES.LEFT_LOGO}
                        className="leftLogo pointer"
                        alt="logo"
                    />
                </div>
                <div className="row">
                    <div className="col-12 text-center text-white mb-3 mb-md-5">
                        <h1>{translation_obj?.AVAILABLE_OPERATORS || "Available Operators"}</h1>
                        <p className="text-secondary">
                            {translation_obj?.SELECT_OPERATOR || "Select an operator below to continue."}
                        </p>
                    </div>
                </div>
                <div
                    className={`row col-md-11 mx-md-auto not-available-page ${
                        isIOS ? "pb-ios" : "pb-5 pb-md-0"
                    }`}
                >
                    {operators && operators?.length > 0 ? (
                        operators.map((operator, index) => (
                            <div key={index} className="col-12 col-md-4 my-3 text-center pointer"
                                onClick={() => {
                                    sendAnalytics(constants.ANALYTICS_EVENTS.EVENTS_LABELS.AVAILABLE_OPERATORS);
                                    window.location.href = operator?.url;
                                }}>
                                <div className="card bg-dark text-white">
                                    <div className="card-body p-3">
                                        {/* Country Image */}
                                        <img
                                            src={getCountryImagePath(operator?.country_name)}
                                            alt={operator?.country_name}
                                            className="mb-2"
                                            style={{ width: "40px", height: "auto" }}
                                        />
                                        {/* Operator Image */}
                                        <img
                                            src={getOperatorImagePath(operator?.operator_name)}
                                            alt={operator?.operator_name}
                                            className="mb-2 pe-3"
                                            style={{ width: "120px", height: "auto" }}
                                        />
                                        <a
                                            href={operator?.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-primary btn-sm visit-btn font-bold"
                                        >
                                            {translation_obj?.VISIT || "Visit"}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center">
                            <p>{translation_obj?.NO_OPERATORS_FOUND || "No operators available."}</p>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default NotAvailable;
