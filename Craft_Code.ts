/**
 * Blocks for Driving the kitronik Craft and Code Board
 */
//% weight=100 color=#770c67 icon="\uf0c3" block="Craft and Code"
// subcategory=["More"]
//% group = '["Bulb", "Motor", "Servo", "Touchpad"]'

namespace kitronikCraftAndCode {
    let lastBulbBrightness: number = 100;
    let lastMotorSpeed: number = 350; //initial speed of the motor - currently set to 350 = "slow"
    let isBulbOn: boolean = false;
    let isMotorOn: boolean = false; // Track whether the motor is on or off
    let pwmValue = 0;
    /**
     * Turn Bulb ON and OFF
     */
    export enum BulbState {
        //% block="on"
        On,
        //% block="off"
        Off
    }

    /**
     * Turn motor ON and OFF
     */
    export enum MotorState {
        //% block="on"
        On,
        //% block="off"
        Off
    }

    /**
     * Set light brightness
     */
    export enum BulbBrightnessState {
        //% block="dim"
        Dim = 33,
        //% block="medium"
        Medium = 66,
        //% block="bright"
        Bright = 100
    }

    /**
     * Set motor speed
     */
    export enum MotorSpeedState {
        //% block="slow"
        Slow = 350,
        //% block="medium"
        Medium = 600,
        //% block="fast"
        Fast = 900
    }

    //////////////////
    ///Bulb-ON-OFF///
    ////////////////

    /**
     * turn bulb [bulbstate]: Turns the craft and code bulb output on or off, as defined by a drop down menu
     * @param bulbstate : on - turns the bulb output on. off - turns the bulb output off.
     */
    //% blockId=craft_and_code_turnBulb
    //% block="turn bulb |%bulbstate||"
    //% weight=100 blockGap=8
    //% color=#770c67
    //% group="Bulb"
    //% x.min=0 x.max=1
    //% x.fieldOptions.precision=1
    export function turnBulb(bulbstate: BulbState): void {
        isBulbOn = bulbstate === BulbState.On;
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
     * Set Bulb brightness [brightnessstate]: changes the brightness of the attached bulb to three possible states, defined by a drop down menu.
     * @param brightnessstate : "dim", the lowest possible brightness for the bulb. "medium", the midpoint between the lowest and highest brightness. "bright", the brightest possible setting for the bulb. 
     */
    //% subcategory="more"
    //% blockId=craft_and_code_setBulbBrightness
    //% block="set bulb brightness |%brightnessstate|"
    //% weight=100 blockGap=8
    //% color=#770c67
    //% group="Bulb"

    export function setBulbBrightness(brightnessstate: BulbBrightnessState): void {
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
     * turn motor [MotorState]: Turns the craft and code motor output on or off, as defined by a drop down menu.
     * @param MotorState : on - turns the motor output on. off - turns the motor output off. 
     */
    //% blockId=craft_and_code_turnMotor
    //% block="turn motor |%motorstate||"
    //% weight=100 blockGap=8
    //% color=#770c67
    //% group="Motor"
    //% y.min=0 y.max=1
    //% y.fieldOptions.precision=1
    export function turnMotor(motorstate: MotorState): void {
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
     * Set motor speed [speedstate]:
     * Changes the speed of a DC motor connected to the craft and code motor pads to one of three possible states, defined by a drop down menu.
     * @param speedstate : "slow", the slowest possible speed for the attached motor to run at. "medium", the midpoint between the slowest and fastest the attached motor can run. "fast", the fastest possible speed for the attached motor. 
     */
    //% subcategory="more"
    //% blockId=craft_and_code_setMotorSpeed
    //% block="set motor speed |%speedstate|"
    //% weight=100 blockGap=8
    //% color=#770c67
    //% group="Motor"
    export function setMotorSpeed(speedstate: MotorSpeedState): void {
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
     * set servo [degree] degrees: Moves an attached servo motor connected to the craft and code board on the servo connector to the requested angle, defined by tbe parameter "degrees".
     * @param degrees : how many degrees the attached servo motor needs to turn, for example, 90° 
     */
    //% blockId=craft_and_code_setServoAngle
    //% block="set servo angle |%degrees| degrees"
    //% color=#770c67
    //% degrees.min=0 degrees.max=180
    //% degrees.defl=90
    //% degrees.shadow="protractorPicker"
    //% weight=100 blockGap=8
    //% group="Servo"
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
     * wait for touchPad:
     * The program will wait in an infinite loop, until there is a noted state change on the craft and code boards touchpad.
     * I.E, the craft and code touchpad is pressed by a finger.
     */
    //% subcategory="more"
    //% block="wait for touchpad"
    //% blockId=craft_and_code_wait_for_touchpad
    //% weight=100 blockGap=8
    //% color=#770c67
    //% group="Touchpad"
    export function waitForTouchPad(): void {

        let touchPadState = false; // Initially, the touchpad is not pressed

        // Now, wait for the touchpad to be pressed
        while (!touchPadState) {
            touchPadState = currentTouchPadState(); // Reading the touchpad state only here
            basic.pause(1);

        }
        while (touchPadState) {
            touchPadState = currentTouchPadState();
            basic.pause(1);
        }
    }
    let lastAverageReading = 0;
    let firstSample = true;
    /**
     * touchpad pressed: 
     * Returns the state of the craft and code touchpad as a boolean (1 or 0) value.
     * When the craft and code touchpad is pressed by a finger, a boolean 1 is returned. 
     * When the craft and code touchpad is not pressed, a boolean 0 is returned.
     */
    //% subcategory="more"
    //% block="touchpad pressed"
    //% blockId=craft_and_code_touchpad_pressed
    //% weight=100 blockGap=8
    //% color=#770c67
    //% group="Touchpad"
    export function currentTouchPadState(): boolean {
        //"Current TouchPadState" is effectively a bitbashed Capacitive Touch Sensor, which can run on a V1 or V2 Micro:bit
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
            setCustomPinHigh(); //SetCustomPinHigh and SetCustomPinLow call a separate function that does not invoke the simulator (described in customPinControl.ts)
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
     * switch closed:
     * Returns the state of the craft and code switch pads as a boolean (1 or 0) value.
     * When a switch connected to the craft and code switch pads is closed, a boolean 1 is returned. 
     * When a switch connected to the craft and code switch pads is open, a boolean 0 is returned.
     */
    //% blockId=craft_and_code_switchstate
    //% block="switch closed"
    //% weight=100 blockGap=8
    //% color=#770c67
    //% group="Switch"
    export function switchClosed(): boolean {
        //switch is connected to Pin P1
        return pins.digitalReadPin(DigitalPin.P1) == 1;
    }

}
