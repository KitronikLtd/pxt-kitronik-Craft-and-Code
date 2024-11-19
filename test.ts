// test program for the Craft and Code Blocks. Should exercise all IO on the Craft and Code Board,
// as well as all blocks within the Craft and Code extension.  
// infinite loop
// Martin, if this runs when the extension is added, I am not going to be happy.
basic.forever(function () {
    // if switch contacts have been bridged, perform the following
    if (CraftAndCode.SwitchClosed()) {
        // turn the bulb output off
        CraftAndCode.TurnBulb(CraftAndCode.BULBSTATE.Off)
        // turn the motor output off
        CraftAndCode.TurnMotor(CraftAndCode.MOTORSTATE.Off)
        // set servo to move to 0°
        CraftAndCode.SetServoAngle(0)
    } else {
        // if the switch contacts are not bridged, perform the following:
        // turn bulb output on, by default this is at the highest brightness
        CraftAndCode.TurnBulb(CraftAndCode.BULBSTATE.On)
        // turn motor output on, by default this is at the slowest motor speed
        CraftAndCode.TurnMotor(CraftAndCode.MOTORSTATE.On)
        // set servo to move to 180°
        CraftAndCode.SetServoAngle(180)
    }
    // if the user has touched the touchpad on the Craft and Code board (not on the MicroBit!), do the following
    if (CraftAndCode.CurrentTouchPadState()) {
        // set motor to the slowest speed
        CraftAndCode.SetMotorSpeed(CraftAndCode.MOTORSPEEDSTATE.Slow)
        // set bulb to lowest brightness
        CraftAndCode.SetBulbBrightness(CraftAndCode.BULBBRIGHTNESSSTATE.Dim)
        // turn motor output on - this is only needed once when the brightness is adjusted and the output was previously off
        CraftAndCode.TurnBulb(CraftAndCode.BULBSTATE.On)
        // turn motor output on - this is only needed once when the speed is adjusted and the output was previously off
        CraftAndCode.TurnMotor(CraftAndCode.MOTORSTATE.On)
        // move the servo to 30°
        CraftAndCode.SetServoAngle(30)
        // wait in an infinite loop until the touchpad on the Craft and Code board is touched again
        CraftAndCode.WaitForTouchPad()
        // set the motor speed to a "medium" speed - as the output is already on, the "turn bulb on" block is not needed
        CraftAndCode.SetMotorSpeed(CraftAndCode.MOTORSPEEDSTATE.Medium)
        // set the bulb to the medium brightness - as the output is already on, the "turn motor on" block is not needed
        CraftAndCode.SetBulbBrightness(CraftAndCode.BULBBRIGHTNESSSTATE.Medium)
        // set the servo to move to 60°
        CraftAndCode.SetServoAngle(60)
        // again, wait in an infinite loop until the touchpad is pressed
        CraftAndCode.WaitForTouchPad()
        // set the motor to the maximum possible speed
        CraftAndCode.SetMotorSpeed(CraftAndCode.MOTORSPEEDSTATE.Fast)
        // set the bulb to the highest brightness
        CraftAndCode.SetBulbBrightness(CraftAndCode.BULBBRIGHTNESSSTATE.Bright)
        // move the servo to 90°
        CraftAndCode.SetServoAngle(90)
        // again, wait in an infinite loop for the touchpad to be pressed before returning to the program
        CraftAndCode.WaitForTouchPad()
    }
})
