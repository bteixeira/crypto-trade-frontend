const MultiAmountModel = Backbone.Model.extend({
	initialize () {
		this._amounts = new Map()
	},
	get (currency) {
		var symbol = currency.getSymbol()
		var amount = this._amounts.get(symbol)
		if (amount) {
			return amount.getAmount()
		} else {
			return 0
		}
	},
	add (amount) {
		const symbol = amount.getCurrency().getSymbol()
		var _amount = this._amounts.get(symbol)
		if (_amount) {
			// _amount = amount.add(_amount)
			_amount = new AmountModel(amount.getCurrency(), _amount.getAmount() + amount.getAmount())
		} else {
			_amount = amount
		}
		this._amounts.set(symbol, _amount)
	},
	format () {
		return Array.from(this._amounts.values()).join(' ')
	},
	toString () {
		return this.format()
	}
})
