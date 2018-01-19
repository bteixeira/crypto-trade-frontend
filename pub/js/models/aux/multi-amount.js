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
	only (...currencies) {
		const other = new MultiAmountModel()
		const keys = _.uniq(currencies.map(c => c.getSymbol()))
		keys.forEach(k => {
			const amount = this._amounts.get(k)
			if (amount) {
				other.add(amount)
			}
		})
		return other
	},
	add (amount) {
		const symbol = amount.getCurrency().getSymbol()
		var _amount = this._amounts.get(symbol)
		if (_amount) {
			_amount = new AmountModel(amount.getCurrency(), _amount.getAmount() + amount.getAmount())
		} else {
			_amount = amount
		}
		this._amounts.set(symbol, _amount)
	},
	format () {
		return `<ul>${
			Array.from(this._amounts.values()).map(am => `<li>${am}</li>`).join('')
			}</ul>`
	},
	toString () {
		return this.format()
	}
})
