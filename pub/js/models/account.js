const AccountModel = Backbone.Model.extend({
	getId () {
		return this.get('_id')
	},
	getName () {
		return this.get('name')
	},
})