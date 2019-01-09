const moment          = require('moment')
const { updateSheet } = require('../lib/update')

exports.transformTransactionsToUpdates = function (transactions) {
	/**
	 * Implement your custom logic of transforming transactions into
	 * Google Sheet cell updates.
	 *
	 * Transactions come in the format of:
	 * {
	 *   account: 'paypal',
	 *   name: 'Payment from XXX',
	 *   date: 2019-xx-xx,
	 *   amount: 123
	 * }
	 *
	 * Updates should be in the form of:
	 * {
	 *   range: 'A1',
	 *   value: 123
	 * }
	 */

	if (!transactions.length) {
		return
	}

	let updates = []

	transactions.map(t => {
		updates.push([t.date, t.name, t.amount, t.account])
	})

	console.log('DEBUG: updates to be made:')
	console.log(updates)

	updateSheet(updates)

	return updates
}
