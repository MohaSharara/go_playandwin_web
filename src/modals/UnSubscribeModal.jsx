import React, {useState, use} from "react";
import Modal from "react-modal";
import {Link} from "react-router-dom";
import {LandingContext} from "../contexts/LandingContext";
import Tools from "../config/Tools";
import {unsubscribe} from "../services/Api";
import Auth from "../config/Auth";
import {toast} from "react-toastify"; // Adjust the import based on your project structure
import {isDesktop} from "react-device-detect";

const UnSubscribeModal = () => {
    const {
        landingData,
        currentOperatorCode,
        languageProperties,
        isUnSubModalOpen,
        setIsUnSubModalOpen
    } = use(LandingContext);
    const translation_obj = Tools.getTranslationObj(currentOperatorCode);
    const [loading, setLoading] = useState(false);
    const dir = languageProperties.dir;

    const handleUnsubClick = () => {
        setLoading(true);
        unsubscribe({msisdn: landingData.profile.msisdn}).then(response => {
            Tools.checkResponseStatus(response, () => {
                Auth.resetAuthentication()
            }, () => {
                toast.error(translation_obj.ERROR_OCCURRED);
            });
        }).catch(() => {
            toast.error(translation_obj.ERROR_OCCURRED);
        }).finally(() => {
        })
    };

    const closeUnsubscribeModal = () => {
        setIsUnSubModalOpen(false);
    };

    const renderLoading = () => {
        return (
            <div className="mx-auto justify-content-center d-flex">
                <span className='fa fas fa-circle-notch fa-spin'></span>
            </div>
        )
    }

    return (
        <div>
            <Modal
                isOpen={isUnSubModalOpen}
                onRequestClose={closeUnsubscribeModal}
                shouldCloseOnOverlayClick={true}
                contentLabel="Unsub Modal"
                overlayClassName="unsub-modal-overlay"
                className="unsub-modal-content col-12 col-md-6"
                ariaHideApp={false}
            >
                <button
                    className="modal-close-btn text-white"
                    onClick={closeUnsubscribeModal}
                    aria-label="Close"
                    title="Close"
                >
                    <span aria-hidden="true">×</span>
                </button>
                <div className="inner cover text-center text-dark px-0 sharePage mt-1 p-2" dir={dir}
                     data-lang={languageProperties.lang}>
                    <div className={isDesktop ? "fs-3 text-white font-bold" : "fs-5 text-white font-bold"}>
                        {translation_obj.ARE_YOU_SURE_UNSUBSCRIBE_1}
                    </div>
                    <div className={isDesktop ? "fs-3 text-white font-bold" : "fs-5 text-white font-bold"}>
                        {translation_obj.ARE_YOU_SURE_UNSUBSCRIBE_2}
                    </div>
                    <div className="row mt-3" data-lang={languageProperties.lang}>
                        <button
                            className='btn px-3 pt-2 pb-1 confirm-btn position-relative font-bold mt-2 mx-auto'
                            disabled={loading}
                            onClick={handleUnsubClick}
                        >
                            {loading ? renderLoading() : (
                                <span className="mx-auto pl-2">
                                    <span className="fw-bold">{translation_obj.CONFIRM}</span>
                                </span>
                            )}
                        </button>
                        <button
                            className='btn px-3 pt-2 pb-1 cancel-btn position-relative font-bold mt-2 mx-auto'
                            onClick={closeUnsubscribeModal}
                        >
                            <span className="mx-auto pl-2">
                                <span className="fw-bold">{translation_obj.CLOSE}</span>
                            </span>
                        </button>
                    </div>
                </div>
                {/*<div className="mt-5 d-flex align-items-center justify-content-center">*/}
                {/*    <Link className="text-grey no-underline" to="terms">*/}
                {/*        {translation_obj.TERMS_AND_CONDITIONS}*/}
                {/*    </Link>*/}
                {/*</div>*/}
            </Modal>
        </div>
    );
};

export default UnSubscribeModal;
