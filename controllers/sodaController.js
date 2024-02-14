const Soda = require('../models/soda');

module.exports = {
  sodaForm(req, res) {
    res.render('pages/soda-form')
  },
  readSodas(req, res) {
    Soda.find()
      .then(sodas => res.render('pages/soda-list', { sodas }))
      .catch(err => res.status(500).json(err))
  },
  readSodaDetails(req, res) {
    const { id } = req.params;
    Soda.findOne({ _id: id })
      .then(soda => res.render('pages/soda-details', { soda }))
      .catch(err => res.status(500).json(err))
  },
  createSoda(req, res) {
    const { body } = req
    Soda.create(body)
      .then(soda => res.json(soda))
      .catch(err => res.status(500).json(err))
  },
  deleteSoda(req, res) {
    const { id } = req.params
    Soda.findByIdAndDelete(id)
      .then(soda => res.json(soda))
      .catch(err => res.status(500).json(err))
  },
  serveSodaStop(req, res) {
    const { id } = req.params
        Soda.findByIdAndUpdate({ _id: id }, { isServed: false })
            .then(() => Soda.findById({ _id: id }))
            .then(soda => res.send(soda))
            .catch(err => res.status(500).json(err))
  },
  serveSodaStart(req, res) {
    const { id } = req.params
    Soda.findByIdAndUpdate({ _id: id }, { isServed: true })
            .then(() => Soda.findById({ _id: id }))
            .then(soda => res.send(soda))
            .catch(err => res.status(500).json(err))
  }
}