import React, { use } from "react";
import Tools from "../config/Tools";
import { LandingContext } from "../contexts/LandingContext";
import constants from "../common/constants";
import {isAndroid, isIOS, isDesktop} from "react-device-detect";

const DownloadTheApp = () => {
    const { currentOperatorCode, languageProperties, operatorConfig } = use(LandingContext);

    const translation_obj = Tools.getTranslationObj(currentOperatorCode);

    const sendAnalytics = (label) => {
        Tools.analyticsButtonClick(label, currentOperatorCode);
    };

    return (
        <div id="download_app" className="trivia-game-container px-md-5" dir="ltr">
            <div className="col-12 col-md-11 mx-auto p-1 p-md-3 d-flex align-items-center justify-content-between">
                <div className="col-8 text-start"  dir={languageProperties.dir}>
                    <div className="download-title font-bold">{translation_obj.DOWNLOAD_THE_APP}</div>
                    <div className="row col-12 col-md-9 px-2">
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
                            <div className="col-6 px-1">
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
                        {operatorConfig.ANDROID_LINK && isAndroid &&(
                            <div className="col-6 px-1">
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
                        {isDesktop && operatorConfig.ANDROID_LINK &&(
                            <div className="col-4 px-1">
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
                        {isDesktop && operatorConfig.IOS_LINK && (
                            <div className="col-4 px-1">
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
                        {isDesktop && operatorConfig.DESKTOP_LINK && (
                            <div className="col-4 px-1">
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
                <div className="col-4 p-0">
                    <div className="prize-image d-flex align-items-center justify-content-center img-non-draggable">
                        <img
                            className={isDesktop? "w-85": "w-100"}
                            src={constants.IMAGES.GO_PLAY_PHONE}
                            alt="Prize character"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DownloadTheApp;