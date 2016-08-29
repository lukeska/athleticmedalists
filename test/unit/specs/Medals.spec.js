import Vue from 'vue'
import Medals from 'src/components/Medals'

describe('Component Medals.vue', () => {
  const getComponent = (medalType, medalCount) => {
    let vm = new Vue({
      template: '<div><medals :medal-count="medalCount" :medal-type="medalType"></medals></div>',
      components: { Medals },
      data: {
        medalType,
        medalCount
      }
    })

    return vm
  }

  it('should show the number of medals of a specific type won', () => {
    const vm = getComponent('Gold', 10).$mount()
    expect(vm.$el).to.be.ok

    // the total of gold medal is visible
    expect(vm.$el.querySelectorAll('.country-medals--gold').length).to.eql(1)

    // the total of gold medals is correct
    expect(vm.$el.querySelector('.country-medals__total').textContent).to.contain('10')
  })

  it('should not show if the medal count is zero', () => {
    const vm = getComponent('Gold', 0).$mount()
    expect(vm.$el).to.be.ok

    expect(vm.$el.querySelectorAll('.country-medals').length).to.eql(0)
  })
})
