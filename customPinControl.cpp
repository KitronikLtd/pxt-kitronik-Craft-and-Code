#include "pxt.h"


namespace CraftCode {
    //% 
    void setCustomPinHigh() {
        uBit.io.P0.setDigitalValue(1);
    }

    //% 
    void setCustomPinLow() {
        uBit.io.P0.setDigitalValue(0);
    }
}
