const info = document.querySelector(".alert-info");
const phoneInputField = document.querySelector("#phoneNumber");
const phoneInput = window.intlTelInput(phoneInputField, {
  initialCountry: "auto",
  geoIpLookup: getIp,
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

// document.getElementById('form').addEventListener('submit', submitForm)

const enums = {
  telegram: 'tg',
  viber: 'vb',
  whatsapp: 'wa',
  facebook: 'fb',
  instagram: 'ig',
  diapers: 'dp',
  clothes: 'cl',
  shoes: 'sh',
  other: 'th'
}
const helpForKidsEnums = {
  diapers: 'памперси',
  clothes: 'одяг',
  shoes: 'взуття',
  other: 'інше',
  babyFood: 'дитяче харчування',
  babyUtensils: 'дитячий посуд',
  hygiene: 'засоби гігієни',
  rug: 'пледи',
  toys: 'іграшки'
}

function process(event) {
  event.preventDefault();

  const phoneNumber = phoneInput.getNumber();

  info.style.display = "";
  info.innerHTML = `Номер телефону у форматі E.164: <strong>${phoneNumber}</strong>`;
}

function getIp(callback) {
  fetch('https://ipinfo.io/json?token=63e12ff58a6417', { headers: { 'Accept': 'application/json' }})
    .then(res => res.json())
    .catch(() => {
      return {
        country: 'ua',
      };
    })
    .then(res => callback(res.country));
}

function checkResidence(event, homeResidence) {
  event.preventDefault();

  const residenceInput = document.querySelector('#residence');
  const newResidenceInput = document.querySelector('#new-residence-input');
  const homeResidenceBtn = document.querySelector('#home-residence-btn');
  const newResidenceBtn = document.querySelector('#new-residence-btn');

  if (homeResidence) {
    newResidenceInput.value = residenceInput.value;
    homeResidenceBtn.classList.add('active-residence');
    newResidenceBtn.classList.remove('active-residence');
  } else {
    newResidenceInput.value = '';
    newResidenceBtn.classList.add('active-residence');
    homeResidenceBtn.classList.remove('active-residence');
  }
}

function generateElements(event) {
  event.preventDefault();

  const container = document.querySelector('.kids');
  const numberOfFieldset = Number(event.target.value);

  container.innerHTML = '';

  for (let i = 0; i < numberOfFieldset; i++) {
    container.insertAdjacentHTML('beforeend', generateKidsFieldset());
  }
}

function generateKidsFieldset() {
  return '<div class="kids-fieldset">' +
    '<div class="md-3 kids-fieldset-sex">\n' +
    '<label class="form-label">Стать<span class="required">*</span></label>' +
    '<select class="form-select controller-kids" aria-label="sex" required>\n' +
    '<option selected>Виберіть стать дитини</option>\n' +
    '<option value="Чол">Ч</option>\n' +
    '<option value="Жін">Ж</option>\n' +
    '</select>\n' +
    '</div>\n' +
    '<div class="md-3 kids-fieldset-age">\n' +
    '<label class="form-label">Кількість років<span class="required">*</span></label>\n' +
    '<input type="number" class="form-control controller-kids" required>\n' +
    '</div>\n' +
    '</div>';
}

function checkCheckBox(event) {
  event.preventDefault();

  const el = document.querySelector(`#${enums[event.target.value]}-input`);

  el.value = '';

  if (event.target.checked) {
    el.style.display = 'block';
  } else {
    el.style.display = 'none';
  }
}

function moveValue(event, id) {
  event.preventDefault();

  const targetInput = document.querySelector(`#${id}`);

  targetInput.value = event.target.value;
}

function getAllControllers() {
  return document.getElementsByClassName('controller');
}

function getSocialNetworksCheckboxes() {
  return document.getElementsByClassName('controller-social-network-checkbox');
}

function getKidsHelpCheckboxes() {
  return document.getElementsByClassName('controller-kids-help-checkbox')
}

function getAllKids() {
  return document.getElementsByClassName('controller-kids');
}

function getKidsInfo(kidsInfo, kidsCount) {
  return kidsInfo.reduce((acc, item) => acc + ' ' + item.value, `Кількість дітей: ${kidsCount}. Інформація про дітей:`);
}

function getSocialNetworks() {
  const checkboxes = Array.prototype.slice.call(getSocialNetworksCheckboxes(), 0);
  const filteredItems = checkboxes.filter(item => item.checked);
  const result = filteredItems.reduce((acc, item) => `${acc}${item.value}: ${document.getElementById(`${item.id}-input`).value}, `, '');

  return `Соціальні мережі: ${result}`
}

function getKidsHelp() {
  const checkboxes = Array.prototype.slice.call(getKidsHelpCheckboxes(), 0);
  const filteredItems = checkboxes.filter(item => item.checked);
  const result = filteredItems.reduce((acc, item) => `${acc + helpForKidsEnums[item.value]}${enums[item.value] ? ': ' + document.getElementById(`${item.id}-input`).value : ''}, `, '');

  return `Допомога для дитини: ${result}`
}

function submitForm(event) {
  event.preventDefault();

  const controllers = Array.prototype.slice.call(getAllControllers(), 0);
  const kidsInfo = Array.prototype.slice.call(getAllKids(), 0);
  const form = document.querySelector('#form');

  const result = {
    creds: `ПІБ: ${controllers[0].value}`,
    phoneNumber: `Номер телефону: ${controllers[1].value}`,
    residence: `Прописка: ${controllers[2].value}`,
    home: `Місце проживання: ${controllers[3].value}`,
    family: `Кількість осіб в сім'ї: ${controllers[4].value}`,
    kids: getKidsInfo(kidsInfo, controllers[5].value),
    socialNetworks: getSocialNetworks(),
    kidsHelp: getKidsHelp(),
    adultHelp: `Яку допомогу портібно дорослим: ${controllers[15].value}`,
    changing: `Що змінилось за період війни: ${controllers[16].value}`,
    deliveryCreds: `Доставка ПІБ: ${controllers[17].value}`,
    deliveryNumber: `Доставка номер телефону: ${controllers[18].value}`,
    deliveryCity: `Доставка місто: ${controllers[19].value}`,
    deliveryBuildNumber: `Доставка номер відділення: ${controllers[20].value}`,
    feedback: `Звідки про нас дізнались: ${controllers[21].value}`,
    amAbleToPayForDelivery: `Матиму змогу оплатити доставку гуманітарного відправлення: ${document.getElementById('shippingAgreement').checked ? 'Так' : 'Ні'}`
  };

  if (!form.checkValidity()) {
    event.stopPropagation();
    form.classList.add('was-validated');

    return;
  }

  Email.send({
    Host: "smtp.elasticemail.com",
    Username : "tvoyapidtrumka1@gmail.com",
    Password : "4271570DF4D9B9514B0D5F2E78A446457DF2",
    To : "tvoyapidtrumka1@gmail.com",
    From : "tvoyapidtrumka1@gmail.com",
    Subject : "Анкета",
    Body : `<html lang="ua">${result.creds}<br>
      ${result.phoneNumber}<br>
      ${result.residence}<br>
      ${result.home}<br>
      ${result.family}<br>
      ${result.kids}<br>
      ${result.socialNetworks}<br>
      ${result.kidsHelp}<br>
      ${result.adultHelp}<br>
      ${result.changing}<br>
      ${result.deliveryCreds}<br>
      ${result.deliveryNumber}<br>
      ${result.deliveryCity}<br>
      ${result.deliveryBuildNumber}<br>
      ${result.feedback}<br>
      ${result.amAbleToPayForDelivery}</html>`,
  }).then(message => alert(message));
}

function onClear() {
  const kids = document.querySelector('.kids');

  kids.innerHTML = '';
}
