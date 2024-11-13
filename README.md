## pxt-kitronik-Craft-and-Code
Custom blocks for the Kitronik Craft and Code board (www.kitronik.co.uk/56120)
These blocks are divided into two categories - The main Craft and Code blocks, and "more" blocks.
The main Craft and Code blocks include basic functionality for the Bulb, Motor, Servo and Switch.
The "more" blocks include the touchpad, and setting values to the Motor and Bulb.

## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/kitronikltd/craft_code** and import

# Main Craft and Code Blocks

The following blocks are available under the standard Craft and Code tab. 

### Turn Bulb [ON/OFF]

Turns the output labelled as "bulb" on or off.
The state of the output can be toggled by a drop down menu. 
A status LED on the bulb icon will also illuminate, to verify the state of the output. 
By default, the bulb is set to the brightest possible state.


### Turn Motor [ON/OFF]

Turns the output labelled as "motor" on or off.
The state of the output can be toggled by a drop down menu. 
A status LED on the motor icon will also illuminate, to verify the state of the output. 
By default, the motor is set to the slowest possible state.

### Set Servo Angle [VALUE] Degrees

When active, the servo motor will move to the angle specified. 
This block is a wrapper to the standard Makecode "set servo [Pin] angle to [value]°"
In this case, the pin is predefined to pin P2. 

### SwitchClosed

Returns a boolean value, dependant on the status of the switch pads. 
If the switch pads have been bridged (I.E, the IO is held high), the value is returned as 1.
Otherwise, the value is returned as a 0. 




# Advanced "More" Blocks

The following blocks are present as more advanced blocks for the user. 

### Set Bulb Brightness [Value]

Sets the output of the bulb in accordance to one of three options. 
The options can be selected by a drop down list, which are "Dim", "Medium" and "Bright". 
When selected, the brightness changes immediately, without the user needing to place another "Turn Bulb On" block straight after.

### Set Motor Speed [Value]

Sets the speed of the motor in accordance to one of three options. 
The speed can be selected by a drop down list, which are "Slow", "Medium" and "Fast". 
When selected, the speed changes immediately, without the user needing to place another "Turn Motor On" block straight after.

### Touchpad - TouchPad Pressed, and Wait For Touchpad

There are two blocks related to the TouchPad. 
The first is "TouchPad Pressed", which will return the state of the Touchpad as a boolean variable. 
If the touchpad has been pressed by a human finger, then the value of "Touchpad Pressed" is returned as 1.
Otherwise, the value is returned as a 0. For further information, please see the comments within "Craft_code.ts".

The second block is "Wait For Touchpad". 
This halts the current operation of the PXT program in an infinite loop, until a touchpad event is detected.

## License

MIT

## Supported targets

* for PXT/microbit
