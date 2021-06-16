<template>
  <v-container>
    <p
      class="text-center text-h3"
    >
      Donate
    </p>
    <v-timeline
      :reverse="!$vuetify.breakpoint.mobile"
      :dense="$vuetify.breakpoint.mobile"
    >
      <v-timeline-item
        v-for="(item,i) in timeLineItems"
        :key="i"
        :icon="item.icon"
      >
        <v-card
          shaped
          elevation="10"
          color="rgb(255, 255, 255)"
        >
          <v-card-title>
            {{ item.title_en }}
          </v-card-title>
          <v-card-text>
            {{ item.en }}
          </v-card-text>
          <v-card-text
            class="text-center"
          >
            <a href="bitcoin:bc1qfr92xt2h4c5k98rr0fmmwem9xct79ns6mkx5jg">bc1qfr92xt2h4c5k98rr0fmmwem9xct79ns6mkx5jg</a>
          </v-card-text>
          <v-card-actions
            class="justify-center"
          >
            <v-img
              position="center"
              src="https://www.funkysheep.net/img/bitcoin-qr.png"
              max-height="150"
              max-width="150"
            />
          </v-card-actions>
          <v-img
            height="300"
            :src="item.image"
          />
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      timeLineItems: [
        {
          title_en: 'Money, money, money...',
          title_fr: 'Money, money, money...',
          icon: 'mdi-bitcoin',
          en: 'We believe in freedom, but we also need money to pay the bills. You can help us with a little bitcoin donation to this address :).',
          fr: 'Nous croyons en la liberté mais nous avons aussi besoin d\'argent pour payer les factures. Vous pouvez nous aider avec une petite donation en Bitcoins :)',
          image: 'https://images.pexels.com/photos/315788/pexels-photo-315788.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
        }
      ]
    }
  }
}
</script>
