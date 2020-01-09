module.exports =function(options){ 
    return function (req, res, next) {
    req.requestTime = new Date().toString()
    next()
  }
}