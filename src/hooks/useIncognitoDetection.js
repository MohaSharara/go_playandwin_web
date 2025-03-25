import { useEffect, useState } from 'react';
import { detectIncognito } from "detectincognitojs";

const useIncognitoDetection = () => {
    const [isPrivate, setIsPrivate] = useState(false);

    useEffect(() => {
        detectIncognito().then((result) => {
            setIsPrivate(result.isPrivate);
        });
    }, []);

    return isPrivate;
};

export default useIncognitoDetection;