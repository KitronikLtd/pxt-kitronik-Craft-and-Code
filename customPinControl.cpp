#include "pxt.h"
#include "MicroBit.h"

namespace Craft_Code {
    /**
     * Set pin P0 to high without flickering.
     */
    //%
    void CCPinHigh() {
        uBit.io.P0.setDigitalValue(1);
    }

    /**
     * Set pin P0 to low without flickering.
     */
    //%
    void CCPinLow() {
        uBit.io.P0.setDigitalValue(0);
    }
}
