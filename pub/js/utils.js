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
	padd (num, digits) {
		val = (new Array(digits + 1).join('0')) + num
		val = val.slice(val.length - digits)
		return val
	},
	formatDate (date) {
		return `${Utils.padd(date.getFullYear(), 4)}-${Utils.padd(date.getMonth() + 1, 2)}-${Utils.padd(date.getDate(), 2)}T${Utils.padd(date.getHours(), 2)}:${Utils.padd(date.getMinutes(), 2)}`
	},
}
