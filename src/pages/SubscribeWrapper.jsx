import React, {Fragment, useContext, useEffect} from 'react';
import Subscribe from "./Subscribe";
import TriviaGameCard from "./TriviaGameCard";
import Faq from "./Faq";
import Footer from "./Footer";
import DownloadTheApp from "./DownloadTheApp";
import WeeklyGameCard from "./WeeklyGameCard";
import SpinnerCard from "./SpinnerCard";
import WinnersCard from "./WinnersCard";
import {LandingContext} from "../contexts/LandingContext";
import CompleteQuests from "./CompleteQuests";
import WinnersModal from "../modals/WinnersModal";
import Tools from "../config/Tools";
import constants from "../common/constants";

const SubscribeWrapper = () => {
    const {
        languageProperties,
        isUnSubModalOpen,
        isWinnerModalOpen,
        setLoading
    } = useContext(LandingContext);
    const channel = Tools.getCurrentChannel()

    useEffect(() => {
        // Simulate a page load
        const timer = setTimeout(() => setLoading(false), 1000); // Adjust duration as needed
        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, []);

    return (
        <Fragment>
            <div className={`${isUnSubModalOpen || isWinnerModalOpen ? 'backdrop' : ''}`}
                 dir={languageProperties.dir}>

                <div>
                    <Subscribe/>
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

                {isWinnerModalOpen && (
                    <WinnersModal/>
                )}

                {/*<div>*/}
                {/*    <HowToPlay*/}
                {/*        currentLanguage={props.currentLanguage}*/}
                {/*    />*/}
                {/*</div>*/}

                <div>
                    <Faq/>
                </div>
                <Footer
                    showUnsubscribe={false}
                />
            </div>
        </Fragment>
    )

}

export default SubscribeWrapper;
