import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config();
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.get('/', (req, res) => {
  res.send('API da Clínica Médica rodando!');
});

// Rotas para clientes
app.post('/clientes', async (req, res) => {
  const { nome, data_nascimento, genero, telefone, email } = req.body;
  try {
    const clienteResult = await pool.query(
      'INSERT INTO clientes (nome, data_nascimento, genero) VALUES ($1, $2, $3) RETURNING id',
      [nome, data_nascimento || null, genero || null]
    );
    const clienteId = clienteResult.rows[0].id;
    await pool.query(
      'INSERT INTO contatos (cliente_id, telefone, email) VALUES ($1, $2, $3)',
      [clienteId, telefone || null, email || null]
    );
    res.status(201).json({ id: clienteId });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao cadastrar cliente', detalhes: err.message });
  }
});

app.get('/clientes', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.id, c.nome, c.data_nascimento, c.genero, ct.telefone, ct.email
       FROM clientes c
       LEFT JOIN contatos ct ON c.id = ct.cliente_id`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar clientes', detalhes: err.message });
  }
});

// Rotas para contatos, médicos, especialidades e agendamentos serão adicionadas aqui

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 