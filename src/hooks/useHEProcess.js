import Tools from "../config/Tools";

// Custom hook to process HE logic
const useHEProcess = (currentOperatorCode) => {
    // Function to handle redirection logic
    const heProcess = () => {
        const transID = Tools.generateTransID();
        const ooredooKuwaitURL = `http://singlehe.ooredoo.com.kw:9989/SingleSiteHE/getHE?productID=S-GoPWnEwMY2&CpId=NUMBASE&CpPwd=num@123&CpName=Numbase&pName=GoPlayandWin&transID=${transID}`;
        const randomOmanNumber = Math.floor(Math.random() * 90000) + 10000; // Generate a random 5-digit number
        const omantelOmanURL = `http://om.mobile-tech-offers.com/pim/omantelmahe?user=numbasse&pass=num18kl74gh6&redirectURL=http://oman.goplayandwin.com/sub-he?parsing=1%26debug=0%26x=${randomOmanNumber}`;
        let numHeaderUrl = `http://www.numheader.com`;
        let redirectUrl = `${window.location.origin}${window.location.pathname}`;
        let url;

        // Determine the correct URL for redirection
        if (currentOperatorCode === "OOREDOO_OMAN") {
            url = `${numHeaderUrl}?is_ooredoo_oman=true&red_url=${redirectUrl}`;
        } else if (currentOperatorCode === "OOREDOO_KUWAIT") {
            url = `${ooredooKuwaitURL}`;
        } else if (currentOperatorCode === "OMANTEL_OMAN") {
            url = `${omantelOmanURL}`;
        } else {
            url = `${numHeaderUrl}?red_url=${redirectUrl}`;
        }

        // Perform the redirection
        window.location.assign(url);
    };

    // Invoke the process
    heProcess();
};

export default useHEProcess;