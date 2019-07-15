const dataBase = require("./database");
dataBase.mongoose
  .connect("mongodb://localhost/LogisticsDB", { useNewUrlParser: true })
  .then(() => {
    console.log("connected to mongo db...");
  })
  .catch(error => {
    console.log("could not connect to mongo db");
  });
const Aservant = require("express");
const servant = Aservant();
servant.use(Aservant.json()); // make request.body accessible during a post request
servant.use(Aservant.urlencoded({ extended: true }));
servant.use(Aservant.static("public"));
const phoneNumber = process.env.PORT || 4000;
function storeNotice() {
  console.log(`To buy anything from our store call : ${phoneNumber}`);
}
servant.listen(phoneNumber, storeNotice);

//=====================================REQUESTS1 POST===================================================

servant.post(
  "/wh/products",

  async function(request, response) {
    try {
      const product = new dataBase.Product({
        name: request.body.name,
        location: request.body.location,
        size: request.body.size,
        nsn: Number(request.body.nsn)
      });

      const savedObject = await product.save();
      response.status(200).send(savedObject);
    } catch (er) {
      let striga = "";
      for (let prop in er.errors) {
        console.log(er.errors[prop].message);
        striga += er.errors[prop].message + "\n";
      }

      response
        .status(400)
        .send(striga.replace(/`/g, "").replace(/path/gi, "field"));
    }
  }
);

//=====================================REQUESTS2===================================================
servant.get(
  "/products/:nsn/:location",

  function(request, response) {
    async function getProducts() {
      const matchObjects = await dataBase.Product.find({
        nsn: request.params.nsn,
        location: request.params.location
      });
      response.status(200).send(matchObjects);
    }
    getProducts();
  }
);

//=====================================REQUESTS3===================================================

servant.put(
  "/products/:nsn/:oldlocation/:quantity/:newlocation",

  function(request, response) {
    async function updateLocation(nloc) {
      const result = await dataBase.Product.update(
        { nsn: request.params.nsn, location: request.params.oldlocation },
        {
          $set: {
            location: nloc
          }
        }
      );

      response.status(200).send(result);
    }
    updateLocation(request.params.newlocation);
  }
);

servant.get(
  "/products",

  function(request, response) {
    async function getAllProducts() {
      const matchObjects = await dataBase.Product.find();
      response.status(200).send(matchObjects);
    }
    getAllProducts();
  }
);
