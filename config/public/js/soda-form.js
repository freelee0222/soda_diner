let sodaName; 
let sodaId;

$('.sodaNameError').hide();

$('#soda-submit').click((e) => {
     e.preventDefault();
     $('#feedback').text('')
     if($('#name').val() === "") {
      $('.sodaNameError').show();
      return;
     }
     sodaName = capitalize($('#name').val());
     const soda = {
         name: sodaName,
         rating: Math.floor($('#rating').val() / 10),
         fizziness:  Math.floor($('#fizziness').val() / 10),
         createdOn: Date.now()
     }
 fetch('/api/soda/new', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(soda)
  })
  .then(response => response.json())
  .then(soda => {
    sodaId = soda._id
    $('form').hide();
    if (soda.name === undefined) {
      $('#feedback').html(`${sodaName} already exists.`)
      setTimeout(redirectSodaAdd, 1500)
    } else {
      $('#feedback').text(`${soda.name} has been added.`)
      setTimeout(redirectSoda, 1500)
    }
  })
})

function redirectSoda() {
  document.location = `http://localhost:3000/soda-details/${sodaId}`
}

function redirectSodaAdd() {
  document.location = `http://localhost:3000/add-soda`
}