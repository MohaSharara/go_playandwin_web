import React, { use } from "react";
import Tools from "../config/Tools";
import { LandingContext } from "../contexts/LandingContext";

const CompleteQuests = () => {
    const { currentOperatorCode, languageProperties } = use(LandingContext);
    const translation_obj = Tools.getTranslationObj(currentOperatorCode);

    return (
        <div id="complete_quests" className="trivia-game-container col-11 container px-md-5 my-3" dir={languageProperties.dir}>
            <div className="row py-2 d-flex align-items-center justify-content-between">
                <div className="col-12 text-start">
                    <div className="quest-title font-bold">{translation_obj.COMPLETE_THE_QUEST}</div>
                    <div className="quest-title font-bold my-4">{translation_obj.TO_EARN_POINTS}</div>
                </div>
                <div className="col-12 mt-3">
                    {translation_obj.HOW_TO_PLAY_CONTENT.map((quest) => (
                        <div key={quest.id} className="d-flex justify-content-between align-items-center mb-3 p-2 border rounded px-3 border-radius">
                            <span className={languageProperties.dir === "ltr" ? "pe-3" : "ps-3"}>{quest.id}</span>
                            <span className="gpm-quest-title-font text-start w-100">{quest.title}</span>
                            <span className="phosphorus gpm-quest-title-font text-nowrap">{quest.points}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CompleteQuests;
