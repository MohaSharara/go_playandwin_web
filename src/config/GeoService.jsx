import axios from 'axios';
import Tools from "./Tools";

class GeoService {
    static instance = null;
    static countryCode = null;
    static isLoading = false;
    static subscribers = [];

    static getInstance() {
        if (!GeoService.instance) {
            GeoService.instance = new GeoService();
        }
        return GeoService.instance;
    }

    static async getCountryCode() {
        // If we already have the country code, return it
        if (GeoService.countryCode) {
            return GeoService.countryCode;
        }

        // Check URL parameters first
        const urlParams = new URLSearchParams(window.location.search);
        const countryFromUrl = urlParams.get('country_code')?.toUpperCase();
        if (countryFromUrl) {
            GeoService.countryCode = countryFromUrl;
            localStorage.setItem('country_code', countryFromUrl);
            return countryFromUrl;
        }

        // Check localStorage
        const storedCountryCode = localStorage.getItem('country_code');
        if (storedCountryCode) {
            GeoService.countryCode = storedCountryCode;
            return storedCountryCode;
        }

        // If already loading, wait for the result
        if (GeoService.isLoading) {
            return new Promise((resolve) => {
                GeoService.subscribers.push(resolve);
            });
        }

        // Set loading flag
        GeoService.isLoading = true;

        try {
            // Try multiple geo APIs in sequence
            const currentProtocol = window.location.protocol;
            const apis = [
                `${currentProtocol}//pro.ip-api.com/json?key=e5ntCy9NU1m2SR8`,
                `${currentProtocol}//api.country.is/`,
                `${currentProtocol}//ipapi.co/json/`,
            ];

            for (const api of apis) {
                try {
                    const response = await axios.get(api);
                    console.log("response.data", response.data)
                    const countryCode = response.data.countryCode || response.data.country_code;
                    if (countryCode) {
                        GeoService.countryCode = countryCode;
                        Tools.getInitialOperatorCode(countryCode)
                        localStorage.setItem('country_code', countryCode);

                        // Notify all subscribers
                        GeoService.subscribers.forEach(resolve => resolve(countryCode));
                        GeoService.subscribers = [];
                        GeoService.isLoading = false;

                        return countryCode; // Stops further execution of the loop
                    }
                } catch (error) {
                    console.warn(`Failed to fetch from ${api}:`, error);
                }
            }


            // If all APIs fail, return default
            const defaultCountry = 'lb';
            GeoService.countryCode = defaultCountry;
            return defaultCountry;

        } finally {
            GeoService.isLoading = false;
        }
    }
}

export default GeoService;