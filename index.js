var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/dist'));

// views is directory for all template files
app.set('views', __dirname + '/dist');
app.set('view engine', 'jade');

app.get('/', function(request, response) {
  // response.render('index');
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
