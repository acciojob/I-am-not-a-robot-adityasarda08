//your code here
const imageContainer = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const message = document.getElementById("h");
const result = document.getElementById("para");

let clickedImages = [];

// IMAGE CLASSES
const images = ["img1", "img2", "img3", "img4", "img5"];

// ---------- SHUFFLE FUNCTION ----------
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// ---------- INITIAL SETUP ----------
function loadImages() {
  imageContainer.innerHTML = "";
  clickedImages = [];
  result.innerText = "";
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";

  message.innerText =
    "Please click on the identical tiles to verify that you are not a robot.";

  // pick random image to duplicate
  const duplicate = images[Math.floor(Math.random() * images.length)];

  const imageList = [...images, duplicate];
  shuffle(imageList);

  imageList.forEach((imgClass) => {
    const img = document.createElement("img");
    img.classList.add(imgClass);
    img.addEventListener("click", () => handleImageClick(img));
    imageContainer.appendChild(img);
  });
}

// ---------- IMAGE CLICK ----------
function handleImageClick(img) {
  // prevent clicking more than 2 images
  if (clickedImages.length === 2) return;

  // prevent double click on same image
  if (clickedImages.includes(img)) return;

  img.classList.add("selected");
  clickedImages.push(img);

  // show reset button after first click
  resetBtn.style.display = "inline-block";

  // show verify button only after second click
  if (clickedImages.length === 2) {
    verifyBtn.style.display = "inline-block";
  }
}

// ---------- VERIFY ----------
verifyBtn.addEventListener("click", () => {
  const [img1, img2] = clickedImages;

  if (img1.className === img2.className) {
    result.innerText = "You are a human. Congratulations!";
  } else {
    result.innerText =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }

  verifyBtn.style.display = "none";
});

// ---------- RESET ----------
resetBtn.addEventListener("click", loadImages);

// ---------- LOAD ON PAGE START ----------
loadImages();
