// initial Demo Ticket Information and while confirm ticket this format will send to serve
const ticketInfo = [
	{
		from: null,
		to: null,
		date: null,
		id: '1xyz',
		price: 150,
		class: 'First Class',
		quantity: 1,
	},
	{
		from: null,
		to: null,
		date: null,
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

// Update Ticket Information
function ticketInfoUpdate(ticketUniqueId, operationType) {
	let quantity = document.querySelector(`#class${ticketUniqueId}`);
	for (let i = 0; i < ticketInfo.length; i++) {
		if (ticketUniqueId == ticketInfo[i].id) {
			if (operationType == 'decrease') {
				// validate ticket quantity if less then 1 then show some massage
				if (ticketInfo[i].quantity > 1) {
					// since  i can't manage  realtime event from dom, by input data in input field that's why i product increases  and multiply  using plus and minus button event
					ticketInfo[i].quantity = ticketInfo[i].quantity - 1;
					subTotalPrice = subTotalPrice - ticketInfo[i].price;

					// quantity value Direct update in dom
					// quantity.value = parseInt(quantity.value) - 1;
					quantity.value = ticketInfo[i].quantity;
				} else {
					massage('<p>Sorry Minimum Order Quantity 1<p/>');
				}
			} else {
				ticketInfo[i].quantity = ticketInfo[i].quantity + 1;
				subTotalPrice = subTotalPrice + ticketInfo[i].price;

				// quantity value Direct update in dom
				// quantity.value = parseInt(quantity.value) + 1;
				quantity.value = ticketInfo[i].quantity;
				console.log(ticketInfo[i].quantity);
			}
		}
	}
	// After all re render total price
	renderTotalPrice(subTotalPrice);
}

// Massage
function massage(msg) {
	const massageDom = document.querySelector('.massage');
	massageDom.innerHTML = msg;
	document.querySelector('.model').style.display = 'flex';
}

// Massage Close
document.querySelector('#close').addEventListener('click', function () {
	document.querySelector('.model').style.display = 'none';
});

// Destination setup
function setDestination(destinationType, destination) {
	for (let i = 0; i < ticketInfo.length; i++) {
		ticketInfo[i][destinationType] = destination;
	}
}

//journey   From
document.querySelector('#from').addEventListener('keyup', function (e) {
	setDestination('from', e.target.value);
});

//journey   To
document.querySelector('#to').addEventListener('keyup', function (e) {
	setDestination('to', e.target.value);
});

// Ticket Increases
function increasesTicket(ticketUniqueId) {
	ticketInfoUpdate(ticketUniqueId, 'increases');
	console.log(ticketInfo);
}

// Ticket Decrease
function decreaseTicket(ticketUniqueId) {
	ticketInfoUpdate(ticketUniqueId, 'decrease');
	console.log(ticketInfo);
}

// Buy option
document.querySelector('#buy__btn').addEventListener('click', function () {
	const buyMassage = `
        <div>
        <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Class</th>
            <th scope="col">From</th>
            <th scope="col">To</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>${ticketInfo[0].class}</td>
            <td>${ticketInfo[0].from}</td>
            <td>${ticketInfo[0].to}</td>
            <td>${ticketInfo[0].quantity}</td>
            <td>$ ${ticketInfo[0].price}</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>${ticketInfo[1].class}</td>
            <td>${ticketInfo[0].from}</td>
            <td>${ticketInfo[0].to}</td>
            <td>${ticketInfo[1].quantity}</td>
            <td>$ ${ticketInfo[1].price}</td>
          </tr>
          <tr>
            <th scope="row"></th>
            <td colspan="4">Sub Total</td>
            <td>$ ${subTotalPrice}</td>
          </tr>
          <tr>
            <th scope="row"></th>
            <td colspan="4">TAX/VAT (10%)</td>
            <td>$ ${(10 / 100) * subTotalPrice}</td>
          </tr>
          <tr>
            <th scope="row"></th>
            <td colspan="4">Total</td>
            <td>$ ${(10 / 100) * subTotalPrice + subTotalPrice}</td>
          </tr>
        </tbody>
      </table>

      <p>Your Ticket Is Confirmed </p>
        </div>
    `;

	if (ticketInfo[0].from != null && ticketInfo[0].to != null) {
		massage(buyMassage);
	} else {
		massage('<p>Please Choice Your Destination First</p>');
	}
	// console.log('error');
});
