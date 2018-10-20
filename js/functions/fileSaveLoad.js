//csv game file export
function saveGame() {
  if (saveTimer > 149) {
    //ajax request setup
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //whatever gets echo'd in the php shows in the console
        console.log(this.responseText);
        saveTimer = 0;
      }
    };
    //prepare save
    //sends as a long string, "-" seperates lines, "." seperates values
    //initial blah for context
    var toSendSave = "Save file from FetchQuest-Hero data follows structure of:-MaxHp.CurrentHp.MaxPP.CurrentPP-Then the enemies-"

    //add hero's data
    toSendSave += "HeroData:-" + hero.maxHp + "." + hero.currentHp + "." + hero.maxPawPower + "." + hero.currentPawPower + "-";

    //enemies stats
    for (var i = 0; i < enemies.length; i++) {
      //for each enemy, add ID, name, and current HP
      var workingData = "EnemyNo" + i + ":-" + enemies[i].id + "." + enemies[i].maxHp + "." + enemies[i].currentHp;
      //break for next enemy
      toSendSave += workingData + "-";
    }
    //turns the object into a long string
    save = JSON.stringify(toSendSave);

    //now the hero's stats
    var toSendProfile = "Profile for FetchQuest User-";

    //create list to be added to file var
      var listCheck;
      //for attacks, items and specials
      for (var i = 0; i < 3; i++) {
        switch (i) {
          case 0:
            //add a title (used to ID the list below)
            toSendProfile += "Attacks:-";
            //set list to relevent
            listCheck = hero.attacks;
            break;
          case 1:
            listCheck = hero.items;
            toSendProfile += "Items:-";
            break;
          case 2:
            listCheck = hero.special;
            toSendProfile += "Specials:-";
            break;
        }
        //while there's more in the list
        for (var j = 0; j < listCheck.length; j++) {
          //add the name of the thing to the string
          //on load, the name is used to find stats
          toSendProfile += listCheck[j].name;
          //if its not the last, seperate value
          if (j !== listCheck.length - 1) {
            toSendProfile += ".";
          }
        }
        //break to next line
        toSendProfile += "-";
      }

    profile = JSON.stringify(toSendProfile);
    //send to "save.php", with mode set to "save", and with the save data
    xmlhttp.open("GET", "save.php?mode=save&save=" + save + "&profile=" + profile, true);
    xmlhttp.send();
  }
}

function loadGame(file) {
  console.log(file);
  if (file == null) {
    file = "";
  }
  //ajax request
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var array = this.responseText;
      array = array.split(",");
      array.splice(-1,1)
      console.log(array);
      hero.maxHp = array[0];
      hero.currentHp = array[1];
      hero.maxPawPower = array[2];
      hero.currentPawPower = array[3];
      var i = 1;
      while (array[3*i + 1] != null) {
        enemies[array[3*i + 1]].maxHp = array[3*i + 2];
        enemies[array[3*i + 1]].currentHp = array[3*i + 3];
        i++;
      }
    }
  }
  //mode set to "load", currently pulls most recent file
  xmlhttp.open("GET", "save.php?mode=load&file=" + file, true);
  xmlhttp.send();
}
