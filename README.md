## pxt-kitronik-Craft-and-Code
Custom blocks for the Kitronik Craft and Code board (www.kitronik.co.uk/56120)
These blocks are divided into two categories - The main Craft and Code blocks, and the advanced "more" blocks.

The main Craft and Code blocks include basic functionality to interact with an attached Bulb, Motor, Servo or Switch.
The "more" blocks include blocks to interact with the touchpad, and specific settings for the Motor and Bulb.

## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open **[https://makecode.microbit.org/](https://makecode.microbit.org/)**
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **[https://github.com/kitronikltd/craft_code](https://github.com/KitronikLtd/pxt-kitronik-Craft-and-Code)** and import

# Main Craft and Code Blocks

The following blocks are available under the standard Craft and Code tab. 

### turn bulb [on/off]

Turns the output labelled as "bulb" on or off.
The state of the output can be toggled by a drop down menu. 
A status LED on the bulb icon will also illuminate, to verify the state of the output. 
By default, the bulb is set to the brightest possible state.

In this example, the bulb output on the Craft and Code Board is turned on for a second, before turning off:
```blocks
Craft_Code.TurnBulb(Craft_Code.BulbState.On)
basic.pause(1000)
Craft_Code.TurnBulb(Craft_Code.BulbState.Off)
```
### turn motor [on/off]

Turns the output labelled as "motor" on or off.
The state of the output can be toggled by a drop down menu. 
A status LED on the motor icon will also illuminate, to verify the state of the output. 
By default, the motor is set to the slowest possible state.

In this example, the motor output on the Craft and Code Board is turned on for a second, before turning off:
```blocks
Craft_Code.TurnMotor(Craft_Code.MotorState.On)
basic.pause(1000)
Craft_Code.TurnMotor(Craft_Code.MotorState.Off)
```

### set servo angle [value] degrees

When active, the servo motor will move to the angle specified. 
This block is a wrapper to the standard Makecode "set servo [Pin] angle to [value]°"
In this case, the pin is predefined to pin P2. 

In the below example, a servo connected to the servo connection on the craft and code board moves to
the 0° position, and then to 180° five seconds later:
```blocks
Craft_Code.setServoAngle(0)
basic.pause(5000)
Craft_Code.setServoAngle(180)
```

### switch closed

Returns a boolean value, dependant on the status of the switch pads. 
If the switch pads have been bridged (I.E, the pin is held high), the value is returned as 1 (true).
Otherwise, the value is returned as a 0 (false). 

In the below example, when the switch contacts are bridged [closed] , the light output turns on.
When the switch pads are left open, the light turns off:
```blocks
basic.forever(function () {
    if (Craft_Code.SwitchClosed()) {
        Craft_Code.TurnBulb(Craft_Code.bulbState.On)
    } else {
        Craft_Code.TurnBulb(Craft_Code.bulbState.Off)
    }
})
```
# Advanced "more" Blocks

The following blocks are present as more advanced blocks for the user. 

### set bulb brightness [dim/medium/bright]

Sets the output of the bulb in accordance to one of three options. 
The options can be selected by a drop down list, which are "Dim", "Medium" and "Bright". 
If the bulb output is currently off, a "turn bulb on" block is needed after the "set brightness" block to turn the output on.
If the output is already on, the brightness changes immediately, without the user needing to place another "turn bulb on" block.

In this example, the bulb brightness increases as the touchpad is pressed, using the "wait for touchpad" block:
```blocks
basic.forever(function () {
    Craft_Code.TurnBulb(Craft_Code.bulbState.Off)
    Craft_Code.waitForTouchPad()
    Craft_Code.SetBulbBrightness(Craft_Code.BulbBrightnessState.Dim)
    Craft_Code.TurnBulb(Craft_Code.bulbState.On)
    Craft_Code.waitForTouchPad()
    Craft_Code.SetBulbBrightness(Craft_Code.BulbBrightnessState.Medium)
    Craft_Code.waitForTouchPad()
    Craft_Code.SetBulbBrightness(Craft_Code.BulbBrightnessState.Bright)
    Craft_Code.waitForTouchPad()
})
```
Note that the "turn bulb on" is only called once, after the brightness has been initially set by the "set bulb brightness" block.

### set motor speed [slow/medium/fast]

Sets the speed of the motor in accordance to one of three options. 
The speed can be selected by a drop down list, which are "Slow", "Medium" and "Fast". 
If the motor output is currently off, a "turn motor on" block is needed after the "set speed" block to turn the output on.
If the output is already on, the speed changes immediately, without the user needing to place another "Turn Motor On" block straight after

In the following example, the speed of the motor increases as the touchpad is pressed, again using the "wait for touchpad" block:
```blocks
basic.forever(function () {
    Craft_Code.TurnMotor(Craft_Code.MotorState.Off)
    Craft_Code.waitForTouchPad()
    Craft_Code.SetMotorSpeed(Craft_Code.MotorSpeedState.Slow)
    Craft_Code.TurnMotor(Craft_Code.MotorState.On)
    Craft_Code.waitForTouchPad()
    Craft_Code.SetMotorSpeed(Craft_Code.MotorSpeedState.Medium)
    Craft_Code.waitForTouchPad()
    Craft_Code.SetMotorSpeed(Craft_Code.MotorSpeedState.Fast)
    Craft_Code.waitForTouchPad()
})
```

## Touchpad - touchpad pressed, and wait for touchpad
### touchpad pressed
There are two blocks related to the TouchPad which is a pad present on the Craft and Code board.
Note that this is **not** the Touch sensor on the V2 micro:bit, this is a separate pad present on the Craft and Code board.
This works with both the V1 and V2 Micro:bit, without any user changes to the code. 

The first block is "TouchPad Pressed", which will return the state of the Touchpad as a boolean variable. 
If the touchpad has been pressed by a human finger, then the value of "Touchpad Pressed" is returned as 1.
Otherwise, the value is returned as a 0. For further information, please see the comments within "Craft_code.ts".

In the below example, when the touchpad is pressed, the light output turns - but only for as long as the touchpad is pressed.
When the touchpad is not pressed, the light turns off:
```blocks
basic.forever(function () {
    if (Craft_Code.getTouchPadState()) {
        Craft_Code.TurnBulb(Craft_Code.bulbState.On)
    } else {
        Craft_Code.TurnBulb(Craft_Code.bulbState.Off)
    }
})
```

### wait for touchpad
The second block is "Wait For Touchpad". 
This halts the current operation of the PXT program in an infinite loop, until a touchpad event is detected.

In the below example, the bulb output is off, until a touchpad event is detected. 
After this, the bulb output remains on until another touchpad event is detected. 

```blocks
basic.forever(function () {
    Craft_Code.TurnBulb(Craft_Code.bulbState.Off)
    Craft_Code.waitForTouchPad()
    Craft_Code.TurnBulb(Craft_Code.bulbState.On)
    Craft_Code.waitForTouchPad()
})
```

## License

MIT

## Supported targets

* for PXT/microbit
