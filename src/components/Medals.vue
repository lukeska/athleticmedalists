<template>
  <div class="country-medals country-medals--{{medalType | lowercase}}" v-if="medalCount">
    <svg class="country-medals__icon">
      <use xlink:href="#{{medalType | lowercase}}-medal" />
    </svg>
    <span class="country-medals__total">{{medalCount}}</span>
  </div>
</template>

<script>
  export default {
    props: [
      'medalType',
      'medalCount'
    ]
  }
</script>

<style>
.country-medals {
  width: 50px;
  height: 55px;
  text-align: center;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent center no-repeat;
}

.country-medals--gold {
  background-image: url('../assets/gold-medal.svg');
}

.country-medals--silver {
  background-image: url('../assets/silver-medal.svg');
}

.country-medals--bronze {
  background-image: url('../assets/bronze-medal.svg');
}

.country-medals__icon {
  max-width: 100%;
  width: 50px;
  height: 50px;
  position: absolute;
  z-index: 1;
}

.country-medals__total {
  position: relative;
  z-index: 2;
  color: #000;
  font-weight: bold;
  margin-top: 14px;
  font-size: 18px;
}
</style>