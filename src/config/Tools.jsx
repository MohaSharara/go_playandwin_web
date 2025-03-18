import constants from "../common/constants";
import Swal from 'sweetalert2';
import TranslationObject from "../common/TranslationObject";
import {isAndroid, isIOS, isMobileOnly} from "react-device-detect";
import DOMPurify from "dompurify";
import CryptoJS from 'crypto-js';

import getCountryISO3 from "country-iso-2-to-3";
import getCountryISO2 from "country-iso-3-to-2";

// const BASE_SECRET_KEY = process.env.BASE_SECRET_KEY
const BASE_SECRET_KEY = "django-insecure-#tp@3xrw7whol69y)$q)gw(l^vy)bgl@_=)liny@h%f0xi4o2f"



class Tools {
    constructor() {
    }

    formData(data) {
        let formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key]);
        }
        return formData
    }

    setBrowserFingerprint() {
        var that = this;
        var deviceID = localStorage.getItem('device-id');
        if (deviceID == null) {
            Fingerprint2.get({
                excludes: {
                    webgl: true,
                    audio: true,
                    fonts: true,
                    fontsFlash: true,
                    canvas: true
                }
            }, function (components) {

                var values = components.map(function (component) {
                    return component.value
                });

                var murmur = Fingerprint2.x64hash128(values.join(''), 31)

                that.deviceID = murmur;
                localStorage.setItem("device-id", murmur);
                return murmur
            });
        } else {
            this.deviceID = deviceID
            return this.deviceID
        }
    }

    checkResponseStatus(response, successFunction, errorFunction) {
        if (response.data.status === 'SUCCESS') {
            successFunction()
        } else {
            const responseMessage = response.data.message;
            if (responseMessage === constants.API_ERRORS.INVALID_USER_AUTHENTICATION) {
                sessionStorage.removeItem("auth-token")
                window.location.href = "/";
            } else {
                errorFunction();
            }
        }
    }

    // isObjectEmpty(obj) {
    //     return JSON.stringify(obj) === JSON.stringify({})
    // }
    //
    getTranslationObj(OperatorCode) {
        const translations = TranslationObject[OperatorCode];
        const lang = localStorage.getItem('lang');

        // If the language exists, return it; otherwise, return the first object
        return translations[lang] || Object.values(translations)[0];
    }

    getAvailableLanguages(OperatorCode) {
        const translations = TranslationObject[OperatorCode];

        // Return the available languages as an array of keys, or an empty array if the operator doesn't exist
        return translations ? Object.keys(translations) : [];
    }

    getPrizeImage(operatorConfig) {
        let savedLang = localStorage.getItem('lang');
        return operatorConfig?.IMG.PRIZE[savedLang]
    }


    getTranslationDirection(chosenLanguage, languageObject, OperatorCode) {
        return languageObject[OperatorCode][chosenLanguage]?.DIRECTION || "LTR"
    }

    getLanguageProperties(OperatorCode) {
        let savedLang = localStorage.getItem('lang');
        let dir = TranslationObject[OperatorCode][savedLang]?.DIRECTION;
        let alignClass = ((dir === 'ltr') ? 'text-left' : 'text-right');
        return {lang: savedLang, dir: dir, alignClass: alignClass}
    }

    showLoader() {
        document.getElementById("root").classList.add("d-none");
        document.getElementById("loader").classList.remove("d-none");
    }

    hideLoader() {
        document.getElementById("loader").classList.add("d-none");
        document.getElementById("root").classList.remove("d-none");
    }


    switchLang(lang, oldLang, eventCategory, reload = true) {
        localStorage.setItem('lang', lang);

        // Optional: Analytics event tracking (if needed)
        // try {
        //     this.analyticsLanguageEvent(oldLang + '=>' + lang, eventCategory);
        // } catch (err) {
        //     console.log("Cannot insert into gtag");
        // }

        if (reload) {
            // const url = new URL(window.location.origin);
            // console.log("url", url)
            // // url.searchParams.set('is-redirected', 'true'); // Add or update the query parameter
            // window.location.href = url.toString(); // Reload with updated URL

            window.location.reload();

        }
    }


    getiso3(iso2) {
        return getCountryISO3(iso2)
    }


    getiso2(iso3) {
        return getCountryISO2(iso3)
    }

    SweetAlert2(onSweetAlertConfirm) {
        let alertText =
            '<small>' +
            'Many prizes are waiting you, just go to shop to continue playing' +
            ' </small>' +
            '</br>' +
            '<h4 class="fw-bolder d-inline-flex">' +
            `text4`
        '</h4>'
        let sweetAlertProps = {
            show: true,
            title: 'Credits Ended',
            html: alertText,
            icon: 'info',
            confirmButtonText: 'Got to shop',
            showCancelButton: true,
            cancelButtonText: 'Go to Home',
            allowOutsideClick: false,
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
        }

        Swal.fire(sweetAlertProps).then((result) => {
            if (result.isConfirmed) {
                alert('confirm')
            } else {
                alert('not confirmed')
            }
        })
    }

    //
    // escapeHtmlChars(html) {
    //     var escape = document.createElement('div');
    //     escape.innerHTML = html;
    //     return escape.innerText;
    // }
    //
    // getCurrentLang() {
    //     return localStorage.getItem("lang")
    // }

    getOtpMask(otpLength) {
        let otpMask = null;
        if (otpLength === 4) {
            otpMask = "9 9 9 9"
        } else if (otpLength === 5) {
            otpMask = "9 9 9 9 9"
        } else if (otpLength === 6) {
            otpMask = "9 9 9 9 9 9"
        } else {
            otpMask = "9 9 9 9"
        }
        return otpMask;
    }

    getGlobalMsisdn(msisdn) {
        var newMsisdn = msisdn
        if (!msisdn.startsWith("+")) {
            newMsisdn = "+" + msisdn.trim();
        }
        return newMsisdn
    }

    getCurrentOperatorConfig = (operator_code) => {
        return constants.OPERATORS[operator_code];
    }

    getCurrentChannel = () => {
        return sessionStorage.getItem('channel');
    }

    delay = (n) => new Promise(r => setTimeout(r, n));


    // getDeviceId = () => {
    //     debugger
    //     let device_id = localStorage.getItem('device-id')
    //     if (device_id == null) {
    //         device_id = this.setBrowserFingerprint()
    //         debugger
    //
    //         if (!device_id) {
    //
    //             this.delay(1000);
    //
    //
    //             debugger
    //             device_id = localStorage.getItem('device-id')
    //             // setTimeout(function () {
    //             //     device_id = localStorage.getItem('device-id')
    //             // }, 10000);
    //
    //         }
    //
    //         if (!device_id) {
    //             device_id = localStorage.getItem('device-id')
    //             // location.reload();
    //         }
    //     }
    //     return device_id
    // }


    getInitialOperatorCode() {
        let operator_code = null;
        let operator = null;
        var currentLink = window.location.href.split("://");
        var splitUrl = currentLink[1].split(".", 2);
        operator = splitUrl[0]

        if (operator === 'www' || operator === 'web') {
            operator = splitUrl[1]
        }

        // console.log("operator is:", operator)

        constants.SUB_DOMAINS.find((domain, index) => {
            if (domain.name === operator) {
                operator_code = domain.operator
            }

            // console.log("operator", operator)

            if (operator === "goplayandwin" && !(process.env.NODE_ENV === 'production')){
                operator_code = "OOREDOO_ALGERIA"
                // operator_code = "OOREDOO_KUWAIT"
                // operator_code = "ASIACELL_IRAQ"
                // operator_code = "OOREDOO_TUNISIA"
                // operator_code = "OOREDOO_OMAN"
                // operator_code = "OMANTEL_OMAN"
            }
        });

        return operator_code
    }

    removeParams(...params) {

        // Loop through each parameter and delete it from URLSearchParams
        params.forEach(param => {
            qS.delete(param);
        });

        // Construct the new URL with the updated query string
        const newQueryString = qS.toString();
        const newUrl = newQueryString
            ? `${window.location.pathname}?${newQueryString}` // If there are remaining parameters
            : `${window.location.pathname}`;                 // If no parameters remain

        // Update the browser's URL without reloading the page
        window.history.replaceState(null, '', newUrl);
    }


    setDefaultLanguage(default_language) {
        let occupied_language = localStorage.getItem('lang')
        if (!occupied_language) {
            localStorage.setItem("lang", default_language);
        }
    }

    // isTestingNumber(msisdn) {
    //     let isTesting = false;
    //     if (constants.TESTING_NUMBERS.includes(msisdn)) {
    //         isTesting = true;
    //     }
    //     return isTesting;
    // }
    //
    // isProdEnv() {
    //     let isProd = false;
    //     if (process.env.NODE_ENV === 'production') {
    //         isProd = true;
    //     }
    //     return isProd
    // }

    getQueryParams() {
        return new URLSearchParams(window.location.search)
    }


    getAppGenericStyle(operatorCode) {
        let app_style = constants.OPERATORS[operatorCode].STYLE
        let background_value = {background: app_style.BACKGROUND}
        return {
            mainContainerStyle:
                {
                    background: background_value,
                    cssFilePath: app_style.CSS_FILE
                }
        }
    }

    // getAppBackground(operatorCode) {
    //
    //     let background = {background: constants.OPERATORS[operatorCode].STYLE.BACKGROUND}
    //
    //     return {mainContainerStyle: {background: constants.OPERATORS[operatorCode].STYLE.BACKGROUND}}
    // }

    translateNumber = n => {
        n = localStorage.getItem('lang') == 'AR' ? n.replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[d]).replace(/\./g, "٫") : n;
        return n
    }

    // google analytics events
    analyticsRequestOTPEvent(status, msisdn, eventCategory) {
        try {
            gtag('event', constants.ANALYTICS_EVENTS.EVENTS_NAMES.REQUEST_OTP, {
                'event_category': eventCategory,
                'event_label': msisdn,
                'event_value': status,
            });
        } catch (err) {
            console.log("cannot insert into gtag")
        }
    }

    analyticsVerifyOTPEvent(status, msisdn, eventCategory) {
        try {
            gtag('event', constants.ANALYTICS_EVENTS.EVENTS_NAMES.VERIFY_OTP, {
                'event_category': eventCategory,
                'event_label': msisdn,
                'event_value': status,
            });
        } catch (err) {
            console.log("cannot insert into gtag")
        }
    }

    analyticsClickOnDemandEvent(status, msisdn, eventCategory) {
        try {
            gtag('event', constants.ANALYTICS_EVENTS.EVENTS_NAMES.ON_DEMAND_CLICK, {
                'event_category': eventCategory,
                'event_label': msisdn,
                'event_value': status,
            });
        } catch (err) {
            console.log("cannot insert into gtag")
        }
    }

    analyticsSuccessOnDemandEvent(status, msisdn, eventCategory) {
        try {
            gtag('event', constants.ANALYTICS_EVENTS.EVENTS_NAMES.ON_DEMAND_SUCCESS, {
                'event_category': eventCategory,
                'event_label': msisdn,
                'event_value': status,
            });
        } catch (err) {
            console.log("cannot insert into gtag")
        }
    }

    analyticsChangeLanguageEvent(status, language, eventCategory) {
        try {
            gtag('event', constants.ANALYTICS_EVENTS.EVENTS_NAMES.LANGUAGE, {
                'event_category': eventCategory,
                'event_label': language,
                'event_value': status,
            });
        } catch (err) {
            console.log("cannot insert into gtag")
        }
    }

    analyticsSuccessfullySubscribedEvent(msisdn, eventCategory) {
        try {
            gtag('event', constants.ANALYTICS_EVENTS.EVENTS_NAMES.SUBSCRIBED_SUCCESSFULLY, {
                'event_category': eventCategory,
                'event_label': msisdn,
                'event_value': 1,
            });
        } catch (err) {
            console.log("cannot insert into gtag")
        }
    }

    analyticsSuccessfullyLoginEvent(msisdn, eventCategory) {
        try {
            gtag('event', constants.ANALYTICS_EVENTS.EVENTS_NAMES.LOGIN_SUCCESSFULLY, {
                'event_category': eventCategory,
                'event_label': msisdn,
                'event_value': 1,
            });
        } catch (err) {
            console.log("cannot insert into gtag")
        }
    }

    analyticsPlayEvent(msisdn, eventCategory) {
        try {
            gtag('event', constants.ANALYTICS_EVENTS.EVENTS_NAMES.TRIVIA_GAME, {
                'event_category': eventCategory,
                'event_label': msisdn,
                'event_value': 1,
            });
        } catch (err) {
            console.log("cannot insert into gtag")
        }
    }

    analyticsWeeklyGameEvent(msisdn, eventCategory) {
        try {
            gtag('event', constants.ANALYTICS_EVENTS.EVENTS_NAMES.WEEKLY_GAME, {
                'event_category': eventCategory,
                'event_label': msisdn,
                'event_value': 1,
            });
        } catch (err) {
            console.log("cannot insert into gtag")
        }
    }

    analyticsHeClickEvent(eventCategory) {
        try {
            gtag('event', constants.ANALYTICS_EVENTS.EVENTS_NAMES.HE_CLICKED, {
                'event_category': eventCategory,
                'event_value': 1,
            });
        } catch (err) {
            console.log("cannot insert into gtag")
        }

    }

    openSMS(toCode, keyword) {
        if (isMobileOnly) {
            if (isIOS) {
                location.assign(`sms://open?addresses=${toCode};?&body=${keyword}`);
            } else if (isAndroid) {
                location.assign(`sms:${toCode}?body=${keyword}`);
            }
        } else {
            console.log("desktop", navigator.userAgent);
            // toast.warning("Please Use Your Mobile Device")
        }
    };

    analyticsPsmsEvent(eventCategory) {
        try {
            gtag('event', constants.ANALYTICS_EVENTS.EVENTS_NAMES.PSMS_FLOW, {
                'event_category': eventCategory,
                'event_value': 1,
            });
        } catch (err) {
            console.log("cannot insert into gtag")
        }

    }

    analyticsButtonClick(label, operator) {
        console.log("analyticsButtonClick", label, operator)
        try {
            gtag('event', constants.ANALYTICS_EVENTS.EVENTS_NAMES.BUTTON_CLICKS, {
                'event_category': operator,
                'event_label': label,
                'event_value': 1,
            });
        } catch (err) {
            console.log("cannot insert into gtag")
        }
    }

    analyticsOperatorBtnClickedEvent(label, country) {
        try {
            gtag('event', constants.ANALYTICS_EVENTS.EVENTS_NAMES.VISIT_BTN_CLICKS, {
                'event_category': country,
                'event_label': label,
                'event_value': 1,
            });
        } catch (err) {
            console.log("cannot insert into gtag")
        }
    }

    sanitizeHTML(htmlContent) {
        // Create a temporary DOM element
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, "text/html");

        // Remove the `<meta>` tags
        doc.querySelectorAll("meta").forEach((metaTag) => metaTag.remove());

        // Remove `color`, `background-color`, and `font-family` styles
        doc.querySelectorAll("[style]").forEach((element) => {
            const style = element.getAttribute("style");
            const filteredStyle = style
                .split(";")
                .filter(
                    (rule) =>
                        !rule.trim().startsWith("color:") &&
                        !rule.trim().startsWith("background-color:") &&
                        !rule.trim().startsWith("font-family:")
                )
                .join(";");

            if (filteredStyle) {
                element.setAttribute("style", filteredStyle);
            } else {
                element.removeAttribute("style");
            }
        });

        // Adjust table and figure widths
        doc.querySelectorAll("table, figure").forEach((element) => {
            element.style.width = "100%"; // Set width to fit the container
            element.style.maxWidth = "100%"; // Prevent overflow
            element.style.overflowX = "auto"; // Allow horizontal scrolling if needed
        });

        // Sanitize the cleaned HTML
        return DOMPurify.sanitize(doc.body.innerHTML);
    };

    static generateKey(msisdn, publicId) {
        const combined = `${msisdn}${publicId}${BASE_SECRET_KEY}`;
        const hash = CryptoJS.SHA256(combined);
        return CryptoJS.enc.Base64.stringify(hash); // This creates a base64-encoded key
    }

    decryptData(encryptedData, msisdn, publicId) {
        try {
            const key = Tools.generateKey(msisdn, publicId);
            const truncatedKey = CryptoJS.enc.Utf8.parse(key.substring(0, 32)); // Ensure key length is 32

            // Decode the base64-encoded string
            const encryptedBytes = CryptoJS.enc.Base64.parse(encryptedData);

            // Extract the IV (first 16 bytes)
            const iv = CryptoJS.lib.WordArray.create(encryptedBytes.words.slice(0, 4)); // First 16 bytes
            const ciphertext = CryptoJS.lib.WordArray.create(encryptedBytes.words.slice(4)); // Rest is the ciphertext

            // Decrypt the ciphertext using AES in CBC mode
            const bytes = CryptoJS.AES.decrypt({ ciphertext: ciphertext, salt: iv }, truncatedKey, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
            });

            // Convert the decrypted bytes to a UTF-8 string
            return bytes.toString(CryptoJS.enc.Utf8);
        } catch (error) {
            return "Error: Decryption failed";
        }
    }


}

export default new
Tools();