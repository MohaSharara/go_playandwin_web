import React, {Fragment, lazy, useContext, useEffect, useState} from "react";
import Tools from "../config/Tools";
import {LandingContext} from "../contexts/LandingContext";
import constants from "../common/constants";
import Profile from "../shared/Profile";

const Landing = () => {
    const {currentOperatorCode, languageProperties, totalPoints, operatorConfig} = useContext(LandingContext);
    const translation_obj = Tools.getTranslationObj(currentOperatorCode);
    const prize_img = Tools.getPrizeImage(operatorConfig);

    return (
        <div id="landing" className="subscribe-container container" dir={languageProperties.dir}>
            <div className="row py-2">
                <Profile />
                <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center">
                    <div className="">
                        <div className="main-title font-extra-bold mt-3">
                            {translation_obj.EARN_POINTS_AND_WIN}
                        </div>

                        <div className="grand-prize mt-3 mb-1 mb-md-3 img-non-draggable">
                            <img
                                src={prize_img}
                                alt="weekly prize"
                                className="w-100"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-6 d-none d-lg-block">
                    <div className="h-100 d-grid align-content-center">
                        <div className="prize-image d-flex align-items-center justify-content-center img-non-draggable">
                            <img
                                className="prize-character-size"
                                src={constants.IMAGES.PRIZE_CHARACTER}
                                alt="Prize character"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
};

export default Landing;