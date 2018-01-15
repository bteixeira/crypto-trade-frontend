const AmountModel = Backbone.Model.extend({
	constructor: function (currency, amount) {
		Backbone.Model.apply(this)
		this.set('currency', new CurrencyModel(currency))
		this.set('amount', amount)
	},

	format () {
		return Utils.formatMoney({symbol: this.getSymbol()}, this.getAmount())
	},

	getAmount () {
		return this.get('amount')
	},

	getCurrency () {
		return this.get('currency')
	},

	getSymbol () {
		return this.getCurrency().getSymbol()
	},

	neg () {
		return new AmountModel(this.getCurrency(), -this.getAmount())
	},

	abs () {
		return new AmountModel(this.getCurrency(), Math.abs(this.getAmount()))
	},

	toString () {
		return this.format()
	},
})
