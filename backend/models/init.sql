-- Tabela de clientes
CREATE TABLE IF NOT EXISTS clientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  data_nascimento DATE,
  genero VARCHAR(20)
);

-- Tabela de contatos
CREATE TABLE IF NOT EXISTS contatos (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER REFERENCES clientes(id),
  telefone VARCHAR(20),
  email VARCHAR(100)
);

-- Tabela de especialidades
CREATE TABLE IF NOT EXISTS especialidades (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL
);

-- Tabela de médicos
CREATE TABLE IF NOT EXISTS medicos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  especialidade_id INTEGER REFERENCES especialidades(id)
);

-- Tabela de agendamentos
CREATE TABLE IF NOT EXISTS agendamentos (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER REFERENCES clientes(id),
  medico_id INTEGER REFERENCES medicos(id),
  data_hora TIMESTAMP NOT NULL
); 