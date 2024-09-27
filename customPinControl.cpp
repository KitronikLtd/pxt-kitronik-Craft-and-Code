#include "pxt.h"
using namespace pxt;

namespace Craft_Code {
    /**
     * Set pin P0 to high without flickering.
     */
    //% 
    void setCustomPinHigh() {
        uBit.io.P0.setDigitalValue(1);
    }

    /**
     * Set pin P0 to low without flickering.
     */
    //% 
    void setCustomPinLow() {
        uBit.io.P0.setDigitalValue(0);
    }
}
