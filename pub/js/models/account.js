const AccountModel = Backbone.Model.extend({
	getName () {
		return this.get('name')
	},
})