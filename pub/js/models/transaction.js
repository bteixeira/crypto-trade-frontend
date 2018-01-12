const TransactionModel = Backbone.Model.extend({
	getAccount () {
		return this.get('account')[0]
	},

	getTraded () {
		return Utils.formatMoney(this.getTradedCurrency(), this.get('tradedAmount'))
	},

	getTradedCurrency () {
		return this.get('tradedCurrency')[0]
	},

	getPayment () {
		return Utils.formatMoney(this.getPaymentCurrency(), this.get('paymentAmount'))
	},

	getPaymentCurrency () {
		return this.get('paymentCurrency')[0]
	},

	getFee () {
		return Utils.formatMoney(this.get('feeCurrency')[0], this.get('feeAmount'))
	},

	getTotal () {
		return 'TODO'
	},

	format () {
		var result = ''
		var tradedAmount = this.get('tradedAmount')
		const paymentAmount = this.get('paymentAmount')
		if (tradedAmount > 0) {
			result += 'BUY '
		} else if (tradedAmount < 0) {
			result += 'SELL '
			tradedAmount = -tradedAmount
		}
		result += Utils.formatMoney(this.getTradedCurrency(), tradedAmount) + ' for ' + this.getPayment()
		const price = paymentAmount / tradedAmount
		result += ` (@ ${price} ${this.getPaymentCurrency().symbol}/${this.getTradedCurrency().symbol})`
		return result
	},
})
