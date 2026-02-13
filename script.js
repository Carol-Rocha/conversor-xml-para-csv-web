let csvBlob = null;

async function iniciarProcessamento(event) {
  const file = event.target.files[0];

  if (!file) {
    alert("Selecione um arquivo .RAR");
    return;
  }

  resetarBarras();

  try {
    await animar("p1", 100, 800);

    await animar("p2", 100, 1200);
    document.getElementById("s2").innerHTML = "Processando XMLs...";
    
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:8000/processar", {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      const erro = await response.text();
      console.error("Erro da API:", erro);
      throw new Error(erro);
    }

    csvBlob = await response.blob();

    document.getElementById("s2").innerHTML = "✔ Leitura Completa!";
    document.getElementById("s2").classList.add("completed");

    await animar("p3", 100, 800);

    await animar("p4", 100, 500);

    habilitarDownload();

  } catch (error) {
    console.error("Erro completo:", error);
    alert(error.message || "Erro ao processar o arquivo");
  }
}

function habilitarDownload() {
  const btn = document.querySelector(".download-btn");
  btn.disabled = false;
  btn.onclick = baixarCSV;
}

function baixarCSV() {
  if (!csvBlob) return;

  const url = window.URL.createObjectURL(csvBlob);
  const a = document.createElement("a");

  a.href = url;
  a.download = "relatorio.csv";
  document.body.appendChild(a);
  a.click();

  a.remove();
  window.URL.revokeObjectURL(url);
}

function animar(id, valor, tempo) {
  return new Promise (resolve => {
    const bar = document.getElementById(id);
    bar.style.width = "0%";
    setTimeout(() => {
      bar.style.width = valor + "%";
      resolve();
    }, tempo);
  })
}

function resetarBarras() {
  ["p1", "p2", "p3", "p4"].forEach(id => {
    document.getElementById(id).style.width = "0%";
  });

  const s2 = document.getElementById("s2");
  s2.innerHTML = "";
  s2.classList.remove("completed");

  document.querySelector(".download-btn").disabled = true;
}

const uploadBox = document.getElementById("uploadBox");

uploadBox.addEventListener("dragover", function(event){
  event.preventDefault();
  uploadBox.classList.add("dragover");
});

uploadBox.addEventListener("dragleave", function(event){
  event.preventDefault();
  uploadBox.classList.remove("dragover");
});

uploadBox.addEventListener("drop", function(event){
  event.preventDefault();
  uploadBox.classList.remove("dragover");
  const file = event.dataTransfer.files[0];
  if (file) {
    iniciarProcessamento({ target: { files: [file] } });
  }
});