const TransactionModel = Backbone.Model.extend({
	getAccount () {
		return this.get('account')[0]
	},

	getTraded () {
		return new AmountModel(this.get('tradedCurrency')[0], this.get('tradedAmount'))
	},

	getPaymentFormatted () {
		return Utils.formatMoney(this.getPaymentCurrency(), this.get('paymentAmount'))
	},

	getPaymentCurrency () {
		return this.get('paymentCurrency')[0]
	},

	getPaymentAmount () {
		return this.get('paymentAmount')
	},

	getFeeFormatted () {
		return Utils.formatMoney(this.getFeeCurrency(), this.get('feeAmount'))
	},

	getFeeCurrency () {
		return this.get('feeCurrency')[0]
	},

	getFeeAmount () {
		return this.get('feeAmount')
	},

	getTotal () {
		return 'TODO'
	},

	format () {
		var result = ''
		var traded = this.getTraded()
		const paymentAmount = this.get('paymentAmount')
		if (traded.getAmount() > 0) {
			result += 'BUY '
		} else if (traded.getAmount() < 0) {
			result += 'SELL '
			traded = traded.neg()
		}
		result += traded + ' for ' + this.getPaymentFormatted()
		const price = paymentAmount / traded.getAmount()
		result += ` (@ ${price} ${this.getPaymentCurrency().symbol}/${traded.getSymbol()})`
		return result
	},
})
