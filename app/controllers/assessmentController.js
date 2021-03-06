var CarsAssessment = require('../models/assessment.js');
var Student = require('../models/student.js');
Q = require('q');
jwt = require('jwt-simple');
var emptyAssessment = require('../../assets/carsAssessmentQuestions.js');

var findAssessment = Q.nbind(CarsAssessment.findOne, CarsAssessment);
var createAssessment = Q.nbind(CarsAssessment.create, CarsAssessment);
var findAllAssessments = Q.nbind(CarsAssessment.find, CarsAssessment);
var findAllStudent =Q.nbind(Student.find, Student)

module.exports = {
  getNewAssessment: function (req, res, next) {
    res.json(emptyAssessment.carsQuestions);
  },
  saveAssessment: function (req, res, next) {
    var token = req.headers['x-access-token'];
    var student = jwt.decode(token, 'secret');
    var name = req.body.name;
    var questions = req.body.questions;
    createAssessment({
      name: name,
      questions: questions,
      studentId: student._id.toString()
    })
    .then(function (newAssessmentInstance) {
      res.send(201);
    })
    .catch(function (err) {
      next(err);
    });
  },
  getAssessments: function (req, res, next) {
    var token = req.headers['x-access-token'];
    var student = jwt.decode(token, 'secret');
    findAllAssessments({studentId: student._id})
    .then(function(found) {
      if (found) {
        console.log(found)
        res.json(found)
      } else {
        next(new Error('not found'));
      }
    })
    .catch(function (err) {
      next(err);
    });
  },
  getAssessment: function (req, res, next) {
    findAssessment({_id: req.body.assessmentId})
    .then(function (found) {
      if (found) {
        res.json(found);
      } else {
        next(new Error('not found'))
      }
    })
    .catch(function (err) {
      next(err);
    });
  }
}