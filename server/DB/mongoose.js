var mongoose = require('mongoose')

mongoose.Promise =global.Promise;
mongoose.connect('mongodb://ilsaqa1997:mainmethod1@ds141815.mlab.com:41815/todo', { useNewUrlParser: true })

module.exports={mongoose};
