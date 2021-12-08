import './StudentRecordPopup1.css';
import React from "react";

const StudentRecordPopUpone = props => {
    return (
        <div className="popup-box3">
            <div className="box3">
                <span className="close-icon3" onClick={props.handleClose}>x</span>
                    {props.content}
            </div>
        </div>
        );
    };
       
export default StudentRecordPopUpone;