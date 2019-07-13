const Aservant = require("express");
const servant = Aservant();
servant.use(Aservant.json()); // make request.body accessible during a post request
servant.use(Aservant.urlencoded({ extended: true }));
servant.use(Aservant.static("public"));
const phoneNumber = process.env.PORT || 3000;
function storeNotice() {
  console.log(`To buy anything from our store call : ${phoneNumber}`);
}
servant.listen(phoneNumber, storeNotice);
