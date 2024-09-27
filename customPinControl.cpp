#include "pxt.h"
#include "MicroBit.h"

namespace Craft_Code {
    //% shim=Craft_Code::setCustomPinHigh
    void setCustomPinHigh() {
        uBit.io.P0.setDigitalValue(1);
    }

    //% shim=Craft_Code::setCustomPinLow
    void setCustomPinLow() {
        uBit.io.P0.setDigitalValue(0);
    }
}
