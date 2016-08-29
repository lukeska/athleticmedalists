exports.assertion = function (selector) {
  this.message = 'Testing if countries results are sorted in descending order'
  this.expected = true
  this.pass = function (val) {
    return val === this.expected
  }
  this.value = function (res) {
    return res.value
  }
  this.command = function (cb) {
    var self = this
    return this.api.execute(function (selector) {
      let elements = document.querySelectorAll(selector)

      let retVal = true
      let prev = 0
      for (i = 0; i < elements.length; ++i) {
        let actual = parseInt(elements[i].textContent)
        if (i > 0 && actual > prev) {
          retVal = false
        }
        prev = actual
      }
      return retVal
    }, [selector], function (res) {
      cb.call(self, res)
    })
  }
}