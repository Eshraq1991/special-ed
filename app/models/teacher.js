'use strict';
module.exports = function(sequelize, DataTypes) {
	var Specialist = sequelize.define('Specialist', {
		Specialistname: DataTypes.STRING,
		fullname: DataTypes.STRING,
		category: DataTypes.STRING,
		password: DataTypes.STRING
	}, {
		classMethods: {
			associate: function(models) {
				Specialist.belongsTo(models.Center);
				Specialist.belongsToMany(models.Student,{through:"StudentSpecialist"});
			}
		}
	});
	return Specialist;
};
var Q = require('q');
var mongoose = require('mongoose');

var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;
var Schema = mongoose.Schema;

var SpecialistSchema = new mongoose.Schema({
  username: {
  	type: String,
    unique: true,
  	required: true
  },
  password : {
    type: String,
    required: true
  },
  centerId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Center',
  },
  specialty: {
    enum: ['occupationalTherapist', 'mentalHealth', 'speechLanguage', 'careManager'],
    type: String
  },
  fullname: String,
  skills: [String],
  reference: String,
  experience: Number,
  certified: {
    enum: ['yes', 'no'],
    type: String
  },
  profilePicture: String,
  todos: [String],
  students: [{ type: Schema.Types.ObjectId, ref: 'Specialist' }],
  status: {
    type: String,
    enum: ['Active', 'Pending', 'Rejected']
  },
  email: String,
  phone: String,
  mobile: String,
  rating: Number,
});
var Specialist = mongoose.model('Specialist', SpecialistSchema);


Specialist.comparePassword = function(candidatePassword, savedPassword, res, cb){
  bcrypt.compare( candidatePassword, savedPassword, function(err, isMatch){
    if(err){
      res.status(500).send('Error');
    } else if(cb){
      cb(isMatch);
    }
  });
};


StudentSchema.pre('save', function (next) {
  var specialist = this;

  // only hash the password if it has been modified (or is new)
  if (!specialist.isModified('password')) {
    return next();
  }

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }

    // hash the password along with our new salt
    bcrypt.hash(specialist.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }

      // override the cleartext password with the hashed one
      specialist.password = hash;
      specialist.salt = salt;
      next();
    });
  });
});


module.exports = Specialist;