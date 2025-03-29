// This React + TypeScript component creates a phone number input screen 
//using Radix UI (@radix-ui/react-select), Tailwind CSS, and custom UI components (Card, Button, Input, Select). 
//It is designed for a mobile screen (390px x 844px), indicating it's likely used in a mobile-first web app.

// Key Features
// - Mobile-first UI – Uses a fixed 390px x 844px layout for mobile screens.
// - Radix UI Select – Dropdown for selecting a country code.
// - Reusable UI Components – Card, Button, Input, and Select.
// - Lucide-react Icons – ArrowLeftIcon for navigation.
// - Tailwind CSS Styling – Uses absolute positioning for precise layout control.
  
import { ArrowLeftIcon } from "lucide-react"; //Used for a back button.
import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

//2.Main Component Definition: Defines a functional React component that returns JSX for a phone number input screen
export const PhoneNum = (): JSX.Element => {
  return (
    // Overall Page Layout (div Wrappers)
    <div className="bg-neutral-50 flex flex-row justify-center w-full">
      <div className="bg-neutral-50 w-[390px] h-[844px]">
        <div className="relative h-[844px]">
          {/* Status Bar */}

          {/* Bottom Bar */}
          <div className="absolute w-[390px] h-[34px] top-[810px] left-0">
            <div className="relative w-[149px] h-[5px] top-[21px] left-[120px] bg-lightgray-11 rounded-[10px]" />
          </div>

          {/* Main Content */}
          <Card className="border-none">
            <CardContent className="p-0">
              <div className="absolute w-[344px] h-[100px] top-[122px] left-7">
                <h1 className="absolute w-[342px] top-0 left-0 [font-family:'Roboto_Serif',Helvetica] font-semibold text-lightgray-11 text-3xl tracking-[0] leading-[50px]">
                  Whats your phone
                  <br />
                  number?
                </h1>
              </div>
   {/*Back Button (ArrowLeftIcon)*/}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-[69px] left-6 p-0"
              >
                <ArrowLeftIcon className="h-6 w-6" />
              </Button>

              <p className="absolute w-[342px] top-[235px] left-[30px] [font-family:'Roboto',Helvetica] font-normal text-[#3c3c4399] text-base tracking-[0.25px] leading-5">
                We only use phone numbers to make sure everyone is real.
              </p>
              
   {/*Phone Number Input + Country Code Select*/}
              <div className="absolute w-[331px] h-[47px] top-[332px] left-7 flex gap-4">
                <Select defaultValue="+1">
                  <SelectTrigger className="w-[70px] border-t-0 border-x-0 rounded-none">
                    <SelectValue placeholder="+1" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+1">+1</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  className="flex-1 border-t-0 border-x-0 rounded-none px-0"
                  type="tel"
                  placeholder="Phone number"
                />
              </div>

              <Button className="absolute w-[105px] h-[49px] top-[489px] left-[267px] bg-[#2D3648] text-white rounded-full">
                <img
                  src="https://c.animaapp.com/eks0524w/img/enter-key.svg"
                  alt="Enter key"
                  className="w-full h-full"
                />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
