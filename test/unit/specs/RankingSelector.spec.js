import Vue from 'vue'
import RankingSelector from 'src/components/RankingSelector'

describe('Component RankingSelector.vue', () => {
  const getComponent = (rankingAlgorithm) => {
    let vm = new Vue({
      template: '<div><ranking-selector v-ref:component :ranking-algorithm="rankingAlgorithm" :ranking-types="rankingTypes"></ranking-selector></div>',
      components: { RankingSelector },
      data: {
        rankingAlgorithm,
        rankingTypes: {
          RANKING_MEDAL_COUNT: 'Medal count',
          RANKING_WEIGHTED: 'Weighted',
          RANKING_GOLD_FIRST: 'Gold first'
        }
      }
    })

    return vm
  }

  it('should render buttons in order to choose a ranking algorithm. One of them must be active', () => {
    const vm = getComponent('Medal count').$mount()

    // check if all the buttons are visible
    expect(vm.$el.querySelectorAll('.ranking-type-button')[0].textContent).to.contain('Medal count')
    expect(vm.$el.querySelectorAll('.ranking-type-button')[1].textContent).to.contain('Weighted')
    expect(vm.$el.querySelectorAll('.ranking-type-button')[2].textContent).to.contain('Gold first')
    expect(vm.$el.querySelectorAll('.ranking-type-button').length).to.eql(3)

    // check if only one is active
    expect(vm.$el.querySelectorAll('.ranking-type-button--active').length).to.eql(1)
  })

  it('should dispatch "set-ranking-type"', () => {
    const vm = getComponent('Medal count').$mount()
    const component = vm.$refs.component

    let spy = sinon.spy()
    vm.$on('setRankingType', spy)

    component.changeRankingType('Weighted')

    expect(spy).to.have.been.calledWith('Weighted')
  })

  it('should change active button when a different ranking algorithm is chosen', () => {
    const vm = getComponent('Medal count').$mount()
    const component = vm.$refs.component

    // check if the right initial active button is selected
    expect(vm.$el.querySelector('.ranking-type-button--active').textContent).to.contain('Medal count')

    // check if the new active button is selected
    component.rankingAlgorithm = 'Weighted'
    component.$nextTick(() => {
      expect(vm.$el.querySelector('.ranking-type-button--active').textContent).to.contain('Weighted')
    })
  })
})
