import React, {Fragment, use} from "react";
import Tools from "../config/Tools";
import {LandingContext} from "../contexts/LandingContext";
import constants from "../common/constants";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const WinnersCard = () => {
    const {currentOperatorCode, languageProperties, setIsWinnerModalOpen, winnersList} = use(LandingContext);
    const translation_obj = Tools.getTranslationObj(currentOperatorCode);
    const default_image = "/assets/images/default-winner-profile.png";

    // Example winners data (replace with API data if necessary)
    const winners = [
        {id: 1, name: "John Doe", prize: "$5,000", image: constants.IMAGES.WINNER_DEMO_IMAGE},
        {id: 2, name: "Jane Doe", prize: "$3,000", image: constants.IMAGES.WINNER_DEMO_IMAGE},
        {id: 3, name: "Sam Smith", prize: "$2,000", image: constants.IMAGES.WINNER_DEMO_IMAGE},
        {id: 4, name: "Emily Davis", prize: "$1,500", image: constants.IMAGES.WINNER_DEMO_IMAGE},
        {id: 5, name: "Chris Johnson", prize: "$1,000", image: constants.IMAGES.WINNER_DEMO_IMAGE},
        {id: 6, name: "Patricia Brown", prize: "$750", image: constants.IMAGES.WINNER_DEMO_IMAGE},
        {id: 7, name: "Michael White", prize: "$500", image: constants.IMAGES.WINNER_DEMO_IMAGE},
        {id: 8, name: "Linda Green", prize: "$300", image: constants.IMAGES.WINNER_DEMO_IMAGE},
    ];
    // const winners = [];

    const isMobile = window.innerWidth <= 768;

    // Helper to group items into chunks for desktop view
    const chunkArray = (arr, size) =>
        arr.reduce((chunks, item, index) => {
            const chunkIndex = Math.floor(index / size);
            if (!chunks[chunkIndex]) {
                chunks[chunkIndex] = []; // Start a new chunk
            }
            chunks[chunkIndex].push(item);
            return chunks;
        }, []);

    const groupedWinners = chunkArray(winnersList, isMobile ? 2 : 6); // Group for mobile (1 per slide) and desktop (6 per slide)

    const handleViewMoreClick = () => {
        setIsWinnerModalOpen(true); // Open the Unsubscribe modal
    };

    return (
        <div id="winners" className="winners-container px-0 py-2 position-relative" dir={languageProperties.dir}>
            <img
                src={
                    winnersList.length > 0 ?
                    (isMobile ? constants.IMAGES.WINNERS_CARD_BG_MOBILE : constants.IMAGES.WINNERS_CARD_BG_DESKTOP):
                    (isMobile ? constants.IMAGES.NO_WINNERS_CARD_BG_MOBILE : constants.IMAGES.NO_WINNERS_CARD_BG_DESKTOP)
                }
                alt="Trivia Character"
                className="winner-card-bg"
            />
            <div className="position-absolute winner-dev-position">
                <div className="row mb-md-4">
                    <div className="col-6 text-start sub-color font-bold fs-2">{translation_obj.WINNERS}</div>
                    {winnersList.length > 0 &&
                        <div className="col-6 text-end my-auto ">
                            <a onClick={handleViewMoreClick}
                               className="view-more-link text-white text-decoration-none pe-2 pointer">
                                {translation_obj.VIEW_MORE} &gt;
                            </a>
                        </div>
                    }
                </div>


                {winnersList.length > 0 ?
                    <Fragment>
                        <div className="carousel-wrapper mt-md-5" dir="ltr">
                            <Carousel
                                showArrows={false}
                                showThumbs={false}
                                interval={5000}
                                emulateTouch={true}
                                autoPlay={false}
                                infiniteLoop={true}
                                swipeable={true}
                                showStatus={false}
                                showIndicators={groupedWinners.length > 1}
                            >
                                {groupedWinners.map((group, index) => (
                                    <div key={index} className="p-3">
                                        <div className="row" dir={languageProperties.dir}>
                                            {group.map((winner) => (
                                                <div key={winner.id} className="col-6 col-md-4 mb-4 p-0">
                                                    <div className="winner-card">
                                                        <div className="winner-image no-select">
                                                            <img
                                                                src={winner?.image || default_image}
                                                                alt={winner.name}
                                                                className="w-100 h-100"
                                                            />
                                                        </div>
                                                        <div className="winner-text-dev no-select">
                                                            <div className="winner-name-text"><span dir="ltr">{winner.full_name || winner.msisdn}</span></div>
                                                            <div className="winner-prize-text font-bold">{`${translation_obj.WON} ${winner.prize}`}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                    </Fragment> :
                    <Fragment>
                        <div className="d-flex align-items-center justify-content-end position-relative">
                            <div className="no-winners-container position-absolute">
                                <div className="sub-color text-center no-winner-title-1">
                                    {translation_obj.NO_WINNERS_YET_1}
                                </div>
                                <div className="sub-color font-extra-bold text-center no-winner-title-2">
                                    {translation_obj.NO_WINNERS_YET_2}
                                </div>
                            </div>
                        </div>
                    </Fragment>
                }

            </div>
        </div>


    );
};

export default WinnersCard;
