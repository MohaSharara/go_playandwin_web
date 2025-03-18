import React, { Fragment, useContext, useEffect, useState, useRef } from "react";
import Modal from "react-modal";
import { LandingContext } from "../contexts/LandingContext";
import Confetti from "react-confetti";
import "../../src/assets/css/spinner.css";
import useSpinnerModule from "../shared/SpinnerModule";
import constants from "../common/constants";
import Tools from "../config/Tools";

const SpinTheWheelModal = () => {
	const {
		isSpinTheWheelModalOpen,
		setIsSpinTheWheelModalOpen,
		setTotalPoints,
		languageProperties,
		currentOperatorCode,
		canSpin,
		getLanding,
	} = useContext(LandingContext);
	const { init, startSpin, prepareSpinnerData, loading, showConfetti, spinnerRewardType, number } = useSpinnerModule();

	let pointsResult = spinnerRewardType === "POINTS";
	let questionResult = spinnerRewardType === "TRIVIA_QUESTIONS";

	const modalRef = useRef(null);
	const [confettiDimensions, setConfettiDimensions] = useState({ width: 300, height: 400 });

	const imageLoader = constants.IMAGES.LOADER;

	const isArabic = languageProperties.lang === "AR"


	const translation_obj = Tools.getTranslationObj(currentOperatorCode);

	const [isSpinDisabled, setIsSpinDisabled] = useState(false);

	const closeSpinnerModal = () => {
		getLanding();
		setIsSpinTheWheelModalOpen(false);
	};
	const startSpinFn = () => {
		if (isSpinDisabled) return;

		setIsSpinDisabled(true);

		startSpin();
	};

	useEffect(() => {
		prepareSpinnerData("en");
		init(localStorage.getItem("language"), setTotalPoints);
	}, []);

	useEffect(() => {
		if (modalRef.current) {
			const { offsetWidth, offsetHeight } = modalRef.current;
			setConfettiDimensions({ width: offsetWidth, height: offsetHeight });
		}
	}, [isSpinTheWheelModalOpen]);

	return (
		<Fragment>
			<Modal
				isOpen={isSpinTheWheelModalOpen}
				onRequestClose={closeSpinnerModal}
				shouldCloseOnOverlayClick={true}
				overlayClassName="winner-modal-overlay"
				className="unsub-modal-content col-12 col-md-6"
				ariaHideApp={false}
				ref={modalRef}
			>
				{showConfetti && <Confetti width={confettiDimensions.width} height={confettiDimensions.height} />}
				<Fragment>
					<button className="modal-close-btn text-white" onClick={closeSpinnerModal} aria-label="Close" title="Close">
						<span aria-hidden="true">×</span>
					</button>
					<div className="pt-5 pt-md-3">
						{isSpinDisabled ? (
							""
						) : (
							<>
								<h4 className={`text-center mb-4  ${isArabic ? "font-arabic-bold": "font-bold" } `} dir={languageProperties.dir}>
									{/*{translation_obj.SPIN_THE_WHEEL_TITLE}*/}
								</h4>
							</>
						)}
						{(questionResult || pointsResult) && showConfetti && (
							<>
								{questionResult ? (
									<>
										<h4 className={`text-center mb-4  ${isArabic ? "font-arabic-bold": "font-bold" }" `} dir={languageProperties.dir}>
											{translation_obj.RESULT_MESSAGE(number)}
										</h4>
									</>
								) : (
									<>
										<h4 className={`text-center mb-4 ${isArabic ? "font-arabic-bold": "font-bold" }"`} dir={languageProperties.dir}>
											{translation_obj.RESULT_MESSAGE_POINTS(number)}
										</h4>
									</>
								)}
							</>
						)}

						{loading ? (
							<>
								<div className="spinner-loader text-center text-white spinner-height">
									<img src={imageLoader} alt="Loader" />
								</div>
							</>
						) : (
							<>
								<div className="lead the_wheel row" style={{ position: "relative" }}>
									<div className="spinContainer">
										<div id="inner-spin-vector"></div>
										{/* <div id="inner-spin"></div> */}
									</div>
									<div className="backgroundimg " style={{ margin: "auto" }}>
										<div className="SpinnerBackGround">
											<div id="spin" />
											<div className="canvasContainer">
												<div className="canvasWrapper">
													<div className="innerShadow"></div>
													<div className="spinnerCircle"></div>
													<canvas
														className="canvasPosition"
														id="canvas"
														width="854"
														height="854"
														data-responsiveminwidth="180"
														data-responsivescaleheight="true"
														data-responsivemargin="50"
													></canvas>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="text-center mt-2">
									{!showConfetti && (
										<button
											className={`btn btn-xl col-12 spinnerSubmitBtn mx-auto position-relative ${isArabic ? "font-arabic-bold": "font-bold" } `}
											style={{
												pointerEvents: isSpinDisabled ? "none" : "auto",
												opacity: isSpinDisabled ? 0.5 : 1,
											}}
											onClick={startSpinFn}
										>
											{translation_obj.START}
										</button>
									)}

									{showConfetti && (
										<>
											<button
												className={`btn btn-xl col-12 spinnerSubmitBtn mx-auto position-relative ${isArabic ? "font-arabic-bold": "font-bold" }`}
												onClick={() => {
													if (questionResult) {
														window.location.href = "/play";
														closeSpinnerModal();
													} else {
														closeSpinnerModal();
													}
												}}
											>
												{questionResult ? translation_obj.GO_TO_QUESTION : translation_obj.CLOSE}
											</button>
											{questionResult && (
												<div className="text-center font-regular mt-2 f-12">{translation_obj.VALID}</div>
											)}
										</>
									)}
								</div>
							</>
						)}
					</div>
				</Fragment>
			</Modal>
		</Fragment>
	);
};

export default SpinTheWheelModal;
