console.log("Berhasil connect");

const inputNamaResep = document.querySelector("#recipe-name");
const judulPratinjau = document.querySelector("#preview-title");
const inputWaktuPersiapan = document.querySelector("#prep-time");
const waktuPratinjau = document.querySelector("#preview-time");
const inputKesulitan = document.querySelector("#difficulty");
const kesulitanMeter = document.querySelector("#preview-difficulty");
const kesulitanText = document.querySelector("#preview-difficulty-text");

console.log(inputNamaResep);
console.log(judulPratinjau);

inputNamaResep.addEventListener("input", function () {
  console.log("Pengguna mengetik nama resep");
});

inputNamaResep.addEventListener("input", function () {
  const teksInputan = inputNamaResep.value;
  judulPratinjau.textContent = teksInputan;
});

inputNamaResep.addEventListener("input", function () {
  const teksInputan = inputNamaResep.value;
  if (teksInputan === "") {
    judulPratinjau.textContent = "Judul Resep Akan Muncul Di Sini";
  } else {
    judulPratinjau.textContent = teksInputan;
  }
});

inputWaktuPersiapan.addEventListener("input", function () {
  const waktuInputan = inputWaktuPersiapan.value;
  if (waktuInputan === "" || waktuInputan === "0") {
    waktuPratinjau.textContent = "-- menit";
  } else {
    waktuPratinjau.textContent = waktuInputan + " menit";
  }
});

inputKesulitan.addEventListener("input", function () {
  const nilaiKesulitan = inputKesulitan.value;
  kesulitanMeter.setAttribute("value", nilaiKesulitan);

  let textKesulitan = "";
  switch (nilaiKesulitan) {
    case "1":
      textKesulitan = "Sangat Mudah";
      break;
    case "2":
      textKesulitan = "Mudah";
      break;
    case "3":
      textKesulitan = "Sedang";
      break;
    case "4":
      textKesulitan = "Sulit";
      break;
    case "5":
      textKesulitan = "Sangat Sulit";
      break;
  }

  kesulitanText.textContent = textKesulitan;
});

const containerInspirasi = document.querySelector("#resep-container");
const loadingIndicator = document.querySelector("#loading-indicator");
const errorMessage = document.querySelector("#error-message");

const apiUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood";

async function muatInspirasiResep() {
  try {
    loadingIndicator.style.display = "block";
    errorMessage.style.display = "none";

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Gagal mengambil data dari server.");
    }

    const data = await response.json();
    const resepArray = data.meals;

    loadingIndicator.style.display = "none";
    tampilkanResep(resepArray);
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    loadingIndicator.style.display = "none";
    errorMessage.textContent = "Gagal memuat resep. Coba lagi nanti.";
    errorMessage.style.display = "block";
  }
}

function tampilkanResep(resepArray) {
  containerInspirasi.innerHTML = "";

  resepArray.forEach((resep) => {
    const kartuDiv = document.createElement("div");
    kartuDiv.className = "kartu-resep";

    const gambar = document.createElement("img");
    gambar.src = resep.strMealThumb;
    gambar.alt = resep.strMeal;

    const judul = document.createElement("h3");
    judul.textContent = resep.strMeal;

    kartuDiv.appendChild(gambar);
    kartuDiv.appendChild(judul);
    containerInspirasi.appendChild(kartuDiv);
  });
}

muatInspirasiResep();
