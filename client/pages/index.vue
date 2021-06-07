<template>
  <v-container
    class="
    d-flex
    flex-column
    flex-lg-row
    flex-xl-row
    justify-center"
  >
    <v-card>
      <v-card-title> Users </v-card-title>
      <v-card-actions>
        <online />
      </v-card-actions>
    </v-card>
    <v-card>
      <v-card-title> Connections </v-card-title>
      <v-card-actions>
        <connections />
        <games />
      </v-card-actions>
    </v-card>
    <v-card>
      <v-card-title> Messages </v-card-title>
      <v-card-actions>
        <incoming />
        <outgoing />
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import online from '~/components/users/online.vue'
import connections from '~/components/connections/webNumber.vue'
import games from '~/components/connections/gameNumber.vue'
import incoming from '~/components/messages/incoming.vue'
import outgoing from '~/components/messages/outgoing.vue'
export default {
  components: {
    online,
    connections,
    games,
    incoming,
    outgoing
  }
}
</script>
