const correctPassword = "rosa";

function checkPassword() {
    const password = document.getElementById("password").value;

    if (password === correctPassword) {

        document.getElementById("login").style.display = "none";
        document.getElementById("website").style.display = "flex";

        document.getElementById("music").play();

    } else {
        document.getElementById("error").innerHTML = "Wrong Password ❤️";
    }
}

// تاريخ بداية العلاقة
const startDate = new Date("2025-06-11T00:00:00");

function updateCounter() {

    const now = new Date();

    let diff = now - startDate;

    let days = Math.floor(diff / (1000 * 60 * 60 * 24));

    diff %= (1000 * 60 * 60 * 24);

    let hours = Math.floor(diff / (1000 * 60 * 60));

    diff %= (1000 * 60 * 60);

    let minutes = Math.floor(diff / (1000 * 60));

    diff %= (1000 * 60);

    let seconds = Math.floor(diff / 1000);

    document.getElementById("time").innerHTML =
        `${days} Days ❤️ ${hours} Hours ❤️ ${minutes} Minutes ❤️ ${seconds} Seconds`;

}

setInterval(updateCounter,1000);

updateCounter();

// الصور
const images = [
    "images/1.jpg",
    "images/2.jpg",
    "images