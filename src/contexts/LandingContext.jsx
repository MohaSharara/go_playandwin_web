import React, {createContext, useEffect, useState} from 'react';
import {getLandingData, checkLoginToken} from "../services/Api";
import Tools from "../config/Tools";
import Auth from "../config/Auth";
import GeoService from "../config/GeoService";
import constants from "../common/constants";

export const LandingContext = createContext();


const LandingContextProvider = (props) => {
    const currentOperatorCode = Tools.getInitialOperatorCode()
    const operatorConfig = currentOperatorCode !== "GENERAL" ? Tools.getCurrentOperatorConfig(currentOperatorCode) : null
    const omanOperators = (currentOperatorCode === "OOREDOO_OMAN") || (currentOperatorCode === "OMANTEL_OMAN");
    const operatorAvailableLanguages = Tools.getAvailableLanguages(currentOperatorCode)
    const isMobile = window.innerWidth <= 767; // Example threshold
    const [landingData, setLandingData] = useState(null);
    const [languageProperties, setLanguageProperties] = useState(null);
    const [defaultLanguage, setDefaultLanguage] = useState(null);
    const [bundleBtnDisabled, setBundleBtnDisabled] = useState(false);
    const [otpPin, setOtpPin] = useState('');
    const [canPlay, setCanPlay] = useState(false);
    const [totalPoints, setTotalPoints] = useState();
    const [weeklyPoints, setWeeklyPoints] = useState(100);
    const [playedQuestions, setPlayedQuestions] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [winnersList, setWinnersList] = useState([]);
    const [faqsContent, setFaqsContent] = useState([]);
    const [canSpin, setCanSpin] = useState(false);
    const [languages, setLanguages] = useState();
    const [gameURL, setGameURL] = useState();
    const [countryCode, setCountryCode] = useState(null);
    const [operators, setOperators] = useState([]);
    const [subscriptionType, setSubscriptionType] = useState("DAILY");
    // Modals
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUnSubModalOpen, setIsUnSubModalOpen] = useState(false);
    const [isWinnerModalOpen, setIsWinnerModalOpen] = useState(false);
    const [isSpinTheWheelModalOpen, setIsSpinTheWheelModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [failedCharging, setFailedCharging] = useState(false);
    const [isNeedGPMModalOpen, setIsNeedGPMModalOpen] = useState(false);
    const [isInviteModalOpen, setInviteModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    const handleCountryOperators = async () => {
        let msisdn = qS.get("msisdn") || qS.get("he-msisdn") || qS.get("customer_number");
        let channel = qS.get("channel") || qS.get("channelID");
        let tenant_id = qS.get("tenant_id")
        let language = qS.get("language")
        let languageCode = language ? language.split('-')[0].toUpperCase() : null;
        let countryCode = 'LB'

        try {
            // Fetch the country code asynchronously
            if (tenant_id) {
                countryCode = constants.TENANT_To_COUNTRY_CODE[tenant_id] || 'LB'
                localStorage.setItem('country_code', countryCode)
            } else {
                countryCode = await GeoService.getCountryCode();
            }
            setCountryCode(countryCode);

            // Helper function to append query parameters to a URL
            const appendParamsToUrl = (url) => {
                const urlParams = new URLSearchParams();
                if (msisdn) urlParams.append("msisdn", msisdn);
                if (channel) urlParams.append("channel", channel);
                if (language) urlParams.append("language", language);
                const queryString = urlParams.toString();
                return queryString ? url + (url.includes('?') ? '&' : '?') + queryString : url;
            };

            // Fetch operators based on the retrieved country code
            const operators = constants.COUNTRY_OPERATORS[countryCode];

            if (languageCode){
                localStorage.setItem('lang', languageCode);
            } else {
                localStorage.setItem('lang', 'EN');
            }

            if (operators) {
                const operatorKeys = Object.keys(operators.operators);

                if (operatorKeys.length === 1) {
                    // If there's only one operator, redirect to its URL
                    const singleOperator = operators.operators[operatorKeys[0]];
                    localStorage.removeItem('country_code');
                    const redirectUrl = appendParamsToUrl(singleOperator.url);
                    window.location.href = redirectUrl;
                } else if (operatorKeys.length > 1) {
                    // If there are multiple operators, save their details with updated URLs
                    const operatorDetails = operatorKeys.map((key) => ({
                        country_name: operators.country_name,
                        operator_name: operators.operators[key].operator_name,
                        url: appendParamsToUrl(operators.operators[key].url),
                    }));
                    setOperators(operatorDetails);
                }
            } else {
                // If country not found, save all operators with updated URLs
                const allOperators = [];
                for (const country in constants.COUNTRY_OPERATORS) {
                    const countryOperators = constants.COUNTRY_OPERATORS[country].operators;
                    for (const key in countryOperators) {
                        allOperators.push({
                            country_name: constants.COUNTRY_OPERATORS[country].country_name,
                            operator_name: countryOperators[key].operator_name,
                            url: appendParamsToUrl(countryOperators[key].url),
                        });
                    }
                }
                setOperators(allOperators);
            }
            setTimeout(() => Tools.hideLoader(), 500)
        } catch (error) {
            console.error("Error in handleCountryOperators:", error);
        }
    };


    useEffect(() => {
        if (currentOperatorCode !== "GENERAL") {
            getLanding();
        } else {
            handleCountryOperators()
        }
        const urlParams = new URLSearchParams(window.location.search);
        const channelFromUrl = urlParams.get('channel')?.toUpperCase() || urlParams.get('channelID')?.toUpperCase();
        if (channelFromUrl) {
            sessionStorage.setItem('channel', channelFromUrl);
        }
    }, []);

    useEffect(() => {
        let storage_language = localStorage.getItem("lang")
        if (defaultLanguage) {
            if (!storage_language || !languages.includes(storage_language)) {
                localStorage.setItem("lang", defaultLanguage.toString());
            }
        }
    }, [landingData]);

    useEffect(() => {
        if (defaultLanguage) {
            setLanguageProperties(Tools.getLanguageProperties(currentOperatorCode))
        }
    }, [defaultLanguage]);


    const getLanding = (params = {}) => {
        let msisdn = qS.get("msisdn") || qS.get("he-msisdn") || qS.get("customer_number")
        let language = qS.get("language")
        let languageCode = language ? language.split('-')[0].toUpperCase() : null;
        const isPlayPage = location.pathname === constants.ROUTES.PLAY

        if (languageCode) {
            if (operatorAvailableLanguages.includes(languageCode)) {
                localStorage.setItem('lang', languageCode)
            } else {
                localStorage.setItem('lang', operatorAvailableLanguages[0])
                languageCode = operatorAvailableLanguages[0]
            }
        }

        let lang = languageCode ? languageCode : localStorage.getItem('lang')

        const updatedParams = {
            http_user_agent: navigator.userAgent,
            language: lang ? lang : "",
            channel: sessionStorage.getItem('channel')
        };

        getLandingData(updatedParams).then(response => {
            Tools.checkResponseStatus(response, () => {
                let payload = response.data.payload;
                setLandingData(payload);
                if (languageCode && payload?.operator?.languages.includes(languageCode)) {
                    setDefaultLanguage(languageCode);
                } else {
                    setDefaultLanguage(payload?.operator?.default_language);
                }
                setLanguages(payload?.operator?.languages);
                setFaqsContent(payload?.faq_list);
                if (payload?.winners_list) {
                    setWinnersList(payload?.winners_list);
                }
                if (payload?.profile) {
                    // setChannel(payload?.profile?.channel);
                    setTotalPoints(payload?.profile?.total_points);
                    setWeeklyPoints(payload?.profile?.total_weekly_points);
                    setCanSpin(payload?.profile?.can_win_spinner);
                    setPlayedQuestions(payload?.profile?.played_question);
                    setTotalQuestions(payload?.profile?.total_question);
                    setSubscriptionType(payload?.profile?.subscription_type);
                    if (!languageCode) localStorage.setItem("lang", payload?.profile?.language)
                    setLanguageProperties(Tools.getLanguageProperties(currentOperatorCode))

                    if (!(payload?.profile?.in_free_trial) && !(payload?.profile?.is_charged_today) && (payload?.profile?.total_question===0)) {
                        setFailedCharging(true)
                    } else {
                        setFailedCharging(false)
                    }
                }
                if (payload?.profile?.played_question < payload?.profile?.total_question) {
                    setCanPlay(true);
                }
                setGameURL(payload?.game?.game_url);
                (!msisdn && !isPlayPage) ? Tools.hideLoader() : Auth.isAuthenticated() ? (isPlayPage? null : Tools.hideLoader()) : null
            }, () => {
                // Handle error scenario
            });
        }).catch(() => {
        });
    };

    const checkToken = (token) => {
        checkLoginToken({user_login_token: token}).then(response => {
            Tools.checkResponseStatus(response, () => {

                Auth.setAuthToken(payload.auth_token)
                document.location.href = '/'
            }, () => {
            });
        })
    }


    // useEffect(() => {
    //     if (!Auth.isAuthenticated()) {
    //         var params = Tools.getQueryParams()
    //         var token = params.get('token')
    //
    //         if (params.size !== 0 && (token !== null && token !== '')) {
    //             checkToken(token)
    //         }
    //     }
    // }, []);
    //


    return (<LandingContext
        value={{
            landingData,
            setLandingData,
            getLanding,
            currentOperatorCode,
            operatorConfig, // language,
            isModalOpen,
            setIsModalOpen,
            bundleBtnDisabled,
            setBundleBtnDisabled,
            otpPin,
            setOtpPin,
            canPlay,
            setCanPlay,
            languageProperties,
            totalPoints,
            playedQuestions,
            totalQuestions,
            weeklyPoints,
            setTotalPoints,
            isUnSubModalOpen,
            setIsUnSubModalOpen,
            isWinnerModalOpen,
            setIsWinnerModalOpen,
            isShareModalOpen,
            setIsShareModalOpen,
            isMobile,
            isSpinTheWheelModalOpen,
            setIsSpinTheWheelModalOpen,
            isNeedGPMModalOpen,
            setIsNeedGPMModalOpen,
            isInviteModalOpen,
            setInviteModalOpen,
            faqsContent,
            canSpin,
            setCanSpin,
            gameURL,
            operators,
            countryCode,
            winnersList,
            loading,
            setLoading,
            failedCharging,
            omanOperators,
            subscriptionType
        }}>
        {props.children}
    </LandingContext>);
}

export default LandingContextProvider;
