document.addEventListener('DOMContentLoaded', () => {
  const eventList = document.getElementById('event-list');
  const editEventList = document.getElementById('edit-event-list');
  const createEventForm = document.getElementById('create-event-form');

  // Função para carregar eventos
  const loadEvents = () => {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    if (eventList) {
      eventList.innerHTML = '';
      events.forEach((event) => addEventToList(event));
    }
    if (editEventList) {
      editEventList.innerHTML = '';
      events.forEach((event, index) => addEventToEditList(event, index));
    }
  };

  // Função para adicionar evento à lista
  const addEventToList = (event) => {
    const formattedDate = new Date(event.date).toLocaleDateString('pt-BR');
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${event.name}</strong> 📅 ${formattedDate} 📍 ${event.location} 👥 ${event.target}
    `;
    eventList.appendChild(li);
  };

  // Função para adicionar evento à lista de edição
  const addEventToEditList = (event, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <form class="edit-event-form" data-index="${index}">
        <input type="text" name="name" value="${event.name}" required>
        <input type="date" name="date" value="${event.date}" required>
        <input type="text" name="location" value="${event.location}" required>
        <input type="text" name="target" value="${event.target}" required>
        <button type="submit">Salvar</button>
        <button type="button" class="delete-btn" data-index="${index}">🗑️</button>
      </form>
    `;
    editEventList.appendChild(li);
  };

  // Função para salvar um evento
  const saveEvent = (event) => {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    events.push(event);
    localStorage.setItem('events', JSON.stringify(events));
  };

  // Função para editar e deletar eventos
  if (editEventList) {
    editEventList.addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.target;
      const index = form.dataset.index;
      const updatedEvent = {
        name: form.name.value,
        date: form.date.value,
        location: form.location.value,
        target: form.target.value,
      };
      const events = JSON.parse(localStorage.getItem('events')) || [];
      events[index] = updatedEvent;
      localStorage.setItem('events', JSON.stringify(events));
      loadEvents();
    });

    editEventList.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-btn')) {
        const index = e.target.dataset.index;
        const events = JSON.parse(localStorage.getItem('events')) || [];
        events.splice(index, 1);
        localStorage.setItem('events', JSON.stringify(events));
        loadEvents();
      }
    });
  }

  // Função para criar novo evento
  if (createEventForm) {
    createEventForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const { name, date, location, target } = getFormData();
      if (name && date && location && target) {
        saveEvent({ name, date, location, target });
        alert('Evento criado com sucesso!');
        window.location.href = 'index.html';
      } else {
        alert('Preencha todos os campos!');
      }
    });
  }

  const getFormData = () => ({
    name: document.getElementById('event-name').value,
    date: document.getElementById('event-date').value,
    location: document.getElementById('event-location').value,
    target: document.getElementById('event-target').value,
  });

  loadEvents();
});
