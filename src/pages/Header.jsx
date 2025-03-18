import React, { Fragment, useContext, useEffect, useState } from "react";
import Auth from "../config/Auth";
import { LandingContext } from "../contexts/LandingContext";
import Tools from "../config/Tools";
import constants from "../common/constants";
import LanguageSwitcher from "../shared/LanguageSwitcher";
import { getTermsData } from "../services/Api";
import { toast } from "react-toastify";
import { useLocation } from "react-use";

const Header = () => {
	const { currentOperatorCode } = useContext(LandingContext);
	const translation_obj = Tools.getTranslationObj(currentOperatorCode);
	const [isLandingPage, setIsLandingPage] = useState(true);
	const location = useLocation();

    console.log(currentOperatorCode)

	const goToHomePage = () => {
		// window.location.href = "/?is-redirected=true";
		window.location.href = constants.ROUTES.LANDING;
	};

	const renderWinnersLink = () => {
		if (location.pathname !== constants.ROUTES.PLAY) {
			return (
				<li>
					{/*<a href="?is-redirected=true#winners" className="nav-item">*/}
					<a href="#winners" className="nav-item">
						{translation_obj.WINNERS}
					</a>
				</li>
			);
		}
		return null;
	};

	useEffect(() => {
		setIsLandingPage(location.pathname === constants.ROUTES.LANDING);
	}, [location.pathname]);

	return (
		<Fragment>
			<div id="header" dir="ltr">
				<div className="row col-12 mx-auto align-items-center p-0">
					{isLandingPage ? (
						<>
							<div className="col-4 float-start position-relative">
								<div className="float-start d-flex">
									<div className="navbar-container position-relative">
										<nav className="navbar navbar-dark">
											{/* Navbar Toggle */}
											<button
												className="navbar-toggler ms-auto"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#navbarMenu"
												aria-controls="navbarMenu"
												aria-expanded="false"
												aria-label="Toggle navigation"
											>
												<span className="navbar-toggler-icon"></span>
											</button>

											{/* Navbar Menu */}
											<div className="collapse navbar-collapse" id="navbarMenu">
												<ul className="nav-list">
													<li>
														{/*<a href="?is-redirected=true#play_daily_quiz" className="nav-item">*/}
														<a href="#play_daily_quiz" className="nav-item">
															{translation_obj.PLAY_DAILY_QUIZ}
														</a>
													</li>
													<li>
														{/*<a href="?is-redirected=true#play_weekly_game" className="nav-item">*/}
														<a href="#play_weekly_game" className="nav-item">
															{translation_obj.PLAY_WEEK_GAME}
														</a>
													</li>
													<li>
														{/*<a href="?is-redirected=true#download_app" className="nav-item">*/}
														<a href="#download_app" className="nav-item">
															{translation_obj.DOWNLOAD_APP}
														</a>
													</li>
													{renderWinnersLink()}
													<li>
														{/*<a href="?is-redirected=true#faq" className="nav-item">*/}
														<a href="#faq" className="nav-item">
															{translation_obj.FAQS}
														</a>
													</li>
													{Auth.isAuthenticated() && (
														<li onClick={Auth.resetAuthentication} className="nav-item pointer">
															<div className="">{translation_obj.LOGOUT}</div>
														</li>
													)}
												</ul>
											</div>
										</nav>
									</div>
								</div>
							</div>
						</>
					) : (
						<div className="col-4 float-start position-relative">
							<img
								src={constants.IMAGES.HOME_LOGO}
								className="home-icon pointer"
								onClick={goToHomePage}
								alt="Home Icon"
							/>
						</div>
					)}

					<div className="col-4 logo-container position-relative headerLeftSide p-0">
						<img src={constants.IMAGES.LEFT_LOGO} className="leftLogo pointer" onClick={goToHomePage} alt="logo" />
					</div>

					<div className="col-4 float-end position-relative headerLeftSide">
						<div className="language-container position-relative">
							<LanguageSwitcher />
						</div>
					</div>
				</div>
			</div>
			<div className="header-banner font-regular">🚜 Website Under Development 🚜</div>
		</Fragment>
	);
};

export default Header;
