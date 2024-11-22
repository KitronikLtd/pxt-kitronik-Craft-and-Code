
/*
CustomPinControl.ts - a shim for turning IO pin 0 high and low without invoking the simulator.

Normally, the simulator tries its very best to show exactly what the IO lines are doing. 
Great if you want to see your bulb and motor turn on - less so when you are toggling pins very quickly for a bitbashed capactive Sensor
Our intial version used a separate C++ function to avoid the simulator, this version still uses JavaScript - however - it's checking the serial number of the device with "control.devicename"
This is equally a hack, but if the serial number is *not* "sim-", then the pins are toggled. If the serial number *is* "-sim", we don't toggle the pins.
"sim-" should only ever be the serial number of the simulator, therefore the pins should only not be toggled when we're in the simulator.
This might trip us up at some point, but appears to work so far
*/
namespace kitronikCraftAndCode {

    export function setCustomPinHigh(): void {      //retaining the setCustomPinHigh function, in case a better solution comes along 
        if(control.deviceName() != "sim-")          //if the device name (serial number) is anything other than "sim-"...
            pins.digitalWritePin(DigitalPin.P0, 1)  //...then set P0 high.
        return;                                     //otherwise - do nothing, because we're in the simulator. 
    }

    export function setCustomPinLow(): void {       //retaining the setCustomPinHigh function, in case a better solution comes along
        if (control.deviceName() != "sim-")         //if the device name (serial number) is anything other than "sim-"...
            pins.digitalWritePin(DigitalPin.P0, 0)  //...then set P0 high.
        return;                                     //otherwise - do nothing, because we're in the simulator.
    }
}
