$.ajaxSetup({
	headers: {
		'x-apikey': '5a579c517d7ef24c5cf08be9',
	}
})

const $table = $('#table-transactions tbody')

const balance = (function () {
	const balance = {}

	function getWallet (name) {
		name = name || ''
		var wallet = balance[name]
		if (!wallet) {
			wallet = balance[name] = {}
		}
		return wallet
	}

	return {
		get (currency, wallet) {
			wallet = getWallet(wallet)
			if (currency in wallet) {
				return wallet[currency]
			} else {
				return 0
			}
		},

		add (amount, currency, walletName) {
			amount = parseFloat(amount)
			if (isNaN(amount)) {
				throw 'Tried to add an invalid amount'
			}
			var wallet = getWallet(walletName)
			if (!(currency in wallet)) {
				wallet[currency] = 0
			}
			wallet[currency] += amount
			if (walletName) {
				this.add(amount, currency) // Add it to global wallet
			}
		}
	}
}())

const transactions = new TransactionCollection()
transactions.fetch({success: () => {
	transactions.forEach(transaction => {
		var traded = transaction.getTraded()
		balance.add(traded.getAmount(), traded.getSymbol(), transaction.getAccount().name)
		if (traded.getAmount() < 0) {
			balance.add(transaction.getPaymentAmount(), transaction.getPaymentCurrency().symbol, transaction.getAccount().name)
		} else {
			balance.add(-transaction.getPaymentAmount(), transaction.getPaymentCurrency().symbol, transaction.getAccount().name)
		}
		balance.add(-transaction.getFeeAmount(), transaction.getFeeCurrency().symbol, transaction.getAccount().name)
		$table.append(`
			<tr>
				<td>${transaction.get('timestamp')}</td>
				<td>${transaction.getAccount().name}</td>
				<td>${transaction.format()}</td>
				<td>${transaction.getFeeFormatted()}</td>
				<td>${transaction.getTotal()}</td>
				<td>${balance.get(traded.getSymbol(), transaction.getAccount().name)} ; ${balance.get(transaction.getPaymentCurrency().symbol, transaction.getAccount().name)}</td>
				<td>${balance.get(traded.getSymbol())} ; ${balance.get(transaction.getPaymentCurrency().symbol)}</td>
				<td>${transaction.get('blockchainRef')}</td>
				<td>${transaction.get('observations')}</td>
			</tr>
		`)
	})
}})
