import React from "react";
import { Key } from "./Key";
import { NumericKeyboard } from "./NumericKeyboard";
import line1 from "./line-1.svg";
import line2 from "./line-2.svg";
import line3 from "./line-3.svg";
import line4 from "./line-4.svg";
import line5 from "./line-5.svg";
import send from "./send.svg";
import "./style.css";

export const ElementInviteCode = (): JSX.Element => {
    return (
        <div className="element-invite-code">
            <div className="div-2">
                <div className="group">
                    <div className="text-wrapper-2">Enter your invite code</div>
                </div>

                <div className="header" />

                <NumericKeyboard
                    className="numeric-keyboard-instance"
                    darkMode={false}
                    icon={<Key className="icon-instance-node" />}
                    predictive={false}
                />
                <div className="group-2">
                    <img className="line" alt="Line" src={line1} />

                    <img className="img" alt="Line" src={line2} />

                    <img className="line-2" alt="Line" src={line4} />

                    <img className="line-3" alt="Line" src={line5} />

                    <img className="line-4" alt="Line" src={line3} />
                </div>

                <div className="enter-key">
                    <img className="send" alt="Send" src={send} />
                </div>

                <p className="p">You can get it from your friend</p>
            </div>
        </div>
    );
};
