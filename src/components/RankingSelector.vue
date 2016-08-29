<template>
  <div class="ranking-type">
    <a v-for="rankingType in rankingTypes" 
      class="ranking-type-button {{ rankingAlgorithm == rankingType ? 'ranking-type-button--active' : '' }}" 
      @click.prevent="changeRankingType(rankingType)"
      >{{rankingType}}</a>

  </div>
</template>

<script>
export default {
  props: [
    'rankingTypes',
    'rankingAlgorithm'
  ],

  methods: {
    // dispatch change of ranking algorithm, managed by upper components
    changeRankingType: function (type) {
      this.$dispatch('setRankingType', type)
    }
  }
}
</script>

<style>
.ranking-type {
  border: 1px solid #dedede;
  border-bottom: 3px solid #dedede;
  border-top: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ranking-type-button {
  display: block;
  border-right: 1px solid #dedede;
  padding: 8px 0;
  text-align: center;
  flex:1;
  text-decoration: none;
  color: #000;
  position: relative;
  cursor: pointer;
}

.ranking-type-button:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: -3px;
  width: 0;
  height: 3px;
  background: #000;
  transition: width 200ms ease-out;
}

.ranking-type-button:hover:after {
  width: 100%;
}

.ranking-type-button--active {
  color: #d71921;
  font-weight: bold;
}

.ranking-type-button--active:after {
  width: 100%;
  background: #d71921;
}

.ranking-type-button:last-child {
  border-right: none;
}
</style>