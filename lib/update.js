const { google }   = require('googleapis')
const moment       = require('moment')
const oAuth2Client = require('./googleClient')

oAuth2Client.setCredentials({
	access_token:  process.env.SHEETS_ACCESS_TOKEN,
	refresh_token: process.env.SHEETS_REFRESH_TOKEN,
	scope:         process.env.SHEETS_SCOPE,
	token_type:    process.env.SHEETS_TOKEN_TYPE,
	expiry_date:   process.env.SHEETS_EXPIRY_DATE,
})

const sheets = google.sheets({
	version: 'v4',
	auth:    oAuth2Client,
})

exports.updateSheet = async function (updates) {
	sheets.spreadsheets.values.append({
		spreadsheetId:    process.env.SHEETS_SHEET_ID,
		range:            `Sheet1`,
		valueInputOption: `USER_ENTERED`,
		resource:         { values: updates },
	}, (err, res) => {
		if (err) {
			return console.log(`Update failed: ${ err }`)
		}
		console.log(`Success! ${ res.data.updates.updatedCells } cell updated.`)
	})
}
