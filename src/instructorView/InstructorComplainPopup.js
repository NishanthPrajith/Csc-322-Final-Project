import './InstructorComplainPopup.css';
import React from "react";

const InstructorComplainPopup = props => {
    return (
        <div className="popup-box2">
            <div className="box2">
                <span className="close-icon2" onClick={props.handleClose}>x</span>
                    {props.content}
            </div>
        </div>
        );
    };
       
export default InstructorComplainPopup;
