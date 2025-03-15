import { ArrowLeftIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../../components/ui/input-otp";

export const VerifCode = (): JSX.Element => {
  const [value, setValue] = useState("");

  const keypadNumbers = [
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

  return (
    <div className="bg-neutral-50 flex flex-row justify-center w-full min-h-screen">
      <div className="bg-neutral-50 w-[390px] relative">
        {/* Status Bar */}
        <div className="h-11 flex justify-between items-center px-5">
          <img
            className="h-[21px]"
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

        {/* Title */}
        <div className="px-6 mt-[124px]">
          <h1 className="[font-family:'Roboto_Serif',Helvetica] font-semibold text-lightgray-11 text-3xl leading-[50px]">
            Enter your verification code
          </h1>
        </div>

        {/* OTP Input */}
        <div className="px-5 mt-16">
          <InputOTP
            value={value}
            onChange={setValue}
            maxLength={5}
            className="gap-2"
          >
            <InputOTPGroup>
              {Array.from({ length: 5 }).map((_, i) => (
                <InputOTPSlot key={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        {/* Submit Button */}
        <div className="absolute right-6 top-[489px]">
          <img
            className="w-[105px] h-[49px]"
            alt="Enter key"
            src="/img/enter-key.svg"
          />
        </div>

        {/* Keypad */}
        <Card className="absolute bottom-0 w-full bg-[#d1d3d9] backdrop-blur-[108.73px]">
          <CardContent className="p-1.5">
            <div className="grid grid-cols-3 gap-1">
              {keypadNumbers.map((item) => (
                <Button
                  key={item.number}
                  variant="ghost"
                  className="h-[46px] bg-system-backgroundlightprimary rounded-[4.6px] shadow-[0px_1px_0px_#0000004c] flex flex-col items-center justify-center"
                >
                  <span className="[font-family:'SF_Pro_Display-Regular',Helvetica] text-[25px] text-label-colorlightprimary">
                    {item.number}
                  </span>
                  {item.letters && (
                    <span className="[font-family:'SF_Pro_Text-Bold',Helvetica] text-[10px] tracking-[2px] text-label-colorlightprimary">
                      {item.letters}
                    </span>
                  )}
                </Button>
              ))}
              <div /> {/* Empty space */}
              <Button
                variant="ghost"
                className="h-[46px] bg-system-backgroundlightprimary rounded-[4.6px] shadow-[0px_1px_0px_#0000004c] flex items-center justify-center"
              >
                <span className="[font-family:'SF_Pro_Display-Regular',Helvetica] text-[25px] text-black">
                  0
                </span>
              </Button>
              <Button variant="ghost" className="h-[46px]">
                <img
                  alt="Delete"
                  src="/img/key.svg"
                  className="w-full h-full"
                />
              </Button>
            </div>
          </CardContent>
          <div className="h-[34px] flex justify-center items-center">
            <div className="w-[134px] h-[5px] bg-label-colorlightprimary rounded-[100px]" />
          </div>
        </Card>
      </div>
    </div>
  );
};
