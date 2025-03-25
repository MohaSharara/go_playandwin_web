import {useState, useEffect} from 'react';
import axios from 'axios';

const useIPRangeChecker = () => {
    const [isInRange, setIsInRange] = useState(false);

    const ipToNumber = (ip) => ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet), 0);

    const isInSubnet = (ip, range) => {
        const [networkAddress, subnetMask] = range.split('/');
        const mask = ~(Math.pow(2, 32 - parseInt(subnetMask)) - 1);
        const networkAddr = ipToNumber(networkAddress) & mask;
        const targetAddr = ipToNumber(ip) & mask;
        return networkAddr === targetAddr;
    };

    const checkIfIPInRange = (ip) => {
        const ipRanges = [
            "78.89.0.0/16",
            "178.53.0.0/16",
            "188.70.0.0/15",
            "217.69.176.0/20",
            "188.71.192.0/18",
            "91.151.0.0/16",
        ];
        return ipRanges.some((range) => isInSubnet(ip, range));
    };

    useEffect(() => {
        const checkIP = async () => {
            try {
                const response = await axios.get("https://api.ipify.org?format=json");
                const ip = response.data.ip;
                const inRange = checkIfIPInRange(ip);
                setIsInRange(inRange);
                console.log(`IP ${ip} range: ${inRange}`);
            } catch (error) {
                console.error("Error checking IP range:", error);
                setIsInRange(false);
            }
        };

        checkIP();
    }, []);

    return isInRange;
};

export default useIPRangeChecker;