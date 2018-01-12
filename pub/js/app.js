$.ajaxSetup({
	headers: {
		'x-apikey': '5a579c517d7ef24c5cf08be9',
	}
})

const accounts = new AccountCollection()
accounts.fetch({success: () => {
	accounts.forEach(account => {
		$('body').append(`<div>Account: ${account.get('name')}</div>`)
	})
	$('body').append(`<hr/>`)
}})