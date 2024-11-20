
/*
CustomPinControl.ts - a shim for turning IO pin 0 high and low without invoking the simulator.

Normally, the simulator tries its very best to show exactly what the IO lines are doing. 
Great if you want to see your bulb and motor turn on - less so when you are toggling pins very quickly for a bitbashed capactive Sensor
As such, we have written SetCustomPinHigh and SetCustomPinLow to set P0 high and low using C++ - which the simulator doesn't simulate!
Therefore we can implement our touch sensor without the simulator flickering.

*/
namespace kitronikCraftAndCode {
    //the comment below isn't a comment! The percent sign is used to bridge the javascript function to the C++ function - don't touch!
    //% shim=Craft_Code::setCustomPinHigh
    export function setCustomPinHigh(): void {
        return;
    }
    //the comment below isn't a comment! The percent sign is used to bridge the javascript function to the C++ function - don't touch!
    //% shim=Craft_Code::setCustomPinLow
    export function setCustomPinLow(): void {
        return;
    }
}
