// Simulates the pin control behavior without flickering.

export function setCustomPinHigh(): void {
    pins.digitalWritePin(DigitalPin.P0, 1); // Set pin P0 high
}

export function setCustomPinLow(): void {
    pins.digitalWritePin(DigitalPin.P0, 0); // Set pin P0 low
}
