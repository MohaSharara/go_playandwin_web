import React, {useContext} from "react";
import Tools from "../config/Tools";
import {LandingContext} from "../contexts/LandingContext";
import Auth from "../config/Auth";
import constants from "../common/constants";

const WeeklyGameCard = (props) => {
    const { currentOperatorCode, languageProperties, isMobile, gameURL, landingData, eventCategory} = useContext(LandingContext);
    const translation_obj = Tools.getTranslationObj(currentOperatorCode);
    function formatGameName(snakeCaseString) {
        if (!snakeCaseString) return '';

        // Convert snake_case to Title Case with spaces
        const title = snakeCaseString
            .split('_') // Split the string by underscores
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
            .join(' '); // Join words with spaces

        return `${title}`; // Add "Play" prefix
    }

    const PLAY_DRIFT_RUSH = translation_obj.PLAY + " " + formatGameName(landingData?.game?.slug)

    const handleBtnClick = () => {

        if (Auth.isAuthenticated()) {
            if(gameURL){
                Tools.analyticsWeeklyGameEvent(1, landingData.profile.msisdn, eventCategory);

                const urlWithChannel = new URL(gameURL);
                const channel = Tools.getCurrentChannel()

                if (channel) {
                    urlWithChannel.searchParams.append('channel', channel);
                }
                window.open(urlWithChannel.toString(), "_blank", "noopener,noreferrer");
            }
        } else {
            const subscribeSection = document.getElementById("subscribe");
            if (subscribeSection) {
                subscribeSection.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <div id="play_weekly_game" className="trivia-game-container px-3 py-2" dir={languageProperties.dir}>
            <div className="row trivia-game-card align-items-center text-center">
                <div className="col-12 prize-image position-relative">
                    <img
                        src={isMobile ? (landingData?.game?.mobile_background_url || constants.IMAGES.WEEKLY_CARD_BG_MOBILE) : (landingData?.game?.background_url || constants.IMAGES.WEEKLY_CARD_BG_DESKTOP)}
                        alt="Trivia Character"
                        className="w-100 flipped-background img-non-draggable"
                    />
                    <div className="col-10 col-md-10 position-absolute game-card-text-position px-0 px-md-0 text-start pe-0">
                        <div className="game-card-title mb-4 mb-md-2 mb-lg-4 font-bold">
                            {translation_obj.JOIN_WEEKLY_CHALLENGE}
                        </div>
                        <div className="game-card-title mb-0 font-bold">
                            {translation_obj.SCORE_ON_LEADERBOARD_1}
                        </div>
                        <div className="game-card-title mb-4 mb-md-2 mb-lg-4 font-bold">
                            {translation_obj.SCORE_ON_LEADERBOARD_2}
                        </div>
                    </div>

                    <div className="col-12 col-md-10 position-absolute game-card-btn-position text-center text-md-start">
                        <button className="btn btn-xl general-btn font-bold" onClick={handleBtnClick}>
                            {Auth.isAuthenticated() ?
                                PLAY_DRIFT_RUSH :
                                translation_obj.JOIN_NOW

                            }
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default WeeklyGameCard;
