#include "MicroBit.h"

MicroBit uBit;

void setCustomPinHigh() {
    uBit.io.P0.setDigitalValue(1); // Set pin P0 high
}

void setCustomPinLow() {
    uBit.io.P0.setDigitalValue(0); // Set pin P0 low
}
