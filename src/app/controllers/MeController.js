const Course = require('../models/Course')
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {

        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) => {
                res.render('me/stored-coures', {
                    courses: mutipleMongooseToObject(courses),
                    deletedCount: deletedCount
                })
            })
            .catch(error => next(error))
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then(courses => {
                res.render('me/trash-coures', {
                    courses: mutipleMongooseToObject(courses)
                })
            })
            .catch(error => next(error))
    }
}

module.exports = new MeController();
