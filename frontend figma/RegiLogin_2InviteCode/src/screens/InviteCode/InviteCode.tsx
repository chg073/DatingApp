import { ArrowLeftIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../../components/ui/input-otp";

const keypadButtons = [
  { number: "1", letters: "" },
  { number: "2", letters: "ABC" },
  { number: "3", letters: "DEF" },
  { number: "4", letters: "GHI" },
  { number: "5", letters: "JKL" },
  { number: "6", letters: "MNO" },
  { number: "7", letters: "PQRS" },
  { number: "8", letters: "TUV" },
  { number: "9", letters: "WXYZ" },
];

export const InviteCode = (): JSX.Element => {
  const [code, setCode] = useState("");

  return (
    <div className="bg-neutral-50 flex flex-row justify-center w-full">
      <div className="bg-neutral-50 w-[390px] h-[844px] relative">
        {/* Status Bar */}
        <div className="w-[390px] h-11 flex justify-between items-center px-5">
          <img
            className="w-[54px] h-[21px]"
            alt="Time light"
            src="/img/time-light.svg"
          />
          <div className="flex items-center gap-1">
            <img
              className="w-5 h-3.5"
              alt="Network signal light"
              src="/img/network-signal-light.svg"
            />
            <img
              className="w-4 h-3.5"
              alt="Wifi signal light"
              src="/img/wifi-signal-light.svg"
            />
            <img
              className="w-[25px] h-3.5"
              alt="Battery light"
              src="/img/battery-light.svg"
            />
          </div>
        </div>

        {/* Back Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-[69px] left-6"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </Button>

        {/* Main Content */}
        <div className="px-6 mt-[124px]">
          <h1 className="font-['Roboto_Serif'] font-semibold text-3xl text-black leading-[50px]">
            Enter your invite code
          </h1>
          <p className="font-['Roboto'] text-base text-[#3c3c4399] tracking-[0.25px] leading-5 mt-4">
            You can get it from your friend
          </p>

          {/* OTP Input */}
          <div className="mt-12">
            <InputOTP
              value={code}
              onChange={setCode}
              maxLength={5}
              render={({ slots }) => (
                <InputOTPGroup className="gap-4">
                  {slots.map((slot, index) => (
                    <InputOTPSlot
                      key={index}
                      {...slot}
                      className="w-[55px] h-px border-b border-black"
                    />
                  ))}
                </InputOTPGroup>
              )}
            />
          </div>
        </div>

        {/* Keypad */}
        <div className="absolute w-[390px] bottom-0 bg-[#d1d3d9] backdrop-blur-[108.73px]">
          <div className="grid grid-cols-3 gap-[5px] p-1.5">
            {keypadButtons.map((button) => (
              <Card
                key={button.number}
                className="shadow-[0px_1px_0px_#0000004c]"
              >
                <CardContent className="p-0 h-[46px] flex flex-col items-center justify-center">
                  <span className="font-['SF_Pro_Display-Regular'] text-[25px] tracking-[0.29px]">
                    {button.number}
                  </span>
                  {button.letters && (
                    <span className="font-['SF_Pro_Text-Bold'] text-[10px] tracking-[2px]">
                      {button.letters}
                    </span>
                  )}
                </CardContent>
              </Card>
            ))}
            <div /> {/* Empty space */}
            <Card className="shadow-[0px_1px_0px_#0000004c]">
              <CardContent className="p-0 h-[46px] flex items-center justify-center">
                <span className="font-['SF_Pro_Display-Regular'] text-[25px] tracking-[0.29px]">
                  0
                </span>
              </CardContent>
            </Card>
            <Button
              variant="ghost"
              className="h-[46px] flex items-center justify-center"
            >
              <img alt="Delete" src="/img/key.svg" className="w-full h-full" />
            </Button>
          </div>

          {/* Home Indicator */}
          <div className="h-[34px] flex justify-center items-center">
            <div className="w-[134px] h-[5px] bg-black rounded-[100px]" />
          </div>
        </div>
      </div>
    </div>
  );
};
