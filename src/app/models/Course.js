const mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');
var mongooseDelete = require('mongoose-delete');


mongoose.plugin(slug);

const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;


const Course = new Schema({
  id: ObjectId,
  name: {type: String, required: true},
  description: {type: String},
  image: {type: String, maxLength: 500},
  slug: {type: String, slug: 'name',unique: true},
  videoId: {type: String, maxLength: 200},
  level: {type: String, maxLength: 200},
}, { 
  timestamps: true
});

Course.plugin(mongooseDelete, { deletedAt : true, overrideMethods: 'all'});

module.exports = mongoose.model('Course', Course);