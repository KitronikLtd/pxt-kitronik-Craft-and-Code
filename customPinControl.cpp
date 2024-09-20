#include "pxt.h"
#include "MicroBit.h"

namespace Craft_Code {

    /**
     * Set pin P0 to high without flickering.
     */
    void setCustomPinHigh() {
        uBit.io.P0.setDigitalValue(1); // Set pin P0 high
    }

    /**
     * Set pin P0 to low without flickering.
     */
    void setCustomPinLow() {
        uBit.io.P0.setDigitalValue(0); // Set pin P0 low
    }

    /**
     * Custom function to read analog value from pin P0 after a 1 ms pause.
     */
    int readAnalogPinP0WithPause() {
        fiber_sleep(1); // Pause for 1 millisecond (equivalent to basic.pause(1))
        int currentReading = uBit.io.P0.getAnalogValue(); // Read analog value from P0
        return currentReading;
    }
}
