$.ajaxSetup({
	headers: {
		'x-apikey': '5a579c517d7ef24c5cf08be9',
	}
})

const $table = $('#table-transactions tbody')

const transactions = new TransactionCollection()
transactions.fetch({success: () => {
	transactions.forEach(transaction => {
		$table.append(`
			<tr>
				<td>${transaction.get('timestamp')}</td>
				<td>${transaction.getAccount().name}</td>
				<td>${transaction.format()}</td>
				<td>${transaction.getFee()}</td>
				<td>${transaction.getTotal()}</td>
				<td></td>
				<td></td>
				<td>${transaction.get('blockchainRef')}</td>
				<td>${transaction.get('observations')}</td>
			</tr>
		`)
	})
}})
