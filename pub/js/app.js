$.ajaxSetup({
	headers: {
		'x-apikey': '5a579c517d7ef24c5cf08be9',
	}
})

const $tbody = $('#table-transactions tbody')

const balance = (function () {
	const balance = new Map()

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
	}
}())

const transactions = new TransactionCollection()
transactions.fetch({success: () => {
	$tbody.empty()
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
		$tbody.append(`
			<tr>
				<td>${transaction.getTimestamp()}</td>
				<td>${accountName}</td>
				<td>${transaction.format()}</td>
				<td>${fee}</td>
				<td>${transaction.getTotal()}</td>
				<td>${balance.getAll(accountName)}</td>
				<td>${balance.getAll()}</td>
				<td>${transaction.get('blockchainRef')}</td>
				<td>${transaction.get('observations')}</td>
			</tr>
		`)
	})
}})
