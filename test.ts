// test program for the Craft and Code Blocks. Should exercise all IO on the Craft and Code Board,
// as well as all blocks within the Craft and Code extension.  
// infinite loop
basic.forever(function () {
    // if switch contacts have been bridged, perform the following
    if (Craft_Code.SwitchClosed()) {
        // turn the bulb output off
        Craft_Code.TurnBulb(Craft_Code.bulbState.Off)
        // turn the motor output off
        Craft_Code.TurnMotor(Craft_Code.MotorState.Off)
        // set servo to move to 0°
        Craft_Code.setServoAngle(0)
    } else {
        // if the switch contacts are not bridged, perform the following:
        // turn bulb output on, by default this is at the highest brightness
        Craft_Code.TurnBulb(Craft_Code.bulbState.On)
        // turn motor output on, by default this is at the slowest motor speed
        Craft_Code.TurnMotor(Craft_Code.MotorState.On)
        // set servo to move to 180°
        Craft_Code.setServoAngle(180)
    }
    // if the user has touched the touchpad on the Craft and Code board (not on the MicroBit!), do the following
    if (Craft_Code.getTouchPadState()) {
        // set motor to the slowest speed
        Craft_Code.SetMotorSpeed(Craft_Code.MotorSpeedState.Slow)
        // set bulb to lowest brightness
        Craft_Code.SetBulbBrightness(Craft_Code.BulbBrightnessState.Dim)
        // turn motor output on - this is only needed once when the brightness is adjusted and the output was previously off
        Craft_Code.TurnBulb(Craft_Code.bulbState.On)
        // turn motor output on - this is only needed once when the speed is adjusted and the output was previously off
        Craft_Code.TurnMotor(Craft_Code.MotorState.On)
        // move the servo to 30°
        Craft_Code.setServoAngle(30)
        // wait in an infinite loop until the touchpad on the Craft and Code board is touched again
        Craft_Code.waitForTouchPad()
        // set the motor speed to a "medium" speed - as the output is already on, the "turn bulb on" block is not needed
        Craft_Code.SetMotorSpeed(Craft_Code.MotorSpeedState.Medium)
        // set the bulb to the medium brightness - as the output is already on, the "turn motor on" block is not needed
        Craft_Code.SetBulbBrightness(Craft_Code.BulbBrightnessState.Medium)
        // set the servo to move to 60°
        Craft_Code.setServoAngle(60)
        // again, wait in an infinite loop until the touchpad is pressed
        Craft_Code.waitForTouchPad()
        // set the motor to the maximum possible speed
        Craft_Code.SetMotorSpeed(Craft_Code.MotorSpeedState.Fast)
        // set the bulb to the highest brightness
        Craft_Code.SetBulbBrightness(Craft_Code.BulbBrightnessState.Bright)
        // move the servo to 90°
        Craft_Code.setServoAngle(90)
        // again, wait in an infinite loop for the touchpad to be pressed before returning to the program
        Craft_Code.waitForTouchPad()
    }
})
