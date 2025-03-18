import React, {useState, useContext, useEffect} from "react";
import Modal from "react-modal";
import {LandingContext} from "../contexts/LandingContext";
import Tools from "../config/Tools";
import Loader from "../pages/Loader";
import {Tooltip} from 'react-tooltip'
import MultiShareButtons from "../shared/MultiShareButtons";


const ShareModal = () => {
    const {
        currentOperatorCode,
        languageProperties,
        isShareModalOpen,
        setIsShareModalOpen,
    } = useContext(LandingContext);
    const translation_obj = Tools.getTranslationObj(currentOperatorCode);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    const closeIsShareModalOpen = () => {
        setIsShareModalOpen(false);
    };

    const getInviteLink = () => {
        return location.origin;
    };

    const copyToClipBoard = () => {
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
                isOpen={isShareModalOpen}
                onRequestClose={closeIsShareModalOpen}
                shouldCloseOnOverlayClick={true}
                overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center"
                className="share-modal-content col-12 col-md-6 min-height-modal bg-gray-900 rounded-lg w-full max-w-lg text-white shadow-xl"
                ariaHideApp={false}
            >
                {/* Header */}
                <button
                    className="modal-close-btn text-white"
                    onClick={closeIsShareModalOpen}
                    aria-label="Close"
                    title="Close"
                >
                    <span aria-hidden="true">×</span>
                </button>

                {loading ? (
                    <Loader bodyClass={"min-height-modal"}/>
                ) : (
                    <div className="p-1 pt-5 p-md-4" dir={languageProperties.dir}>
                        {/* URL Section */}
                        <div className="row flex items-center gap-2 bg-gray-900 rounded-lg mb-4 shadow-md">
                            {/* Link Section */}
                            <div className="col-10 col-md-11">
                                <div className="text-sm truncate text-gray-300"><span className="px-1">🔗</span>{location.origin}</div>
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

                        <h2 className="text-lg font-semibold flex items-center gap-2 mb-2 mt-5 line">
                            {translation_obj.SHARE}
                        </h2>

                        {/* Share buttons */}
                        <div className="grid grid-cols-4 gap-4 mt-4">
                            <MultiShareButtons design={"ShareModal"} url={location.origin}/>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ShareModal;