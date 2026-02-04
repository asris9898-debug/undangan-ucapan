const form = document.getElementById("ucapanForm");
const list = document.getElementById("listUcapan");
const btn = document.getElementById("submitBtn");

let dataUcapan = JSON.parse(localStorage.getItem("ucapan")) || [];

function renderUcapan() {
  list.innerHTML = "";
  dataUcapan.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="card-header">
        <strong>${item.nama}</strong>
        <span class="badge ${item.hadir === 'Hadir' ? 'hadir' : 'tidak'}">
          ${item.hadir}
        </span>
      </div>
      <div class="time">${item.waktu}</div>
      <div class="message">${item.pesan}</div>
    `;

    list.appendChild(card);
  });
}

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const pesan = document.getElementById("pesan").value.trim();
  const hadir = document.querySelector("input[name='hadir']:checked")?.value;

  if (!nama || !pesan || !hadir) {
    alert("Mohon lengkapi semua data 🤍");
    return;
  }

  const now = new Date();
  const waktu = now.toLocaleString("id-ID");

  dataUcapan.unshift({ nama, pesan, hadir, waktu });
  localStorage.setItem("ucapan", JSON.stringify(dataUcapan));

  renderUcapan();
  form.reset();

  btn.textContent = "Terkirim! ✓";

  setTimeout(() => {
    btn.textContent = "Kirim Ucapan";
  }, 2000);
});

renderUcapan();

