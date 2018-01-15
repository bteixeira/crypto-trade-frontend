const TransactionModel = Backbone.Model.extend({
	getAccount () {
		return new AccountModel(this.get('account')[0])
	},

	getTraded () {
		var currency = new CurrencyModel(this.get('tradedCurrency')[0])
		return new AmountModel(currency, this.get('tradedAmount'))
	},

	getPayment () {
		var currency = new CurrencyModel(this.get('paymentCurrency')[0])
		return new AmountModel(currency, this.get('paymentAmount'))
	},

	getFee () {
		var currency = new CurrencyModel(this.get('feeCurrency')[0])
		return new AmountModel(currency, this.get('feeAmount'))
	},

	getTimestamp () {
		return new Date(this.get('timestamp'))
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
		result += traded + ' for ' + this.getPayment()
		const price = paymentAmount / traded.getAmount()
		result += ` (@ ${price} ${this.getPayment().getSymbol()}/${traded.getSymbol()})`
		return result
	},
})
