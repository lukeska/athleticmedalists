import Vue from 'vue'
import App from 'src/App'

describe('Component App.vue', () => {
  const getComponent = () => {
    let vm = new Vue({
      template: '<div><app v-ref:component></app></div>',
      components: { App }
    })

    return vm
  }

  const athleticMedalists = [
    {
      'athlete': 'KOGO, Micah',
      'country': 'KEN',
      'sex': 'Men',
      'event': '10000m',
      'medal': 'Bronze'
    },
    {
      'athlete': 'BEKELE, Kenenisa',
      'country': 'ETH',
      'sex': 'Men',
      'event': '10000m',
      'medal': 'Gold'
    },
    {
      'athlete': 'SIHINE, Sileshi',
      'country': 'ETH',
      'sex': 'Men',
      'event': '10000m',
      'medal': 'Silver'
    },
    {
      'athlete': 'FLANAGAN, Shalane',
      'country': 'USA',
      'sex': 'Women',
      'event': '10000m',
      'medal': 'Bronze'
    },
    {
      'athlete': 'DIBABA, Tirunesh',
      'country': 'ETH',
      'sex': 'Women',
      'event': '10000m',
      'medal': 'Gold'
    },
    {
      'athlete': 'DIX, Walter',
      'country': 'USA',
      'sex': 'Men',
      'event': '100m',
      'medal': 'Bronze'
    }
  ]

  it('should show countries results', () => {
    const vm = getComponent().$mount()

    expect(vm.$el).to.be.ok

    expect(vm.$el.querySelectorAll('.country-ranking').length).to.be.above(0)
  })

  it('should get correct medals count', () => {
    const vm = getComponent().$mount()
    const component = vm.$refs.component

    expect(vm.$el).to.be.ok

    component.athleticMedalists = athleticMedalists

    let KEN = component.countriesMedals.KEN
    expect(KEN.gold).to.eql(0)
    expect(KEN.silver).to.eql(0)
    expect(KEN.bronze).to.eql(1)

    let USA = component.countriesMedals.USA
    expect(USA.gold).to.eql(0)
    expect(USA.silver).to.eql(0)
    expect(USA.bronze).to.eql(2)

    let ETH = component.countriesMedals.ETH
    expect(ETH.gold).to.eql(2)
    expect(ETH.silver).to.eql(1)
    expect(ETH.bronze).to.eql(0)
  })

  it('should get correct points by "Medal count" algorithm', () => {
    const vm = getComponent().$mount()
    expect(vm.$el).to.be.ok

    const component = vm.$refs.component
    component.athleticMedalists = athleticMedalists

    let KEN = component.countriesMedals.KEN
    expect(KEN.points).to.eql(1)

    let USA = component.countriesMedals.USA
    expect(USA.points).to.eql(2)

    let ETH = component.countriesMedals.ETH
    expect(ETH.points).to.eql(3)
  })

  it('should get correct points by "Gold first" algorithm', () => {
    const vm = getComponent().$mount()
    expect(vm.$el).to.be.ok

    const component = vm.$refs.component
    component.rankingAlgorithm = 'Gold first'
    component.athleticMedalists = athleticMedalists

    let KEN = component.countriesMedals.KEN
    expect(KEN.points).to.eql(1)

    let USA = component.countriesMedals.USA
    expect(USA.points).to.eql(2)

    let ETH = component.countriesMedals.ETH
    expect(ETH.points).to.eql(20100)
  })

  it('should get correct points by "Weighted" algorithm', () => {
    const vm = getComponent().$mount()
    expect(vm.$el).to.be.ok

    const component = vm.$refs.component
    component.rankingAlgorithm = 'Weighted'
    component.athleticMedalists = athleticMedalists

    let KEN = component.countriesMedals.KEN
    expect(KEN.points).to.eql(1)

    let USA = component.countriesMedals.USA
    expect(USA.points).to.eql(2)

    let ETH = component.countriesMedals.ETH
    expect(ETH.points).to.eql(8)
  })

  it('should change ranking algorithm when "setRankingType" event is raised', () => {
    const vm = getComponent().$mount()
    expect(vm.$el).to.be.ok

    const component = vm.$refs.component

    component.$dispatch('setRankingType', 'New algorithm')
    expect(component.rankingAlgorithm).to.eql('New algorithm')
  })
})
