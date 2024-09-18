// shims.d.ts
// This file exposes the C++ functions to TypeScript for use in MakeCode.
// It declares the setCustomPinHigh() and setCustomPinLow() functions so they can be called from your TypeScript code.

//% shim=setCustomPinHigh
declare function setCustomPinHigh(): void;

//% shim=setCustomPinLow
declare function setCustomPinLow(): void;
