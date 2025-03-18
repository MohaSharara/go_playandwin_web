import React, {useContext} from "react";
import {submitShareData} from "../services/Api";
import {FacebookShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton} from "react-share";
import {toast} from "react-toastify";
import {LandingContext} from "../contexts/LandingContext";
import Tools from "../config/Tools";
import constants from "../common/constants";

const MultiShareButtons = ({design, url}) => {
    const {landingData, currentOperatorCode, getLanding} = useContext(LandingContext);
    const translation_obj = Tools.getTranslationObj(currentOperatorCode);

    const handleShareButtonClick = (platform) => {
        const params = {
            http_user_agent: navigator.userAgent,
            msisdn: landingData.profile.msisdn,
            platform: platform,
        };

        submitShareData(params).then(response => {
            Tools.checkResponseStatus(response, () => {
                if (response.message === "ALREADY_HAVE_POINTS") {

                } else {
                    getLanding()
                }
                // toast.success("1000 points added")
            }, () => {
            });
        }).catch(() => {
            toast.error(translation_obj.ERROR_OCCURRED);
        });
    };

    const platforms = [
        {name: "Telegram", icon: constants.IMAGES.SHARE_TELEGRAM, Component: TelegramShareButton},
        {name: "WhatsApp", icon: constants.IMAGES.SHARE_WHATSAPP, Component: WhatsappShareButton},
        {name: "Facebook", icon: constants.IMAGES.SHARE_FACEBOOK, Component: FacebookShareButton},
        {name: "Twitter", icon: constants.IMAGES.SHARE_TWITTER, Component: TwitterShareButton},
    ];

    console.log(constants.SHARE_TELEGRAM);

    return (
        <div className="flex justify-center space-x-4">
            {platforms.map(({name, icon, Component}) => (
                <Component
                    key={name}
                    title={translation_obj.NEW_SHARE_MESSAGE}
                    url={url}
                    hashtags={["Megapromo", "Prizes", "Win"]}
                    onClick={() => design === "InviteModal" ? null : handleShareButtonClick(name)}
                    className="flex flex-col items-center gap-2 px-2"

                >
                    {design ?
                        <>
                            <div className="w-12 h-12 rounded bg-green-500 flex items-center justify-center py-1">
                                <img className="fa-brands mx-2 w-6 h-6" src={icon} alt={name}/>
                            </div>
                            <span className="text-xs">{name}</span>
                        </> :
                        <img className="fa-brands socialIcon" src={icon} alt={name}/>
                    }

                </Component>

            ))}
        </div>

    );
};

export default MultiShareButtons;