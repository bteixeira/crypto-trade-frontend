const Utils = {
	formatMoney (currency, amount, digits) {
		digits = parseInt(digits, 10)
		if (isNaN(digits)) {
			digits = 8
		}
		amount = parseFloat(amount)
		if (isNaN(amount)) {
			throw 'Invalid number'
		}
		const symbol = String(currency.symbol)
		var formatted
		if (symbol in this.formatters) {
			formatted = this.formatters[symbol](amount)
		} else {
			formatted = `${symbol.toUpperCase()} ${amount.toFixed(digits)}`
		}
		return `<span class="money-pill -${symbol.toLowerCase()}">${formatted}</span>`
	},
	formatters: {
		EUR (amount) {
			return `&euro; ${amount.toFixed(2)}`
		}
	},
}
