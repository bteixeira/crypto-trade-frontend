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
		var multi = new MultiAmountModel()
		multi.add(this.getPayment())
		multi.add(this.getFee())
		return multi
	},

	getPrice () {
		const price = this.getPayment().getAmount() / this.getTraded().getAmount()
		return `${price.toFixed(4)} ${this.getPayment().getSymbol()}/${this.getTraded().getSymbol()}`
	},
	getCurrencies () {
		var amounts = [this.getTraded(), this.getPayment(), this.getFee()]
		amounts = amounts.map(a => a.getCurrency())
		return _.uniq(amounts, false, a => a.getSymbol())
	},
	format () {
		var result = ''
		var traded = this.getTraded()
		if (traded.getAmount() > 0) {
			result += '<strong>BUY</strong> '
		} else if (traded.getAmount() < 0) {
			result += '<strong>SELL</strong> '
			traded = traded.neg()
		}
		result += traded + ' for ' + this.getPayment()
		return result
	},
})
