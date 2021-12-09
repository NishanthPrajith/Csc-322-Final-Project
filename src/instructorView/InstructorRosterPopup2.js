import './InstructorRosterPopup2.css';
import React from "react";

const InstructorRosterPopup2 = props => {
    return (
        <div className="popup-box4">
            <div className="box4">
                <span className="close-icon4" onClick={props.handleClose}>x</span>
                    {props.content}
            </div>
        </div>
        );
    };
       
export default InstructorRosterPopup2;