import React, {Fragment, use} from "react";
import {LandingContext} from "../contexts/LandingContext";
import Tools from "../config/Tools";
import constants from "../common/constants";

const Profile = () => {
    const {
        landingData,
        languageProperties,
        currentOperatorCode,
        totalPoints,
        weeklyPoints,
        playedQuestions,
        totalQuestions,
        isMobile,
        canPlay
    } = use(LandingContext);
    const translation_obj = Tools.getTranslationObj(currentOperatorCode)

    const played_over_total = languageProperties.dir === "ltr" ? playedQuestions + "/" + totalQuestions : totalQuestions + "/" + playedQuestions

    const YOU_HAVE_COLLECTED_WITH_POINTS = translation_obj.YOU_HAVE_COLLECTED_TOTAL.replace("{points}", totalPoints);
    const YOU_HAVE_COLLECTED_WEEKLY_POINTS = translation_obj.YOU_HAVE_COLLECTED_WEEKLY.replace("{points}", weeklyPoints);
    const YOU_HAVE_QUESTIONS_WITH_CREDITS = canPlay ?
        translation_obj.YOU_HAVE_QUESTIONS.replace("{questions}", played_over_total):
        translation_obj.YOU_HAVE_NO_QUESTIONS.replace("{questions}", played_over_total)
    ;

    return (
        <Fragment>
            {isMobile ?
                <Fragment>
                    <div className='col-12 d-flex justify-content-start align-items-center mt-md-4 p-0 px-1'>
                        <div className="stats-container-mobile position-relative">
                            <div className="profile-style-mobile m-0 me-1 points-popup-activator">
                                <img src={constants.IMAGES.STAR_ICON} alt="Star Icon" className="profile-icon"/>
                                <div
                                    className={`row text-start ${
                                        languageProperties.dir === "ltr" ? "px-3" : "ps-3 pe-4 px-md-3"
                                    }`}
                                >
                                    <div className="profile-number-mobile p-0 m-0 font-extra-bold">{totalPoints}</div>
                                    <div className="profile-label-mobile p-0 m-0">{translation_obj.TOTAL_POINTS}</div>
                                </div>
                                <div className="card d-none" id="points-popup">{YOU_HAVE_COLLECTED_WITH_POINTS}</div>
                            </div>
                            <div className="profile-style-mobile m-0 me-1 weekly-points-popup-activator">
                                <img src={constants.IMAGES.STAR_ICON} alt="Star Icon" className="profile-icon"/>
                                <div
                                    className={`row text-start ${
                                        languageProperties.dir === "ltr" ? "px-3" : "ps-3 pe-4 px-md-3"
                                    }`}
                                >
                                    <div className="profile-number-mobile p-0 m-0 font-extra-bold">{weeklyPoints}</div>
                                    <div className="profile-label-mobile p-0 m-0">{translation_obj.WEEKLY_POINTS}</div>
                                </div>
                                <div className="card d-none" id="weekly-points-popup">{YOU_HAVE_COLLECTED_WEEKLY_POINTS}</div>
                            </div>
                            <div className="profile-style-mobile m-0 me-1 questions-popup-activator">
                                <img src={constants.IMAGES.QUESTION_ICON} alt="Question Icon" className="profile-icon"/>
                                <div
                                    className={`row text-start ${
                                        languageProperties.dir === "ltr" ? "px-3" : "ps-3 pe-4 px-md-3"
                                    }`}
                                >
                                    <div
                                        className="profile-number-mobile p-0 m-0 font-extra-bold">{played_over_total}</div>
                                    <div className="profile-label-mobile p-0 m-0">{translation_obj.QUESTIONS}</div>
                                </div>
                                <div className="card d-none" id="questions-popup">{YOU_HAVE_QUESTIONS_WITH_CREDITS}</div>
                            </div>
                        </div>
                    </div>
                </Fragment> : <Fragment>
                    <div className='col-12 d-flex justify-content-start align-items-center mt-md-4'>
                        <div className="stats-container">
                            <div className="profile-style points-popup-activator position-relative">
                                <img src={constants.IMAGES.STAR_ICON} alt="Star Icon" className="profile-icon"/>
                                <span className="profile-number font-extra-bold">{totalPoints}</span>
                                <span className="profile-label pt-1 font-regular">{translation_obj.TOTAL_POINTS}</span>
                                <div className="card d-none" id="points-popup">{YOU_HAVE_COLLECTED_WITH_POINTS}</div>
                            </div>
                            <div className="profile-style weekly-points-popup-activator position-relative">
                                <img src={constants.IMAGES.STAR_ICON} alt="Star Icon" className="profile-icon"/>
                                <span className="profile-number font-extra-bold">{weeklyPoints}</span>
                                <span className="profile-label pt-1 font-regular">{translation_obj.WEEKLY_POINTS}</span>
                                <div className="card d-none"
                                     id="weekly-points-popup">{YOU_HAVE_COLLECTED_WEEKLY_POINTS}</div>
                            </div>
                            <div className="profile-style questions-popup-activator position-relative">
                                <img src={constants.IMAGES.QUESTION_ICON} alt="Question Icon" className="profile-icon"/>
                                <span className="profile-number font-extra-bold">{played_over_total}</span>
                                <span className="profile-label pt-1 font-regular">{translation_obj.QUESTIONS}</span>
                                <div className="card d-none"
                                     id="questions-popup">{YOU_HAVE_QUESTIONS_WITH_CREDITS}</div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}

export default Profile