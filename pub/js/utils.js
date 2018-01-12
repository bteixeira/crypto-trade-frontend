const Utils = {
	formatMoney (currency, amount, digits) {
		digits = parseInt(digits, 10)
		if (isNaN(digits)) {
			digits = 8
		}
		amount = parseFloat(amount)
		if (!isNaN(amount)) {
			amount = amount.toFixed(digits)
		}
		return String(currency.symbol).toUpperCase() + ' ' + amount
	},
}
