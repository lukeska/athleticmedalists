<template>

  <div class="wrapper">
    <div class="olympics-logo">
      <img class="olympics-logo__img" src="assets/olympics_logo.svg" alt="Beijing 2008 - Olympic Logo">
    </div>

    <div class="countries-ranking">

      <h1 class="countries-ranking__title">Athletic countries ranking</h1>

      <ranking-selector 
        :ranking-types="rankingTypes"
        :ranking-algorithm="rankingAlgorithm"
        ></ranking-selector>

        <div v-for="country in countriesMedals | orderBy 'points' -1">

          <country-ranking 
            :country="country"
            :medal-types="medalTypes"
            ></country-ranking>
          
        </div>
      </div>

      <div class="olympics-motto">
        Citius, Altius, Fortius
      </div>
    </div>

    
  </div>
</template>

<script>
import RankingSelector from './components/RankingSelector.vue'
import CountryRanking from './components/CountryRanking.vue'

export default {

  components: {
    RankingSelector,
    CountryRanking
  },

  computed: {
    //  from athleticMedalists get results for every single country
    countriesMedals: function () {
      let vm = this

      return vm.athleticMedalists.reduce(function (medalsCounter, athlete) {
        let { country, medal } = athlete

        //  get points for this athlete's medal based on the selected ranking algorithm
        let points = vm.getPoints(medal, vm.rankingAlgorithm)

        // check if the coutry is already in the output
        let coutryMedals = medalsCounter[country]

        //  otherwise init a new object for this country
        if (!coutryMedals) {
          coutryMedals = vm.newCountryMedalsObject(country)
        }

        //  update country's results
        coutryMedals.points += points
        coutryMedals.gold += (medal === vm.medalTypes.MEDAL_GOLD) ? 1 : 0
        coutryMedals.silver += (medal === vm.medalTypes.MEDAL_SILVER) ? 1 : 0
        coutryMedals.bronze += (medal === vm.medalTypes.MEDAL_BRONZE) ? 1 : 0

        medalsCounter[country] = coutryMedals

        return medalsCounter
      }, {})
    }
  },

  methods: {
    //  new ranking algorithms can be added here
    getPoints: function (medal, rankingType) {
      switch (rankingType) {
        case this.rankingTypes.RANKING_GOLD_FIRST:
          return this.getPointsGoldFirst(medal)
        case this.rankingTypes.RANKING_WEIGHTED:
          return this.getPointsWeighted(medal)
        default:
          return this.getPointsMedalCount(medal)
      }
    },

    getPointsMedalCount: function (medal) {
      return 1
    },

    getPointsWeighted: function (medal) {
      switch (medal) {
        case this.medalTypes.MEDAL_GOLD:
          return 3
        case this.medalTypes.MEDAL_SILVER:
          return 2
        default:
          return 1
      }
    },

    getPointsGoldFirst: function (medal) {
      switch (medal) {
        case this.medalTypes.MEDAL_GOLD:
          return 10000
        case this.medalTypes.MEDAL_SILVER:
          return 100
        default:
          return 1
      }
    },

    newCountryMedalsObject: function (country) {
      return {
        name: country,
        points: 0,
        gold: 0,
        silver: 0,
        bronze: 0
      }
    }
  },

  events: {
    // handle change of ranking algorithm dispatched by subcomponents
    'setRankingType': function (rankingType) {
      this.rankingAlgorithm = rankingType
    }
  },

  data () {
    return {
      rankingAlgorithm: 'Medal count',
      medalTypes: {
        MEDAL_GOLD: 'Gold',
        MEDAL_SILVER: 'Silver',
        MEDAL_BRONZE: 'Bronze'
      },
      rankingTypes: {
        RANKING_MEDAL_COUNT: 'Medal count',
        RANKING_WEIGHTED: 'Weighted',
        RANKING_GOLD_FIRST: 'Gold first'
      },
      athleticMedalists: [
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
          'athlete': 'ABEYLEGESSE, Elvan',
          'country': 'TUR',
          'sex': 'Women',
          'event': '10000m',
          'medal': 'Silver'
        },
        {
          'athlete': 'DIX, Walter',
          'country': 'USA',
          'sex': 'Men',
          'event': '100m',
          'medal': 'Bronze'
        },
        {
          'athlete': 'BOLT, Usain',
          'country': 'JAM',
          'sex': 'Men',
          'event': '100m',
          'medal': 'Gold'
        },
        {
          'athlete': 'THOMPSON, Richard',
          'country': 'TRI',
          'sex': 'Men',
          'event': '100m',
          'medal': 'Silver'
        },
        {
          'athlete': 'FRASER, Shelly-ann',
          'country': 'JAM',
          'sex': 'Women',
          'event': '100m',
          'medal': 'Gold'
        },
        {
          'athlete': 'SIMPSON, Sherone',
          'country': 'JAM',
          'sex': 'Women',
          'event': '100m',
          'medal': 'Silver'
        },
        {
          'athlete': 'STEWART, Kerron',
          'country': 'JAM',
          'sex': 'Women',
          'event': '100m',
          'medal': 'Silver'
        },
        {
          'athlete': 'LOPES-SCHLIEP, Priscilla',
          'country': 'CAN',
          'sex': 'Women',
          'event': '100m hurdles',
          'medal': 'Bronze'
        },
        {
          'athlete': 'HARPER, Dawn',
          'country': 'USA',
          'sex': 'Women',
          'event': '100m hurdles',
          'medal': 'Gold'
        },
        {
          'athlete': 'MCLELLAN, Sally',
          'country': 'AUS',
          'sex': 'Women',
          'event': '100m hurdles',
          'medal': 'Silver'
        },
        {
          'athlete': 'OLIVER, David',
          'country': 'USA',
          'sex': 'Men',
          'event': '110m hurdles',
          'medal': 'Bronze'
        },
        {
          'athlete': 'ROBLES, Dayron',
          'country': 'CUB',
          'sex': 'Men',
          'event': '110m hurdles',
          'medal': 'Gold'
        },
        {
          'athlete': 'PAYNE, David',
          'country': 'USA',
          'sex': 'Men',
          'event': '110m hurdles',
          'medal': 'Silver'
        },
        {
          'athlete': 'BAALA, Mehdi',
          'country': 'FRA',
          'sex': 'Men',
          'event': '1500m',
          'medal': 'Bronze'
        },
        {
          'athlete': 'KIPROP, Asbel Kipruto',
          'country': 'KEN',
          'sex': 'Men',
          'event': '1500m',
          'medal': 'Gold'
        },
        {
          'athlete': 'WILLIS, Nicholas',
          'country': 'NZL',
          'sex': 'Men',
          'event': '1500m',
          'medal': 'Silver'
        },
        {
          'athlete': 'TOBIAS, Nataliya',
          'country': 'UKR',
          'sex': 'Women',
          'event': '1500m',
          'medal': 'Bronze'
        },
        {
          'athlete': 'LANGAT, Nancy jebet',
          'country': 'KEN',
          'sex': 'Women',
          'event': '1500m',
          'medal': 'Gold'
        },
        {
          'athlete': 'LISHCHYNSKA, Iryna',
          'country': 'UKR',
          'sex': 'Women',
          'event': '1500m',
          'medal': 'Silver'
        },
        {
          'athlete': 'DIX, Walter',
          'country': 'USA',
          'sex': 'Men',
          'event': '200m',
          'medal': 'Bronze'
        },
        {
          'athlete': 'BOLT, Usain',
          'country': 'JAM',
          'sex': 'Men',
          'event': '200m',
          'medal': 'Gold'
        },
        {
          'athlete': 'CRAWFORD, Shawn',
          'country': 'USA',
          'sex': 'Men',
          'event': '200m',
          'medal': 'Silver'
        },
        {
          'athlete': 'STEWART, Kerron',
          'country': 'JAM',
          'sex': 'Women',
          'event': '200m',
          'medal': 'Bronze'
        },
        {
          'athlete': 'CAMPBELL-BROWN, Veronica',
          'country': 'JAM',
          'sex': 'Women',
          'event': '200m',
          'medal': 'Gold'
        },
        {
          'athlete': 'FELIX, Allyson',
          'country': 'USA',
          'sex': 'Women',
          'event': '200m',
          'medal': 'Silver'
        },
        {
          'athlete': 'RIGAUDO, Elisa',
          'country': 'ITA',
          'sex': 'Women',
          'event': '20km race walk',
          'medal': 'Bronze'
        },
        {
          'athlete': 'KANISKINA, Olga',
          'country': 'RUS',
          'sex': 'Women',
          'event': '20km race walk',
          'medal': 'Gold'
        },
        {
          'athlete': 'PLATZER, Kjersti Tysse',
          'country': 'NOR',
          'sex': 'Women',
          'event': '20km race walk',
          'medal': 'Silver'
        },
        {
          'athlete': 'TALLENT, Jared',
          'country': 'AUS',
          'sex': 'Men',
          'event': '20km walk',
          'medal': 'Bronze'
        },
        {
          'athlete': 'BORCHIN, Valeriy',
          'country': 'RUS',
          'sex': 'Men',
          'event': '20km walk',
          'medal': 'Gold'
        },
        {
          'athlete': 'PEREZ, Jefferson',
          'country': 'ECU',
          'sex': 'Men',
          'event': '20km walk',
          'medal': 'Silver'
        },
        {
          'athlete': 'MATEELONG, Richard Kipkemboi',
          'country': 'KEN',
          'sex': 'Men',
          'event': '3000m steeplechase',
          'medal': 'Bronze'
        },
        {
          'athlete': 'KIPRUTO, Brimin Kiprop',
          'country': 'KEN',
          'sex': 'Men',
          'event': '3000m steeplechase',
          'medal': 'Gold'
        },
        {
          'athlete': 'MEKHISSI-B., Mahiedine',
          'country': 'FRA',
          'sex': 'Men',
          'event': '3000m steeplechase',
          'medal': 'Silver'
        },
        {
          'athlete': 'VOLKOVA, Ekaterina',
          'country': 'RUS',
          'sex': 'Women',
          'event': '3000m steeplechase',
          'medal': 'Bronze'
        },
        {
          'athlete': 'GALKINA-SAMITOVA, Gulnara',
          'country': 'RUS',
          'sex': 'Women',
          'event': '3000m steeplechase',
          'medal': 'Gold'
        },
        {
          'athlete': 'JEPKORIR, Eunice',
          'country': 'KEN',
          'sex': 'Women',
          'event': '3000m steeplechase',
          'medal': 'Silver'
        },
        {
          'athlete': 'NEVILLE, David',
          'country': 'USA',
          'sex': 'Men',
          'event': '400m',
          'medal': 'Bronze'
        },
        {
          'athlete': 'MERRITT, LaShawn',
          'country': 'USA',
          'sex': 'Men',
          'event': '400m',
          'medal': 'Gold'
        },
        {
          'athlete': 'WARINER, Jeremy',
          'country': 'USA',
          'sex': 'Men',
          'event': '400m',
          'medal': 'Silver'
        },
        {
          'athlete': 'RICHARDS, Sanya',
          'country': 'USA',
          'sex': 'Women',
          'event': '400m',
          'medal': 'Bronze'
        },
        {
          'athlete': 'OHURUOGU, Christine',
          'country': 'GBR',
          'sex': 'Women',
          'event': '400m',
          'medal': 'Gold'
        },
        {
          'athlete': 'WILLIAMS, Shericka',
          'country': 'JAM',
          'sex': 'Women',
          'event': '400m',
          'medal': 'Silver'
        },
        {
          'athlete': 'JACKSON, Bershawn',
          'country': 'USA',
          'sex': 'Men',
          'event': '400m hurdles',
          'medal': 'Bronze'
        },
        {
          'athlete': 'TAYLOR, Angelo',
          'country': 'USA',
          'sex': 'Men',
          'event': '400m hurdles',
          'medal': 'Gold'
        },
        {
          'athlete': 'CLEMENT, Kerron',
          'country': 'USA',
          'sex': 'Men',
          'event': '400m hurdles',
          'medal': 'Silver'
        },
        {
          'athlete': 'DANVERS, Tasha',
          'country': 'GBR',
          'sex': 'Women',
          'event': '400m hurdles',
          'medal': 'Bronze'
        },
        {
          'athlete': 'WALKER, Melaine',
          'country': 'JAM',
          'sex': 'Women',
          'event': '400m hurdles',
          'medal': 'Gold'
        },
        {
          'athlete': 'TOSTA, Sheena',
          'country': 'USA',
          'sex': 'Women',
          'event': '400m hurdles',
          'medal': 'Silver'
        },
        {
          'athlete': 'ASAHARA, Nobuharu',
          'country': 'JPN',
          'sex': 'Men',
          'event': '4x100m relay',
          'medal': 'Bronze'
        },
        {
          'athlete': 'SUETSUGU, Shingo',
          'country': 'JPN',
          'sex': 'Men',
          'event': '4x100m relay',
          'medal': 'Bronze'
        },
        {
          'athlete': 'TAKAHIRA, Shinji',
          'country': 'JPN',
          'sex': 'Men',
          'event': '4x100m relay',
          'medal': 'Bronze'
        },
        {
          'athlete': 'TSUKAHARA, Naoki',
          'country': 'JPN',
          'sex': 'Men',
          'event': '4x100m relay',
          'medal': 'Bronze'
        },
        {
          'athlete': 'BOLT, Usain',
          'country': 'JAM',
          'sex': 'Men',
          'event': '4x100m relay',
          'medal': 'Gold'
        },
        {
          'athlete': 'CARTER, Nesta',
          'country': 'JAM',
          'sex': 'Men',
          'event': '4x100m relay',
          'medal': 'Gold'
        },
        {
          'athlete': 'FRATER, Michael',
          'country': 'JAM',
          'sex': 'Men',
          'event': '4x100m relay',
          'medal': 'Gold'
        },
        {
          'athlete': 'POWELL, Asafa',
          'country': 'JAM',
          'sex': 'Men',
          'event': '4x100m relay',
          'medal': 'Gold'
        },
        {
          'athlete': 'BLEDMAN, Keston',
          'country': 'TRI',
          'sex': 'Men',
          'event': '4x100m relay',
          'medal': 'Silver'
        },
        {
          'athlete': 'BURNS, Marc',
          'country': 'TRI',
          'sex': 'Men',
          'event': '4x100m relay',
          'medal': 'Silver'
        },
        {
          'athlete': 'CALLENDER, Emmanuel',
          'country': 'TRI',
          'sex': 'Men',
          'event': '4x100m relay',
          'medal': 'Silver'
        },
        {
          'athlete': 'THOMPSON, Richard',
          'country': 'TRI',
          'sex': 'Men',
          'event': '4x100m relay',
          'medal': 'Silver'
        },
        {
          'athlete': 'IDOKO, Franca',
          'country': 'NGR',
          'sex': 'Women',
          'event': '4x100m relay',
          'medal': 'Bronze'
        },
        {
          'athlete': 'ISMAILA, Halimat',
          'country': 'NGR',
          'sex': 'Women',
          'event': '4x100m relay',
          'medal': 'Bronze'
        },
        {
          'athlete': 'KEMASUODE, Gloria',
          'country': 'NGR',
          'sex': 'Women',
          'event': '4x100m relay',
          'medal': 'Bronze'
        },
        {
          'athlete': 'OSAYOMI, Oludamola',
          'country': 'NGR',
          'sex': 'Women',
          'event': '4x100m relay',
          'medal': 'Bronze'
        },
        {
          'athlete': 'CHERMOSHANSKAYA, Yuliya',
          'country': 'RUS',
          'sex': 'Women',
          'event': '4x100m relay',
          'medal': 'Gold'
        },
        {
          'athlete': 'FEDORIVA, Aleksandra',
          'country': 'RUS',
          'sex': 'Women',
          'event': '4x100m relay',
          'medal': 'Gold'
        },
        {
          'athlete': 'GUSHCHINA, Yulia',
          'country': 'RUS',
          'sex': 'Women',
          'event': '4x100m relay',
          'medal': 'Gold'
        },
        {
          'athlete': 'POLYAKOVA, Evgeniya',
          'country': 'RUS',
          'sex': 'Women',
          'event': '4x100m relay',
          'medal': 'Gold'
        },
        {
          'athlete': 'BORLEE, Olivia',
          'country': 'BEL',
          'sex': 'Women',
          'event': '4x100m relay',
          'medal': 'Silver'
        },
        {
          'athlete': 'GEVAERT, Kim',
          'country': 'BEL',
          'sex': 'Women',
          'event': '4x100m relay',
          'medal': 'Silver'
        },
        {
          'athlete': 'MARIEN, Hanna',
          'country': 'BEL',
          'sex': 'Women',
          'event': '4x100m relay',
          'medal': 'Silver'
        },
        {
          'athlete': 'OUEDRAOGO, Elodie',
          'country': 'BEL',
          'sex': 'Women',
          'event': '4x100m relay',
          'medal': 'Silver'
        },
        {
          'athlete': 'ALEXEEV, Denis',
          'country': 'RUS',
          'sex': 'Men',
          'event': '4x400m relay',
          'medal': 'Bronze'
        },
        {
          'athlete': 'DYLDIN, Maksim',
          'country': 'RUS',
          'sex': 'Men',
          'event': '4x400m relay',
          'medal': 'Bronze'
        },
        {
          'athlete': 'FROLOV, Vladislav',
          'country': 'RUS',
          'sex': 'Men',
          'event': '4x400m relay',
          'medal': 'Bronze'
        },
        {
          'athlete': 'KOKORIN, Anton',
          'country': 'RUS',
          'sex': 'Men',
          'event': '4x400m relay',
          'medal': 'Bronze'
        },
        {
          'athlete': 'MERRITT, LaShawn',
          'country': 'USA',
          'sex': 'Men',
          'event': '4x400m relay',
          'medal': 'Gold'
        },
        {
          'athlete': 'NEVILLE, David',
          'country': 'USA',
          'sex': 'Men',
          'event': '4x400m relay',
          'medal': 'Gold'
        },
        {
          'athlete': 'TAYLOR, Angelo',
          'country': 'USA',
          'sex': 'Men',
          'event': '4x400m relay',
          'medal': 'Gold'
        },
        {
          'athlete': 'WARINER, Jeremy',
          'country': 'USA',
          'sex': 'Men',
          'event': '4x400m relay',
          'medal': 'Gold'
        },
        {
          'athlete': 'BAIN, Andretti',
          'country': 'BAH',
          'sex': 'Men',
          'event': '4x400m relay',
          'medal': 'Silver'
        },
        {
          'athlete': 'BROWN, Christopher',
          'country': 'BAH',
          'sex': 'Men',
          'event': '4x400m relay',
          'medal': 'Silver'
        },
        {
          'athlete': 'MATHIEU, Michael',
          'country': 'BAH',
          'sex': 'Men',
          'event': '4x400m relay',
          'medal': 'Silver'
        },
        {
          'athlete': 'WILLIAMS, Andrae',
          'country': 'BAH',
          'sex': 'Men',
          'event': '4x400m relay',
          'medal': 'Silver'
        },
        {
          'athlete': 'LLOYD, Shereefa',
          'country': 'JAM',
          'sex': 'Women',
          'event': '4x400m relay',
          'medal': 'Bronze'
        },
        {
          'athlete': 'WHYTE, Rosemarie',
          'country': 'JAM',
          'sex': 'Women',
          'event': '4x400m relay',
          'medal': 'Bronze'
        },
        {
          'athlete': 'WILLIAMS, Novelene',
          'country': 'JAM',
          'sex': 'Women',
          'event': '4x400m relay',
          'medal': 'Bronze'
        },
        {
          'athlete': 'WILLIAMS, Shericka',
          'country': 'JAM',
          'sex': 'Women',
          'event': '4x400m relay',
          'medal': 'Bronze'
        },
        {
          'athlete': 'FELIX, Allyson',
          'country': 'USA',
          'sex': 'Women',
          'event': '4x400m relay',
          'medal': 'Gold'
        },
        {
          'athlete': 'HENDERSON, Monique',
          'country': 'USA',
          'sex': 'Women',
          'event': '4x400m relay',
          'medal': 'Gold'
        },
        {
          'athlete': 'RICHARDS, Sanya',
          'country': 'USA',
          'sex': 'Women',
          'event': '4x400m relay',
          'medal': 'Gold'
        },
        {
          'athlete': 'WINEBERG, Mary',
          'country': 'USA',
          'sex': 'Women',
          'event': '4x400m relay',
          'medal': 'Gold'
        },
        {
          'athlete': 'FIROVA, Tatiana',
          'country': 'RUS',
          'sex': 'Women',
          'event': '4x400m relay',
          'medal': 'Silver'
        },
        {
          'athlete': 'GUSHCHINA, Yulia',
          'country': 'RUS',
          'sex': 'Women',
          'event': '4x400m relay',
          'medal': 'Silver'
        },
        {
          'athlete': 'KAPACHINSKAYA, Anastasia',
          'country': 'RUS',
          'sex': 'Women',
          'event': '4x400m relay',
          'medal': 'Silver'
        },
        {
          'athlete': 'LITVINOVA, Liudmila',
          'country': 'RUS',
          'sex': 'Women',
          'event': '4x400m relay',
          'medal': 'Silver'
        },
        {
          'athlete': 'SOI, Edwin Cheruiyot',
          'country': 'KEN',
          'sex': 'Men',
          'event': '5000m',
          'medal': 'Bronze'
        },
        {
          'athlete': 'BEKELE, Kenenisa',
          'country': 'ETH',
          'sex': 'Men',
          'event': '5000m',
          'medal': 'Gold'
        },
        {
          'athlete': 'KIPCHOGE, Eliud',
          'country': 'KEN',
          'sex': 'Men',
          'event': '5000m',
          'medal': 'Silver'
        },
        {
          'athlete': 'DEFAR, Meseret',
          'country': 'ETH',
          'sex': 'Women',
          'event': '5000m',
          'medal': 'Bronze'
        },
        {
          'athlete': 'DIBABA, Tirunesh',
          'country': 'ETH',
          'sex': 'Women',
          'event': '5000m',
          'medal': 'Gold'
        },
        {
          'athlete': 'ABEYLEGESSE, Elvan',
          'country': 'TUR',
          'sex': 'Women',
          'event': '5000m',
          'medal': 'Silver'
        },
        {
          'athlete': 'NIZHEGORODOV, Denis',
          'country': 'RUS',
          'sex': 'Men',
          'event': '50km walk',
          'medal': 'Bronze'
        },
        {
          'athlete': 'SCHWAZER, Alex',
          'country': 'ITA',
          'sex': 'Men',
          'event': '50km walk',
          'medal': 'Gold'
        },
        {
          'athlete': 'TALLENT, Jared',
          'country': 'AUS',
          'sex': 'Men',
          'event': '50km walk',
          'medal': 'Silver'
        },
        {
          'athlete': 'YEGO, Alfred Kirwa',
          'country': 'KEN',
          'sex': 'Men',
          'event': '800m',
          'medal': 'Bronze'
        },
        {
          'athlete': 'BUNGEI, Wilfred',
          'country': 'KEN',
          'sex': 'Men',
          'event': '800m',
          'medal': 'Gold'
        },
        {
          'athlete': 'ISMAIL, Ismail Ahmed',
          'country': 'SUD',
          'sex': 'Men',
          'event': '800m',
          'medal': 'Silver'
        },
        {
          'athlete': 'BENHASSI, Hasna',
          'country': 'MAR',
          'sex': 'Women',
          'event': '800m',
          'medal': 'Bronze'
        },
        {
          'athlete': 'JELIMO, Pamela',
          'country': 'KEN',
          'sex': 'Women',
          'event': '800m',
          'medal': 'Gold'
        },
        {
          'athlete': 'BUSIENEI, Janeth Jepkosgei',
          'country': 'KEN',
          'sex': 'Women',
          'event': '800m',
          'medal': 'Silver'
        },
        {
          'athlete': 'SUAREZ, Leonel',
          'country': 'CUB',
          'sex': 'Men',
          'event': 'decathlon',
          'medal': 'Bronze'
        },
        {
          'athlete': 'CLAY, Bryan',
          'country': 'USA',
          'sex': 'Men',
          'event': 'decathlon',
          'medal': 'Gold'
        },
        {
          'athlete': 'KRAUCHANKA, Andrei',
          'country': 'BLR',
          'sex': 'Men',
          'event': 'decathlon',
          'medal': 'Silver'
        },
        {
          'athlete': 'ALEKNA, Virgilijus',
          'country': 'LTU',
          'sex': 'Men',
          'event': 'discus throw',
          'medal': 'Bronze'
        },
        {
          'athlete': 'KANTER, Gerd',
          'country': 'EST',
          'sex': 'Men',
          'event': 'discus throw',
          'medal': 'Gold'
        },
        {
          'athlete': 'MALACHOWSKI, Piotr',
          'country': 'POL',
          'sex': 'Men',
          'event': 'discus throw',
          'medal': 'Silver'
        },
        {
          'athlete': 'ANTONOVA, Olena',
          'country': 'UKR',
          'sex': 'Women',
          'event': 'discus throw',
          'medal': 'Bronze'
        },
        {
          'athlete': 'BROWN TRAFTON, Stephanie',
          'country': 'USA',
          'sex': 'Women',
          'event': 'discus throw',
          'medal': 'Gold'
        },
        {
          'athlete': 'BARRIOS, Yarelys',
          'country': 'CUB',
          'sex': 'Women',
          'event': 'discus throw',
          'medal': 'Silver'
        },
        {
          'athlete': 'TSIKHAN, Ivan',
          'country': 'BLR',
          'sex': 'Men',
          'event': 'hammer throw',
          'medal': 'Bronze'
        },
        {
          'athlete': 'KOZMUS, Primoz',
          'country': 'SLO',
          'sex': 'Men',
          'event': 'hammer throw',
          'medal': 'Gold'
        },
        {
          'athlete': 'DEVYATOVSKIY, Vadim',
          'country': 'BLR',
          'sex': 'Men',
          'event': 'hammer throw',
          'medal': 'Silver'
        },
        {
          'athlete': 'ZHANG, Wenxiu',
          'country': 'CHN',
          'sex': 'Women',
          'event': 'hammer throw',
          'medal': 'Bronze'
        },
        {
          'athlete': 'MIANKOVA, Aksana',
          'country': 'BLR',
          'sex': 'Women',
          'event': 'hammer throw',
          'medal': 'Gold'
        },
        {
          'athlete': 'MORENO, Yipsi',
          'country': 'CUB',
          'sex': 'Women',
          'event': 'hammer throw',
          'medal': 'Silver'
        },
        {
          'athlete': 'CHERNOVA, Tatiana',
          'country': 'RUS',
          'sex': 'Women',
          'event': 'heptathlon',
          'medal': 'Bronze'
        },
        {
          'athlete': 'DOBRYNSKA, Nataliia',
          'country': 'UKR',
          'sex': 'Women',
          'event': 'heptathlon',
          'medal': 'Gold'
        },
        {
          'athlete': 'FOUNTAIN, Hyleas',
          'country': 'USA',
          'sex': 'Women',
          'event': 'heptathlon',
          'medal': 'Silver'
        },
        {
          'athlete': 'RYBAKOV, Yaroslav',
          'country': 'RUS',
          'sex': 'Men',
          'event': 'high jump',
          'medal': 'Bronze'
        },
        {
          'athlete': 'SILNOV, Andrey',
          'country': 'RUS',
          'sex': 'Men',
          'event': 'high jump',
          'medal': 'Gold'
        },
        {
          'athlete': 'MASON, Germaine',
          'country': 'GBR',
          'sex': 'Men',
          'event': 'high jump',
          'medal': 'Silver'
        },
        {
          'athlete': 'CHICHEROVA, Anna',
          'country': 'RUS',
          'sex': 'Women',
          'event': 'high jump',
          'medal': 'Bronze'
        },
        {
          'athlete': 'HELLEBAUT, Tia',
          'country': 'BEL',
          'sex': 'Women',
          'event': 'high jump',
          'medal': 'Gold'
        },
        {
          'athlete': 'VLASIC, Blanka',
          'country': 'CRO',
          'sex': 'Women',
          'event': 'high jump',
          'medal': 'Silver'
        },
        {
          'athlete': 'PITKAMAKI, Tero',
          'country': 'FIN',
          'sex': 'Men',
          'event': 'javelin throw',
          'medal': 'Bronze'
        },
        {
          'athlete': 'THORKILDSEN, Andreas',
          'country': 'NOR',
          'sex': 'Men',
          'event': 'javelin throw',
          'medal': 'Gold'
        },
        {
          'athlete': 'KOVALS, Ainars',
          'country': 'LAT',
          'sex': 'Men',
          'event': 'javelin throw',
          'medal': 'Silver'
        },
        {
          'athlete': 'OBERGFOLL, Christina',
          'country': 'GER',
          'sex': 'Women',
          'event': 'javelin throw',
          'medal': 'Bronze'
        },
        {
          'athlete': 'SPOTAKOVA, Barbora',
          'country': 'CZE',
          'sex': 'Women',
          'event': 'javelin throw',
          'medal': 'Gold'
        },
        {
          'athlete': 'ABAKUMOVA, Maria',
          'country': 'RUS',
          'sex': 'Women',
          'event': 'javelin throw',
          'medal': 'Silver'
        },
        {
          'athlete': 'CAMEJO, Ibrahim',
          'country': 'CUB',
          'sex': 'Men',
          'event': 'long jump',
          'medal': 'Bronze'
        },
        {
          'athlete': 'SALADINO ARANDA, Irving Jahir',
          'country': 'PAN',
          'sex': 'Men',
          'event': 'long jump',
          'medal': 'Gold'
        },
        {
          'athlete': 'MOKOENA, Khotso',
          'country': 'RSA',
          'sex': 'Men',
          'event': 'long jump',
          'medal': 'Silver'
        },
        {
          'athlete': 'OKAGBARE, Blessing',
          'country': 'NGR',
          'sex': 'Women',
          'event': 'long jump',
          'medal': 'Bronze'
        },
        {
          'athlete': 'MAGGI, Maurren Higa',
          'country': 'BRA',
          'sex': 'Women',
          'event': 'long jump',
          'medal': 'Gold'
        },
        {
          'athlete': 'LEBEDEVA, Tatyana',
          'country': 'RUS',
          'sex': 'Women',
          'event': 'long jump',
          'medal': 'Silver'
        },
        {
          'athlete': 'KEBEDE, Tsegay',
          'country': 'ETH',
          'sex': 'Men',
          'event': 'marathon',
          'medal': 'Bronze'
        },
        {
          'athlete': 'WANSIRU, Samuel Kamau',
          'country': 'KEN',
          'sex': 'Men',
          'event': 'marathon',
          'medal': 'Gold'
        },
        {
          'athlete': 'GHARIB, Jaouad',
          'country': 'MAR',
          'sex': 'Men',
          'event': 'marathon',
          'medal': 'Silver'
        },
        {
          'athlete': 'ZHOU, Chunxiu',
          'country': 'CHN',
          'sex': 'Women',
          'event': 'marathon',
          'medal': 'Bronze'
        },
        {
          'athlete': 'TOMESCU, Constantina',
          'country': 'ROU',
          'sex': 'Women',
          'event': 'marathon',
          'medal': 'Gold'
        },
        {
          'athlete': 'NDEREBA, Catherine',
          'country': 'KEN',
          'sex': 'Women',
          'event': 'marathon',
          'medal': 'Silver'
        },
        {
          'athlete': 'YURCHENKO, Denys',
          'country': 'UKR',
          'sex': 'Men',
          'event': 'pole vault',
          'medal': 'Bronze'
        },
        {
          'athlete': 'HOOKER, Steve',
          'country': 'AUS',
          'sex': 'Men',
          'event': 'pole vault',
          'medal': 'Gold'
        },
        {
          'athlete': 'LUKYANENKO, Evgeny',
          'country': 'RUS',
          'sex': 'Men',
          'event': 'pole vault',
          'medal': 'Silver'
        },
        {
          'athlete': 'FEOFANOVA, Svetlana',
          'country': 'RUS',
          'sex': 'Women',
          'event': 'pole vault',
          'medal': 'Bronze'
        },
        {
          'athlete': 'ISINBAEVA, Elena',
          'country': 'RUS',
          'sex': 'Women',
          'event': 'pole vault',
          'medal': 'Gold'
        },
        {
          'athlete': 'STUCZYNSKI, Jennifer',
          'country': 'USA',
          'sex': 'Women',
          'event': 'pole vault',
          'medal': 'Silver'
        },
        {
          'athlete': 'MIKHNEVICH, Andrei',
          'country': 'BLR',
          'sex': 'Men',
          'event': 'shot put',
          'medal': 'Bronze'
        },
        {
          'athlete': 'MAJEWSKI, Tomasz',
          'country': 'POL',
          'sex': 'Men',
          'event': 'shot put',
          'medal': 'Gold'
        },
        {
          'athlete': 'CANTWELL, Christian',
          'country': 'USA',
          'sex': 'Men',
          'event': 'shot put',
          'medal': 'Silver'
        },
        {
          'athlete': 'OSTAPCHUK, Nadzeya',
          'country': 'BLR',
          'sex': 'Women',
          'event': 'shot put',
          'medal': 'Bronze'
        },
        {
          'athlete': 'VILI, Valerie',
          'country': 'NZL',
          'sex': 'Women',
          'event': 'shot put',
          'medal': 'Gold'
        },
        {
          'athlete': 'MIKHNEVICH, Natallia',
          'country': 'BLR',
          'sex': 'Women',
          'event': 'shot put',
          'medal': 'Silver'
        },
        {
          'athlete': 'SANDS, Leevan',
          'country': 'BAH',
          'sex': 'Men',
          'event': 'triple jump',
          'medal': 'Bronze'
        },
        {
          'athlete': 'EVORA, Nelson',
          'country': 'POR',
          'sex': 'Men',
          'event': 'triple jump',
          'medal': 'Gold'
        },
        {
          'athlete': 'IDOWU, Phillips',
          'country': 'GBR',
          'sex': 'Men',
          'event': 'triple jump',
          'medal': 'Silver'
        },
        {
          'athlete': 'DEVETZI, Hrysopiyi',
          'country': 'GRE',
          'sex': 'Women',
          'event': 'triple jump',
          'medal': 'Bronze'
        },
        {
          'athlete': 'MBANGO ETONE, Francoise',
          'country': 'CMR',
          'sex': 'Women',
          'event': 'triple jump',
          'medal': 'Gold'
        },
        {
          'athlete': 'LEBEDEVA, Tatyana',
          'country': 'RUS',
          'sex': 'Women',
          'event': 'triple jump',
          'medal': 'Silver'
        }
      ]
    }
  }
}
</script>

<style>
body {
  font-family: 'Open Sans Condensed', sans-serif;
}

body:before {
  content: " ";
  display: block;
  width: 100%;
  height: 500px;
  position: absolute;
  top:0;
  left: 0;

  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#d71921+0,f2001c+100 */
  background: #d71921; /* Old browsers */
  background: -moz-linear-gradient(-45deg,  #d71921 0%, #f2001c 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(-45deg,  #d71921 0%,#f2001c 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(135deg,  #d71921 0%,#f2001c 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#d71921', endColorstr='#f2001c',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */

  z-index: 1;
}

.wrapper {
  width: 450px;
  margin: 50px auto;
  position: relative;
  z-index: 2;
  background: #fff;
  border-radius: 300px 300px 0 0;
  box-shadow: 0 0 20px 1px rgba(100,100,100,0.2);
}

.olympics-logo {
  text-align: center;
  padding: 100px 0 50px 0;
  border: 1px solid #dedede;
  border-radius: 300px 300px 0 0;
}

.olympics-logo__img {
  max-width: 150px;
}

.countries-ranking__title {
  text-align: center;
  border: 1px solid #dedede;
  margin: 0;
  padding: 10px 0
}

.olympics-motto {
  border: 1px solid #dedede;
  text-align: center;
  padding: 30px 10px;
  font-style: italic;
  border-radius: 0 0 5px 5px;
}
</style>