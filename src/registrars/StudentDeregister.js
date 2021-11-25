import './StudentDeregister.css';
import React from "react";

const studentcourseAssignPopup = props => {
    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={props.handleClose}>x</span>
                    {props.content}
            </div>
        </div>
        );
    };
       
export default studentcourseAssignPopup;