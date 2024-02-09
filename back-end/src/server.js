const app = require('./app')
const connectDatabase = require('./config/database')

connectDatabase();



app.listen(3001, () => {
  console.log('Server started ')
})