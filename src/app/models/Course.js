const mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');
var mongooseDelete = require('mongoose-delete');


mongoose.plugin(slug);

const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;


const CourseSchema = new Schema({
  id: ObjectId,
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String, maxLength: 500 },
  slug: { type: String, slug: 'name', unique: true },
  videoId: { type: String, maxLength: 200 },
  level: { type: String, maxLength: 200 },
}, {
  timestamps: true
});

//Custom query helpers
CourseSchema.query.sortable =function (req){
  if (req.query.hasOwnProperty('_sort')) {
    const isValiedType = ['asc', 'desc'].includes(req.query.type);
    return this.sort({
      [req.query.column]: isValiedType ? req.query.type : 'desc'
    })
  }
  return this
}

CourseSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });


module.exports = mongoose.model('Course', CourseSchema);