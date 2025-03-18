import Request from "../config/Request";
import Tools from "../config/Tools";
import constants from "../common/constants";
import axios from "axios";


const identify = async (data) => {
    return Request.post(constants.API_URLS.IDENTIFY, Tools.formData(data))
};

const verify = async (data) => {
    return Request.post(constants.API_URLS.VERIFY, Tools.formData(data))
};

const heSubscribeOrLogin = async (data) => {
    return Request.post(constants.API_URLS.HE_SUBSCRIPTION, Tools.formData(data))
};


const getLandingData = async (data) => {
    return Request.post(constants.API_URLS.GET_LANDING_DATA, Tools.formData(data))
};

const changeLanguage = async (data) => {
    return Request.post(constants.API_URLS.CHANGE_LANGUAGE, Tools.formData(data))
};

const getNextStepData = async (data) => {
    return Request.post(constants.API_URLS.GET_NEXT_STEP, Tools.formData(data))
};

const submitAnswer = async (data) => {
    return Request.post(constants.API_URLS.ANSWER, Tools.formData(data))
};

const getIpGeoInfo = async (url) => {
    return axios.get(url)
}

const getWinnersData = async (data) => {
    return Request.post(constants.API_URLS.GET_WINNERS, Tools.formData(data))
};

const getConsentURL = async (data) => {
    return Request.post(constants.API_URLS.GET_CONSENT_URL, Tools.formData(data))
};

const getHeURL = async (data) => {
    return Request.post(constants.API_URLS.GET_HE_URL, Tools.formData(data))
};

const checkSubscriptionData = async (data) => {
    return Request.post(constants.API_URLS.CHECK_SUBSCRIPTION, Tools.formData(data))
};

const authenticateMsisdn = async (data) => {
    return Request.post(constants.API_URLS.AUTHENTICATE_MSISDN, Tools.formData(data))
};

const decryptMSISDN = async (data) => {
    return Request.post(constants.API_URLS.DECRYPT_MSISDN, Tools.formData(data))
};


const unsubscribe = async (data) => {
    return Request.post(constants.API_URLS.UNSUBSCRIBE, Tools.formData(data))
};

const checkLoginToken = async (data) => {
    return Request.post(constants.API_URLS.CHECK_LOGIN_TOKEN, Tools.formData(data))
}
const getSpinner = async (data) => {
    return Request.post(constants.API_URLS.GET_SPINNER, Tools.formData(data))
}

const startSpinner = async (data) => {
    return Request.post(constants.API_URLS.START_SPINNER, Tools.formData(data))
}
const getTermsData = async (data) => {
    return Request.post(constants.API_URLS.GET_TERMS, Tools.formData(data))
}

const submitShareData = async (data) => {
    return Request.post(constants.API_URLS.SUBMIT_SHARE, Tools.formData(data))
};

export {
    identify,
    verify,
    heSubscribeOrLogin,
    getLandingData,
    getIpGeoInfo,
    getNextStepData,
    submitAnswer,
    getWinnersData,
    changeLanguage,
    getConsentURL,
    checkSubscriptionData,
    authenticateMsisdn,
    decryptMSISDN,
    getHeURL,
    unsubscribe,
    checkLoginToken,
    getSpinner,
    startSpinner,
    getTermsData,
    submitShareData,
}
