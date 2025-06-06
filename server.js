const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Dados em memória: personagens de Game of Thrones
let personagens = [
  { id: 1, nome: "Jon Snow", casa: "Stark (criado)", vivo: true },
  { id: 2, nome: "Daenerys Targaryen", casa: "Targaryen", vivo: false },
  { id: 3, nome: "Arya Stark", casa: "Stark", vivo: true }
];

// CREATE - Adicionar novo personagem
app.post('/personagens', (req, res) => {
  const novoPersonagem = req.body;
  novoPersonagem.id = personagens.length > 0 ? personagens[personagens.length - 1].id + 1 : 1;
  personagens.push(novoPersonagem);
  res.status(201).json({ mensagem: "Personagem adicionado com sucesso!", personagem: novoPersonagem });
});

// READ - Listar todos os personagens
app.get('/personagens', (req, res) => {
  res.json(personagens);
});

// READ - Obter um personagem por ID
app.get('/personagens/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const personagem = personagens.find(p => p.id === id);
  if (personagem) {
    res.json(personagem);
  } else {
    res.status(404).json({ mensagem: "Personagem não encontrado." });
  }
});

// UPDATE - Atualizar personagem por ID
app.put('/personagens/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = personagens.findIndex(p => p.id === id);
  if (index !== -1) {
    personagens[index] = { ...personagens[index], ...req.body };
    res.json({ mensagem: "Personagem atualizado com sucesso!", personagem: personagens[index] });
  } else {
    res.status(404).json({ mensagem: "Personagem não encontrado." });
  }
});

// DELETE - Remover personagem por ID
app.delete('/personagens/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = personagens.findIndex(p => p.id === id);
  if (index !== -1) {
    const removido = personagens.splice(index, 1);
    res.json({ mensagem: "Personagem removido com sucesso!", personagem: removido[0] });
  } else {
    res.status(404).json({ mensagem: "Personagem não encontrado." });
  }
});

// Inicializar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});