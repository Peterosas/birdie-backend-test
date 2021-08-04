import app from './application';

//Load application configurations
const appConfig = require('./config/app');
const PORT = appConfig.PORT || 10000;

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server started at ${appConfig.URL}:${PORT}`);
});
