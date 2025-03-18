import React, { useContext, useEffect, useState } from "react";
import Tools from "../config/Tools";
import { LandingContext } from "../contexts/LandingContext";
import Auth from "../config/Auth";
import constants from "../common/constants";
import { isAndroid, isIOS, isDesktop } from "react-device-detect";

const SpinnerCard = () => {
	const {
		currentOperatorCode,
		languageProperties,
		isMobile,
		setIsSpinTheWheelModalOpen,
		canSpin,
		failedCharging,
		setIsNeedGPMModalOpen,
		operatorConfig
	} = useContext(LandingContext);

	const translation_obj = Tools.getTranslationObj(currentOperatorCode);
	const [disabledSpin, setDisabledSpin] = useState(false);
	const channel = Tools.getCurrentChannel();
	const [buttonText, setButtonText] = useState(translation_obj.GIVE_IT_A_SPIN);

	const handleBtnClick = () => {
		if (Auth.isAuthenticated() && canSpin && !constants.GPM.includes(channel)) {
			setIsNeedGPMModalOpen(true);
			// if (isDesktop) {
			// 	window.location.href = operatorConfig.DESKTOP_LINK;
			// } else if (isAndroid) {
			// 	window.location.href = operatorConfig.ANDROID_LINK;
			// } else if (isIOS) {
			// 	window.location.href = operatorConfig.IOS_LINK;
			// }
		} else if (Auth.isAuthenticated() && canSpin && constants.GPM.includes(channel)) {
			setIsSpinTheWheelModalOpen(true);
		} else {
			const subscribeSection = document.getElementById("subscribe");
			if (subscribeSection) {
				subscribeSection.scrollIntoView({ behavior: "smooth" });
			}
		}
	};

	useEffect(() => {
		if (Auth.isAuthenticated()) {
			if (canSpin && constants.GPM.includes(channel)) {
				setDisabledSpin(false);
				setButtonText(translation_obj.GIVE_IT_A_SPIN);
			} else if (canSpin && !constants.GPM.includes(channel)) {
				setDisabledSpin(false);
				// setButtonText(translation_obj.DOWNLOAD_APP);
				setButtonText(translation_obj.GIVE_IT_A_SPIN);
			} else if (failedCharging) {
				setDisabledSpin(true);
				setButtonText(translation_obj.GIVE_IT_A_SPIN);
			} else {
				setDisabledSpin(true);
				setButtonText(translation_obj.GIVE_IT_A_SPIN);
			}
		} else {
			setDisabledSpin(false);
			setButtonText(translation_obj.JOIN_NOW);
		}
	}, [canSpin, failedCharging, channel]);


	return (
		<div className="trivia-game-container px-3 py-2" dir={languageProperties.dir}>
			<div className="row trivia-game-card align-items-center text-center">
				<div className="col-12 prize-image position-relative">
					<img
						src={
							isMobile
								? translation_obj.SPINNER_CARD_BG_MOBILE
								: translation_obj.SPINNER_CARD_BG_DESKTOP
						}
						alt="Trivia Character"
						className="w-100 img-non-draggable"
					/>
					<div className="col-10 col-md-10 position-absolute game-card-text-position px-0 px-md-0 text-start pe-0">
						<div className="col-md-7">
							<div className="game-card-title mb-4 mb-md-2 mb-lg-4 font-bold">
								{translation_obj.SPIN_THE_WHEEL}
							</div>
							<div className="game-card-title mb-4 mb-md-2 mb-lg-4 font-bold">
								{translation_obj.EARN_POINTS_OR_MORE}
							</div>
						</div>
					</div>

					<div className="col-12 col-md-10 position-absolute game-card-btn-position text-center text-md-start">
						<div className="failed-charging-popup-activator position-relative">
							<button
								className="btn btn-xl general-btn font-bold"
								onClick={handleBtnClick}
								disabled={disabledSpin}
							>
								{buttonText}
							</button>
							{failedCharging && disabledSpin && (
								<div className="card d-none" id="failed-charging-popup">
									{translation_obj.NOT_CHARGED_SPINNER_POPUP_MSG}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SpinnerCard;
