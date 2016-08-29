module.exports = {
  'country results can be sorted': function (browser) {
    browser
    .url('http://localhost:8080')
      .waitForElementVisible('.wrapper', 5000)
      .assert.elementPresent('.olympics-logo')
      
      // check that the correct active button is selected
      .assert.containsText('.ranking-type-button--active', 'Medal count')
      // check countries are sorted in descending order
      .assert.resultsAreSortedInDescendingOrder('.country-info__points-value')

      // select a different ranking algorithm and re-check sorting order
      .click('.ranking-type-button:nth-child(2)')
      .assert.containsText('.ranking-type-button--active', 'Weight')
      .assert.resultsAreSortedInDescendingOrder('.country-info__points-value')

      // select a different ranking algorithm and re-check sorting order
      .click('.ranking-type-button:nth-child(3)')
      .assert.containsText('.ranking-type-button--active', 'Gold first')
      .assert.resultsAreSortedInDescendingOrder('.country-info__points-value')
      
      .end()
  }
}
