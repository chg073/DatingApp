import React from "react";
import { Key } from "./Key";
import { NumericKeyboard } from "./NumericKeyboard";
import group47 from "./group-47.png";
import line1 from "./line-1.svg";
import line2 from "./line-2.svg";
import send from "./send.svg";
import "./style.css";

export const ElementPhoneNum = (): JSX.Element => {
    return (
        <div className="element-phone-num">
            <div className="div-2">
                <div className="group">
                    <div className="whats-your-phone">
                        Whats your phone
                        <br />
                        number?
                    </div>
                </div>

                <div className="header" />

                <div className="overlap">
                    <div className="group-2">
                        <div className="overlap-group">
                            <div className="overlap-group-2">
                                <img className="line" alt="Line" src={line1} />

                                <div className="text-wrapper-2">+1</div>
                            </div>

                            <img className="img" alt="Group" src={group47} />
                        </div>

                        <img className="line-2" alt="Line" src={line2} />

                        <NumericKeyboard
                            className="numeric-keyboard-instance"
                            darkMode={false}
                            icon={<Key className="icon-instance-node" />}
                            predictive={false}
                        />
                    </div>

                    <div className="enter-key">
                        <img className="send" alt="Send" src={send} />
                    </div>
                </div>

                <p className="p">
                    We only use phone numbers to make sure everyone is real.
                </p>
            </div>
        </div>
    );
};
