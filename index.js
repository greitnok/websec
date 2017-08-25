window.onload = function() {

    document.body.onmousedown = function (e) {
      e = e || window.event;

      //Finds classname of element you click on
      let elementId = document.getElementsByClassName(e.target ? e.target.className : e.srcElement.id);
      //Saves first part of the string
      let pageName = elementId[0].className.substring(0, elementId[0].className.indexOf(' '));
      //Redirects to page you clik on
      elementId[0].onclick = function() {
          window.location.href = pageName;
      };
    }
};
