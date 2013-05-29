/* vim: set foldmethod=indent foldlevel=1: */
enyo.kind({
  name: "HslLocks.Main",
  classes: "enyo-fit",

  components: [
    {
      kind: "FittableRows",
      classes: "enyo-fit",
      components: [
        {
          kind: "lockToggle",
	  label: "Front Door",
          name: "lockToggleFront",
	  div: "margin-left:auto; margin-right:auto;"
        },
        {
          kind: "lockToggle",
	  label: "Back Door",
          name: "lockToggleBack",
	  div: "margin 0 auto; left: 50%;" //I have no idea what I'm doing
        },
        {
          tag: "h1",
          content: "who's in the Space?",
          style: 'text-align: center;'
        },
        {
          kind: "HslLocks.PamelaStatus",
          name: "pamelaStatus"
        },
        {
          name: 'loginButton',
          kind: "onyx.Button",
          content: "Log in",
          onclick: "showPopup"
        }

      ]
    },
    {
      kind: "onyx.Popup", name: "scrim", autoDismiss: false, modal: true, centered: true,
      components: [
        {tag: "h1", content: "Please Wait"}
      ]
    },
    {
      kind: "HslLocks.LoginPopup",
      name: "loginPopup",
      onLoginChanged: "loadLoginData"
    },
    {kind: "Signals", onLockButtonToggle: "lockButtonToggle"}
  ],

  //TODO
  lockButtonToggle: function(iSender, inEvent) {
      if (inEvent.name === "lockToggleFront") {
      	if (inEvent.getLockButton().getValue() === true) {
	  alert("lock the front");
	}	
      	else if (inEvent.getLockButton().getValue() === false) {
	  alert("un lock the front");
	}	
      }
      if (inEvent.name === "lockToggleBack") {
      	if (inEvent.getLockButton().getValue() === true) {
	  alert("lock the back");
	}	
      	else if (inEvent.getLockButton().getValue() === false) {
	  alert("un lock the back");
	}	
      }
  },

  rendered: function() {
    this.inherited(arguments);

    this.loadLoginData();

    this.getCurrentStatus();

    // This refreshes the screen every 5 seconds
    setInterval( enyo.bind(this, this.getCurrentStatus), 5000);
  },


  nextState: function() {
    alert("next state being called, whatever the heck this does...?");
    if(this.state === 0) {
      this.initState();
    }
  },

  loadLoginData: function() {
    // Pull login data from HTML5 localStorage, open the popup if it doesn't
    // exist.
    var loginData = localStorage.getItem("hsllock_loginData");
    if(loginData) {
      loginData              = loginData.split("|");
      this.username          = loginData[0];
      this.password          = loginData[1];
      this.spaceAPIEndpoint  = loginData[2];
    }

    this.statusAjaxEndpoint = new enyo.Ajax({ url: this.spaceAPIEndpoint});
    this.statusAjaxEndpoint.response(this, enyo.bind(this, function(inSender, inResponse) {
      this.url = inResponse.apis.oac.url;
      this.spaceAPIData = inResponse;
      this.$.pamelaStatus.setUrl( this.spaceAPIData.apis.pamela.url );

      this.statusRetrieved(inSender, inResponse);
    }));

    this.statusAjaxEndpoint.go();
  },

  getCurrentStatus: function() {
    // FIXME: Move this to create somehow
    this.statusAjaxEndpoint = new enyo.Ajax({ url: this.spaceAPIEndpoint});

    // FIXME BUG: This is cleared after every successful get
    this.statusAjaxEndpoint.response(this, "statusRetrieved");

    this.statusAjaxEndpoint.go();
  },

  statusRetrieved: function(inRequest, inResponse) {
    console.log("got new status.");

    var lockStatus = inResponse.open ? "0" : "1";

    if(lockStatus.length > 0) {
      this.currentStatus = lockStatus;
    }

    this.$.scrim.hide();
  },

  lockGroupClick: function(inSender, e) {
      this.sendServerCommand();
  },

  sendServerCommand: function() {
    this.$.scrim.show();
    this.currentStatus = this.$.lockGroup.value;
    this.lockAjaxEndpoint = new enyo.Ajax({url: this.url});
    this.lockAjaxEndpoint.go({user: this.username, pass: this.password, cmd: this.$.lockGroup.value});
    this.lockAjaxEndpoint.handleAs = "text";
  },

  showPopup: function() {
    this.$.loginPopup.show();
  },

  validateData: function(url, username, password, callback) {
    var apiAjax = new enyo.Ajax( { url: url } );

    apiAjax.response( enyo.bind(this, function(inSender, inResponse) {
      var loginCheck = new enyo.Ajax( { url: inResponse.apis.oac.url } );
      loginCheck.response( enyo.bind(this, function(inSender, inResponse) {
        if( inResponse.login == 'okay' ) {
          callback(true, url, username, password);
        } else {
          callback(false, url, username, password);
        }
      }));

      loginCheck.go({ cmd: "check-login", user: username, pass: password });
    }));

    apiAjax.go();
  }

});
