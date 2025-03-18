export default {

    OOREDOO_TUNISIA: {
        EN: {
            DIRECTION: "ltr",

            // header
            PLAY_DAILY_QUIZ: "Play Daily Quiz",
            PLAY_WEEK_GAME: "Play Weekly Game",
            DOWNLOAD_APP: 'Download-app',
            WINNERS: 'Winners',
            FAQS: "FAQs",
            LOGOUT: 'Logout',

            // Subscribe
            EARN_POINTS_AND_WIN: "Earn Points & WIN",
            SUBSCRIPTION_BTN: 'Subscribe',
            VERIFICATION_BTN: 'Enter PIN',
            ENTER_NUMBER_BTN: "Enter Mobile Number",

            // Profile
            TOTAL_POINTS: "Total Points",
            WEEKLY_POINTS: "Weekly Points",
            QUESTIONS: 'Questions',
            YOU_HAVE_QUESTIONS: "You have answered {questions} questions. You can still play the daily trivia.",
            YOU_HAVE_NO_QUESTIONS: "You have answered all {questions} daily trivia questions. Return tomorrow to answer and collect points.",
            YOU_HAVE_COLLECTED_WEEKLY: "You have scored so far {points} weekly points for this week's game leaderboard. Weekly points reset every week.",
            YOU_HAVE_COLLECTED_TOTAL: "You have accumulated {points} total points for the grand prize.",

            // TriviaGameCard
            PLAY_FIVE_DAILY: 'Play 5 daily trivia questions',
            AND_EARN_POINTS: 'And earn points to WIN!',
            JOIN_NOW: 'Join Now',
            TAKE_THE_QUIZ: 'Take the Quiz',
            RETURN_TOMORROW: 'Return Tomorrow',
            NOT_CHARGED_POPUP_MSG: 'To access the daily trivia questions, make sure you have enough balance in your account for subscription.',

            // WeeklyGameCard
            JOIN_WEEKLY_CHALLENGE: 'Join Weekly Game Challenge',
            SCORE_ON_LEADERBOARD_1: 'Score on leaderboard and earn',
            SCORE_ON_LEADERBOARD_2: 'points to WIN!',
            PLAY: "Play",

            // SpinnerCard
            SPIN_THE_WHEEL: 'Spin The Wheel',
            EARN_POINTS_OR_MORE: 'Earn Points Or More And WIN!',
            GIVE_IT_A_SPIN: 'Give it a spin',
            SPINNER_CARD_BG_DESKTOP: "/assets/images/spinner_card_bg_desktop.png",
            SPINNER_CARD_BG_MOBILE: "/assets/images/spinner_card_bg_mobile.png",
            NOT_CHARGED_SPINNER_POPUP_MSG: 'To access the Spin the Wheel feature, make sure you have enough balance in your account for subscription. \n',

            // Spin the wheel Modal
            SPIN_THE_WHEEL_TITLE: "Click on start to spin",
            RESULT_MESSAGE: (result) => `You earned ${result} extra question! Play now to collect more points`,
            RESULT_MESSAGE_POINTS: (result) => `You earned ${result} extra Points!`,
            START: "Start",
            CLOSE: "Close",
            GO_TO_QUESTION: "Go To Question",
            VALID: "Valid for 24 hours",
            '10_POINTS': '10 points',
            '20_POINTS': '20 points',
            '30_POINTS': '30 points',
            '5_QUESTIONS': '5 questions',
            '10_QUESTIONS': '10 questions',
            '15_QUESTIONS': '15 questions',

            // DownloadTheApp
            DOWNLOAD_THE_APP: "Download the App, It's Point-tastic",
            APPLE_STORE: "/assets/images/download_btns/apple_store_en.png",
            GOOGLE_PLAY: "/assets/images/download_btns/google_play_en.png",
            WEB_DOWNLOAD: "/assets/images/download_btns/web_dowload_en.png",

            // Complete The Quest
            COMPLETE_THE_QUEST: 'Complete quests',
            TO_EARN_POINTS: 'to earn points and WIN!',
            HOW_TO_PLAY_CONTENT: [
                {id: 1, title: "Invite your friends", points: "+100 pts"},
                {id: 2, title: "Share the app", points: "+100 pts"},
                {id: 3, title: "Watch 2 Movies", points: "+100 pts"},
                {id: 4, title: "Daily Login", points: "+100 pts"},
                {id: 5, title: "Link FB account", points: "+100 pts"},
            ],

            // WinnersCard
            NO_WINNERS_YET: "Winners To Be Announced!",
            WON: "Won",
            VIEW_MORE: 'View More',

            // Winner Modal
            ALL_WINNERS: "All Winners",

            // FAQ
            FAQ: 'Still Have Questions?',
            FAQ_CONTENT: [
                {
                    'q': 'What is Go Play&Win Promo?',
                    'a': 'The Go Play&Win Promo is a subscription-based promotion for the Go Play Market mobile application. It allows participants to play daily trivia and weekly web games to earn points and win weekly and grand prizes. The promo is available to mobile customers in Algeria, Iraq, Kuwait, Oman, Tunisia, and the Maldives.',
                },
                {
                    'q': 'What is the duration of the promo?',
                    'a': 'The promo runs from January 15, 2025, to October 11, 2025, inclusive.',
                },
            ],

            // Footer
            TERMS_AND_CONDITIONS: 'Terms and conditions',
            UNSUBSCRIBE: 'Unsubscribe',

            // Unsubscribe Modal
            CONFIRM: "Confirm",
            CANCEL: "Cancel",
            ARE_YOU_SURE_UNSUBSCRIBE_1: 'Are you sure you want to',
            ARE_YOU_SURE_UNSUBSCRIBE_2: 'unsubscribe from Go Play&Win?',

            // Play Page
            USE_FINGER: "use your finger to move the answers up and down",
            SUBMIT: "Submit",

            // Result Page
            BACK: 'BACK',
            POINTS: 'POINTS',
            SHARE_MESSAGE: (totalCollected) => `I scored ${totalCollected} on Go Play&Win promo. Can you beat my score?`,
            YOU_HAVE: "You have excellent knowledge!",
            YOU_COLLECTED: "You collected",
            CORRECT_ANSWERS: "Correct Answers",
            COME_BACK_TOMORROW: "Come back tomorrow for another round",
            ROUND_OF_5_QUESTIONS: "of 5 questions",
            GO_TO_WEEKLY_GAME: "Go to Weekly Game",

            // Toast
            COULDNT_CHANGE_LANGUAGE: "Couldn't change language",
            OTP_LIMIT_REACHED: "OTP limit reached",
            OTP_SPAM: "Spam OTP",
            INVALID_OTP: 'Invalid OTP',
            INVALID_MSISDN_INPUT: "Msisdn Input is invalid",
            INVALID_NUMBER: "Invalid Phone Number",
            ERROR_OCCURRED: "Error Occurred",
            DIDNT_RECEIVE_OTP: "Did not receive OTP?",
            ERROR_IN_NEXT_STEP: "Error in the next step",

        },
    },

}


// PROFILE POPOVER:
// YOU_HAVE_QUESTIONS: "Vous avez répondu à {questions} questions. Vous pouvez encore jouer au quiz quotidien.",
// YOU_HAVE_NO_QUESTIONS: "Vous avez répondu à toutes les {questions} questions quotidiennes du quiz. Revenez demain pour répondre et collecter des points.",
// YOU_HAVE_COLLECTED_WEEKLY: "Vous avez marqué jusqu'à présent {points} points hebdomadaires pour le classement de cette semaine. Les points hebdomadaires sont réinitialisés chaque semaine.",
// YOU_HAVE_COLLECTED_TOTAL: "Vous avez accumulé {points} points totaux pour le grand prix.",
//
// DRAGGABLE QUESTIONS MESSAGE:
// USE_FINGER: "Utilisez votre doigt pour déplacer les réponses vers le haut et vers le bas",
//
// RESULT PAGE:
// SHARE_MESSAGE: (totalCollected) => J'ai marqué ${totalCollected} sur la promo Go Play&Win. Pouvez-vous battre mon score?,
// GO_TO_WEEKLY_GAME: "Aller au jeu hebdomadaire",
//
// TOAST/MESSAGES/ERRORS:
// COULDNT_CHANGE_LANGUAGE: "Impossible de changer la langue",
// OTP_LIMIT_REACHED: "Limite OTP atteinte",
// OTP_SPAM: "Spam OTP",
// INVALID_MSISDN_INPUT: "Entrée MSISDN invalide",
// INVALID_NUMBER: "Numéro de téléphone invalide",
// ERROR_OCCURRED: "Une erreur est survenue",
// DIDNT_RECEIVE_OTP: "Vous n'avez pas reçu le code OTP?",
// ERROR_IN_NEXT_STEP: "Erreur dans la prochaine étape",