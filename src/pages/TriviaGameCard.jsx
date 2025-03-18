import React, {useContext} from "react";
import {LandingContext} from "../contexts/LandingContext";
// import { isMobile } from "react-device-detect";
import constants from "../common/constants";
import Tools from "../config/Tools";
import Auth from "../config/Auth";
import {useNavigate} from "react-router-dom";

const TriviaGameCard = (props) => {
    const {currentOperatorCode, languageProperties, isMobile, canPlay, landingData, eventCategory, failedCharging} = useContext(LandingContext);
    const translation_obj = Tools.getTranslationObj(currentOperatorCode);
    const navigate = useNavigate();

    const handleBtnClick = () => {
        if (Auth.isAuthenticated()) {
            Tools.analyticsPlayEvent(1, landingData.profile.msisdn, eventCategory);
            Tools.showLoader()
            navigate("/play");
        } else {
            const subscribeSection = document.getElementById("subscribe");
            if (subscribeSection) {
                subscribeSection.scrollIntoView({behavior: "smooth"});
            }
        }
    };

    return (
        <div id="play_daily_quiz" className="trivia-game-container px-3 py-2" dir={languageProperties.dir}>
            <div className="row trivia-game-card align-items-center text-center">
                <div className="col-12 prize-image position-relative">
                    <img
                        src={isMobile ? constants.IMAGES.TRIVIA_CARD_BG_MOBILE : constants.IMAGES.TRIVIA_CARD_BG_DESKTOP}
                        alt="Trivia Character"
                        className="w-100 flipped-background img-non-draggable"
                    />
                    <div className="col-10 col-md-10 position-absolute game-card-text-position px-0 px-md-0 text-start pe-0">
                        <div className="game-card-title mb-4 mb-md-2 mb-lg-4 font-bold">
                            {translation_obj.PLAY_FIVE_DAILY}
                        </div>
                        <div className="game-card-title mb-4 mb-md-2 mb-lg-4 font-bold">
                            {translation_obj.AND_EARN_POINTS}
                        </div>
                    </div>

                    <div
                        className="col-12 col-md-10 position-absolute game-card-btn-position text-center text-md-start">
                        <div className="failed-charging-popup-activator position-relative">
                            <button
                                className="btn btn-xl general-btn font-bold"
                                onClick={handleBtnClick}
                                disabled={Auth.isAuthenticated() && !canPlay}
                            >
                                {Auth.isAuthenticated() ?
                                    (canPlay ? translation_obj.TAKE_THE_QUIZ : (failedCharging ? translation_obj.TAKE_THE_QUIZ : translation_obj.RETURN_TOMORROW)) :
                                    (translation_obj.JOIN_NOW)
                                }
                            </button>
                            {failedCharging &&
                                <div className="card d-none" id="failed-charging-popup">{translation_obj.NOT_CHARGED_POPUP_MSG}</div>
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default TriviaGameCard;
