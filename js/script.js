
   window.addEventListener('click', function() {
    document.getElementById("audio").play();
   }, { once: true });

  // 
  
  function openSite() {
    document.getElementById("intro").style.display = "none";
    document.querySelector("main").style.display = "block";
     
  }
 const intro = document.getElementById("intro");
const main = document.querySelector("main");

intro.addEventListener("click", function () {
  // 1. بدء تلاشي الـ intro (Fade Out)
  intro.style.opacity = "0";

  // 2. الانتظار ثانية حتى ينتهي التلاشي
  setTimeout(() => {
    // intro.style.display = "none";  // إخفاء الـ intro تمامًا
    main.style.display = "block";  // إظهار الـ main في الـ DOM

    // 3. مهلة بسيطة جدًا لتفعيل تأثير الظهور (Fade In) للـ main
    setTimeout(() => {
      main.style.opacity = "1";
    }, 10);
  }, 500); // 1000ms = 1 ثانية (نفس مدة الـ transition في الـ CSS)
});

intro.addEventListener("click" , () => {
  intro.classList.add("hide")
})

// //
const weddingDate = new Date("November 9, 2026 20:00:00").getTime();

function countdown() {
  const now = new Date().getTime();
  const difference = weddingDate - now;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

countdown();
setInterval(countdown, 1000);

// /////////////////////////////////////



const form = document.getElementById("wishForm");
const nameInput = document.getElementById("guestName");
const wishInput = document.getElementById("guestWish");
const wishesContainer = document.getElementById("wishes");
let wishes = [];
try {
    wishes = JSON.parse(
        localStorage.getItem("guestWishes") || "[]"
    );
    if (!Array.isArray(wishes)) {
        wishes = [];
    }
} catch {
    wishes = [];
}
function saveWishes() {
    localStorage.setItem(
        "guestWishes",
        JSON.stringify(wishes)
    );
}
function renderWishes() {
    wishesContainer.replaceChildren();
    wishes.forEach((wish) => {
        const card = document.createElement("div");
        card.className = "wish-card";
        const name = document.createElement("div");
        name.className = "wish-name";
        name.textContent = wish.name;
        const message = document.createElement("p");
        message.className = "wish-message";
        message.textContent = wish.message;
        const date = document.createElement("div");
        date.className = "wish-date";
        date.textContent = wish.date;
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-wish";
        deleteButton.textContent = "×";
        deleteButton.setAttribute("aria-label", "Delete wish");
        deleteButton.addEventListener("click", () => {
            wishes = wishes.filter(
                (item) => item.id !== wish.id
            );
            saveWishes();
            renderWishes();
        });
        card.append(
            deleteButton,
            name,
            message,
            date
        );
        wishesContainer.appendChild(card);
    });
}
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const message = wishInput.value.trim();
    if (!name || !message) {
        return;
    }
    wishes.unshift({
        id: crypto.randomUUID(),
        name: name,
        message: message,
        date: new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }).toUpperCase()
    });
    saveWishes();
    renderWishes();
    form.reset();
});
renderWishes();
