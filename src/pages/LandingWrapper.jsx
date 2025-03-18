import React, {Fragment, useContext, useEffect} from 'react';
import TriviaGameCard from "./TriviaGameCard";
import Faq from "./Faq";
import Footer from "./Footer";
import DownloadTheApp from "./DownloadTheApp";
import WeeklyGameCard from "./WeeklyGameCard";
import SpinnerCard from "./SpinnerCard";
import WinnersCard from "./WinnersCard";
import {LandingContext} from "../contexts/LandingContext";
import Landing from "./Landing";
import UnSubscribeModal from "../modals/UnSubscribeModal";
import WinnersModal from "../modals/WinnersModal";
import SpinTheWheelModal from "../modals/SpinTheWheelModal";
import CompleteQuests from "./CompleteQuests";
import Tools from "../config/Tools";
import constants from "../common/constants";
import NeedGPMModal from "../modals/NeedGPMModal";
import InviteModal from "../modals/InviteModal";
import ShareModal from "../modals/ShareModal";
const LandingWrapper = () => {
    const {
        languageProperties,
        isUnSubModalOpen,
        isWinnerModalOpen,
        isSpinTheWheelModalOpen,
        isNeedGPMModalOpen,
        isInviteModalOpen,
        setInviteModalOpen,
        isShareModalOpen,
        setIsShareModalOpen,
    } = useContext(LandingContext);
    const channel = Tools.getCurrentChannel()

    useEffect(() => {
        const floatingContainer = document.querySelector(".floating-container");
        const quizElement = document.getElementById("header");

        if (!quizElement || !floatingContainer) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    floatingContainer.classList.add("hidden");
                } else {
                    floatingContainer.classList.remove("hidden");
                }
            },
            { threshold: 0 }
        );

        observer.observe(quizElement);

        return () => observer.disconnect();
    }, []);
    return (
        <Fragment>
            <div
                className={`${isUnSubModalOpen || isWinnerModalOpen || isSpinTheWheelModalOpen || isNeedGPMModalOpen || isInviteModalOpen || isShareModalOpen ? 'backdrop' : ''}`}
                dir={languageProperties.dir}>

                <div>
                    <Landing/>
                </div>
                <div>
                    <TriviaGameCard/>
                </div>
                <div>
                    <WeeklyGameCard/>
                </div>
                <div>
                    <SpinnerCard/>
                </div>

                {constants.GPM.includes(channel) ? (
                    <div>
                        <CompleteQuests/>
                    </div>
                ) : (
                    <div>
                        <DownloadTheApp/>
                    </div>
                )
                }

                <div>
                    <WinnersCard/>
                </div>


                {isUnSubModalOpen && (
                    <UnSubscribeModal/>
                )}

                {isWinnerModalOpen && (
                    <WinnersModal/>
                )}

                {isSpinTheWheelModalOpen && (
                    <SpinTheWheelModal/>
                )}

                {isNeedGPMModalOpen && (
                    <NeedGPMModal/>
                )}

                {isInviteModalOpen && (
                    <InviteModal />
                )}

                {isShareModalOpen && (
                    <ShareModal />
                )}

                <div>
                    <Faq/>
                </div>
                <Footer
                    showUnsubscribe={true}
                />
            </div>
            {/* Floating Button */}
            <div className="floating-container">
                <div className="floating-button-top">
                    <button className="floating-option" onClick={() => setInviteModalOpen(true)}>
                        <i className="fas fa-user-plus text-dark"></i>
                    </button>
                </div>
                <div className="floating-button-bottom">

                    <button className="floating-option" onClick={() => setIsShareModalOpen(true)}>
                        <i className="fas fa-share-alt text-dark"></i>
                    </button>
                </div>
            </div>
        </Fragment>
    )

}

export default LandingWrapper;