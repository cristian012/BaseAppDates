// <template lang="pug">
//   v-dialog(@input="change" value="true" :persistent="persistent" @keydown.esc="choose(false)")
//     v-form
//       .v-modal
//           .v-modal-title
//               h2 {{ $t(title) }}

//           .v-modal-content.text-xs-center
//               p.my-3 {{ $t(message) }}
              
//           .v-modal-actions
//               .v-btns.justify-end
//                   v-btn(icon dark color="dark lighten-1" v-if="Boolean(buttonFalseText)" flat @click="choose(false)")
//                       v-icon(small) $vuetify.icons.close
//                   v-btn(round depressed color="primary" v-if="Boolean(buttonTrueText)" flat @click="choose(true)") {{$t(buttonTrueText)}}

//   //- <v-dialog @input="change" value="true" :persistent="persistent" @keydown.esc="choose(false)">
//   //-   <v-card tile>
//   //-     <v-card-actions style="border:1px solid transparent">
//   //-       <v-spacer/>
//   //-       <v-btn v-if="Boolean(buttonFalseText)" flat @click="choose(false)">{{ buttonFalseText }}</v-btn>
//   //-       <v-btn v-if="Boolean(buttonTrueText)" flat @click="choose(true)">{{ buttonTrueText }}</v-btn>
//   //-     </v-card-actions>
//   //-   </v-card>
//   //- </v-dialog>
// </template>


<template>
  <v-dialog @input="change" value="true" :persistent="persistent" @keydown.esc="choose(false)" max-width="500" content-class="v-dialog-center">
    <div class="v-modal">
      <div class="v-modal-title">
        <h2>{{title}}</h2>
      </div>
      <div class="v-modal-content text-xs-center">
        <p class="my-3">{{message}}</p>   
      </div>
      <div class="v-modal-actions">
        <div class="v-btns justify-end">
          <v-btn v-if="Boolean(buttonFalseText)"  @click="choose(false)" icon dark color="dark lighten-1">
            <v-icon small>$vuetify.icons.close</v-icon>
          </v-btn> 
          <v-btn v-if="Boolean(buttonTrueText)" round depressed color="primary" @click="choose(true)">{{ buttonTrueText }}</v-btn>
        </div>
      </div>
    </div>
  </v-dialog>
</template>
<script>

export default {
  props: {
    buttonTrueText: {
      type: String,
      default: 'Confirmar'
    },
    buttonFalseText: {
      type: String,
      default: 'Cancelar'
    },
    buttonTrueColor: {
      type: String,
      default: 'primary'
    },
    buttonFalseColor: {
      type: String,
      default: 'grey'
    },
    color: {
      type: String,
      default: 'warning'
    },
    icon: {
      type: String,
      default: 'warning'
    },
    message: {
      type: String,
      required: true
    },
    persistent: Boolean,
    title: {
      type: String
    },
    width: {
      type: Number,
      default: 350
    }
  },
  data () {
    return {
      value: false
    }
  },
  methods: {
    choose (value) {
      this.$emit('result', value)
      this.value = value
      this.$destroy()
    },

    change (res) {
      this.$destroy()
    }
  }
}
</script>
