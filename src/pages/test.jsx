import React, {Fragment, use} from "react";

import {LandingContext} from "../contexts/LandingContext";


const Test = () => {
    const {landingData} = use(LandingContext);


    return (
        <Fragment>
            <Fragment>
                <h1>test test page</h1>

                {landingData ? (
                    <div>
                        <h2>{landingData.operator_code}</h2>
                    </div>

                ) : (
                    <p>Loading geo information...</p>
                )}

            </Fragment>
        </Fragment>
    )
}
export default Test