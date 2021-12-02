import './classSetUpPeriodPopup.css';
import React from "react";

const classSetUpPeriodPopup = props => {
    return (
        <div className="popup-boxc">
            <div className="boxc">
                <span className="close-iconc" onClick={props.handleClose}>x</span>
                    {props.content}
            </div>
        </div>
        );
    };
       
export default classSetUpPeriodPopup;
