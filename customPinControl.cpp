/*
C++ functions that do two things - set P0 high and set P0 low when called. 
The PXT simulator cannot simulate C++ at the moment, so we can use this as a hacky workaround to avoid the IO pins flickering in the simulator.
Yes, this entire function is for aesthetic reasons!
*/
#include "pxt.h"
#include "MicroBit.h"

namespace CraftAndCode {
    //the comment below isn't a comment! The percent sign is used to bridge the javascript function to the C++ function - don't touch!
    //%
    void SetCustomPinHigh(){
        uBit.io.pin[0].setDigitalValue(1); // Set pin P0 high using C++
        return;
    }
    //the comment below isn't a comment! The percent sign is used to bridge the javascript function to the C++ function - don't touch!
    //%
    void SetCustomPinLow(){
        uBit.io.pin[0].setDigitalValue(0); // Set pin P0 low using C++
        return; 
    }
};
