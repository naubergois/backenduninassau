const db = require("../models");
const Tutorial = db.tutorials;

//criar e salvar um novo tutorials
exports.create = (req, res) => {
  //validar requisição
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!"});
    return;
  }
  //criar um tutorial
  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  //salve Tutorial em database
  tutorial
    .save(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial. "
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req,res)=>{
  const title = req.query.title;
  var condition = title ? {title: {$regex: new RegExp(title),$options: "i"}}:{};

  Tutorial.find(condition)
  .then(data =>{
    res.send(data);
  })
  .catch(err =>{
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });
};

// find a single Tutorial with an id
exports.findOne = (req, res)=>{
  const id = req.params.id;

  Tutorial.findById(id)
  .then(data=>{
    if (!data)
      res.status(404).send({ message: "Not found Tutorial with id "+ id});
    else res.send(data);
  })
  .catch(err =>{
    res
    .status(500)
    .send({ message: "Error retrieving Tutorial with id=" + id});
  })
}
// atualizar o tutorial o id do request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty"
    })
  }
  const id = req.params.id;

  Tutorial.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
  .then(data =>{
    if (!data) {
      res.status(404).send({
        message:"Error updating tutorial with id=" + id
      });
    };
  };

//delete um tutorial com o id especificado na solicitação
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.findByIdAndRemove(id, { useFindAndModify: false })
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot delete Tutorial with Id=${id}. Maybe Tutorial was not found`
      })
    } else {
      res.send({
        message: "Tutorial foi deletado com sucesso"
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Não foi possível deletar o Tutorial com id=" +id
    });
  });
};

// Delete todos os Tutoriais do banco de dados]
exports.deleteAll = (req, res) => {
    Tutorial.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Tutoriais deletados com sucesso!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
          err.message ||"some error ocurred while removing all tutorials."
        });
      });
    };

    //
    exports.findAllPublished = (req, res) => {
      Tutorial.find({published: true })
      .then(data =>);
    })
    .catch(err =>{
      res.status(500).send({
        message:
        err.message || "alguns erros aconteceram "
      });
    }
  );


};
