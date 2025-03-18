import React, {Fragment, useContext, useEffect, useState} from "react";
import Modal from "react-modal";
import {LandingContext} from "../contexts/LandingContext";
import Tools from "../config/Tools";
import {getTermsData, getWinnersData} from "../services/Api";
import {toast} from "react-toastify";
import constants from "../common/constants";
import Loader from "../pages/Loader";

const WinnersModal = () => {
    const {
        currentOperatorCode,
        isWinnerModalOpen,
        setIsWinnerModalOpen,
        languageProperties
    } = useContext(LandingContext);
    const [winnersContent, setWinnersContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const translation_obj = Tools.getTranslationObj(currentOperatorCode);

    const default_image = "./src/assets/images/default-winner-profile.png";
    const winners = [
        {id: 1, name: "John Doe", prize: "$5,000", image: constants.IMAGES.WINNER_DEMO_IMAGE, won_dt: "10/12/2024"},
        {id: 2, name: "Jane Doe", prize: "$3,000", image: constants.IMAGES.WINNER_DEMO_IMAGE, won_dt: "10/11/2024"},
        {id: 3, name: "Sam Smith", prize: "$2,000", image: constants.IMAGES.WINNER_DEMO_IMAGE, won_dt: "01/12/2024"},
        {id: 4, name: "Emily Davis", prize: "$1,500", image: constants.IMAGES.WINNER_DEMO_IMAGE, won_dt: "10/12/2024"},
        {id: 5, name: "Chris Johnson", prize: "$1,000", image: constants.IMAGES.WINNER_DEMO_IMAGE, won_dt: "10/12/2023"},
        {id: 6, name: "Patricia Brown", prize: "$750", image: constants.IMAGES.WINNER_DEMO_IMAGE, won_dt: "10/12/2024"},
        {id: 7, name: "Michael White", prize: "$500", image: constants.IMAGES.WINNER_DEMO_IMAGE, won_dt: "12/12/2024"},
        {id: 8, name: "Linda Green", prize: "$300", image: constants.IMAGES.WINNER_DEMO_IMAGE, won_dt: "10/12/2024"},
    ];

    useEffect(() => {
        getWinners();
        // setWinnersContent(winners);
    }, []);

    const closeWinnerModal = () => {
        setIsWinnerModalOpen(false);
    };

    const getWinners = (params = {http_user_agent: navigator.userAgent}) => {

        const delayApiCall = setTimeout(() => {
            getWinnersData(params).then(response => {
                Tools.checkResponseStatus(response, () => {
                    setWinnersContent(response.data.payload.winners_list);
                    setLoading(false);
                }, () => {
                    toast.error(translation_obj.ERROR_OCCURRED);
                });
            }).catch(() => {
            });
        }, 500); // Delay of 0.5 seconds

        // Cleanup timeout on component unmount
        return () => clearTimeout(delayApiCall);

    }

    const renderWinnersContainer = () => {

        return (
            <div>
                {winnersContent.map(renderWinners)}
            </div>
        );
    };

    const renderWinners = (winner) => {
        return (
                <div key={winner.id} className="col-12 mb-4 p-0 pt-2">
                    <div className="winner-card">
                        <div className="modal-winner-image no-select">
                            <img
                                src={winner?.image || default_image}
                                alt={winner.name}
                                className="h-100"
                            />
                        </div>
                        <div className="modal-winner-text-dev no-select d-flex align-items-center justify-content-center w-100">
                            <div className="row col-12 ">
                                <div className="col-6 d-grid align-items-start justify-content-center">
                                    <div className="d-grid align-items-center justify-content-center modal-winner-name">{winner.full_name || winner.msisdn}</div>
                                </div>
                                <div className={`col-6 d-grid align-items-center text-end ${
                                    languageProperties.dir === "ltr" ? "justify-content-end" : "justify-content-start"
                                }`} dir={languageProperties.dir}>
                                    <div className="winner-modal-name-text font-extra-bold">{`${translation_obj.WON} ${winner.prize}`}</div>
                                    <div className="winner-modal-prize-text text-white">{`${winner.won_dt}`}</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
        )
    }

    return (
        <Fragment>
            <div>
                <Modal
                    isOpen={isWinnerModalOpen}
                    onRequestClose={closeWinnerModal}
                    shouldCloseOnOverlayClick={true}
                    overlayClassName="winner-modal-overlay"
                    className="unsub-modal-content col-12 col-md-6"
                    ariaHideApp={false}
                >
                    <Fragment>
                        <button
                            className="modal-close-btn text-white"
                            onClick={closeWinnerModal}
                            aria-label="Close"
                            title="Close"
                        >
                            <span aria-hidden="true">×</span>
                        </button>

                                <div className="inner cover text-left text-white px-0 mt-1 py-4"
                                     data-lang={languageProperties.lang}>
                                    <div className="d-flex justify-content-center winners-title font-bold">
                                        {translation_obj.ALL_WINNERS}
                                    </div>
                                    {loading ?
                                        <Fragment>
                                            <Loader bodyClass="winners-modal-container" />
                                        </Fragment> :
                                        <Fragment>
                                            <div className="row winnersContainer">
                                                <div id="winners-modal-container" className="winners-modal-container">
                                                    {renderWinnersContainer()}
                                                </div>
                                            </div>
                                        </Fragment>
                                    }
                                </div>


                    </Fragment>
                </Modal>
            </div>
        </Fragment>
    );
};

export default WinnersModal;
