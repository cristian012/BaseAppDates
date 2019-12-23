<template lang="pug">
    v-dialog(v-model="confirm" max-width="500" content-class="v-dialog-center")
        v-form
            .v-modal
                .v-modal-title
                    h2 {{ $t(title) }}

                .v-modal-content.text-xs-center
                    p.my-3 {{ $t(message) }}
                    
                .v-modal-actions
                    .v-btns.justify-end
                        v-btn(icon dark color="dark lighten-1" @click="confirm = false")
                            v-icon(small) $vuetify.icons.close
                        v-btn(round depressed color="primary" :loading="confirmBtn" @click="action") {{$t('Confirmar')}}
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                required: true
            },
            message: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                confirm: false,
                confirmData: null,
                confirmBtn: false
            }
        },
        methods: {
            open(data){
                this.confirm = true
                this.confirmData = data
                this.confirmBtn = false
            },
            close(){
                this.confirm = false
                this.confirmBtn = false
            },
            action(){
                this.$on('playLoader', () => {
                    this.confirmBtn = true
                })
                this.$on('stopLoader', () => {
                    this.confirmBtn = false
                })
                this.$emit('action', this.confirmData)
            }
        }
    }
</script>