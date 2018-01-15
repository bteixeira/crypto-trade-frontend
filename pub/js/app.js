$.ajaxSetup({
	headers: {
		'x-apikey': '5a579c517d7ef24c5cf08be9',
	}
})

const $tbody = $('#table-transactions tbody')

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
currencies.fetch().then(() => {
	const $select = $('#select-currencies')
	currencies.forEach(currency => {
		$select.append(`<option value="${currency.getSymbol()}">${currency.getSymbol()}</option>`)
	})
	$select.on('change', () => {
		filters.currency = $select.val()
		updateTransactions()
	})
})

const accounts = new AccountCollection()
accounts.fetch().then(() => {
	const $select = $('#select-accounts')
	accounts.forEach(account => {
		$select.append(`<option value="${account.getName()}">${account.getName()}</option>`)
	})
	$select.on('change', () => {
		filters.account = $select.val()
		updateTransactions()
	})
})

const transactions = new TransactionCollection()
transactions.fetch({success: () => {
	updateTransactions()
}})

const filters = {}
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

function updateTransactions () {
	$tbody.empty()
	balance.reset()
	transactions.forEach(transaction => {
		var traded = transaction.getTraded()
		var payment = transaction.getPayment()
		var fee = transaction.getFee()
		const accountName = transaction.getAccount().getName()
		balance.add(traded, accountName)
		if (traded.getAmount() < 0) {
			balance.add(payment, accountName)
		} else {
			balance.add(payment.neg(), accountName)
		}
		balance.add(fee.neg(), accountName)
		if (passFilter(transaction)) {
			$tbody.append(`
				<tr>
					<td>${transaction.getTimestamp().toLocaleDateString()} ${transaction.getTimestamp().toLocaleTimeString()}</td>
					<td>${accountName}</td>
					<td>${transaction.format()}</td>
					<td>${transaction.getPrice()}</td>
					<td>${fee}</td>
					<td>${transaction.getTotal()}</td>
					<td>${balance.getAll(accountName)}</td>
					<td>${balance.getAll()}</td>
					<td>${transaction.get('blockchainRef')}</td>
					<td>${transaction.get('observations')}</td>
				</tr>
			`)
		}
	})
}