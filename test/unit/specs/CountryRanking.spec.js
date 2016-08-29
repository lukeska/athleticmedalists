import Vue from 'vue'
import CountryRanking from 'src/components/CountryRanking'

describe('Component CountryRanking.vue', () => {
  const getComponent = (country, medalTypes) => {
    let vm = new Vue({
      template: '<div><country-ranking :country="country" :medal-types="medalTypes"></country-ranking></div>',
      components: { CountryRanking },
      data: {
        country,
        medalTypes
      }
    })

    return vm
  }

  const medalTypes = {
    MEDAL_GOLD: 'Gold',
    MEDAL_SILVER: 'Silver',
    MEDAL_BRONZE: 'Bronze'
  }

  it('should show name of the country, point and medals', () => {
    let country = {
      name: 'USA',
      points: 10,
      gold: 5,
      silver: 3,
      bronze: 2
    }

    const vm = getComponent(country, medalTypes).$mount()
    expect(vm.$el).to.be.ok

    // check if the name of the country is visible
    expect(vm.$el.querySelector('.country-info__name').textContent).to.contain('USA')

    // check if points are visible
    expect(vm.$el.querySelector('.country-info__points-value').textContent).to.contain('10')

    // check if medals are visible
    expect(vm.$el.querySelectorAll('.country-medals').length).to.eql(3)
  })
})
