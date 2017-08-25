window.onload = function() {
  // Get the modal

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



};
