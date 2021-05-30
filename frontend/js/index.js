const form = document.querySelector('.top-banner form');
const input = document.querySelector('.top-banner input');
const msg = document.querySelector('.top-banner .msg');
const list = document.querySelector('.ajax-section .cities');
/*SUBSCRIBE HERE FOR API KEY: https://home.openweathermap.org/users/sign_up*/
const apiKey = '4d8fb5b93d4af21d66a2948710284366';

form.addEventListener('submit', (e) => {
	e.preventDefault();
	let inputVal = input.value;

	//check if there's already a city
	const listItems = list.querySelectorAll('.ajax-section .city');
	const listItemsArray = Array.from(listItems);

	if (listItemsArray.length > 0) {
		const filteredArray = listItemsArray.filter((el) => {
			let content = '';
			//athens,gr
			if (inputVal.includes(',')) {
				//athens,grrrrrr->invalid country code, so we keep only the first part of inputVal
				if (inputVal.split(',')[1].length > 2) {
					inputVal = inputVal.split(',')[0];
					content = el
						.querySelector('.city-name span')
						.textContent.toLowerCase();
				} else {
					content = el.querySelector('.city-name').dataset.name.toLowerCase();
				}
			} else {
				//athens
				content = el.querySelector('.city-name span').textContent.toLowerCase();
			}
			return content == inputVal.toLowerCase();
		});

		if (filteredArray.length > 0) {
			msg.textContent = `You already know the weather for ${
				filteredArray[0].querySelector('.city-name span').textContent
			} ...otherwise be more specific by providing the country code as well 😉`;
			form.reset();
			input.focus();
			return;
		}
	}

	//ajax here
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;
	const ubicacion = document.querySelector('.tiempo');
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			const { main, name, sys, weather } = data;
			const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]['icon']}.svg`;

			const li = document.createElement('li');
			li.classList.add('city');
			console.log('Hola cosa horrible ' + weather[0]['description']);
			const url = `https://api.mymemory.translated.net/get?q=${weather[0]['description']}&langpair=en|es`;

			fetch(url)
				.then((response) => response.json())
				.then((data) => {
					const { responseData } = data;
					console.log(responseData);
					if (responseData.translatedText == 'chub- ascos') {
						responseData.translatedText = 'Chubascos';
					}

					if (
						responseData.translatedText == 'lluvia moderadaweather condition'
					) {
						responseData.translatedText = 'Lluvia Moderada';
					}

					const markup = `
						<h2 class="city-name" data-name="${name},${sys.country}">
						<span>${name}</span>
						<sup>${sys.country}</sup>
						</h2>
						<div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
						<figure>
						<img class="city-icon" src="${icon}" alt="${responseData.translatedText}">
							
						<figcaption>${responseData.translatedText}</figcaption>
						</figure>
					`;
					while (list.hasChildNodes()) {
						list.removeChild(list.lastChild);
						console.log('hola que tal');
					}
					console.log('hola que tal');
					li.innerHTML = markup;
					list.appendChild(li);
					//ubicacion.appendChild(list);
				})
				.catch(() => {
					console.log();
				});

			// const respuesta = await fetch(url);
			// const datos = await respuesta.json();
			// const { responseData } = datos;
			// console.log(datos);
		})
		.catch(() => {
			msg.textContent = 'Perdona, Introce una localidad correcta 😩';
		});

	msg.textContent = '';
	form.reset();
	input.focus();
});
