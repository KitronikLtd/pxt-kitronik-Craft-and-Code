/**
 * Blocks for Driving the kitronik Craft and Code Board
 */
//% weight=100 color=#770c67 icon="\uf0c3" block="Craft_and_Code"
// subcategory=["More"]
//% group = '["BULB", "MOTOR", "SERVO", "TOUCHPAD"]'

namespace Craft_Code {
    let lastBulbBrightness: number = 100;
    let lastMotorSpeed: number = 900;
    let isBulbOn: boolean = false;
    let isMotorOn: boolean = false; // Track whether the motor is on or off
    let pwmValue = 0;
    /**
     * Turn Bulb ON and OFF
     */
    export enum BulbState {
        //% block="ON"
        On,
        //% block="OFF"
        Off
    }

    /**
     * Turn motor ON and OFF
     */
    export enum MotorState {
        //% block="ON"
        On,
        //% block="OFF"
        Off
    }

    /**
     * Set light brightness
     */
    export enum BulbBrightnessState {
        //% block="Dim"
        Dim = 33,
        //% block="Medium"
        Medium = 66,
        //% block="Bright"
        Bright = 100
    }

    /**
     * Set motor speed
     */
    export enum MotorSpeedState {
        //% block="Slow"
        Slow = 350,
        //% block="Medium"
        Medium = 600,
        //% block="Fast"
        Fast = 900
    }

    //////////////////
    ///Bulb-ON-OFF///
    ////////////////

    /**
     * Turns on BULB  
     */
    //% blockId=Craft_and_Code_TurnBulb
    //% block="Turn Bulb |%Bulbstate||"
    //% weight=100 blockGap=8
    //% color=#770c67
    //% group="BULB"
    //% x.min=0 x.max=1
    //% x.fieldOptions.precision=1
    export function TurnBulb(Bulbstate: BulbState): void {
        isBulbOn = Bulbstate === BulbState.On;
        if (isBulbOn) {
            if (lastBulbBrightness == BulbBrightnessState.Bright) {
                // Use digital write for 100%
                pins.digitalWritePin(DigitalPin.P8, 1);
            }
            else {
                // Use stored brightness value
                pwmValue = (lastBulbBrightness / 100) * 1023;
                pwmValue = Math.clamp(0, 1023, pwmValue);
                pins.analogWritePin(AnalogPin.P8, pwmValue);
            }
        }
        else {

            pins.analogWritePin(AnalogPin.P8, 0);

        }

    }
    /////////////////////////
    //set Bulb brightness////
    ////////////////////////

    /**
     *  Set Bulb brightness
     */
    //% subcategory="More"
    //% blockId=Craft_and_Code_SetBulbBrightness
    //% block="Set Bulb Brightness |%brightnessstate|"
    //% weight=100 blockGap=8
    //% color=#770c67
    //% group="BULB"

    export function SetBulbBrightness(brightnessstate: BulbBrightnessState): void {
        // Always store the last value, but do not calculate or apply it yet
        lastBulbBrightness = brightnessstate as number;  // Store the last set value
        if (isBulbOn) { // Check if the Bulb is on before setting brightness
            pwmValue = (lastBulbBrightness / 100) * 1023;
            pwmValue = Math.clamp(0, 1023, pwmValue);
            pins.analogWritePin(AnalogPin.P8, pwmValue);
        }
    }

    //////////////////
    ///Motor-ON-OFF//
    ////////////////

    /**
     * Turns on Motor
     */
    //% blockId=Craft_and_Code_TurnMotor
    //% block="Turn Motor |%motorstate||"
    //% weight=100 blockGap=8
    //% color=#770c67
    //% group="MOTOR"
    //% y.min=0 y.max=1
    //% y.fieldOptions.precision=1
    export function TurnMotor(motorstate: MotorState): void {
        if (motorstate === MotorState.On && !isMotorOn) {
            isMotorOn = true;
            // Gradually increase the motor speed to last set speed
            let totalDuration = 500; // Total duration in milliseconds to reach desired speed.
            let steps = 100; // Number of steps to full power.
            let increment = lastMotorSpeed / steps; // Speed increment value for each step.
            let pauseDuration = totalDuration / steps; // Time to pause between each increment, must be an integer.

            // Gradually increase the motor speed
            for (let index = 1; index <= steps; index++) {
                let speed = Math.round(increment * index);
                pins.analogWritePin(AnalogPin.P12, speed);
                basic.pause(pauseDuration);
            }

        } else if (motorstate === MotorState.Off && isMotorOn) {
            isMotorOn = false;

            pins.analogWritePin(AnalogPin.P12, 0);
        }

    }


    //////////////////
    //Motor-SPEED///
    ////////////////

    /**
     * Set motor speed
     */
    //% subcategory="More"
    //% blockId=Craft_and_Code_SetMotorSpeed
    //% block="Set Motor Speed |%speedstate|"
    //% weight=100 blockGap=8
    //% color=#770c67
    //% group="Motor"
    export function SetMotorSpeed(speedstate: MotorSpeedState): void {
        // Always store the last value
        let newSpeed = speedstate as number;

        // If the motor is on, then update the speed with smooth transition
        if (isMotorOn) {
            let currentSpeed = lastMotorSpeed;

            // Calculate the difference and steps for smooth transition
            let speedDifference = newSpeed - currentSpeed;
            let totalDuration = 500; // Total duration in milliseconds to reach desired speed.
            let steps = 100; // Number of steps to full power.
            let increment = speedDifference / steps; // Speed increment value for each step.
            let pauseDuration = totalDuration / steps; // Time to pause between each increment, must be an integer.

            // Gradually adjust the motor speed
            for (let index = 1; index <= steps; index++) {
                let speed = Math.round(currentSpeed + (increment * index));
                pins.analogWritePin(AnalogPin.P12, speed);
                basic.pause(pauseDuration);
            }
        }

        // Update the last motor speed
        lastMotorSpeed = newSpeed;
    }
    //////
    ////////
    ////SERVO////
    //////////////

    /**
     * Set Servo Angle
     */
    //% blockId=Craft_and_Code_SetServoAngle
    //% block="Set Servo Angle |%degrees| degrees"
    //% color=#770c67
    //% degrees.min=0 degrees.max=180
    //% degrees.defl=90
    //% degrees.shadow="protractorPicker"
    //% weight=100 blockGap=8
    //% group="SERVO"
    export function setServoAngle(degrees: number) {
        // Check if the degrees are greater than 180
        if (degrees > 180 || degrees < 0) {
            console.error("Error: Angle cannot be more than 180 degrees or less then 0");
            return;
        }

        // If degrees are within the valid range, set the servo angle
        pins.servoWritePin(AnalogPin.P2, degrees);

    }


    //////////////////////
    //Touchpad Functions//
    //////////////////////


    /**
     * Wait for Touchpad
     */
    //% subcategory="More"
    //% block="Wait for Touchpad"
    //% blockId=Craft_and_Code_Wait_for_touchpad
    //% weight=100 blockGap=8
    //% color=#770c67
    //% group="TOUCHPAD"
    export function waitForTouchPad(): void {

        let touchPadState = false; // Initially, the touchpad is not pressed

        // Now, wait for the touchpad to be pressed
        while (!touchPadState) {
            touchPadState = getTouchPadState(); // Reading the touchpad state only here
            basic.pause(1);

        }
        while (touchPadState) {
            touchPadState = getTouchPadState();
            basic.pause(1);
        }
    }
    let lastAverageReading = 0;
    let firstSample = true;
    /**
     * Get TouchPad State
     */
    //% subcategory="More"
    //% block="TouchPad pressed"
    //% blockId=Touchpad pressed
    //% weight=100 blockGap=8
    //% color=#770c67
    //% group="TOUCHPAD"
    export function getTouchPadState(): boolean {
        //"get TouchPadState" is effectively a bitbashed Capacitive Touch Sensor, which can run on a V1 or V2 Micro:bit
        //the method of operation is to take the IO pin high digitally, wait a millisecond, and then read the voltage on the pin
        //if a human finger is present, the decay of the voltage on the pin is much quicker than if no finger is present 
        //the average difference between no finger and a finger present is approximately a 5% increase in the readings.

        //IMPORTANT ENGINEERS NOTE:
        //As the sensor is  capacitive, when a lead is connected to the touchpad (P0), an equal length lead needs to be present on the Board
        //During normal operation, a lead and foil pad would be added to the touchpad, and leads from the bulb pads to the bulb will be present - giving an equal ground return path
        //However, if the bulb and leads are removed, and the lead to the foil pad are kept, there isn't a long enough return path - meaning the touch will not work effectively
        //Ensuring that there is at least a peripheral or the USB lead connected will provide enough surface area for the ground return path. Trust me it works!

        let currentReading = 0;
        let samplesTotal = 0;
        let sampleCount = 0;
        let startTime_1 = input.runningTime();
        let isTouched = false;
        //We take 400 samples in 40ms, and take an average of the reading - this is to average out mains hum at 50/60hz
        while (input.runningTime() - startTime_1 < 40) {
            setCustomPinHigh(); //SetCustomPinHigh and setCustomPinLow call a C function (described in customPinControl.ts and customPinControl.cpp)
            control.waitMicros(100) // wait 100 MicroSeconds to read the data halfway through the curve  
            currentReading = pins.analogReadPin(AnalogPin.P0) //read the voltage on the pin - this should be at the midpoint of the decay curve due to the previous 1ms delay
            samplesTotal += currentReading // Add current reading to reading total, so we can average it later
            sampleCount++ // Increment the number of samples we have captured
        }

        //force the pin low, to drain the rest of the voltage stored on the pin 
        setCustomPinLow();


        let currentAverageReading = samplesTotal / sampleCount; // Calculate the average of the samples taken within 40ms

        if (firstSample) {
            lastAverageReading = currentAverageReading;
            firstSample = false;  // Reset the firstSample flag after first use
        } else {
            //the average is stored as "lastAverageReading", and then compared against the latest reading
            //if the current average is larger than the last reading by at least 5% then set the isTouched value to true, else it's false"
            isTouched = currentAverageReading > lastAverageReading * 1.05;
            //store the latest average as the next previous reading
            lastAverageReading = currentAverageReading;
        }
        //return the status of the touchpad as a bool
        return isTouched;

    }


    //////////////////
    ////SWITCH///////
    ////////////////
    /**
     * Switched state
     */
    //% blockId=Craft_and_Code_SwitchState
    //% block="SwitchClosed"
    //% weight=100 blockGap=8
    //% color=#770c67
    //% group="SWITCH"
    export function SwitchClosed(): boolean {
        //switch is connected to Pin P1
        return pins.digitalReadPin(DigitalPin.P1) == 1;
    }

}

