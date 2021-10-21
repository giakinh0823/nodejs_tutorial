
const sortMiddleware = (req, res, next) => {
    res.locals._sort = {
        enabled: false,
        type: 'default',
    }
    if (req.query.hasOwnProperty('_sort')) {
        const type = req.query.type;
        const column = req.query.column
        Object.assign(res.locals._sort, {
            enabled: true,
            type: type,
            column: column,
        })
    }
    next()
}

module.exports = sortMiddleware