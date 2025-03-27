import React, {use} from 'react';
import Tools from "../Tools";
import {LandingContext} from "../../contexts/LandingContext";


const DateTimeDisplay = ({value, type, isDanger}) => {
    const {currentOperatorCode} = use(LandingContext);
    const translation_obj = Tools.getTranslationObj(currentOperatorCode)


    return (
        // <div className={isDanger ? 'countdown danger' : 'countdown'}>
        <div className='countdown mb-0'>
            <p className="number-style">{value}</p>
            {/*<span>{type}</span>*/}
            <span className="mt-1">{translation_obj[type.toUpperCase()]}</span>
        </div>
    );
};

export default DateTimeDisplay;
