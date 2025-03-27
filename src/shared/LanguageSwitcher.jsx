import React, {Fragment, use, useEffect, useState} from "react";
import {toast} from "react-toastify";
import Tools from "../config/Tools";
import TranslationObject from "../common/TranslationObject";
import {LandingContext} from "../contexts/LandingContext";
import Auth from "../config/Auth";
import {changeLanguage} from "../services/Api";
import constants from "../common/constants";

const LanguageSwitcher = (props) => {
    const {landingData, currentOperatorCode, operatorConfig} = use(LandingContext);
    let savedLang = localStorage.getItem('lang');
    const [language, setLanguage] = useState(localStorage.getItem('lang'));
    const availableLanguages = landingData?.operator?.languages
    const translation_obj = Tools.getTranslationObj(currentOperatorCode);

    useEffect(() => {
        let dir = Tools.getTranslationDirection(savedLang, TranslationObject, currentOperatorCode);
        setLanguage({lang: savedLang, dir: dir})
    }, [localStorage.getItem('lang')])

    const handleLanguageSwitch = (newLanguage) => {

        Tools.removeParams('language')

        if (Auth.isAuthenticated()) {
            let requestData = {
                new_language: newLanguage,
                http_user_agent: navigator.userAgent
            }

            let eventCategory = operatorConfig.ANALYTICS_EVENT_CATEGORY;
            Tools.analyticsChangeLanguageEvent(1, newLanguage, eventCategory);

            changeLanguage(requestData)
                .then(response => {
                    Tools.checkResponseStatus(response, () => {
                        Tools.switchLang(newLanguage);
                    }, () => {
                        toast.error(translation_obj.COULDNT_CHANGE_LANGUAGE);
                    });
                })
                .catch(() => {
                });
        } else {
            Tools.switchLang(newLanguage);
        }
    };

    const renderLangSwitcher = () => {
        return (
            <div className="navbar-container position-relative">
                <nav className="navbar navbar-dark">
                    <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarLanguage" aria-controls="navbarLanguage"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-world-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarLanguage">
                        <ul className="nav-list">
                            {
                                availableLanguages?.map((item, key) => (
                                    <li key={item} className="active pointer">
                                        <a className={"nav-item " + (item === language.lang ? 'languageBtnActive' : '')} {...(item !== language.lang ? {onClick: () => handleLanguageSwitch(item)} : {})}>
                                            {constants.LANGUAGES[item]}
                                        </a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </nav>
            </div>

        );
    }

    return (
        <Fragment>
            {localStorage.getItem("lang") && landingData && availableLanguages?.length > 0 &&
                <Fragment>
                    {renderLangSwitcher()}
                </Fragment>
            }
        </Fragment>

    )
}
export default LanguageSwitcher