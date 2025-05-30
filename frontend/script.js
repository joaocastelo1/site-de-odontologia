document.getElementById('form-cadastro').addEventListener('submit', async function(e) {
  e.preventDefault();
  const form = e.target;
  const dados = {
    nome: form.nome.value,
    data_nascimento: form.data_nascimento.value,
    genero: form.genero.value,
    telefone: form.telefone.value,
    email: form.email.value
  };
  try {
    const resp = await fetch('http://localhost:3001/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    if (resp.ok) {
      document.getElementById('mensagem-cadastro').textContent = 'Paciente cadastrado com sucesso!';
      form.reset();
    } else {
      document.getElementById('mensagem-cadastro').textContent = 'Erro ao cadastrar paciente.';
    }
  } catch (err) {
    document.getElementById('mensagem-cadastro').textContent = 'Erro de conexão com o servidor.';
  }
});

async function carregarDentistas() {
  const resp = await fetch('http://localhost:3001/medicos');
  const dentistas = await resp.json();
  const select = document.querySelector('select[name="dentista"]');
  const lista = document.getElementById('lista-dentistas');
  select.innerHTML = '<option value="">Selecione o dentista</option>';
  lista.innerHTML = '';
  dentistas.forEach(d => {
    select.innerHTML += `<option value="${d.id}">${d.nome}</option>`;
    lista.innerHTML += `<li>${d.nome} (${d.especialidade})</li>`;
  });
}

async function carregarEspecialidades() {
  const resp = await fetch('http://localhost:3001/especialidades');
  const especialidades = await resp.json();
  const select = document.querySelector('select[name="especialidade"]');
  const lista = document.getElementById('lista-especialidades');
  select.innerHTML = '<option value="">Selecione a especialidade</option>';
  lista.innerHTML = '';
  especialidades.forEach(e => {
    select.innerHTML += `<option value="${e.id}">${e.nome}</option>`;
    lista.innerHTML += `<li>${e.nome}</li>`;
  });
}

carregarDentistas();
carregarEspecialidades();

const formAgendamento = document.getElementById('form-agendamento');
if (formAgendamento) {
  formAgendamento.addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('mensagem-agendamento').textContent = 'Agendamento enviado com sucesso! Em breve entraremos em contato.';
    e.target.reset();
  });
} 