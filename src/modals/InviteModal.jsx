import React, {useState, useContext, useEffect, Fragment} from "react";
import Modal from "react-modal";
import {LandingContext} from "../contexts/LandingContext";
import Tools from "../config/Tools";
import {isAndroid, isDesktop, isIOS} from "react-device-detect";
import constants from "../common/constants";
import Loader from "../pages/Loader";
import {FacebookShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton} from "react-share";
import {Tooltip} from "react-tooltip";
import MultiShareButtons from "../shared/MultiShareButtons";

const InviteModal = () => {
    const {
        landingData,
        currentOperatorCode,
        languageProperties,
        isInviteModalOpen,
        setInviteModalOpen,
    } = useContext(LandingContext);
    const translation_obj = Tools.getTranslationObj(currentOperatorCode);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    const closeIsInviteModalOpen = () => {
        setInviteModalOpen(false);
    };

    const getInviteLink = ()  =>  {
        let public_id = landingData.profile.public_id
        return location.origin + "/?ref_id=" + public_id.toString();
    };

    const copyToClipBoard = ()  =>  {
        let copyText = getInviteLink();

        const el = document.createElement("textarea");
        el.value = copyText;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);

        setCopied(true)

        setTimeout(function () {
            setCopied(false)
        }, 1000);
    }

    useEffect(() => {
        // Simulate a page load
        const timer = setTimeout(() => setLoading(false), 1000); // Adjust duration as needed
        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, []);


    return (
        <div>
            <Modal
                isOpen={isInviteModalOpen}
                onRequestClose={closeIsInviteModalOpen}
                shouldCloseOnOverlayClick={true}
                overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center"
                className="share-modal-content col-12 col-md-6 min-height-modal bg-gray-900 rounded-lg w-full max-w-lg text-white shadow-xl"
                ariaHideApp={false}
            >

                <button
                    className="modal-close-btn text-white"
                    onClick={closeIsInviteModalOpen}
                    aria-label="Close"
                    title="Close"
                >
                    <span aria-hidden="true">×</span>
                </button>
                {loading ? (
                    <Loader bodyClass={"min-height-modal"} />
                ) : (
                    <div className="p-1 pt-5 p-md-4" dir={languageProperties.dir}>

                        <div className="fs-4 text-white font-bold mb-4">
                            {translation_obj.SHARE_WITH_FRIENDS}
                        </div>

                        {/* URL Section */}
                        <div className="row flex items-center gap-2 bg-gray-900 rounded-lg mb-4 shadow-md" dir={languageProperties.dir}>
                            {/* Link Section */}
                            <div className="col-10 col-md-11">
                                <div className="text-sm truncate text-gray-300"><span className="px-1">🔗</span>{getInviteLink()}</div>
                            </div>

                            {/* Copy Button */}
                            <div id="clickable" className="col-1 w-10 h-10 bg-gray-800 rounded flex items-center justify-center cursor-pointer clickable "
                                 data-toggle="tooltip"
                                 data-placement="top"
                                 onClick={copyToClipBoard}
                            >
                                🔗
                            </div>
                            <Tooltip anchorSelect="#clickable" clickable>
                                {copied ? translation_obj.COPIED : translation_obj.COPY_LINK}
                            </Tooltip>
                        </div>

                        <div className="fs-4 text-white font-bold mb-4">
                            {translation_obj.FOR_EVERY_SHARE}
                        </div>

                        <h2 className="fs-4 text-lg font-semibold flex items-center gap-2 mb-2 mt-5 line">
                            {translation_obj.SHARE}
                        </h2>

                        {/* Share buttons */}
                        <div className="grid grid-cols-4 gap-4 mt-4">
                           <MultiShareButtons design="InviteModal" url={getInviteLink()} />
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default InviteModal;
