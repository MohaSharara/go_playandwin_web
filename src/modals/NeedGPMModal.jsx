import React, {useState, use, useEffect} from "react";
import Modal from "react-modal";
import {LandingContext} from "../contexts/LandingContext";
import Tools from "../config/Tools";
import {isAndroid, isDesktop, isIOS} from "react-device-detect";
import constants from "../common/constants";
import Loader from "../pages/Loader";

const NeedGPMModal = () => {
    const {
        landingData,
        currentOperatorCode,
        languageProperties,
        isNeedGPMModalOpen,
        setIsNeedGPMModalOpen,
        operatorConfig
    } = use(LandingContext);
    const translation_obj = Tools.getTranslationObj(currentOperatorCode);
    const [loading, setLoading] = useState(true);
    const dir = languageProperties.dir;

    const closeIsNeedGPMModal = () => {
        setIsNeedGPMModalOpen(false);
    };

    const sendAnalytics = (label) => {
        Tools.analyticsButtonClick(label, currentOperatorCode);
    };

    useEffect(() => {
        // Simulate a page load
        const timer = setTimeout(() => setLoading(false), 1000); // Adjust duration as needed
        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, []);


    return (
        <div>
            <Modal
                isOpen={isNeedGPMModalOpen}
                onRequestClose={closeIsNeedGPMModal}
                shouldCloseOnOverlayClick={true}
                overlayClassName="winner-modal-overlay"
                className="download-modal-content col-12 col-md-6 min-height-modal"
                ariaHideApp={false}
            >

                <button
                    className="modal-close-btn text-white"
                    onClick={closeIsNeedGPMModal}
                    aria-label="Close"
                    title="Close"
                >
                    <span aria-hidden="true">×</span>
                </button>
                {loading ? (
                    <Loader bodyClass={"min-height-modal"} />
                ) : (
                <div className="inner cover text-center text-dark px-0 mt-1 p-4 p-md-2" dir={dir}
                     data-lang={languageProperties.lang}>
                    <div className={isDesktop? "fs-3 text-white font-bold" : "fs-5 text-white font-bold"}>
                        {translation_obj.THIS_SERVICE}
                    </div>
                    <div className={isDesktop ? "fs-3 text-white font-bold" : "fs-5 text-white font-bold"}>
                        {isDesktop ?
                            translation_obj.PRESS_HERE_DESKTOP : translation_obj.PRESS_HERE_MOBILE
                        }
                    </div>
                    <div className="row col-12 col-md-9 px-2 mt-3 mt-md-5 mx-auto">
                        {operatorConfig.IOS_LINK && isIOS && (
                            <div className="col-6 px-1">
                                <a
                                    href={operatorConfig.IOS_LINK}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => sendAnalytics(constants.ANALYTICS_EVENTS.EVENTS_LABELS.DOWNLOAD_IOS)}
                                >
                                    <img
                                        className="w-100"
                                        src={translation_obj.APPLE_STORE}
                                        alt="Apple Store"
                                    />
                                </a>
                            </div>
                        )}
                        {!operatorConfig.IOS_LINK && isIOS && (
                            <div className="col-6 px-1 mx-auto">
                                <a
                                    href={operatorConfig.DESKTOP_LINK}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => sendAnalytics(constants.ANALYTICS_EVENTS.EVENTS_LABELS.DOWNLOAD_DESKTOP)}
                                >
                                    <img
                                        className="w-100"
                                        src={translation_obj.DOWNLOAD_DESKTOP}
                                        alt="Web Download"
                                    />
                                </a>
                            </div>
                        )}
                        {operatorConfig.ANDROID_LINK && isAndroid && (
                            <div className="col-6 px-1 mx-auto">
                                <a
                                    href={operatorConfig.ANDROID_LINK}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => sendAnalytics(constants.ANALYTICS_EVENTS.EVENTS_LABELS.DOWNLOAD_ANDROID)}
                                >
                                    <img
                                        className="w-100"
                                        src={translation_obj.GOOGLE_PLAY}
                                        alt="Google Play"
                                    />
                                </a>
                            </div>
                        )}
                        {isDesktop && operatorConfig.DESKTOP_LINK && (
                            <div className="col-5 px-1 mx-auto">
                                <a
                                    href={operatorConfig.DESKTOP_LINK}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => sendAnalytics(constants.ANALYTICS_EVENTS.EVENTS_LABELS.DOWNLOAD_DESKTOP)}
                                >
                                    <img
                                        className="w-100"
                                        src={translation_obj.DOWNLOAD_DESKTOP}
                                        alt="Web Download"
                                    />
                                </a>
                            </div>
                        )}

                    </div>
                </div>
                )}
            </Modal>
        </div>
    );
};

export default NeedGPMModal;
