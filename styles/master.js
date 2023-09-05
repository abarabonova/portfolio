console.log("JavaScript is working");

var vids = $("video");
$.each(vids, function () {
  this.controls = false;
});
//Loop though all Video tags and set Controls as false

$("video").click(function () {
  if (this.paused) {
    this.play();
  } else {
    this.pause();
  }
});

document.body.addEventListener("click", function () {
  const video = document.querySelector("video");
  if (video) {
    video.play();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const imageSets = {
    case1: [
      "img/new-1/mist-case01.png",
      "img/new-1/mist-case02.png",
      "img/new-1/mist-case03.png",
      "img/new-1/mist-case04.png",
      "img/new-1/mist-case05.png",
      "img/new-1/mist-case06.png",
      "img/new-1/mist-case07.png",
      "img/new-1/mist-case08.png",
    ],
    case2: [
      "img/new-1/lalal-case11.png",
      "img/new-1/lalal-case02.png",
      "img/new-1/lalal-case03.png",
      "img/new-1/lalal-case04.png",
      "img/new-1/lalal-case05.png",
      "img/new-1/lalal-case06.png",
      "img/new-1/lalal-case07.png",
      "img/new-1/lalal-case08.png",
      "img/new-1/lalal-case09.png",
    ],
    case3: [
      "img/new-1/haier-case11.png",
      "img/new-1/haier-case02.png",
      "img/new-1/haier-case10.png",
      "img/new-1/haier-case06.png",
      "img/new-1/haier-case04.png",
      "img/new-1/haier-case09.png",
      "img/new-1/haier-case08.png",
      "img/new-1/haier-case05.png",
      "img/new-1/haier-case01.png",
      "img/new-1/haier-case07.png",
      "img/new-1/haier-case03.png",
    ],
    case4: [
      // "img/new-1/openmedia-case.gif",
      "img/new-1/openmedia-case01.png",
      "img/new-1/openmedia-case02.png",
      "img/new-1/openmedia-case03.png",
      "img/new-1/openmedia-case04.png",
      "img/new-1/openmedia-case05.png",
      "img/new-1/openmedia-case06.png",
      "img/new-1/openmedia-case07.png",
    ],
  };

  function startSlideshow(imgElement, imagesArray) {
    let currentImageIndex = 0;
    return setInterval(function () {
      currentImageIndex = (currentImageIndex + 1) % imagesArray.length;
      imgElement.src = imagesArray[currentImageIndex];
    }, 300);
  }

  document.querySelectorAll(".card img[data-case]").forEach((imgElement) => {
    const caseKey = imgElement.dataset.case;
    const imagesArray = imageSets[caseKey];

    if (!imagesArray || !imagesArray.length) {
      console.error(`Images for ${caseKey} not found.`);
      return;
    }

    let interval;
    imgElement.addEventListener("mouseover", function () {
      interval = startSlideshow(imgElement, imagesArray);
    });

    imgElement.addEventListener("mouseout", function () {
      clearInterval(interval);
      imgElement.src = imagesArray[0];
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.body.addEventListener("click", function (event) {
    const clickedElement = event.target;

    // Если клик был на изображении карточки
    if (clickedElement.matches("img[data-case]")) {
      const caseValue = clickedElement.getAttribute("data-case");
      const popupSelector = `.popup${caseValue.slice(-1)}`; // Например, ".popup1" для "case1"
      const popup = document.querySelector(popupSelector);

      // Если попап уже открыт, закрываем его. В противном случае, открываем.
      if (popup.style.bottom === "0px") {
        closePopup(popupSelector);
      } else {
        openPopup(popupSelector);
      }
    }

    // Если клик был на кнопке закрытия поп-апа или вне попапа
    else if (
      clickedElement.matches('button[name="button-close"]') ||
      !clickedElement.closest(".card-popup")
    ) {
      closeAllPopups();
    }
  });
});

function openPopup(popupClass) {
  closeAllPopups(); // Убедимся, что все другие поп-апы закрыты
  const popup = document.querySelector(popupClass);
  if (popup) {
    popup.style.bottom = "0";
  }
}

function closePopup(popupClass) {
  const popup = document.querySelector(popupClass);
  if (popup) {
    popup.style.bottom = "-100vh";
  }
}

function closeAllPopups() {
  const popups = document.querySelectorAll(".card-popup");
  popups.forEach((popup) => {
    popup.style.bottom = "-100vh";
  });
}
