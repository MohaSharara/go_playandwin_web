export default {
    NETWORK_ERROR: 'Network Error',
    NUMBER_NOT_VALID: "Invalid Number",
    MOBILY_ALREADY_SUBSCRIBED: "MOBILY_ALREADY_SUBSCRIBED",
    USER_NOT_FOUND: "USER_NOT_FOUND",
    NUMBER_EMPTY: "Number Cannot be Empty",
    INVALID_OPERATOR_CODE: "Invalid Operator Code",
    UNKNOWN_ERROR: "Unknown Error",
    REDEEMED_SUCCESSFULLY: "Redeemed Successfully",
    INVALID_CODE: "Invalid Code",
    BUCKET_GAMES_URL: "https://storage.googleapis.com/np-web-bucket/games/",
    BUCKET_GAMES_INDEX: "/index.html",
    INVALID_EMAIL: "Invalid Email Address",
    EMAIL_ADDRESS_EMPTY: "Email Address Cannot Be empty",
    GRIP_DOTS: './src/assets/images/operators/OoredooAlgeria/fa-grip-dots-vertical.png',
    GPM: ['GPM-DCB-MEGAPROMO', 'GPM'],
    TENANT_To_COUNTRY_CODE: {
        orddza: 'DZ', // Algeria
        ordiq: 'IQ',  // Iraq
        ordkwt: 'KW', // Kuwait
        ordomn: 'OM', // Oman
        ordtun: 'TN', // Tunisia
        default: 'XX' // Testing
    },
    ROUTES: {
        LANDING: "/",
        JOIN: "/join/:int",
        SUBSCRIBE: "/sub",
        PLAY: "/play",
        TERMS: "/terms",
        WINNERS: "/winners",
        SHOP: "/shop",
        FAQ: '/FAQ',
        HOW_TO_PLAY: '/how-to-play',
    },

    LANGUAGES: {EN: "English", AR: "العربية", FR: "Français", KU: "کوردی", DV: "ދިވެހި"},

    IMAGES: {
        HOME_LOGO: "./src/assets/images/home.png",
        LEFT_LOGO: "./src/assets/images/logo.png",
        PRIZE_CHARACTER: "./src/assets/images/prize_character.png",
        GO_PLAY_PHONE: "./src/assets/images/go_play_phone.png",
        DOWN_ARROW: "./src/assets/images/up-arrow.png",
        STAR: "./src/assets/images/star.png",
        GRAND_PRIZE: "./src/assets/images/grand_prize.png",
        WEEKLY_PRIZE: "./src/assets/images/weekly_prize.png",
        LOADER: "./src/assets/images/loader.png",

        WEEKLY_CARD_BG_DESKTOP: "./src/assets/images/weekly_game_card_bg_desktop.png",
        WEEKLY_CARD_BG_MOBILE: "./src/assets/images/weekly_game_card_bg_mobile.png",
        TRIVIA_CARD_BG_DESKTOP: "./src/assets/images/trivia_game_card_bg_desktop.png",
        TRIVIA_CARD_BG_MOBILE: "./src/assets/images/trivia_game_card_bg_mobile.png",
        WINNERS_CARD_BG_DESKTOP: "./src/assets/images/winners_card_bg_desktop.png",
        WINNERS_CARD_BG_MOBILE: "./src/assets/images/winners_card_bg_mobile.png",
        NO_WINNERS_CARD_BG_DESKTOP: "./src/assets/images/no-winner-bg.png",
        NO_WINNERS_CARD_BG_MOBILE: "./src/assets/images/no-winners_card_bg_mobile.png",

        WINNER_DEMO_IMAGE: "./src/assets/images/winner_demo_image.png",

        STAR_ICON: "./src/assets/images/star-icon.png",
        QUESTION_ICON: "./src/assets/images/question-icon.png",

        TWITTER_IMG: "./src/assets/images/footer/twitter.png",
        FACEBOOK_IMG: "./src/assets/images/footer/facebook.png",
        TIKTOK_IMG: "./src/assets/images/footer/tiktok.png",
        INSTAGRAM_IMG: "./src/assets/images/footer/instagram.png",
        SHARE_TWITTER: "./src/assets/images/icons/twitter.svg",
        SHARE_FACEBOOK: "./src/assets/images/icons/facebook.svg",
        SHARE_WHATSAPP: "./src/assets/images/icons/whatsapp.svg",
        SHARE_TELEGRAM: "./src/assets/images/icons/telegram.svg",
        // PROFILE_RESULT: './src/assets/images/credits_bg.png',
        PROFILE_RESULT: './src/assets/images/result_bg.png',
        ORDERING_DOTS: './src/assets/images/ordering_dots.svg',
        LOADER_IMAGE: './src/assets/images/loading_icon.gif',
    },

    DOWNLOAD_APP_URLS: {
        FIREBASE: "https://playandwinapp.page.link/qLwbj",
        GOOGLE: "https://play.google.com/store/apps/details?id=app.playandwinapp.com",
        APPLE: "https://apps.apple.com/gr/app/play-and-win-win-cash-prizes/id1367436392",
    },

    OPERATORS: {
        OOREDOO_ALGERIA: {
            SUBSCRIPTION_INPUT_COUNTRY: 'dz',
            OTP_MASK: "9 9 9 9",
            CODE: "OOREDOO_ALGERIA",
            STYLE: {
                // BACKGROUND: "linear-gradient(#2C1F59, #2D1937)",
                // BACKGROUND: "#F5F5F5",
                BACKGROUND: "gray",
            },
            INDEX_CONFIG: {
                OG_TITLE: 'Win with Zain',
                OG_DESCRIPTION: 'إشترك الآن وجاوب على الأسئلة لفرصة ربح 5,000 دينار شهرياً. أول 4 أيام مجانا ثم 0.1 د.ك/اليوم',
                FAVICON: './src/assets/images/operators/zainKuwait/mpt-favicon.png',
            },
            IMG: {
                PRIZE: {
                    AR: './src/assets/images/prizes/algeria-prize-ar.png',
                    FR: './src/assets/images/prizes/algeria-prize-fr.png',
                }
            },
            ANALYTICS_EVENT_CATEGORY: "ooredoo_algeria",
            ANDROID_LINK: "https://play.google.com/store/apps/details?id=com.goplaymarket.dza",
            IOS_LINK: "https://apps.apple.com/dz/app/go-play-market/id6499268558?l=fr-FR",
            DESKTOP_LINK: "https://web-client.goplaymarket.com/htmlapp/algeria/index.html",
        },
        OOREDOO_TUNISIA: {
            SUBSCRIPTION_INPUT_COUNTRY: 'tn',
            OTP_MASK: "9 9 9 9",
            CODE: "OOREDOO_TUNISIA",
            STYLE: {
                BACKGROUND: "gray",
            },
            IMG: {
                PRIZE: {
                    AR: './src/assets/images/prizes/tunis-prize-ar.png',
                    FR: './src/assets/images/prizes/tunis-prize-fr.png',
                }
            },
            ANALYTICS_EVENT_CATEGORY: "ooredoo_tunisia",
            ANDROID_LINK: "https://play.google.com/store/apps/details?id=com.goplaymarket.tun",
            IOS_LINK: "https://apps.apple.com/tn/app/go-play-market-tunisia/id6502289219?l=fr-FR",
            DESKTOP_LINK: "https://web-client.goplaymarket.com/htmlapp/tunisia/index.html",
        },
        OOREDOO_OMAN: {
            SUBSCRIPTION_INPUT_COUNTRY: 'om',
            OTP_MASK: "9 9 9 9",
            CODE: "OOREDOO_OMAN",
            STYLE: {
                BACKGROUND: "gray",
            },
            IMG: {
                PRIZE: {
                    AR: './src/assets/images/prizes/oman-prize-ar.png',
                    EN: './src/assets/images/prizes/oman-prize-en.png',
                }
            },
            ANALYTICS_EVENT_CATEGORY: "ooredoo_tunisia",
            ANDROID_LINK: "https://play.google.com/store/apps/details?id=com.goplaymarket.omn&hl=en&gl=US",
            IOS_LINK: "https://apps.apple.com/om/app/goplaymarket/id6499340108",
            DESKTOP_LINK: "https://web-client.goplaymarket.com/htmlapp/oman/index.html",
        },
        OMANTEL_OMAN: {
            SUBSCRIPTION_INPUT_COUNTRY: 'om',
            OTP_MASK: "9 9 9 9",
            CODE: "OMANTEL_OMAN",
            STYLE: {
                BACKGROUND: "gray",
            },
            IMG: {
                PRIZE: {
                    AR: './src/assets/images/prizes/oman-prize-ar.png',
                    EN: './src/assets/images/prizes/oman-prize-en.png',
                }
            },
            ANALYTICS_EVENT_CATEGORY: "omantel_oman",
            ANDROID_LINK: "https://play.google.com/store/apps/details?id=com.goplaymarket.omn&hl=en&gl=US",
            IOS_LINK: "https://apps.apple.com/om/app/goplaymarket/id6499340108",
            DESKTOP_LINK: "https://web-client.goplaymarket.com/htmlapp/oman/index.html",
        },
        OOREDOO_KUWAIT: {
            SUBSCRIPTION_INPUT_COUNTRY: 'kw',
            OTP_MASK: "9 9 9 9",
            CODE: "OOREDOO_KUWAIT",
            STYLE: {
                BACKGROUND: "gray",
            },
            IMG: {
                PRIZE: {
                    AR: './src/assets/images/prizes/kuwait-prize-ar.png',
                    EN: './src/assets/images/prizes/kuwait-prize-en.png',
                }
            },
            ANALYTICS_EVENT_CATEGORY: "ooredoo_kuwait",
            ANDROID_LINK: "https://play.google.com/store/apps/details?id=com.goplaymarket.kwt",
            IOS_LINK: "https://apps.apple.com/kw/app/goplaymarket-kuwait/id6502258171",
            DESKTOP_LINK: "https://web-client.goplaymarket.com/htmlapp/kuwait/index.html",
        },
        ASIACELL_IRAQ: {
            SUBSCRIPTION_INPUT_COUNTRY: 'iq',
            OTP_MASK: "9 9 9 9",
            CODE: "ASIACELL_IRAQ",
            STYLE: {
                BACKGROUND: "gray",
            },
            IMG: {
                PRIZE: {
                    AR: './src/assets/images/prizes/iraq-prize-ar.png',
                    KU: './src/assets/images/prizes/iraq-prize-ku.png',
                }
            },
            ANALYTICS_EVENT_CATEGORY: "asiacell_iraq",
            ANDROID_LINK: "https://play.google.com/store/apps/details?id=com.goplaymarket.irq",
            IOS_LINK: "",
            DESKTOP_LINK: "https://web-client.goplaymarket.com/htmlapp/iraq/index.html",
        },
        DEFAULT: {
            SUBSCRIPTION_INPUT_COUNTRY: 'iq',
            OTP_MASK: "9 9 9 9",
            CODE: "ASIACELL_IRAQ",
            STYLE: {
                BACKGROUND: "gray",
            },
            IMG: {
                PRIZE: {
                    AR: './src/assets/images/prizes/oman-prize-ar.png',
                    EN: './src/assets/images/prizes/oman-prize-en.png',
                }
            },
            ANALYTICS_EVENT_CATEGORY: "asiacell_iraq",
        },
    },

    SUB_DOMAINS: [
        {name: "goplayandwin", operator: "GENERAL"},
        {name: "ooredooalgeria", operator: "OOREDOO_ALGERIA"},
        {name: "ooredootunisia", operator: "OOREDOO_TUNISIA"},
        {name: "ooredoooman", operator: "OOREDOO_OMAN"},
        {name: "omantel", operator: "OMANTEL_OMAN"},
        {name: "oman", operator: "OMANTEL_OMAN"},
        {name: "ooredookuwait", operator: "OOREDOO_KUWAIT"},
        {name: "kuwait", operator: "OOREDOO_KUWAIT"},
        {name: "asiacell", operator: "ASIACELL_IRAQ"},
        {name: "go-playandwin-web", operator: "OOREDOO_ALGERIA"},
    ],

    COUNTRY_OPERATORS: {
        DZ: {
            country_name: "Algeria",
            operators: {
                OOREDOO_ALGERIA: {
                    operator_name: "Ooredoo",
                    url: "https://ooredooalgeria.goplayandwin.com",
                },
            },
        },
        TN: {
            country_name: "Tunisia",
            operators: {
                OOREDOO_TUNISIA: {
                    operator_name: "Ooredoo",
                    url: "https://ooredootunisia.goplayandwin.com",
                },
            },
        },
        OM: {
            country_name: "Oman",
            operators: {
                OOREDOO_OMAN: {
                    operator_name: "Ooredoo",
                    url: "https://ooredoooman.goplayandwin.com",
                },
                OMANTEL_OMAN: {
                    operator_name: "Omantel",
                    url: "https://omantel.goplayandwin.com",
                },
            },
        },
        KW: {
            country_name: "Kuwait",
            operators: {
                OOREDOO_KUWAIT: {
                    operator_name: "Ooredoo",
                    url: "https://ooredookuwait.goplayandwin.com",
                },
            },
        },
        IQ: {
            country_name: "Iraq",
            operators: {
                ASIACELL_IRAQ: {
                    operator_name: "Asiacell",
                    url: "https://asiacell.goplayandwin.com",
                },
            },
        },
    },

    API_URLS: {
        IDENTIFY: "account/identify",
        VERIFY: "account/verify",
        HE_SUBSCRIPTION: "account/subscribe_he",
        CHECK_SUBSCRIPTION: "account/check_subscriber",
        AUTHENTICATE_MSISDN: 'account/authenticate_msisdn',
        UNSUBSCRIBE: 'web_portal/unsubscribe',
        GET_NEXT_STEP: "web_game/next_step",
        ANSWER: "web_game/answer",
        GET_LANDING_DATA: "web_portal/landing",
        CHANGE_LANGUAGE: "web_portal/change_language",
        GET_WINNERS: 'web_portal/winners',
        CHECK_LOGIN_TOKEN: 'account/auth_web_portal',
        GET_TERMS: 'web_portal/get_terms',
        SUBMIT_SHARE: 'web_portal/submit_share',
        GET_SPINNER: 'web_portal/get_spinner',
        START_SPINNER: 'web_portal/start_spinner',
    },
    TRANSACTIONS_TYPE: {
        REDEEM: "REDEEM",
        WINNER: "WINNER"
    },
    API_ERRORS: {
        INVALID_USER_AUTHENTICATION: "INVALID_USER_AUTHENTICATION"
    },
    DEVICE_TYPE_IOS: "IOS",
    DEVICE_TYPE_ANDROID: "ANDROID",
    DEVICE_TYPE_HUAWEI: "HUAWEI",
    COUNTRY_CODES: {},
    ANALYTICS_EVENTS: {
        EVENTS_NAMES: {
            REQUEST_OTP: "Request-OTP",
            REQUEST_OTP_FAILED: "Request-OTP-Failed",
            REQUEST_OTP_SUCCESS: "Request-OTP-Success",
            VERIFY_OTP: "Verify-OTP",
            VERIFY_OTP_FAILED: "Verify-OTP-Failed",
            SUBSCRIBED_SUCCESSFULLY: "Subscribed-Successfully",
            BUTTON_CLICKS: "Button Clicks",
            HE_CLICKED: "HE-Clicked",
            WEEKLY_GAME: "Weekly-Game",
            TRIVIA_GAME: "Trivia-Game",
            VISIT_BTN_CLICKS: "Visit-btn-clicked",
        },
        EVENTS_LABELS: {
            RESULTS: 'Results',
            ABOUT: 'About',
            FEATURES: 'Features',
            DOWNLOAD_APP: 'Download-app',
            FAQ: 'FAQ',
            WINNERS: 'Winners',
            REFERENCES: 'References',
            HOW_TO_PLAY: 'How-To-Play',
            SIGN_IN: 'Sign-In',
            PRIVACY_POLICY: 'Privacy-Policy',
            EULA: 'Eula',
            TERMS_AND_CONDITIONS: 'Terms-and-Conditions',
            DOWNLOAD_FIREBASE: 'download-firebase',
            DOWNLOAD_ANDROID: 'download-android',
            DOWNLOAD_IOS: 'download-ios',
            DOWNLOAD_DESKTOP: 'download-desktop',
            AVAILABLE_OPERATORS: 'available-operators'
        }
    },

    DEVICE_TYPES: {
        IOS: "IOS",
        ANDROID: "ANDROID",
        HUAWEI: "HUAWEI",
        WEB: "WEB",
        ANDROID_TV: "ANDROID_TV",
        APPLE_TV: "APPLE_TV"
    },
    TESTING_NUMBERS: ["+95333333333"],

    QUESTION_TYPE: {
        SINGLE: 'SINGLE',
        ORDERING: 'ORDERING'
    }

}