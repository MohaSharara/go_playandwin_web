import React, {Fragment} from "react";
import constants from "../common/constants";

const Loader = ({ bodyClass = "mainBody" }) => {

    return (
        <Fragment>
            <div className={`${bodyClass} d-flex align-items-center justify-content-center`} dir="ltr">
                <div className="text-center">
                    <img
                        src={constants.IMAGES.LOADER}
                        alt="loader"
                        className="loader"
                    />
                </div>
            </div>
        </Fragment>
    )
}
export default Loader