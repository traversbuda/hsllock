/* Lock button with label */
enyo.kind({
   name: "lockToggle",
   kind: enyo.Control,
   style: "padding: 10px; margin: 10px;",

   published: {
      label: ""
   },

   create: function() {
      this.inherited(arguments);
      this.$.labelSubcomponent.setContent(this.label);
   },

   components:[
      {
         kind: "enyo.Control",
         name: "labelSubcomponent",
         tag: "div",
         style: "width: 50px; height: 50px; float: left; padding-right: 10px",
         content: "default"
      },
      {kind: "onyx.ToggleButton", name: "lockButton", onContent: "Locked", offContent: "Unlocked", onChange: "onLockButtonToggle"}
   ],

   onLockButtonToggle: function(iSender, inEvent) {
      enyo.Signals.send("onLockButtonToggle", this);
      return true;
   },

   getLockButton: function() {
      return this.$.lockButton;
   }
});

