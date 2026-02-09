function iniciarProcessamento() {
  animar("p1", 100, 800, () => {
    animar("p2", 100, 800, () => {
      document.getElementById("s2").innerHTML = "✔ Leitura Completa!";
      document.getElementById("s2").classList.add("completed");
      animar("p3", 100, 800, () => {
        animar("p4", 100, 500);
      });
    });
  });
}

function animar(id, valor, tempo, callback) {
  const bar = document.getElementById(id);
  setTimeout(() => {
    bar.style.width = valor + "%";
    if (callback) setTimeout(callback, tempo);
  }, tempo);
}
