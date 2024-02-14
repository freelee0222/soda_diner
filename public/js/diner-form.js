let dinerName;
let dinerId;
$('.dinerNameError').hide();
$('.dinerLocationError').hide();


$('#diner-submit').click((e) => {
  $('.dinerNameError').hide();
  $('.dinerLocationError').hide();
  e.preventDefault();
  if ($('#name').val() === "") {
    $('.dinerNameError').show();
    return;
  }
  if ($('#location').val() === "") {
    $('.dinerLocationError').show();
    return;
  }
  dinerName = capitalize($('#name').val());
  const diner = {
    name: dinerName,
    location: capitalize($('#location').val()),
    sodas: $('#soda-select').val(),
    createdOn: Date.now()
  }

  fetch('api/diner/new', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(diner)
  })
    .then(response => response.json())
    .then(diner => {
      dinerId = diner._id
      $('form').hide()
      if (diner.name === undefined) {
        $('#feedback').html(`${dinerName} already exists.`)
        setTimeout(redirectDinerAdd, 1499)
      } else {
        $('#feedback').text(`${diner.name} has been added.`)
          setTimeout(redirectDiner, 1500)
      }
    })
  
})

function redirectDiner() {
  document.location = `http://localhost:3000/diner-details/${dinerId}`
}
function redirectDinerAdd() {
  document.location = `http://localhost:3000/add-diner`
}
