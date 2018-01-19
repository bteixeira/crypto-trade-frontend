$.ajaxSetup({
	headers: {
		'x-apikey': '5a579c517d7ef24c5cf08be9',
	}
})

const balance = (function () {
	var balance = new Map()

	function getWallet (name) {
		name = name || ''
		if (!balance.has(name)) {
			balance.set(name, new MultiAmountModel())
		}
		return balance.get(name)
	}

	return {
		get (currency, wallet) {
			wallet = getWallet(wallet)
			return wallet.get(currency)
		},
		getAll (wallet) {
			return getWallet(wallet)
		},
		add (amount, walletName) {
			var wallet = getWallet(walletName)
			wallet.add(amount)
			if (walletName) {
				this.add(amount) // Add it to global wallet
			}
		},
		reset () {
			balance = new Map()
		}
	}
}())

// const currencies = new CurrencyCollection()
// currencies.fetch().then(() => {
// 	const $select = $('#select-currencies')
// 	currencies.forEach(currency => {
// 		$select.append(`<option value="${currency.getSymbol()}">${currency.getSymbol()}</option>`)
// 	})
// 	$select.on('change', () => {
// 		filters.currency = $select.val()
// 		updateTransactions()
// 	})
// })
//
// const accounts = new AccountCollection()
// accounts.fetch().then(() => {
// 	const $select = $('#select-accounts')
// 	accounts.forEach(account => {
// 		$select.append(`<option value="${account.getName()}">${account.getName()}</option>`)
// 	})
// 	$select.on('change', () => {
// 		filters.account = $select.val()
// 		updateTransactions()
// 	})
// })

const transactions = new TransactionCollection()
new TransactionTableView({
	el: '#table-transactions',
	collection: transactions,
})
transactions.fetch()

const filters = {
	currency:'XRP',
}
function passFilter (transaction) {
	if (
		filters.currency &&
		transaction.getTraded().getCurrency().getSymbol() !== filters.currency &&
		transaction.getPayment().getCurrency().getSymbol() !== filters.currency &&
		transaction.getFee().getCurrency().getSymbol() !== filters.currency
	) {
		return false
	}

	if (
		filters.account && transaction.getAccount().getName() !== filters.account
	) {
		return false
	}

	return true
}
