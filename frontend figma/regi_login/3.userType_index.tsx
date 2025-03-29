import React from "react";
import send from "./send.svg";
import "./style.css";

export const ElementUserType = (): JSX.Element => {
    return (
        <div className="element-user-type">
            <div className="div">
                <div className="group">
                    <p className="text-wrapper">What are you here for?</p>
                </div>

                <div className="header" />

                <p className="i-want-to-date">
                    <span className="span">I want to date</span>

                    <span className="text-wrapper-2">
                        : Access to all dating features, and friends’ endorsement features
                        and benefits.&nbsp;&nbsp;
                        <br />
                    </span>

                    <span className="span">I want to help friends</span>

                    <span className="text-wrapper-2">
                        :&nbsp;&nbsp;Access to only the friends’ endorsement features and
                        benefits.
                    </span>
                </p>

                <p className="p">
                    The option is locked by the invitation code you received. If you are
                    here for a different option, please ask your friend to resent the
                    invitation code of desired option.
                </p>

                <div className="CONTINUE">
                    <div className="overlap-group">
                        <p className="text-wrapper-3">
                            I want to help my friends find romance
                        </p>
                    </div>
                </div>

                <div className="overlap-wrapper">
                    <div className="overlap">
                        <div className="text-wrapper-4">I want to date</div>
                    </div>
                </div>

                <div className="enter-key">
                    <img className="send" alt="Send" src={send} />
                </div>
            </div>
        </div>
    );
};
