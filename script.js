document.getElementById('taxForm').addEventListener('submit', function(event) {
  event.preventDefault();
  hideErrors();

  const age = document.getElementById('age').value;
  const income = parseFloat(document.getElementById('income').value);
  const extraIncome = parseFloat(document.getElementById('extraIncome').value);
  const deductions = parseFloat(document.getElementById('deductions').value);

  if (isNaN(income) || isNaN(extraIncome) || isNaN(deductions)) {
    showError('Please enter valid numbers.');
    return;
  }

  let taxRate;
  if (age === '<40') {
    taxRate = 0.3;
  } else if (age === '>=40&<60') {
    taxRate = 0.4;
  } else {
    taxRate = 0.1;
  }

  const taxableIncome = income + extraIncome - deductions;
  const taxAmount = taxableIncome > 800000 ? taxRate * (taxableIncome - 800000) : 0;

  showModal(taxAmount.toFixed(2));
});

function showError(message) {
  document.querySelectorAll('.error').forEach(function(error) {
    error.style.display = 'inline';
    error.setAttribute('title', message);
  });
}

function hideErrors() {
  document.querySelectorAll('.error').forEach(function(error) {
    error.style.display = 'none';
  });
}

function showModal(taxAmount) {
  document.getElementById('taxResult').textContent = `Tax Amount: ${taxAmount}`;
  document.getElementById('modal').style.display = 'block';
}

document.querySelector('.close').addEventListener('click', function() {
  document.getElementById('modal').style.display = 'none';
});