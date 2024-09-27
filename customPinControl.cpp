
#include "pxt.h"
#include "MicroBit.h"

namespace Craft_Code {
    /**
     * Set pin P0 to high without flickering.
     */
    //%
    void setCustomPinHigh() {
        uBit.io.pin[0].setDigitalValue(1); // Set pin P0 high
        
    }

    /**
     * Set pin P0 to low without flickering.
     */
    //%
    void setCustomPinLow() {
        uBit.io.pin[0].setDigitalValue(0); // Set pin P0 low
        
    }
}
