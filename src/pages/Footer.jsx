import React, { Fragment, use } from "react";
import { LandingContext } from "../contexts/LandingContext";
import Tools from "../config/Tools";
import constants from "../common/constants";
import {useNavigate} from "react-router-dom";

const Footer = (props) => {
    const {
        currentOperatorCode,
        languageProperties,
        setIsUnSubModalOpen,
        subscriptionType
    } = use(LandingContext);

    const translation_obj = Tools.getTranslationObj(currentOperatorCode);

    const handleUnsubscribeClick = () => {
        setIsUnSubModalOpen(true); // Open the Unsubscribe modal
    };

    const navigate = useNavigate();

    const handleTermsClick = () => {
        window.location.href = constants.ROUTES.TERMS;
        // navigate(constants.ROUTES.TERMS)
    };

    return (
        <Fragment>
            <div className="footer d-flex justify-content-between align-items-center container px-3 px-md-5" dir={languageProperties.dir}>
                {props.showUnsubscribe && subscriptionType !== "ONE_TIME" ? (
                    <>
                        <a
                            onClick={handleTermsClick}
                            className={`p-0 text-white no-underline pointer ${languageProperties.dir === 'ltr' ? 'fst-italic' : ''}`}
                            style={{ textDecoration: "none" }}
                        >
                            {translation_obj.TERMS_AND_CONDITIONS}
                        </a>
                        <a
                            onClick={handleUnsubscribeClick}
                            className={`p-0 text-white no-underline pointer ${languageProperties.dir === 'ltr' ? 'fst-italic' : ''}`}
                            style={{ textDecoration: "none" }}
                        >
                            {translation_obj.UNSUBSCRIBE}
                        </a>
                    </>
                ) : (
                    <a
                        onClick={handleTermsClick}
                        className={`p-0 text-white no-underline pointer ${languageProperties.dir === 'ltr' ? 'fst-italic' : ''}`}
                        style={{ textDecoration: "none", textAlign: "center", flex: "1" }}
                    >
                        {translation_obj.TERMS_AND_CONDITIONS}
                    </a>
                )}
            </div>
        </Fragment>
    );
};

export default Footer;
