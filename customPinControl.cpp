
#include "pxt.h"
#include "MicroBit.h"

namespace Craft_Code {
    /**
     * Set pin P0 to high without flickering.
     */
    void setCustomPinHigh() {
        uBit.io.P0.setDigitalValue(1); // Set pin P0 high
        fiber_sleep(1); // Sleep for 1 milliseconds to stabilize the pin state
    }

    /**
     * Set pin P0 to low without flickering.
     */
    void setCustomPinLow() {
        uBit.io.P0.setDigitalValue(0); // Set pin P0 low
        fiber_sleep(1); // Sleep for 1 milliseconds to stabilize the pin state
    }
}
