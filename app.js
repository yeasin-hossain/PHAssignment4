const ticketInfo = [
	{
		id: '1xyz',
		price: 500,
		class: 'First Class',
		quantity: 1,
	},
	{
		id: '2xyz',
		price: 100,
		class: 'Economy Class',
		quantity: 1,
	},
];

// Initial price for increases or decreases
let subTotalPrice = 0;

// render total price
const subTotalPriceDom = document.querySelector('#subTotal__Price');
const totalPriceDom = document.querySelector('#total__price');
const totalTexDom = document.querySelector('#tex');
function renderTotalPrice(totalPrice) {
	const tex = (10 / 100) * totalPrice;
	const texTotal = tex.toFixed(2);
	subTotalPriceDom.innerText = `$ ${totalPrice}`;
	totalTexDom.innerText = `$ ${texTotal}`;
	totalPriceDom.innerText = `$ ${totalPrice + tex}`;
}

// Calculate total price from ticket info
function calculateTotalPrice(ticketInfo) {
	let total = 0;
	ticketInfo.map((price) => {
		total = price.price + total;
	});
	subTotalPrice = total;
	renderTotalPrice(subTotalPrice);
}
calculateTotalPrice(ticketInfo);

// Ticket Increases

function increasesTicket(ticketUniqueId) {
	let quantity = document.querySelector(`#class${ticketUniqueId}`);
	quantity.value = parseInt(quantity.value) + 1;
	for (let i = 0; i < ticketInfo.length; i++) {
		if (ticketUniqueId == ticketInfo[i].id) {
			ticketInfo[i].quantity = ticketInfo[i].quantity + 1;
			console.log(ticketInfo[i].quantity);
			subTotalPrice = subTotalPrice + ticketInfo[i].price;
		}
	}
	renderTotalPrice(subTotalPrice);
	console.log(ticketInfo);
}

// Ticket Decrease
function decreaseTicket(ticketUniqueId) {
	let quantity = document.querySelector(`#class${ticketUniqueId}`);
	for (let i = 0; i < ticketInfo.length; i++) {
		if (ticketUniqueId == ticketInfo[i].id) {
			if (ticketInfo[i].quantity > 1) {
				quantity.value = parseInt(quantity.value) - 1;
				ticketInfo[i].quantity = ticketInfo[i].quantity - 1;
				console.log(ticketInfo[i].quantity);
				subTotalPrice = subTotalPrice - ticketInfo[i].price;
			}
		}
	}
	renderTotalPrice(subTotalPrice);
	console.log(ticketInfo);
}
