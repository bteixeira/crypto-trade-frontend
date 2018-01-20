const TransactionModel = Backbone.Model.extend({
	getAccount () {
		const account = this.get('account')
		if (!account) {
			return null
		}
		return new AccountModel(account[0])
	},
	getTraded () {
		var currency = this.get('tradedCurrency')
		if (!currency) {
			return null
		}
		return new AmountModel(new CurrencyModel(currency[0]), this.get('tradedAmount'))
	},
	getPayment () {
		var currency = this.get('paymentCurrency')
		if (!currency) {
			return null
		}
		return new AmountModel(new CurrencyModel(currency[0]), this.get('paymentAmount'))
	},
	getFee () {
		var currency = this.get('feeCurrency')
		if (!currency) {
			return null
		}
		return new AmountModel(new CurrencyModel(currency[0]), this.get('feeAmount'))
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
	getFieldValue (field) {
		if (field === 'account') {
			var account = this.getAccount()
			if (account) {
				return account.getName()
			}
		}
		if (field === 'tradedCurrency' || field === 'paymentCurrency' || field === 'feeCurrency') {
			var currency = this.get(field)
			if (currency) {
				return currency[0].symbol
			}
		}
		return this.get(field)
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
