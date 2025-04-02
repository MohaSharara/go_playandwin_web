import React, {Fragment, use, useEffect, useState} from "react";
import Tools from "../config/Tools";
import { IMaskInput } from 'react-imask';
import PhoneInput from "react-phone-input-2";
import {LandingContext} from "../contexts/LandingContext";
import {checkLoginToken, checkSubscriptionData, heSubscribeOrLogin, identify, verify} from "../services/Api";
import Auth from "../config/Auth";
import constants from "../common/constants";
import {toast} from "react-toastify";
import {isValidPhoneNumber} from "react-phone-number-input";
import 'react-phone-input-2/lib/bootstrap.css'
import Request from "../config/Request";
import {Tooltip} from "react-tooltip";

const Subscribe = () => {
    const {
        currentOperatorCode,
        landingData,
        otpPin,
        setOtpPin,
        operatorConfig,
        languageProperties,
        getLanding,
        setLoading,
        omanOperators
    } = use(LandingContext);
    const [inputNumber, setInputNumber] = useState('');
    const [subscriptionFlow, setSubscriptionFlow] = useState('OTP_FLOW');
    const [packageType, setPackageType] = useState('DAILY');
    // const [subscriptionFlow, setSubscriptionFlow] = useState('ON_CLICK');
    const translation_obj = Tools.getTranslationObj(currentOperatorCode);
    const [numberBtnDisabled, setNumberBtnDisabled] = useState(true);
    const [verifyBtnDisabled, setVerifyBtnDisabled] = useState(true);
    const [currentView, setCurrentView] = useState('SUBSCRIPTION');
    const [verificationRequest, setVerificationRequest] = useState(null);
    const [referralPublicId, setReferralPublicId] = useState(null);
    const [identifySubmit, setIdentifySubmit] = useState(false);
    const [verifySubmit, setVerifySubmit] = useState(false);
    const [userConsent, setUserConsent] = useState(true);
    const prize_img = Tools.getPrizeImage(operatorConfig);


    useEffect(() => {
        const windowLocationElems = window.location.pathname.split("/");
        if (windowLocationElems.length > 2 && windowLocationElems[1] === "join" && windowLocationElems[2] !== "") {
            setReferralPublicId(windowLocationElems[2]);
        }
    }, []);

    const identifyNumber = (e = null, operatorCode = null, msisdn = null, resend = false) => {
        setIdentifySubmit(true)
        if (e) {
            // Prevent page to post_back on form submit
            e.preventDefault();
        }
        setNumberBtnDisabled(true)
        msisdn = Tools.getGlobalMsisdn(msisdn);

        if (isValidPhoneNumber(msisdn)) {
            let identifyData = {
                package_type: packageType,
                phone_number: msisdn,
                ui_msisdn_validation: isValidPhoneNumber(msisdn),
                language: localStorage.getItem('lang'),
                resend: resend,
                channel: sessionStorage.getItem('channel'),
            }

            Tools.analyticsRequestOTPEvent(1, msisdn, operatorConfig.ANALYTICS_EVENT_CATEGORY);

            identify(identifyData).then(response => {
                Tools.checkResponseStatus(response, () => {
                    setVerificationRequest(response.data.payload.verification_request)
                    setCurrentView('VERIFICATION')
                }, () => {
                    if (response.data && response.data.message === 'INVALID_MSISDN_INPUT') {
                        toast.error(translation_obj.INVALID_MSISDN_INPUT);
                    } else if (response.data && response.data.message === 'OTP_SPAM') {
                        toast.error(translation_obj.OTP_SPAM);
                    } else {
                        toast.error(translation_obj.ERROR_OCCURRED);
                    }
                    setNumberBtnDisabled(false);
                });
            }).catch(() => {
            }).finally(() => {
                setNumberBtnDisabled(false)
            })
        } else {
            toast.error(translation_obj.INVALID_NUMBER);
            setNumberBtnDisabled(false)
        }
    }

    const verifyNumber = (e = null, operatorCode = null, msisdn = null, otpPin = null) => {
        setVerifySubmit(true)
        setVerifyBtnDisabled(true);
        if (e) {
            // Prevent page to post_back on form submit
            e.preventDefault();
        }

        //USED TO Check if the otpPin contains only numbers and for otp length
        if (/^\d+$/.test(otpPin) && otpPin.length === landingData.operator.otp_length) {
            let verifyData = {
                verification_request: verificationRequest,
                otp_code: otpPin,
                language: localStorage.getItem('lang'),
                channel: sessionStorage.getItem('channel'),
            }

            let affiliateObject = null;
            let affiliate_pub_id = qS.get("aff_id");
            if (affiliate_pub_id) {
                affiliateObject = {
                    aff_public_id: affiliate_pub_id
                }
            }

            if (affiliateObject) {
                verifyData = Object.assign(verifyData, affiliateObject);
            }

            let referralObject = null;
            let referral_public_id = qS.get("ref_id");
            if (referral_public_id) {
                referral_public_id = referral_public_id.replace(/"/g, ''); // Remove the quotes
                referralObject = {
                    referral_public_id: referral_public_id
                }
            }
            if (referralObject) {
                verifyData = Object.assign(verifyData, referralObject);
            }

            Tools.analyticsVerifyOTPEvent(1, msisdn, operatorConfig.ANALYTICS_EVENT_CATEGORY);

            verify(verifyData).then(response => {
                Tools.checkResponseStatus(response, () => {

                    if (response.data.payload.is_new_subscriber) {
                        Tools.analyticsSuccessfullySubscribedEvent(msisdn, operatorConfig.ANALYTICS_EVENT_CATEGORY);
                    } else {
                        Tools.analyticsSuccessfullyLoginEvent(msisdn, operatorConfig.ANALYTICS_EVENT_CATEGORY);
                    }

                    // setLandingData(prevState => ({
                    //     ...prevState,    // keep all other key-value pairs
                    //     profile: response.data.payload.profile,
                    //     game: response.data.payload.game,
                    //     faq_list: response.data.payload.faq_list,
                    // }))

                    Auth.setAuthToken(response.data.payload.auth_token)
                    Request.defaults.headers['auth-token'] = response.data.payload.auth_token;
                    getLanding()
                    setLoading(true)

                    Tools.removeParams('ref_id')

                }, () => {
                    if (response.data.message) {
                        if (translation_obj[response.data.message]) {
                            toast.error(translation_obj[response.data.message]);
                        }

                        switch (response.data.message) {
                            case 'INVALID_OTP':
                                setOtpPin('');
                                break;
                            case 'INVALID_VERIFICATION_REQUEST':
                                setOtpPin('');
                                break;
                            case 'VERIFICATION_ATTEMPT_LIMIT_REACHED':
                                toast.error(translation_obj.OTP_LIMIT_REACHED);
                                setTimeout(() => {
                                    window.location.href = constants.ROUTES.LANDING;
                                }, 1000);
                                break;
                            default:
                                toast.error(translation_obj.ERROR_OCCURRED);
                                break;
                        }
                    } else {
                        toast.error(translation_obj.ERROR_OCCURRED);
                    }
                    setVerifyBtnDisabled(false)
                });
            }).catch(() => {
            }).finally(() => {
                setVerifyBtnDisabled(false)
            })
        } else {
            setVerifyBtnDisabled(false);
            toast.error(translation_obj.ERROR_OCCURRED);
        }
    }

    const heSubscribeOrLoginNumber = (e = null, operatorCode = null, msisdn = null) => {
        if (e) {
            // Prevent page to post_back on form submit
            e.preventDefault();
        }
        setNumberBtnDisabled(true)
        msisdn = Tools.getGlobalMsisdn(msisdn);

        if (isValidPhoneNumber(msisdn)) {
            let heData = {
                msisdn: msisdn,
                language: localStorage.getItem('lang'),
                channel: sessionStorage.getItem('channel'),
            }

            Tools.analyticsHeClickEvent(1, msisdn, operatorConfig.ANALYTICS_EVENT_CATEGORY);

            heSubscribeOrLogin(heData).then(response => {
                Tools.checkResponseStatus(response, () => {
                    setVerificationRequest(response.data.payload.verification_request)
                    setCurrentView('HE_VIEW')

                    Auth.setAuthToken(response.data.payload.auth_token)
                    Request.defaults.headers['auth-token'] = response.data.payload.auth_token;
                    getLanding()
                    setLoading(true)

                }, () => {
                    toast.error(translation_obj.ERROR_OCCURRED);
                    setNumberBtnDisabled(false)
                });
            }).catch(() => {
            }).finally(() => {
                setNumberBtnDisabled(false)
            })
        } else {
            toast.error(translation_obj.INVALID_NUMBER);
            setNumberBtnDisabled(false)
        }
    }


    useEffect(() => {
        let msisdn = qS.get("msisdn") || qS.get("he-msisdn") || qS.get("customer_number")
        let login_token = qS.get('login_token') || qS.get('token')
        if (msisdn) {
            setInputNumber(msisdn)

            let params = {
                msisdn: Tools.getGlobalMsisdn(msisdn),
                operator_code: currentOperatorCode
            }
            checkSubscriptionData(params).then(response => {
                Tools.checkResponseStatus(response, () => {
                    setNumberBtnDisabled(true)
                    Auth.setAuthToken(response.data.payload.auth_token)
                    Request.defaults.headers['auth-token'] = response.data.payload.auth_token;
                    getLanding()

                    Tools.removeParams('msisdn', 'he-msisdn', 'customer_number')
                    setTimeout(() => Tools.hideLoader(), 500)

                    // Redirect if necessary (e.g., to a new page)
                    // window.location.href = constants.ROUTES.LANDING
                }, () => {
                    setNumberBtnDisabled(false)
                    omanOperators ? setSubscriptionFlow('OMAN_HE_OTP') : setSubscriptionFlow('ON_CLICK')
                    Tools.hideLoader()
                });
            }).catch(() => {
                // Handle error if necessary
            })

        } else if (login_token) {
            checkLoginToken({user_login_token: login_token}).then(response => {
                Tools.checkResponseStatus(response, () => {
                    Auth.setAuthToken(response.data.payload.auth_token)
                    Request.defaults.headers['auth-token'] = response.data.payload.auth_token;
                    getLanding()

                    Tools.removeParams('login_token')
                    Tools.removeParams('token')
                    setTimeout(() => Tools.hideLoader(), 500)
                }, () => {
                    // Handle failure if necessary
                });
            })
        } else {
            // Handle case where neither msisdn nor login_token is present
        }
    }, [])

    const renderFlow = () => {
        let msisdn = qS.get("msisdn") || qS.get("he-msisdn") || qS.get("customer_number")
        if (subscriptionFlow === 'OTP_FLOW') {
            return otpFlow()
        } else if (subscriptionFlow === 'OMAN_HE_OTP') {
            return otpFlow(msisdn)
        } else {
            return oneClickFlow()
        }
    }

    const handleCheckboxChange = () => {
        console.log("reached here", userConsent)
        setUserConsent(!userConsent)
    }

    const otpFlow = (msisdn) => {
        const otpLength = landingData?.operator?.otp_length ? landingData?.operator?.otp_length : 4
        const isValidMsisdn = (msisdn) => msisdn.length >= 11 && msisdn.length <= 15;
        const isValidOTP = (otpPin) => {
            // Count the number of non-underscore characters in the otpPin
            const filledDigits = otpPin.replace(/_/g, '').length;
            return filledDigits === otpLength;
        };

        return (
            <Fragment>
                <div
                    className="col-12 col-md-12 col-lg-12 col-xl-6 mt-4 mt-md-1 mx-auto subscriptionVerificationBackGround d-flex align-items-center justify-content-center">
                    <div className="row ">
                        {currentView === "SUBSCRIPTION" &&
                            <Fragment>
                                <form
                                    onSubmit={(e) => identifyNumber(e, currentOperatorCode, inputNumber)}>
                                    <div className="row mt-0 align-items-lg-center">

                                        <div className="col-12 col-md-12 mx-auto" dir="ltr">
                                            <PhoneInput
                                                inputClass='phoneInput'
                                                inputStyle={{
                                                    borderRadius: "10px",
                                                    width: "100%",
                                                    height: "50px",
                                                }}
                                                onlyCountries={[operatorConfig?.SUBSCRIPTION_INPUT_COUNTRY]}
                                                country={operatorConfig?.SUBSCRIPTION_INPUT_COUNTRY}
                                                value={msisdn || inputNumber}
                                                onChange={(value, b, c, d) => {
                                                    setInputNumber(Tools.getGlobalMsisdn(value));
                                                    setIdentifySubmit(false)
                                                    // Dynamically update the button disabled state
                                                    setNumberBtnDisabled(!isValidMsisdn(Tools.getGlobalMsisdn(value)));
                                                }}
                                                onFocus={() => {
                                                }}
                                                onBlur={() => {
                                                }}
                                                disableDropdown="false"
                                                autoFocus={true}
                                                autoFormat={false}
                                                enableAreaCodes={false}
                                                enableLongNumbers={false}
                                                countryCodeEditable={false}
                                                specialLabel={false}
                                            />
                                        </div>

                                    </div>

                                    {/*subscriptionType, setSubscriptionType*/}

                                    {omanOperators && (
                                        <select
                                            className="form-control input-field mt-3 package-type text-center font-regular"
                                            onChange={(e) => setPackageType(e.target.value)}
                                        >
                                            <option value="DAILY">{translation_obj.DAILY_SUBSCRIPTION}</option>
                                            <option value="ONE_TIME">{translation_obj.DAILY_ONE_TIME}</option>
                                        </select>
                                    )}

                                    {(currentOperatorCode === "OOREDOO_ALGERIA") ?
                                        <div className="row mt-3 align-items-center">
                                            <div className="col-12 mx-auto">
                                                <button
                                                    className="btn btn-xl col-8 subscribe-btn text-white mx-auto position-relative"
                                                    disabled={numberBtnDisabled || !userConsent}>
                                                    {numberBtnDisabled &&
                                                        <Fragment>
                                                            {identifySubmit ?
                                                                (
                                                                    <span
                                                                        className="spinner-border spinner-border-sm space mr-1"
                                                                        role="status"
                                                                        aria-hidden="true">
                                                            </span>
                                                                ) : (
                                                                    <span className="space font-extra-bold">
                                                                    {translation_obj.ENTER_NUMBER_BTN}
                                                                </span>
                                                                )
                                                            }
                                                        </Fragment>
                                                    }
                                                    {!numberBtnDisabled &&
                                                        <Fragment>
                                                            {!userConsent ?
                                                                (
                                                                    <>
                                                                    <span
                                                                        className="space font-extra-bold"
                                                                        data-tooltip-id="tooltip_accept"
                                                                    >
                                                                        {translation_obj.CONFIRM}
                                                                    </span>
                                                                        <Tooltip
                                                                            id="tooltip_accept"
                                                                            // place={languageProperties.dir === "ltr" ? "right" : "left"}
                                                                            place="top"
                                                                            className="tooltip-danger"
                                                                            content={translation_obj.PLEASE_ACCEPT}
                                                                            isOpen
                                                                        />
                                                                    </>
                                                                ) :
                                                                (
                                                                    <span className="space font-extra-bold">
                                                                {translation_obj.CONFIRM}
                                                            </span>
                                                                )
                                                            }
                                                        </Fragment>
                                                    }
                                                </button>

                                            </div>
                                        </div> :
                                        <div className="row mt-3 align-items-center">
                                            <div className="col-12 mx-auto">
                                                <button
                                                    className="btn btn-xl col-8 subscribe-btn text-white mx-auto position-relative"
                                                    disabled={numberBtnDisabled}>
                                                    {numberBtnDisabled &&
                                                        <Fragment>
                                                            {identifySubmit ?
                                                                (
                                                                    <span
                                                                        className="spinner-border spinner-border-sm space mr-1"
                                                                        role="status"
                                                                        aria-hidden="true">
                                                            </span>
                                                                ) : (
                                                                    <span className="space font-extra-bold">
                                                                    {translation_obj.ENTER_NUMBER_BTN}
                                                                </span>
                                                                )
                                                            }
                                                        </Fragment>
                                                    }
                                                    {!numberBtnDisabled &&
                                                        <span className="space font-extra-bold">
                                                        {translation_obj.CONFIRM}
                                                    </span>
                                                    }
                                                </button>

                                            </div>
                                        </div>
                                    }
                                </form>
                            </Fragment>
                        }


                        {currentView === 'VERIFICATION' && (
                            <Fragment>
                                <form onSubmit={(e) => verifyNumber(e, currentOperatorCode, inputNumber, otpPin)}>
                                    <div className="row mt-0 align-items-center">
                                        <div className="col-12 mx-auto" dir="ltr">
                                            <IMaskInput
                                                className="form-control input-field"
                                                style={{
                                                    background: "white",
                                                    textAlign: 'center',
                                                    height: "53px",
                                                    borderRadius: "10px",
                                                    width: '100%',
                                                    maxWidth: '100%',
                                                    letterSpacing: 10,
                                                    color: '#495057',
                                                }}
                                                mask={new Array(landingData.operator.otp_length || 4).fill(0).join('')}
                                                definitions={{ '0': /\d/ }}
                                                value={otpPin}
                                                placeholder={new Array(landingData.operator.otp_length || 4).fill('_').join('')}
                                                unmask={true} // Ensures only numbers are stored in state
                                                onAccept={(value) => {
                                                    setOtpPin(value);
                                                    setVerifySubmit(false);
                                                    setVerifyBtnDisabled(!isValidOTP(value));
                                                }}
                                                autoFocus={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3 align-items-center">
                                        <div className="col-12 mx-auto">
                                            <button
                                                className="btn btn-xl col-8 subscribe-btn text-white mx-auto position-relative"
                                                disabled={verifyBtnDisabled}>
                                                {verifyBtnDisabled ? (
                                                    verifySubmit ? (
                                                        <span className="spinner-border spinner-border-sm space mr-1" role="status" aria-hidden="true"></span>
                                                    ) : (
                                                        <span className="space font-extra-bold">
                                    {translation_obj.VERIFICATION_BTN}
                                </span>
                                                    )
                                                ) : (
                                                    <span className="space font-extra-bold">
                                {translation_obj.CONFIRM}
                            </span>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </Fragment>
                        )}
                    </div>
                </div>
                {currentView === "SUBSCRIPTION" && (currentOperatorCode === "OOREDOO_ALGERIA") &&
                    <Fragment>
                        <div className="row col-12 mx-auto" dir={languageProperties.dir}>
                            <div
                                className={`col-12 mx-auto text-white font-smaller mt-3 p-0`}>
                                <label className="d-flex align-items-center justify-content-center text-start">
                                    <input
                                        className={`${languageProperties.dir === 'rtl' ? 'ml-1' : 'mr-1'}`}
                                        type="checkbox"
                                        checked={userConsent}
                                        onChange={handleCheckboxChange}
                                    />
                                    <span className="px-1">{translation_obj.I_ACCEPT}</span>
                                    <a target="_blank"
                                       className={`text-white text-decoration-underline ${languageProperties.dir === 'rtl' ? 'mr-1' : 'ml-1'}`}
                                       href="/terms"> {translation_obj.TERMS_AND_CONDITIONS}
                                    </a>
                                </label>
                            </div>
                        </div>
                    </Fragment>
                }
            </Fragment>
        )
    }

    const oneClickFlow = () => {
        const heMsisdn = qS.get("msisdn") || qS.get("he-msisdn");
        return (
            <Fragment>
                <div
                    className="col-12 col-md-12 col-lg-12 col-xl-6 mt-4 mt-md-1 mx-auto subscriptionVerificationBackGround d-flex align-items-center justify-content-center">
                    <form
                        onSubmit={(e) => heSubscribeOrLoginNumber(e, currentOperatorCode, heMsisdn)}>
                        <div>
                            <div className="row mt-3 align-items-center">
                                <div className="col-12 mx-auto">
                                    <button
                                        id="he_btn"
                                        className="btn btn-xl col-8 subscribe-btn text-white mx-auto position-relative"
                                        disabled={numberBtnDisabled}>
                                        {numberBtnDisabled &&
                                            <span
                                                className="spinner-border spinner-border-sm space mr-1"
                                                role="status"
                                                aria-hidden="true">
                                        </span>
                                        }
                                        <span className="font-extra-bold space">
                                        {translation_obj.SUBSCRIPTION_BTN}
                                    </span>
                                    </button>

                                </div>
                            </div>
                        </div>
                        {omanOperators && (
                            <select
                                className="form-control input-field mt-3 package-type text-center font-regular"
                                onChange={(e) => setPackageType(e.target.value)}
                            >
                                <option value="DAILY">{translation_obj.DAILY_SUBSCRIPTION}</option>
                                <option value="ONE_TIME">{translation_obj.DAILY_ONE_TIME}</option>
                            </select>
                        )}
                    </form>
                </div>

            </Fragment>
        )
    }

    return (
        <div id="subscribe" className="subscribe-container container" dir={languageProperties.dir}>
            <div className="row py-2 py-md-0">
                <div className="col-12 col-lg-6">
                    <div className="">
                        <div className="main-title font-extra-bold mt-3 img-non-draggable">
                            {translation_obj.EARN_POINTS_AND_WIN}
                        </div>

                        <div className="grand-prize mt-3 mb-1 mb-md-3 img-non-draggable">
                            <img
                                src={prize_img}
                                alt="weekly prize"
                                className="w-100"
                            />
                        </div>

                        {renderFlow()}


                    </div>
                </div>
                <div className="col-md-6 d-none d-lg-block">
                    <div className="h-100 d-grid align-content-center">
                        <div className="prize-image d-flex align-items-center justify-content-center img-non-draggable">
                            <img
                                className="prize-character-size"
                                src={constants.IMAGES.PRIZE_CHARACTER}
                                alt="Prize character"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
};

export default Subscribe;