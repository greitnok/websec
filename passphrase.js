var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    let iconArray = JSON.parse(this.responseText);
    let generatePassphrase = document.getElementById("generatePassphrase");
    iconArray.splice(0, 2);

    generatePassphrase.onclick = function() {

      document.getElementById("passphraseBilder").innerHTML = "";
      document.getElementById("passphraseBilder").style.display = "flex";

      let passphraseNumber = document.getElementById("passphraseNumber").value;
      let passphraseTemplate = document.querySelector("script[data-template=passphraseTemplate]").innerHTML;
      let data = document.querySelector("script[data-list]").innerText;
      var model = JSON.parse(data);
      let listitems = "";
      let uniqueTest = [];

      for (let i = 0; i < model.passphrase.length; i++) {
        let item = model.passphrase[i];
        let pattern = /{{(\w+)}}/gmi;
        let matches = passphraseTemplate.match(pattern);


        for (let k = 0; k < passphraseNumber; k++) {
          let randomedPhrase = iconArray[Math.floor((Math.random() * iconArray.length))];
          uniqueTest.push(randomedPhrase);
          let newitem = passphraseTemplate;
          item.Icons = randomedPhrase;
          item.IconNames = randomedPhrase.substring(0, randomedPhrase.indexOf('.'));
          newitem = newitem.replace(matches[0], item.Icons);
          newitem = newitem.replace(matches[1], item.IconNames);
          listitems += newitem;
        }
        if (hasDuplicates(uniqueTest)) {
          listitems = "";
          for (let k = 0; k < passphraseNumber; k++) {
            let randomedPhrase = iconArray[Math.floor((Math.random() * iconArray.length))];
            uniqueTest.push(randomedPhrase);
            let newitem = passphraseTemplate;
            item.Icons = randomedPhrase;
            item.IconNames = randomedPhrase.substring(0, randomedPhrase.indexOf('.'));
            newitem = newitem.replace(matches[0], item.Icons);
            newitem = newitem.replace(matches[1], item.IconNames);
            listitems += newitem;
          }
        }
      }



      document.getElementById("passphraseBilder").innerHTML += listitems;

    };
  }
};
xmlhttp.open("GET", "passphrasegenerator.php", true);
xmlhttp.send();


function hasDuplicates(array) {
  var valuesSoFar = Object.create(null);
  for (var i = 0; i < array.length; ++i) {
    var value = array[i];
    if (value in valuesSoFar) {
      return true;
    }
    valuesSoFar[value] = true;
  }
  return false;
}
