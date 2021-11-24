import './InstructorComplainPopup1.css';
import React from "react";

const InstructorComplainPopup1 = props => {
    return (
        <div className="popup-box3">
            <div className="box3">
                <span className="close-icon3" onClick={props.handleClose}>x</span>
                    {props.content}
            </div>
        </div>
        );
    };
       
export default InstructorComplainPopup1;
