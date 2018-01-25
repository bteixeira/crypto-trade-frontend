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

const currencies = new CurrencyCollection()
new SelectCurrenciesView({
	el: '.select-currencies',
	collection: currencies,
})
currencies.fetch()

const accounts = new AccountCollection()
new SelectAccountsView({
	el: '.select-accounts',
	collection: accounts,
})
accounts.fetch()

const transactions = new TransactionCollection()
const transactionsView = new TransactionTableView({
	el: '#table-transactions',
	collection: transactions,
})
transactions.fetch()

const filters = {
	// currency:'XRP',
}
$('.js-filter').on('change', (ev) => {
	filters[ev.target.name] = ev.target.value
	transactionsView.render()
})
function passFilter (transaction) {
	if (
		filters.currency &&
		transaction.getTraded().getCurrency().getId() !== filters.currency &&
		(!transaction.getPayment() || transaction.getPayment().getCurrency().getId() !== filters.currency) &&
		(!transaction.getFee() || transaction.getFee().getCurrency().getId() !== filters.currency)
	) {
		return false
	}

	if (
		filters.account && transaction.getAccount().getId() !== filters.account
	) {
		return false
	}

	return true
}

$('.js-add-transaction').on('click', () => {
	Overlay.setTransaction(new TransactionModel())
	Overlay.show()
})