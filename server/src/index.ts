import environmentConfig from "./config/environment.config";
import app from "./config/express.config";

console.log(environmentConfig);

//hello
app.listen(environmentConfig.PORT, () => {
  console.log("Server is started on port :", environmentConfig.PORT);
});
