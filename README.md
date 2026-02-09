Este projeto é o **frontend da aplicação Conversor XML para CSV**, responsável por permitir que o usuário envie arquivos XML (ou ZIP com múltiplos XMLs) e faça o download do CSV gerado automaticamente pela API backend.

O frontend foi pensado para **uso simples**, sem necessidade de conhecimento técnico por parte do usuário final.

---

## 🎯 Objetivo da interface

- Permitir upload de arquivo `.RAR` ou `.xml`
- Enviar o arquivo para a API
- Exibir feedback de processamento
- Disponibilizar o download do CSV final

---

## 🧱 Tecnologias utilizadas

- Angular
- TypeScript
- HTML5 / CSS3
- Consumo de API REST (FastAPI)

---

## 📁 Estrutura esperada do projeto
conversor-xml-para-csv-front/
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   └── app.component.*
│   ├── assets/
│   └── environments/
├── angular.json
├── package.json
└── README.md

---

## 🔌 Integração com o backend

O frontend consome o endpoint: 

👩‍💻 Autoria

Desenvolvido por Carol
Interface criada para consumo da API de processamento fiscal