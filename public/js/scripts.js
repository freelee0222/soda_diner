const now = Date.now();
slider('fizziness');
slider('rating');

$('#addSodaDirect').hide();
$('#addDinerDirect').hide(); 
$('#createText').hide();

$(() => {
  $('[data-toggle="tooltip"]').tooltip()
});

if (window.location.href.includes('soda')) {
  addActive('allSodas');
}
if (window.location.href.includes('diner')) {
  addActive('allDiners');
}

$('#create').click(() => {
  $('#create').hide();
  $('.intro').hide();
  $('#createText').show();
  $('#addSodaDirect').show();
  $('#addDinerDirect').show();
});

$('#addSodaForm').click((e) => {
  let dinerId = e.target.dataset.id
  document.location = `/api/diner/add-soda/form/${dinerId}`
});

$('#deleteSodaForm').click((e) => {
  let dinerId = e.target.dataset.id
  document.location = `/api/diner/delete-soda/form/${dinerId}`
});

$('#soda-delete').click((e) => {
  let sodaId = e.target.dataset.id
  fetch(`/api/soda/${sodaId}`, { method: 'DELETE' })
    .then(() => document.location = '/sodas')
    .catch(err => console.error(err))
});

$('#diner-delete').click((e) => {
  $('.navbar').show();
  $('.details').show();
  let dinerId = e.target.dataset.id
  fetch(`/api/diner/${dinerId}`, { method: 'DELETE' })
    .then(() => document.location = '/diners')
    .catch(err => console.error(err))
});

$('#diner-addSodas').click((e) => {
  if ($('#soda-select').val().length === 0) {
    return
  }
  let dinerId = e.target.dataset.id
  sodaList = $('#soda-select').val();
  fetch(`/api/diner/add-soda/${dinerId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sodaList)
  })
    .then(() => document.location = `/diner-details/${dinerId}`)
    .catch(err => console.error(err))
});

$('#diner-deleteSodas').click((e) => {
  if ($('#soda-select').val().length === 0) {
    return
  }
  let dinerId = e.target.dataset.id
  sodaList = $('#soda-select').val();
  fetch(`/api/diner/delete-soda/${dinerId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sodaList)
  })
    .then(() => document.location = `/diner-details/${dinerId}`)
    .catch(err => console.error(err))
});

$('#soda-serveStop').click((e) => {
  let sodaId = e.target.dataset.id
  fetch(`/api/soda/stop-serving/${sodaId}`)
    .then(() => location.reload())
    .catch(err => console.error(err))
});

$('#soda-serve').click((e) => {
  let sodaId = e.target.dataset.id
  fetch(`/api/soda/start-serving/${sodaId}`)
    .then(() => location.reload())
    .catch(err => console.error(err))
});

$('.modal-btn').click(() => {
  $('.navbar').hide();
  $('.details').hide();
});

$('.cancelBtn').click(() => {
  $('.navbar').show();
  $('.details').show();
})

function capitalize(str) {
  let upper = str.slice(0, 1).toUpperCase();
  let lower = str.slice(1, str.length).toLowerCase();
  return (upper + lower);
}

function slider(input) {
  $(`#${input}`).mouseup(() => {
    let value = Math.floor($(`#${input}`).val() / 10);
    $(`#${input}Display`).text(value);
    return value
  });
  $(`#${input}`).mousedown(() => {
    $(`#${input}Display`).text('-');
  });
}

function addActive(target) {
  let navItems = document.getElementsByClassName('nav-link');
  targetElement = document.getElementById(target);
  for (let i = 0; i < navItems.length; i++) {
    navItems[i].className = 'nav-item nav-link m-4';
  }
  targetElement.className = 'nav-item nav-link m-4 active'
}