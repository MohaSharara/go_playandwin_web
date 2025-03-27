import React, {Fragment, use, useEffect, useState} from "react";
import {LandingContext} from "../contexts/LandingContext";
import Tools from "../config/Tools";
import {toast} from "react-toastify";
import {getTermsData} from "../services/Api";
import constants from "../common/constants";
import TermsOLD from "./TermsOLD";

const Terms = () => {
    const {languageProperties, currentOperatorCode} = use(LandingContext);
    const translation_obj = Tools.getTranslationObj(currentOperatorCode);
    const [termsContent, setTermsContent] = useState();
    const [apiFinished, setApiFinished] = useState(false);

    useEffect(() => {
        Tools.showLoader()
        const updatedParams = {
            http_user_agent: navigator.userAgent,
            language: localStorage.getItem("lang") || "EN", // Fixed the bitwise OR issue
        };

        const delayApiCall = setTimeout(() => {
            getTermsData(updatedParams)
                .then((response) => {
                    Tools.checkResponseStatus(
                        response,
                        () => {
                            const sanitizedTerms = Tools.sanitizeHTML(response.data.payload.terms);
                            setTermsContent(sanitizedTerms);
                            setApiFinished(true);
                            Tools.hideLoader()
                        },
                        () => {
                            setApiFinished(true)
                            Tools.hideLoader()
                            toast.error(translation_obj.ERROR_OCCURRED);
                        }
                    );
                })
                .catch(() => {
                    setApiFinished(true)
                    Tools.hideLoader()
                    toast.error(translation_obj.ERROR_OCCURRED);
                });
        }, 500); // Delay of 0.5 seconds

        // Cleanup timeout on component unmount
        return () => clearTimeout(delayApiCall);
    }, []);

    useEffect(() => {
        if (apiFinished) {
            window.scrollTo(0, 0);
        }
    }, [apiFinished]);

    return (

        <Fragment>

            <div role="main" className="inner cover col-10 mx-auto text-left pt-4 p-0"
                 data-lang={languageProperties.lang} dir={languageProperties.dir}>
                <div className="col-12 col-md-10 container mx-auto px-0 text-start pt-4 text-white font-regular">
                    <h2 className="text-center font-extra-bold"> {translation_obj.TERMS_AND_CONDITIONS} </h2>

                    {apiFinished ?
                        <Fragment>
                            {termsContent ?
                                <Fragment>
                                    <div
                                        className="text-white p-md-5"
                                        dangerouslySetInnerHTML={{__html: termsContent}}
                                    ></div>
                                </Fragment>
                                :
                                <TermsOLD />
                            }
                        </Fragment>
                        :
                        <Fragment>
                            <div className="text-center termsPage">
                                <div className="text-center">
                                    <img
                                        src={constants.IMAGES.LOADER}
                                        alt="loader"
                                        className="loader"
                                    />
                                </div>
                            </div>
                        </Fragment>
                    }

                </div>

            </div>

        </Fragment>
    )
}
export default Terms