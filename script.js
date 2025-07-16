let clickCount = 0;
const maxClicks = 5;

const whatsappBtn = document.getElementById('whatsappBtn');
const clickCounter = document.getElementById('clickCounter');
const form = document.getElementById('registrationForm');
const successMessage = document.getElementById('successMessage');
const submitBtn = document.getElementById('submitBtn');

// Prevent resubmission
if (localStorage.getItem('submitted') === 'true') {
  disableForm();
}

whatsappBtn.addEventListener('click', () => {
  if (clickCount < maxClicks) {
    clickCount++;
    clickCounter.textContent = `Click count: ${clickCount}/${maxClicks}`;

    const message = "Hey Buddy, Join Tech For Girls Community";
    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  }

  if (clickCount === maxClicks) {
    whatsappBtn.disabled = true;
    clickCounter.textContent = "Sharing complete. Please continue.";
  }
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (clickCount < maxClicks) {
    alert('Please complete WhatsApp sharing before submitting.');
    return;
  }

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const college = document.getElementById('college').value;
  const screenshotFile = document.getElementById('screenshot').files[0];

  // Prepare form data
  const formData = new FormData();
  formData.append('name', name);
  formData.append('phone', phone);
  formData.append('email', email);
  formData.append('college', college);
  formData.append('screenshot', screenshotFile);

  // Replace this with your deployed Google Apps Script Web App URL
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwyUexf8u4g5zPIMdiLGULTKsXa29snBMf0jzXrwfzmhV255u86p_uzJYBV5PQMgsmX/exec';

  try {
    const response = await fetch(scriptURL, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      localStorage.setItem('submitted', 'true');
      disableForm();
      successMessage.classList.remove('hidden');
    } else {
      alert('Something went wrong. Try again.');
    }
  } catch (error) {
    console.error('Error!', error.message);
    alert('Submission failed.');
  }
});

function disableForm() {
  form.querySelectorAll('input, button').forEach((el) => el.disabled = true);
  successMessage.classList.remove('hidden');
}
