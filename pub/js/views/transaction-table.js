const TransactionTableView = Backbone.View.extend({
	initialize () {
		this.listenTo(this.collection, 'sync change destroy', this.render)
		this.render()
		this.$el.on('click', '.js-delete', function () {
			if (window.confirm('Delete this transaction?')) {
				const $row = $(this).closest('.transaction-row')
				const id = $row.data('transaction-id')
				const model = transactions.get(id)
				model.destroy({wait: true})
			}
		})
	},
	render () {
		const $tbody = this.$('tbody')
		$tbody.empty()
		balance.reset()
		this.collection.forEach(transaction => {
			const traded = transaction.getTraded()
			const payment = transaction.getPayment()
			const fee = transaction.getFee()
			const accountName = transaction.getAccount().getName()
			const currencies = transaction.getCurrencies()
			balance.add(traded, accountName)
			if (traded.getAmount() < 0) {
				balance.add(payment, accountName)
			} else {
				balance.add(payment.neg(), accountName)
			}
			balance.add(fee.neg(), accountName)
			if (passFilter(transaction)) {
				$tbody.append(`
				<tr class="transaction-row" data-transaction-id="${transaction.cid}">
					<td>${transaction.getTimestamp().toLocaleDateString()} ${transaction.getTimestamp().toLocaleTimeString()}</td>
					<td>${accountName}</td>
					<td>${transaction.format()}</td>
					<td>${transaction.getPrice()}</td>
					<td>${fee.getAmount() ? fee : ''}</td>
					<td>${transaction.getTotal()}</td>
					<td>${balance.getAll(accountName).only(...currencies)}</td>
					<td>${balance.getAll().only(...currencies)}</td>
					<td>${transaction.get('blockchainRef')}</td>
					<td>${transaction.get('observations')}</td>
					<td><span class="action js-edit glyphicon glyphicon-pencil"/></td>
					<td><span class="action js-delete glyphicon glyphicon-remove"/></td>
				</tr>
			`)
			}
		})
	}
})