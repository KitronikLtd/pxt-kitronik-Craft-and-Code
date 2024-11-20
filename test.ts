// test program for the Craft and Code Blocks. Should exercise all IO on the Craft and Code Board,
// as well as all blocks within the Craft and Code extension.  
// infinite loop
// uncommented, will see if PXT compiles this
basic.forever(function () {
    // if switch contacts have been bridged, perform the following
    if (kitronikCraftAndCode.switchClosed()) {
        // turn the bulb output off
        kitronikCraftAndCode.turnBulb(kitronikCraftAndCode.BulbState.Off)
        // turn the motor output off
        kitronikCraftAndCode.turnMotor(kitronikCraftAndCode.MotorState.Off)
        // set servo to move to 0°
        kitronikCraftAndCode.setServoAngle(0)
    } else {
        // if the switch contacts are not bridged, perform the following:
        // turn bulb output on, by default this is at the highest brightness
        kitronikCraftAndCode.turnBulb(kitronikCraftAndCode.BulbState.On)
        // turn motor output on, by default this is at the slowest motor speed
        kitronikCraftAndCode.turnMotor(kitronikCraftAndCode.MotorState.On)
        // set servo to move to 180°
        kitronikCraftAndCode.setServoAngle(180)
    }
    // if the user has touched the touchpad on the Craft and Code board (not on the MicroBit!), do the following
    if (kitronikCraftAndCode.currentTouchPadState()) {
        // set motor to the slowest speed
        kitronikCraftAndCode.setMotorSpeed(kitronikCraftAndCode.MotorSpeedState.Slow)
        // set bulb to lowest brightness
        kitronikCraftAndCode.setBulbBrightness(kitronikCraftAndCode.BulbBrightnessState.Dim)
        // turn motor output on - this is only needed once when the brightness is adjusted and the output was previously off
        kitronikCraftAndCode.turnBulb(kitronikCraftAndCode.BulbState.On)
        // turn motor output on - this is only needed once when the speed is adjusted and the output was previously off
        kitronikCraftAndCode.turnMotor(kitronikCraftAndCode.MotorState.On)
        // move the servo to 30°
        kitronikCraftAndCode.setServoAngle(30)
        // wait in an infinite loop until the touchpad on the Craft and Code board is touched again
        kitronikCraftAndCode.waitForTouchPad()
        // set the motor speed to a "medium" speed - as the output is already on, the "turn bulb on" block is not needed
        kitronikCraftAndCode.setMotorSpeed(kitronikCraftAndCode.MotorSpeedState.Medium)
        // set the bulb to the medium brightness - as the output is already on, the "turn motor on" block is not needed
        kitronikCraftAndCode.setBulbBrightness(kitronikCraftAndCode.BulbBrightnessState.Medium)
        // set the servo to move to 60°
        kitronikCraftAndCode.setServoAngle(60)
        // again, wait in an infinite loop until the touchpad is pressed
        kitronikCraftAndCode.waitForTouchPad()
        // set the motor to the maximum possible speed
        kitronikCraftAndCode.setMotorSpeed(kitronikCraftAndCode.MotorSpeedState.Fast)
        // set the bulb to the highest brightness
        kitronikCraftAndCode.setBulbBrightness(kitronikCraftAndCode.BulbBrightnessState.Bright)
        // move the servo to 90°
        kitronikCraftAndCode.setServoAngle(90)
        // again, wait in an infinite loop for the touchpad to be pressed before returning to the program
        kitronikCraftAndCode.waitForTouchPad()
    }
})
