import './StudentRecordPopup.css';
import React from "react";

const StudentRecordPopUp = props => {
    return (
        <div className="popup-box3">
            <div className="box3">
                <span className="close-icon3" onClick={props.handleClose}>x</span>
                    {props.content}
            </div>
        </div>
        );
    };
       
export default StudentRecordPopUp;