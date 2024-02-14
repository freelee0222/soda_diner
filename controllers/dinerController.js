const Diner = require('../models/diner');
const Soda = require('../models/soda')

module.exports = {
  dinerForm(req, res) {
    Soda.find()
      .then(sodas => {
        res.render('pages/diner-form', { sodas })
      })
  },
  readDiners(req, res) {
    Diner.find()
      .then(diners => res.render('pages/diner-list', { diners }))
      .catch(err => res.status(500).json(err))
  },
  readDinerDetails(req, res) {
    const { id } = req.params
    Diner.findOne({ _id: id })
      .then(diner => {
        Soda.find({}, { name: 1, isServed: 1, _id: 0 })
          .then(sodas => {
            let sodaArr = [];
            sodas.forEach(soda => {
              if (soda.isServed && diner.sodas.includes(soda.name)) {
                sodaArr.push(" " + soda.name)
              }
            })
            res.render('pages/diner-details', { diner, sodaArr })
          })
      })
      .catch(err => res.status(500).json(err))
  },
  createDiner(req, res) {
    const { body } = req
    Diner.create(body)
      .then(diner => res.json(diner))
      .catch(err => {
        res.status(500).json(err)
      })
  },
  deleteDiner(req, res) {
    const { id } = req.params
    Diner.findByIdAndDelete(id)
      .then(diner => res.json(diner))
      .catch(err => res.status(500).json(err))
  },
  addSodaForm(req, res) {
    const { id } = req.params
    Diner.findOne({ _id: id })
      .then(diner => {
        Soda.find({}, { name: 1, isServed: 1, _id: 0 })
          .then(sodas => {
            res.render('pages/diner-addSoda', { diner, sodas })
          })
      })
      .catch(err => res.status(500).json(err))
  },
  deleteSodaForm(req, res) {
    const { id } = req.params
    Diner.findOne({ _id: id })
      .then(diner => {
        Soda.find({}, { name: 1, isServed: 1, _id: 0 })
          .then(sodas => {
            res.render('pages/diner-deleteSoda', { diner, sodas })
          })
      })
      .catch(err => res.status(500).json(err))
  },
  addSoda(req, res) {
    const { id } = req.params
    const { body } = req;
    let newSodas = [...body];
    Diner.findOne({ _id: id })
      .then(diner => {
        newSodas.push(...diner.sodas)
      })
      .then(() => {
        Diner.findByIdAndUpdate({ _id: id }, { sodas: newSodas })
          .then(() => Diner.findById({ _id: id }))
          .then(diner => {
            res.send(diner);
          })
          .catch(err => res.status(500).json(err))
      })
      .catch(err => res.status(500).json(err))
  },
  deleteSoda(req, res) {
    const { id } = req.params
    const { body } = req;
    Diner.findOne({ _id: id })
      .then(diner => {
        sodaList = diner.sodas
        body.forEach(sodaToRemove => {
          sodaList.splice(sodaList.indexOf(sodaToRemove), 1);
        })
      })
      .then(() => {
        Diner.findByIdAndUpdate({ _id: id }, { sodas: sodaList })
          .then(() => Diner.findById({ _id: id }))
          .then(diner => {
            res.send(diner);
          })
          .catch(err => res.status(500).json(err))
      })
      .catch(err => res.status(500).json(err))
  }
}