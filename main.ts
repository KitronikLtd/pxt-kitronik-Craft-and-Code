basic.forever(function () {
    Craft_Code.waitForTouchPad()
    Craft_Code.TurnBulb(Craft_Code.BulbState.On)
    Craft_Code.waitForTouchPad()
    Craft_Code.TurnBulb(Craft_Code.BulbState.Off)
})
