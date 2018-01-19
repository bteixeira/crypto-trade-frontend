const SelectAccountsView = Backbone.View.extend({
	initialize () {
		this.listenTo(this.collection, 'sync change', this.render)
		this.$el.on('change', () => {
			filters.account = this.$el.val()
			transactionsView.render()
		})
		this.render()
	},
	render () {
		this.collection.forEach(account => {
			this.$el.append(`<option value="${account.getName()}">${account.getName()}</option>`)
		})
	}
})