enyo.kind({
  kind: "enyo.Control",
  name:  "HslLocks.Buttons",
  classes: "buttonWrap",
  layoutKind: "FittableRowsLayout",

  components: [
    {
      kind:  "onyx.RadioGroup",
      components: [
        {
          name:     "lockAll",
          content:  "Lock All",
          classes:  "onyx-affirmative hsltogglebuttons",
          value:    "lockAll",
          onclick:  "emitLockAllClick"
        },
        {
          name:     "lockFront",
          content:  "Lock Front",
          classes:  "onyx-affirmative hsltogglebuttons",
          value:    "lockFront",
          onclick:  "emitLockFrontClick"
        },
        {
          name:     "lockBack",
          content:  "Lock Back",
          classes:  "onyx-affirmative hsltogglebuttons",
          value:    "lockBack",
          onclick:  "emitLockBackClick"
        },
        {
          name:     "unlockAll",
          content:  "Unlock All",
          classes:  "onyx-affirmative hsltogglebuttons",
          value:    "unlockAll",
          onclick:  "emitUnlockAllClick"
        },
        {
          name:     "unlockFront",
          content:  "Unlock Front",
          classes:  "onyx-affirmative hsltogglebuttons",
          value:    "unlockFront",
          onclick:  "emitUnlockFrontClick"
        },
        {
          name:     "unlockBack",
          content:  "Unlock Back",
          classes:  "onyx-affirmative hsltogglebuttons",
          value:    "unlockBack",
          onclick:  "emitUnlockBackClick"
        },
        {
          name: "quickToggle",
          content: "Open for 30 seconds",
          classes: "hsltogglebuttons",
          value: "toggle",
          onclick: "emitToggleClick"
        }
      ]
    }

  ],

  emitLockAllClick: function() {
    this.$.lockAll.tap();
    this.emitClick();

    /*
    this.$.lockAll.setDisabled(true);
    this.$.lockFront.setDisabled(true);
    this.$.lockBack.setDisabled(true);

    this.$.unlockAll.setDisabled(false);
    this.$.unlockBack.setDisabled(false);
    this.$.lockFront.setDisabled(false);
    */

    this.value = "lock";
  },

  emitLockFrontClick: function() {
    this.$.lockFront.tap();
    this.emitClick();
    //this.$.lockFront.setDisabled(true);
    //this.$.unlockFront.setDisabled(false);
    this.value = "lock-front";
  },

  emitLockBackClick: function() {
    this.$.lockBack.tap();
    this.emitClick();
    //this.$.lockBack.setDisabled(true);
    //this.$.unlockBack.setDisabled(false);
    this.value = "lock-back";
  },

  emitUnlockAllClick: function() {
    this.$.unlockAll.tap();
    this.emitClick();

    /*
    this.$.unlockAll.setDisabled(true);
    this.$.unlockFront.setDisabled(true);
    this.$.unlockBack.setDisabled(true);

    this.$.lockAll.setDisabled(false);
    this.$.lockFront.setDisabled(false);
    this.$.lockBack.setDisabled(false);
    */

    this.value = "unlock";
  },

  emitUnlockFrontClick: function() {
    this.$.unlockFront.tap();
    this.emitClick();
    //this.$.unlockFront.setDisabled(true);
    //this.$.lockFront.setDisabled(false);
    this.value = "unlock-front";
  },

  emitUnlockBackClick: function() {
    this.$.unlockBack.tap();
    this.emitClick();
    //this.$.unlockBack.setDisabled(true);
    //this.$.lockBack.setDisabled(false);
    this.value = "unlock-back";
  },

  /*
   * Toggle button clicked
   */
  emitToggleClick: function() {
    this.$.quickToggle.tap();
    this.value = "toggle";
    this.emitClick();
  },

  emitClick: function() {
    this.bubble("click");
  }

});
