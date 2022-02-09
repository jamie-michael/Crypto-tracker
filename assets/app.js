// const getData = (resource) => {
// 	const data = fetch(resource).then((response) => {
// 		if (response.status === 200) {
// 			return response.json();
// 		} else {
// 			console.log('error: not 200');
// 		}
// 	});
//     return data;
// };

// getData('txt.json')
// 	.then((data) => {
// 		console.log(data);
//         document.body.textContent = data.name;
// 	})
// 	.catch((err) => {
// 		console.log('error');
// 	});

// const sixSecondDelay = () => {
// 		return fetch('https://hub.dummyapis.com/delay?seconds=1')
//         .then(res => {return res.json()})
//         .then(data => {
//             console.log(data);
//         });
// };

// const poo = document.querySelector('.display');

// poo.addEventListener('click', () => {
//   console.log('click!!')
// })
// sixSecondDelay();

// const getTodos = async () => {
// 	const response = await twoSecondDelay();
// 	const data = await response.json();
// };

// getTodos().then((data) =>
// 	console.log(data.firstName + ' ' + data.secondName + ' is the best')
// );

const btn = document.querySelector('.search-button');
const searchInput = document.querySelector('.search-input');
const APIBtn = document.querySelector('.api-btn');
const searchResults = document.querySelector('.search-results');
let matchList = document.querySelector('.match-list');


const intToString = (num) => {
    num = num.toString().replace(/[^0-9.]/g, '');
    if (num < 1000) {
        return num;
    }
    let si = [
      {v: 1E3, s: "K"},
      {v: 1E6, s: "M"},
      {v: 1E9, s: "B"},
      {v: 1E12, s: "T"},
      {v: 1E15, s: "P"},
      {v: 1E18, s: "E"}
      ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
        if (num >= si[index].v) {
            break;
        }
    }
    return (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s;
}


const searchInputHandler = async () => {
	const query = searchInput.value
	let matches = [];

	const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false');
	const data = await res.json();
	data.map(coin => {
	if(coin.name.toLowerCase().includes(query.toLowerCase()) || coin.symbol.toLowerCase().includes(query.toLowerCase()) ) {
		if (query !== '') {
				matches.push(coin);
			}
		}
	});

	if (matches.length === 0) {
			matches = [];
		}
	
	outputHTML(matches);
};


const outputHTML = (matches) => {
	if (matches.length > 0) {
		const html = matches.map(match => `
			<li class="">
				<img src="${match.image}" alt="">
				<p>${match.name}</p>
				<p>(${match.symbol.toUpperCase()})</p>
			</li>
				`
				
		).join('')
		matchList.innerHTML = html;
		if (!searchResults.classList.contains('show')) {
				searchResults.classList.toggle('show');
			}
		
	} else {
		matchList.innerHTML = ''
		searchResults.classList.remove('show');


	}
}


// APIBtn.addEventListener('click', APIBtnHandler);
searchInput.addEventListener('input', searchInputHandler);
// btn.addEventListener('click', btnHandler);
