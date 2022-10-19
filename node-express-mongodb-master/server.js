const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json())

app.use(express.urlencoded({extended: true}))

const db = require("./app/models")
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifedTopology: true
  })
  .then(() => {
    console.log("Conectado ao banco")
  })
  .catch(err => {
    console.log("Erro ao conectar ao banco de dados",err);
    process.exit()
  })

  // simple routes
  app.get("/",(req,res) =>{
    res.json({message:"Bem vindo a aplicação"})
  })

  require("./app/routes/tutorial.routes")(app)

  // set port, listen for request
  const PORT = process.env.PORT || 8080;
  app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
  });
