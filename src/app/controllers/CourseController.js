const Course = require('../models/Course')
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {

  // [GET] /course/:slug
  show(req, res, next) {
    const slug = req.params.slug
    Course.findOne({ slug: slug})
      .then((course) => {
        res.render('courses/show', {
          course: mongooseToObject(course)
        })
      })
      .catch((err) =>
        next(err)
      )
  }

  // [GET] /create
  create(req, res, next) {
    res.render('courses/create')
  }

  // [POST] /create
  store(req, res, next) {
    const data = {
      ...req.body,
    }
    const course = new Course(data);
    course.save()
      .then(() => res.redirect(`/courses/${course.slug}`));
  }

  // [GET] /:id/edit
  edit(req, res, next) {
    const id = req.params.id;
    Course.findById(id)
      .then(course => res.render('courses/edit', {
        course: mongooseToObject(course)
      }))
      .catch(next)
  }

  // PUT /course/:id -- chỉnh sửa
  update(req, res, next) {
    const id = req.params.id;
    const data = req.body;
    Course.updateOne({ _id: id }, data)
      .then(() => res.redirect('/me/stored/courses'))
      .catch(next)
  }

  // DELETE /course/:id -- xóa
  delete(req, res, next) {
    const id = req.params.id;
    Course.deleteById(id)
      .then(() => res.redirect('back'))
      .catch(next)
  }

  // DELETE /course/:id/force -- xóa vĩnh viễn
  forceDelete(req, res, next) {
    const id = req.params.id;
    Course.deleteOne({_id: id})
      .then(() => res.redirect('back'))
      .catch(next)
  }



  // PATCH /course/:id/restore
  restore(req, res, next) {
    const id = req.params.id;
    Course.restore({ _id: id })
      .then(() => res.redirect('back'))
      .catch(next)
  }

  handleActions(req, res, next) {
    const action = req.body.action;
    const courseIds = req.body.courseIds
    switch (action){
      case 'delete':
        Course.delete({_id: {$in: courseIds}})
        .then(() => res.redirect('back'))
        .catch(err => next(err))
        break;
      default:
        res.json({message: 'Action invalid'})
    }
  }

}

module.exports = new CourseController();
