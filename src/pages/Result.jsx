import React, {Fragment} from "react";
import {use} from "react";
import {LandingContext} from "../contexts/LandingContext";
import constants from "../common/constants";
import {Helmet} from "react-helmet";
import MultiShareButtons from "../shared/MultiShareButtons";

export default function Result(props) {
    const {correctAnswers, totalQuestion, roundTotalPoints, totalCollected, translation_obj} = props;
    const {landingData, gameURL} = use(LandingContext);
    const share = "/assets/images/share_img.png";

    const fullImageUrl = `https://goplayandwin.com${share}`;

    // const shareMessage = translation_obj.SHARE_MESSAGE(totalCollected);
    const shareMessage = translation_obj.NEW_SHARE_MESSAGE;

    const renderImageWithPoints = () => {
        const title = correctAnswers >= 0 && correctAnswers <= 3 ? translation_obj.DONT_GIVE_UP : translation_obj.YOU_HAVE;
        const message = `${translation_obj.YOU_COLLECTED} ${totalCollected} ${translation_obj.POINTS}`;

        return (
            <div className="col-12 text-center pt-5 bg-result">
                <Fragment>
                    <div className="text-yellow font-regular">{title}</div>
                    <div className="fs-6 text-white font-regular pb-4">{message}</div>
                </Fragment>
                <div className="position-relative">
                    <img src={constants.IMAGES.PROFILE_RESULT} className="col-8 p-0 position-relative" alt="Points Background"/>
                    <span className="msisdn-position position-absolute font-bold" dir="ltr">
						{landingData.profile.msisdn}
					</span>
                    <span className="answers-position position-absolute font-medium">
						<span className="font-bold fs-6">
							<Fragment>
								<div className="text-white">
									<div className="correctAnswerFont pt-2">{translation_obj.CORRECT_ANSWERS}</div>
									<span className="fs-4">{correctAnswers}/{totalQuestion}</span>
								</div>
							</Fragment>
						</span>
					</span>
                    <span className="points-position position-absolute font-medium">
						<span className="font-bold fs-6">
							<Fragment>
								<div className="text-white points-earned-activator">
									<div className="correctAnswerFont pt-2">{translation_obj.POINTS_EARNED_THIS_ROUND}</div>
									<span className="fs-4">{roundTotalPoints}</span>
                                    <div className="card d-none" id="points-earned-popup">{translation_obj.POINTS_EARNED_THIS_ROUND_POPUP}</div>
								</div>
							</Fragment>
						</span>
					</span>
                </div>

                <div className="fs-6 text-white font-regular py-4">
                    {translation_obj.COME_BACK_TOMORROW}
                    <br/> {translation_obj.ROUND_OF_5_QUESTIONS}
                </div>

                <button
                    className="btn btn-xl col-8 yellowBtn mx-auto font-bold position-relative"
                    onClick={() => {
                        window.location.href = gameURL;
                    }}
                >
                    {translation_obj.GO_TO_WEEKLY_GAME}
                </button>

                <div className="mt-2">
                    <button
                        className="btn btn-xl col-8 whiteBtn mx-auto font-bold position-relative"
                        onClick={() => {
                            window.location.href = "/";
                        }}
                    >
                        {translation_obj.BACK}
                    </button>
                </div>

                <div className="fs-6 py-4">{shareScoreBtn()}</div>
            </div>
        );
    };

    const shareScoreBtn = () => {
        return (
            <Fragment>
                <div className="col-12 text-center mx-auto mb-2 mb-md-0">
                    <MultiShareButtons url={location.origin}/>
                </div>
            </Fragment>
        );
    };

    return (
        <>
            <Helmet>
                <meta property="og:title" content={translation_obj.SHARE_TITLE || "Game Results"}/>
                <meta property="og:description" content={shareMessage}/>
                <meta property="og:image" content={fullImageUrl}/>
                <meta property="og:image:width" content="1200"/>
                <meta property="og:image:height" content="630"/>
                <meta
                    property="og:url"
                    content={typeof window !== "undefined" ? window.location.href : "https://goplayandwin.com"}
                />
                <meta property="og:type" content="website"/>
                <meta name="twitter:card" content="Go Play & Win"/>
                <meta property="og:site_name" content="Go Play & Win"/>
            </Helmet>
            <Fragment>{renderImageWithPoints()}</Fragment>
        </>
    );
}
