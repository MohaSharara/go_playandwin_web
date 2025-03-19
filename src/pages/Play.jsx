import React, {Fragment, useContext, useEffect, useState} from "react";
import {LandingContext} from "../contexts/LandingContext";
import {getNextStepData, submitAnswer} from "../services/Api";
import Tools from "../config/Tools";
import constants from "../common/constants";
// import DraggableAnswers from "../shared/DraggableAnswers";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {toast} from "react-toastify";
import Modal from "react-modal";
import {Link} from "react-router-dom";
import "../assets/css/play.css";
import Result from "./Result";
import Auth from "../config/Auth";
import CryptoJS from 'crypto-js';
import DraggableAnswers from "../shared/DraggableAnswers.jsx";

const Play = () => {
    const {
        setLandingData,
        currentOperatorCode,
        languageProperties,
        isModalOpen,
        canPlay,
        setCanPlay,
        playedQuestions,
        totalQuestions,
    } = useContext(LandingContext);

    const canNotEnterPlayPage = playedQuestions >= totalQuestions;

    const [totalQuestion, setTotalQuestion] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [loading, setLoading] = useState(true);

    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [gameRoundId, setGameRoundId] = useState([]);
    const [orderedAnswersValue, setOrderedAnswersValue] = useState("");
    const [hasPendingGameRound, setHasPendingGameRound] = useState(false);
    const translation_obj = Tools.getTranslationObj(currentOperatorCode);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isOrderingQuestion, setIsOrderingQuestion] = useState(false);

    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [totalCollected, setTotalCollected] = useState(0);
    const [roundTotalPoints, setRoundTotalPoints] = useState(0);

    const answerAudio = new Audio("../../../assets/sounds/answer_sound.mp3");

    const loadingImage = constants.IMAGES.LOADER_IMAGE;

    useEffect(() => {
        if (canNotEnterPlayPage) {
            window.location.href = "/";
        }
    }, [canNotEnterPlayPage]);

    useEffect(() => {
        if (!Auth.isAuthenticated()) {
            window.location.href = "/";
        }
    }, []);

    const playAudio = (audioObject) => {
        audioObject.play();
    };

    const DecryptQuestionAndAnswers = (data)  => {
        const question = data.payload.game_round.question;
        const answers = data.payload.game_round.answers;
        const msisdn = data.payload.game_round.msisdn;
        const publicId = data.payload.game_round.subscriber_public_id;

        const decryptedDescription = Tools.decryptData(question.description, msisdn, publicId);

        if (decryptedDescription === "Error: Decryption failed" || decryptedDescription === "") {
            setTimeout(() => {window.location.href = "/";}, 1500)
            toast.error("Error: Decryption failed");
            return;
        }

        const decryptedAnswers = answers.map(answer => ({
            ...answer,
            description: Tools.decryptData(answer.description, msisdn, publicId),
        }));

        setQuestion({
            ...question,
            description: decryptedDescription,
        });

        setAnswers(decryptedAnswers);

    }

    const getNextStep = (params = {http_user_agent: navigator.userAgent}) => {
        // Tools.showLoader()
        getNextStepData(params)
            .then((response) => {
                Tools.checkResponseStatus(
                    response,
                    () => {
                        setQuestion(response.data.payload.game_round.question);
                        setAnswers(response.data.payload.game_round.answers);
                        setGameRoundId(response.data.payload.game_round.game_round_id);

                        DecryptQuestionAndAnswers(response.data);

                        let updatedProfile = response.data.payload.profile;
                        setLandingData((prevState) => ({
                            ...prevState, // keep all other key-value pairs
                            profile: {
                                ...prevState.profile,
                                total_points: updatedProfile.total_points,
                                total_credits: updatedProfile.total_credits,
                            },
                        }));

                        setTotalQuestion(response.data.payload.questions_result.total_question);
                        setCurrentQuestion(response.data.payload.questions_result.played_question);

                        setLoading(false);
                        Tools.hideLoader();
                        setHasPendingGameRound(false);

                        const isOrdering = response.data.payload.game_round.question.answering_type === constants.QUESTION_TYPE.ORDERING;
                        setIsOrderingQuestion(isOrdering);
                    },
                    () => {
                        if (response.data.message === "NOT_ENOUGH_CREDITS") {
                            setCanPlay(false);
                            setCorrectAnswers(response.data.payload.won_count);
                            setTotalCollected(response.data.payload.total_points);
                            setRoundTotalPoints(response.data.payload.questions_total_points);
                        }
                        setLoading(false);
                        Tools.hideLoader()
                        setHasPendingGameRound(response.data.payload.has_pending_game_round);
                    }
                );
            })
            .catch(() => {
            });
    };

    useEffect(() => {
        getNextStep();
    }, []);

    useEffect(() => {
        if (currentQuestion !== null && totalQuestion !== null) {
            setIsCompleted(currentQuestion === totalQuestion);
        }
    }, [currentQuestion, totalQuestion]);

    const renderLoading = () => {
        return (
            <div className="mx-auto justify-content-center d-flex">
                <span className="fa-2x fas fa-circle-notch fa-spin"></span>
            </div>
        );
    };

    const renderSingleAnswer = (answer, i, onAnswerClick) => {
        let answerWidth = Math.min($(".playContainer").width(), 600);
        return answer.description != null ? (
            <div key={i} className="col-md-12 text-center mt-3">
                <div
                    className="answerContainer cursor-pointer font-regular"
                    data-public-id={answer.public_id}
                    onClick={(e) => onAnswerClick(e.target)}
                >
                    {answer.description}
                </div>
            </div>
        ) : (
            <div key={i} className="col-md-12 px-0 text-center mb-3">
                <Skeleton count={1} height={49.7} width={answerWidth}/>
            </div>
        );
    };

    const resetAnswerContainers = () => {
        $(".answerContainer").removeClass("disabled active wonGameAnswer lostGameAnswer");
        $(".OrderanswerContainer").removeClass("disabled active wonGameAnswer lostGameAnswer");
    };

    const onAnswerClick = (e) => {
        let answer_id = e.dataset.publicId;
        let current_classes = e.classList;
        playAudio(answerAudio);
        if (!current_classes.contains("disabled") && !current_classes.contains("active")) {
            if (question.answering_type === "SINGLE") {
                $(".answerContainer:not([data-public-id=" + answer_id + "])").addClass("disabled");
                $(".answerContainer[data-public-id=" + answer_id + "]").addClass("active");
            } else {
                $(".OrderanswerContainer:not([data-public-id=" + answer_id + "])").addClass("disabled");
                $(".OrderanswerContainer[data-public-id=" + answer_id + "]").addClass("active");
            }

            let answer_data = {
                game_round_public_id: gameRoundId,
                answer_id: answer_id,
                ordered_answers_ids: orderedAnswersValue,
            };
            if (answer_data.answer_id === undefined) {
                answer_data.answer_id = "";
            }

            submitAnswer(answer_data)
                .then((response) => {
                    Tools.checkResponseStatus(
                        response,
                        () => {
                            let updated_profile = response.data.payload.profile;
                            let game_round_result = response.data.payload.game_round_result;

                            setLandingData((prevState) => ({
                                ...prevState, // keep all other key-value pairs
                                profile: {
                                    ...prevState.profile,
                                    total_points: updated_profile.total_points,
                                    total_credits: updated_profile.total_credits,
                                },
                            }));

                            let round_result_class = "wonGameAnswer";
                            if (game_round_result !== "WON") {
                                round_result_class = "lostGameAnswer";
                            }

                            $(".answerContainer.active").addClass(round_result_class);

                            setTimeout(() => {
                                resetAnswerContainers();
                                getNextStep();
                            }, 1000);
                        },
                        () => {
                            console.log("error in next step");
                        }
                    );
                })
                .catch(() => {
                    toast.error(translation_obj.ERROR_IN_NEXT_STEP);
                });
        }
    };

    useEffect(() => {
        const handleTouchStart = () => {
            $(".answerContainer, .OrderanswerContainer").removeClass("hover active");
        };

        document.addEventListener("touchstart", handleTouchStart);

        return () => {
            document.removeEventListener("touchstart", handleTouchStart);
        };
    }, []);

    const renderAnswer = () => {
        console.log("question.answering_type", question.answering_type)
        if (question.answering_type === constants.QUESTION_TYPE.SINGLE) {
            return answers.map((answer, i) => renderSingleAnswer(answer, i, onAnswerClick));
        } else {
            return <DraggableAnswers key={question.id} answers={answers} setOrderedQuest={setOrderedAnswersValue}/>;
        }
    };

    const renderOrderingQuestionBtn = () => {
        if (question.answering_type === constants.QUESTION_TYPE.ORDERING) {
            return (
                <div className="align-items-center">
                    <p className="d-md-none d-block font-regular px-5 text-center col-12 mx-auto mb-2 fontSize d-flex justify-content-center text-white py-2">
                        {translation_obj.USE_FINGER}
                    </p>
                    <button
                        className="btn btn-xl col-12 orderingQuestionSubmitBtn mx-auto position-relative"
                        onClick={(e) => onAnswerClick(e.target)}
                    >
                        {translation_obj.CONFIRM}
                    </button>
                </div>
            );
        }
    };

    const renderProgressBar = () => {
        const progressWidth = totalQuestion > 1 ? ((currentQuestion - 1) / (totalQuestion - 1)) * 100 : 100;


        return (
            <div className="questionNumberContainer col-12 d-flex align-items-center justify-content-between">
                <div
                    key={currentQuestion}
                    className="questionNumber font-regular"
                    style={{
                        width: `${progressWidth}%`,
                        color: "white",
                        position: "relative",
                        borderRadius: "15px",
                        overflow: "hidden",
                        transition: 'width 0.5s ease-in-out',
                    }}
                >
                    {currentQuestion}
                </div>
                {!isCompleted && (
                    <div className="d-flex justify-content-end align-items-end">
                        <span className="p-2 text-red font-regular">{totalQuestion}</span>
                    </div>
                )}
            </div>
        );
    };

    const renderQuestionImage = () => {
        if (question && question.image_url) {
            return (
                <div className="questionImageContainer text-center mt-3">
                    <img src={question.image_url} alt="Question" className="questionImage"/>
                </div>
            );
        }
        return null;
    };

    return (
        <>
            {Auth.isAuthenticated() && (
                <Fragment>
                    {hasPendingGameRound && (
                        <Modal
                            isOpen={hasPendingGameRound}
                            shouldCloseOnOverlayClick={true}
                            contentLabel="Verify On Demand Modal"
                            overlayClassName="shop-modal-overlay"
                            className="shop-modal-content col-12 col-md-6"
                        >
                            <Fragment>
                                <div
                                    className="text-center mx-auto please_enter_otp_style mt-2 mt-md-0 otp-title-font-size"
                                    dir={languageProperties.dir}
                                >
                                    <i className="fa fa-exclamation-circle space" aria-hidden="true"></i>
                                    <span>{translation_obj.TRANSACTION_LIMIT_EXCEEDED_TITLE}</span>
                                </div>
                                <div className="text-dark mx-auto text-center mt-4 fs-6 px-3" dir={languageProperties.dir}>
                                    <div>{translation_obj.STILL_HAVE_PENDING}</div>
                                </div>
                                <div className="col-6 mx-auto mt-4">
                                    <Link to="/" className="text-decoration-none">
                                        <button className="btn btn-xl col-4 subs-btn text-white mx-auto position-relative mx-auto">
                                            <span className="subscribe-btn">{translation_obj.BACK}</span>
                                        </button>
                                    </Link>
                                </div>
                            </Fragment>
                        </Modal>
                    )}

                    {!hasPendingGameRound && (
                        <div
                            className={`${isModalOpen ? "blur-effect position-relative h-100" : "position-relative"}`}
                            dir={languageProperties.dir}
                        >
                            {canPlay ? (
                                <>
                                    <div className="row col-12 col-md-12 col-lg-12 col-xl-12 mt-0 mx-auto play-main-container">
                                        <div className="row col-12 col-md-6 col-lg-6 col-xl-6 mx-auto align-items-center mt-md-2 mb-5 mb-md-0 position-relative">
                                            <div className="col-12 col-md-12 col-lg-8 col-xl-8 mx-auto pt-md-2">
                                                {loading ? (
                                                    <Fragment>
                                                        {/*<Loader />*/}
                                                    </Fragment>
                                                ) : (
                                                    <Fragment>
                                                        <div className="row col-12 mx-auto text-center pt-2 pt-md-4">
                                                            <div className="progressBarContainer">{renderProgressBar()}</div>
                                                        </div>

                                                        <div className="row col-12 mx-auto text-center questionContainer mt-4">
                                                            <div className="questionBody font-regular text-white">
                                                                <p>{question.description}</p>
                                                            </div>
                                                        </div>

                                                        {renderQuestionImage()}

                                                        <div className="row col-12 mx-auto text-center mt-3">
                                                            <div className="answersList">{renderAnswer()}</div>
                                                        </div>

                                                        <div className="row col-12 mx-auto text-center mt-3">
                                                            <div className="orderingBtnContainer">{renderOrderingQuestionBtn()}</div>
                                                        </div>
                                                    </Fragment>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* SHOW RESULT LOGIC HERE  */}
                                    <div className="row col-12 col-md-12 col-lg-12 col-xl-12 mt-0 mx-auto play-main-container">
                                        <div className="col-12 col-md-6 col-lg-6 col-xl-6 mx-auto d-flex align-items-start align-items-md-center mt-4 mt-md-0">
                                            <div className=" col-12 col-md-12 col-lg-8 col-xl-8 mx-auto pt-4">
                                                <Result
                                                    correctAnswers={correctAnswers}
                                                    totalQuestion={totalQuestion}
                                                    roundTotalPoints={roundTotalPoints}
                                                    totalCollected={totalCollected}
                                                    translation_obj={translation_obj}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </Fragment>
            )}
        </>
    );
};

export default Play;
