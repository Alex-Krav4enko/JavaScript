var enter = document.querySelector('.block');
var inform = document.querySelector('.inform');
var form = document.querySelector('.form');
var email = document.querySelector('.email');
var password = document.querySelector('.password');
var page = document.querySelector('.body');
var buttonOut = document.querySelector('.button_out');
var fullName = document.querySelector('.inform_name');
var country = document.querySelector('.inform_country');
var hobbies = document.querySelector('.inform_hobbies');
var userpic = document.querySelector('.inform__img');
var newElem = document.createElement('div');

form.appendChild(newElem);
newElem.classList.add('form__eror');

var preload = document.createElement('img');
preload.classList.add('preload');
preload.setAttribute('src', '2.gif');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    var value1 = email.value;
    var value2 = password.value;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://netology-hj-ajax.herokuapp.com/homework/login_json');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    var body = 'email=' + encodeURIComponent(value1) + '&password=' + encodeURIComponent(value2);

    xhr.addEventListener('loadstart', function() {
        enter.style.display = 'none';
        page.appendChild(preload);
    });

    xhr.addEventListener('load', function() {
        if (xhr.status === 200) {
            var person = JSON.parse(xhr.responseText);
            inform.style.display = 'block';

            userpic.setAttribute('src', person.userpic);
            fullName.innerHTML = person.name + ' ' + person.lastname;
            country.innerHTML = person.country;
            hobbies.innerHTML = person.hobbies[0] + ', ' + person.hobbies[1] + ', ' + person.hobbies[2] + ', ' + person.hobbies[3] + ', ';
        } else if (xhr.status === 401) {
            enter.style.display = 'block';
            if (newElem.innerHTML == '') {
                newElem.innerHTML = 'Не удается войти. Пожалуйста, проверьте правильность логина и пароля.';
                newElem.style.marginTop = 30 + 'px';
            }
        }
    });

    xhr.addEventListener('loadend', function() {
        preload.remove();
    });

    xhr.send(body);

    buttonOut.onclick = btnClick;

    function btnClick() {
        inform.style.display = 'none';
        newElem.innerHTML = '';
        newElem.style.marginTop = 0;
        enter.style.display = 'block';
    }

});
