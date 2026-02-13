let csvBlob = null;

async function iniciarProcessamento(event) {
  const file = event.target.files[0];
  const s1 = document.getElementById("s1");
  const s2 = document.getElementById("s2");
  const s3 = document.getElementById("s3");
  const s4 = document.getElementById("s4");

  if (!file) {
    s1.innerHTML = "Nenhum arquivo selecionado.";
    s1.classList.remove("completed");
    mostrarAlerta("Selecione um arquivo .RAR");
    return;
  }

  if (!file.name.toLowerCase().endsWith('.rar')) {
  s1.innerHTML = "Erro: O arquivo deve ser do tipo .RAR.";
  s1.classList.remove("completed");
  mostrarAlerta("Por favor, selecione um arquivo .RAR.");
  return;
}

  resetarBarras();

  try {
    s1.innerHTML = "Extraindo arquivos .RAR...";
    await animar("p1", 100, 800);
    s1.innerHTML = "✔ Arquivos extraídos com sucesso!";
    s1.classList.add("completed");

    s2.innerHTML = "Processando XMLs...";
    await animar("p2", 100, 1200);
    s2.innerHTML = "✔ Leitura Completa!";
    s2.classList.add("completed");
    
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


    s3.innerHTML = "Gerando relatório CSV...";
    await animar("p3", 100, 800);
    s3.innerHTML = "✔ Relatório CSV gerado!";
    s3.classList.add("completed");

    s4.innerHTML = "Finalizando processo...";
    await animar("p4", 100, 500);
    s4.innerHTML = "✔ Processo finalizado!";
    s4.classList.add("completed");

    habilitarDownload();

  } catch (error) {
      if (!csvBlob) {
        s3.innerHTML = "Erro ao gerar o relatório CSV.";
        s3.classList.remove("completed");
      }
      s4.innerHTML = "Erro na conclusão do processo.";
      s4.classList.remove("completed");
      mostrarAlerta(error.message || "Erro ao processar o arquivo");
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

  [s1, s2, s3, s4].forEach(span => {
    span.innerHTML = "";
    span.classList.remove("completed");
  });
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

function mostrarAlerta(mensagem, tempo = 3000) {
  const alerta = document.getElementById("alerta");
  alerta.innerText = mensagem;
  alerta.style.display = "block";
  alerta.style.opacity = "1";
  setTimeout(() => {
    alerta.style.opacity = "0";
    setTimeout(() => {
      alerta.style.display = "none";
    }, 300);
  }, tempo);
}