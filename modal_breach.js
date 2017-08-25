window.onload = function() {


  let breachTest = document.getElementById("breachTest");
  let userInput = document.getElementById("userInput");

  let listTemplate = document.querySelector("script[data-template=listTemplate1]").innerHTML;
  let data = document.querySelector("script[data-list1]").innerText;

  let breaches=0;
  breachTest.onclick = function() {


    document.getElementById("breachResult").innerHTML = "";
    var model = JSON.parse(data);


    for (let i = 0; i < model.list.length; i++) {

      var request = new XMLHttpRequest();
      request.onreadystatechange = function() {
        if (request.readyState === 4) {
          if (request.status === 200) {
            var result = request.responseText;
            document.body.className = 'ok';

            var obj = JSON.parse(result);

            breaches=obj.length;
            for (let j = 0; j < obj.length; j++) {

              let items = listTemplate.replace("{{Title}}", obj[j].Title.toUpperCase());
              items = items.replace("{{Description}}", obj[j].Description);
              items = items.replace("{{DataClasses}}", obj[j].DataClasses.join(', '));

              document.getElementById("breachResult").innerHTML += items;
              document.getElementById("breachResult").style.display = "block";


            }

            if (document.getElementById("checkbox").checked === true && userInput.value.includes("@") && userInput.value.includes(".")) {
              var xhttp = new XMLHttpRequest();
              xhttp.open("GET", "emails.php?email=" + userInput.value + "&breaches=" + breaches, true);
              xhttp.send();
            } else if (document.getElementById("checkbox").checked === true && userInput.value.includes("@") === false && userInput.value.includes(".") === false) {
              alert("Field must be a email adress to check future breaches");
            }
          }
          else if(userInput.value===""){
            alert("Please enter username or Email");
          }
           else {
            alert("You have not been breached!");

          }
        }
      };

      request.open("GET", 'https://haveibeenpwned.com/api/v2/breachedaccount/' + userInput.value, true);
      request.send(null);
    }

  }


  let modal = document.getElementById('myModal');

  // Get the image and insert it inside the modal - use its "alt" text as a caption
  let img = document.getElementsByClassName("myImg");
  let modalImg = document.getElementById("img01");
  let captionText = document.getElementById("caption");

  let test = document.getElementsByTagName("body");

  for (let i = 0; i < img.length; i++) {
    img[i].onclick = function() {
      modal.style.display = "block";
      modalImg.src = this.src;
      captionText.innerHTML = this.alt;
      modal.style.overflow="hidden";
      test[0].style.overflow="hidden";

    }
  }

  modal.onclick = function() {
    modal.style.display = "none";
    test[0].style.overflow="scroll";
    test[0].style.overflowX="hidden";
  }


  //PASSWORD generator


    let generatePasswordBtn = document.getElementById('generatePasswordBtn');
    let passwordResult = document.getElementById('passwordResult');

    generatePasswordBtn.onclick = function() {
      passwordResult.innerHTML = "";
      let passwordLength = document.getElementById('passwordLength').value;

      //Gets value of all checkboxes
      let uppercaseCheckbox = document.getElementById('uppercaseCheckbox').checked;
      let symbolsCheckbox = document.getElementById('symbolsCheckbox').checked;
      let numbersCheckbox = document.getElementById('numbersCheckbox').checked;

      let generatedPassword = [];
      let acceptedCharacters =[];

      passwordResult.style.display = "inherit";

      //Fills arrays with values for password
      let lowercase = 'abcdefghijklmnopqrstuvwxyz'.split('');
      let uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
      let numbers = '1234567890'.split('');
      let specialCharacters = '!#$%&()*+,-./:;<=>?@^_`{|}~'.split('');

      if (passwordLength < 8) {
        passwordResult.innerHTML = "Password must be at least 8 characters long, if possible you should make it at least 12 characters long";
      }
      else if(passwordLength>64){
        passwordResult.innerHTML = "This password generator allows for a maximum of 64 characters";
      }
      else {
        //Adds accepted characters based on what checkboxes you checked
        acceptedCharacters = acceptedCharacters.concat(lowercase);

        if (uppercaseCheckbox) {
          acceptedCharacters = acceptedCharacters.concat(uppercase);
        }
        if (symbolsCheckbox) {
          acceptedCharacters = acceptedCharacters.concat(specialCharacters);
        }
        if (numbersCheckbox) {
          acceptedCharacters = acceptedCharacters.concat(numbers);
        }

        //Generates password
        for (let i = 0; i < passwordLength; i++) {
        generatedPassword.push(acceptedCharacters[Math.floor(Math.random()*acceptedCharacters.length)]);
        }

        //Shows password in the result div
        for(let i =0; i<generatedPassword.length; i++){
          passwordResult.innerHTML += generatedPassword[i];
        }
      }
    };



};
