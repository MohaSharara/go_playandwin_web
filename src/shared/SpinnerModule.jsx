import { useState, useEffect, useRef, useContext } from "react";
import { getSpinner, startSpinner } from "../services/Api.jsx";
import Tools from "../config/Tools.jsx";
import { LandingContext } from "../contexts/LandingContext.jsx";
// import { isMobileOnly} from "react-device-detect";


const useSpinnerModule = () => {
	const { setTotalPoints, setCanSpin, currentOperatorCode, languageProperties } = useContext(LandingContext);
	const tick = "../assets/sounds/tick.mp3";
	const winTrack = "../assets/sounds/win_track.wav";
	const [wheelSpinning, setWheelSpinning] = useState(false);
	const [segments, setSegments] = useState([]);
	const [prizeSegment, setPrizeSegment] = useState(0);
	const [chanceId, setChanceId] = useState(null);
	const [successStartSpin, setSuccessStartSpin] = useState(true);
	const [audio] = useState(new Audio(tick));
	const [winAudio] = useState(new Audio(winTrack));
	const colors = ["#377CCC", "#37CC4D", "#CCC137", "#CC8237", "#7E37CC", "#CC374A"];
	const [showConfetti, setShowConfetti] = useState(false);
	const [countdownTimerFinish, setCountdownTimerFinish] = useState(null);
	const counterMinutes = 1;
	const isArabic = languageProperties.lang === "AR"

	const [spinnerRewardType, setSpinnerRewardType] = useState(null);
	const [number, setNumber] = useState(0);

	const theWheelRef = useRef(null);

	const [loading, setLoading] = useState(true);

	const translation_obj = Tools.getTranslationObj(currentOperatorCode);

	const init = (currentLanguage, setTotalPointsFn) => {
		setCountdownTimerFinish(new Date().setMinutes(new Date().getMinutes() + counterMinutes));
	};

	const initSpinner = () => {
		const newWheel = new Winwheel({
			textFillStyle: "white",
			// textStrokeStyle: "#5A5A5A",
			textFontFamily: isArabic ? "NotoKufiArabic-Bold" : "Inter-ExtraBold",
			// textLineWidth: isMobileOnly ? 0.2 : 0.5,
			imageOverlay: false,
			clearTheCanvas: true,
			responsive: true,
			outerRadius: 390,
			innerRadius: 19,
			textFontSize: isArabic ? 45 : 35,
			textOrientation: "horizontal",
			textAlignment: "center",
			textMargin: 3,
			numSegments: segments.length,
			segments,
			lineWidth: 5,
			animation: {
				type: "spinToStop",
				duration: 9,
				spins: 1,
				callbackFinished: wheelPrize,
				callbackSound: playWheelSound,
				soundTrigger: "pin",
			},
			pins: {
				number: 8,
				fillStyle: "#fdfdfd",
				outerRadius: 0,
				responsive: true,
				margin: -3,
				strokeStyle: "#ec9b5e",
			},
			pointerAngle: 0,
		});

		newWheel.draw();
		setWheelSpinning(false);

		const finish = newWheel.getRandomForSegment(prizeSegment);
		newWheel.animation.stopAngle = finish;

		theWheelRef.current = newWheel;
	};

	const startSpin = () => {
		if (!wheelSpinning && theWheelRef.current) {
			theWheelRef.current.animation.spins = 3;
			theWheelRef.current.startAnimation();
			setWheelSpinning(true);
		}
	};

	const wheelPrize = () => {
		if (successStartSpin) {
			// Play sound, show confetti, etc.
			setShowConfetti(true);
			playWinSound();

			const updatedParams = {
				prize_id: theWheelRef.current.segments[prizeSegment].public_id,
				chance: chanceId,
			};

			startSpinner(updatedParams)
				.then((response) => {
					Tools.checkResponseStatus(
						response,
						() => {
							let payload = response.data.payload;
							setTotalPoints(payload.subscriber.total_points);
							setCanSpin(payload.subscriber.can_win_spinner);
						},
						() => {
							console.log("Error in spinner API");
							// Handle error scenario
						}
					);
				})
				.catch(() => {});
		}
	};

	const playWheelSound = () => {
		$("#spin").addClass("rotateSpinnerVector");
		stopAllAudios();
		audio.play();
	};

	const playWinSound = () => {
		stopAllAudios();
		winAudio.play();
	};

	const stopAllAudios = () => {
		[audio, winAudio].forEach((audio) => {
			audio.pause();
			audio.currentTime = 0;
		});
	};

	const prepareSpinnerData = (currentLanguage) => {
		getSpinner()
			.then((response) => {
				Tools.checkResponseStatus(
					response,
					() => {
						const rewards = response.data.payload.rewards;
						const newSegments = rewards.map((reward, index) => ({
							name: reward.name,
							text: translation_obj[reward.name.toUpperCase()],
							public_id: reward.public_id,
							// textFontFamily: "Ooredoo-Heavy",
							strokeStyle: "white",
							reward_type: reward.reward_type,
							fillStyle: colors[index % colors.length],
						}));
						setSegments(newSegments);
						setLoading(false);
						setPrizeSegment(response.data.payload.index);
						setChanceId(response.data.payload.chance);
						setSpinnerRewardType(response.data.payload.rewards[response.data.payload.index - 1].reward_type)
						setNumber(response.data.payload.rewards[response.data.payload.index - 1].amount)
					},
					() => {
						console.error("Error fetching spinner data");
						setLoading(false);
					}
				);
			})
			.catch(() => {
				console.error("Error in spinner API");
				setLoading(false); // Hide loader on error
			})
			.finally(() => {});
	};

	useEffect(() => {
		if (segments.length > 0) {
			initSpinner(); // Reinitialize spinner whenever segments are updated
		}
	}, [segments]);

	return {
		loading,
		init,
		startSpin,
		prepareSpinnerData,
		showConfetti,
		spinnerRewardType,
		number,
	};
};

export default useSpinnerModule;
