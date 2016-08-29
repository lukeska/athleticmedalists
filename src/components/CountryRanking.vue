<template>
  <div class="country-ranking">
    <div class="country-info">
      <h2 class="country-info__name">{{country.name}}</h2>
      <div class="country-info__points">
        <span class="country-info__points-value">{{country.points}}</span>
        <span class="country-info__points-label">{{ country.points > 1 ? 'Points' : 'Point' }}</span>
      </div>
    </div>

    <div class="medals-counter">
      <div v-for="medal in medalTypes">
        <medals :medal-count="getMedalsCountByType(medal)" :medal-type="medal"></medals>
      </div>
    </div>
  </div>
</template>

<script>
import Medals from './Medals.vue'

export default {
  props: [
    'country',
    'medalTypes'
  ],

  components: {
    Medals
  },

  methods: {
    getMedalsCountByType: function (medalType) {
      switch (medalType) {
        case this.medalTypes.MEDAL_GOLD:
          return this.country.gold
        case this.medalTypes.MEDAL_SILVER:
          return this.country.silver
        default:
          return this.country.bronze
      }
    }
  }
}
</script>

<style>
.country-ranking {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #dedede;
  border-top:none;
}

.country-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex:1;
  padding-left: 30px;
}

.country-info__name {
  font-family: 'Baloo', cursive;
  font-size: 32px;
  margin: 0;
}

.country-info__points {
  border-left: 1px solid #dedede;
  border-right: 1px solid #dedede;
  height: 55px;
  width: 30%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.country-info__points-value {
  display: block;
  width: 100%;
  font-size: 24px;
  height: 20px;
  font-weight: bold;
}

.country-info__points-label {
  font-size: 12px;
  text-transform: uppercase;
  display: block;
  width: 100%;
}

.medals-counter {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 150px;
  padding-right: 30px;
  padding-left: 30px;
}
</style>