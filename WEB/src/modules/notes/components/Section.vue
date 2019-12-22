<template lang="pug">
    .detailpage-section
        .detailpage-section-title
            .flex-300
                h2 {{$t('Notas')}}
        v-form(ref="formNote" v-model="valid" lazy-validation)
            v-textarea(v-model="note" :label="$t('Escribir nota')" color="success" box clearable rows="3" auto-grow :rules="$store.state.rules" required)
            .v-btns.mb-3
                v-btn(depressed small round color="success" @click="saveNote") {{$t('Guardar nota')}}
        v-layout(v-if="notes" row wrap)
            v-flex.d-flex.pos-r.overflow-hidden(v-for="(note, i) in notes" :key="i" :class="$store.state.viewList == 0 ? 'flex-300' : 'flex-full'") 
                .v-sheet-back-options
                    .v-btns.justify-center
                        v-btn(dark icon depressed color="success" @click="")
                            v-icon(small) $vuetify.icons.edit
                        v-btn(dark icon depressed color="error" @click="$refs.deleteNote.open()")
                            v-icon(small) $vuetify.icons.delete
                .v-sheet(v-touch="{ left: () => swipe('LeftCont', i), right: () => swipe('RightCont', i) }" :class="[swipeDirection == 'RightCont' + i ? 'move-right' : '', $store.state.viewList == 1 ? 'v-sheet-row' : '']")
                    svg.v-sheet-tab(xmlns='http://www.w3.org/2000/svg', viewbox='0 0 152 24')
                        g#Capa_2(data-name='Capa 2')
                            g#Capa_1-2(data-name='Capa 1')
                                path#Path_159.v-sheet-tab-color(data-name='Path 159', d='M6,0H128l24,24H0V6A6,6,0,0,1,6,0Z')
                    .v-sheet-options
                        v-menu(left)
                            v-btn(slot="activator" icon flat)
                                v-icon $vuetify.icons.dots-vertical
                            v-list.v-sheet-options-items
                                v-list-tile(@click="")
                                    v-list-tile-action 
                                        v-icon $vuetify.icons.edit
                                    v-list-tile-title {{$t('Editar')}}
                                v-list-tile(@click="$refs.deleteNote.open()")
                                    v-list-tile-action 
                                        v-icon $vuetify.icons.delete
                                    v-list-tile-title {{$t('Eliminar')}}
                    .v-sheet-content
                        .set
                            .v-sheet-icon
                                v-icon(size="16") $vuetify.icons.date
                                h4 {{ note.date | formatDate('MMMM DD, YYYY • H:mm') | capitalize }}
                        v-divider.my-3
                        .set.flex-full
                            .caption {{ note.text }}
        not-found(
            v-else
            small
            message="No se encontraron notas"
            icon="$vuetify.icons.search")
        
        confirm(
            ref="deleteNote"
            @action=""
            :title="$t('Eliminar nota')"
            :message="$t('¿Realmente desea eliminar esta nota?')")
</template>

<script>
    export default {
        data() {
            return {
                notes: [
                    {
                        "uuid": 1,
                        "date": "2019-01-05 15:02:15",
                        "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab soluta, unde sint debitis in magnam vel pariatur libero animi minima cumque tenetur eligendi expedita amet dolor quasi voluptatem officia? Eius?"
                    },
                    {
                        "uuid": 2,
                        "date": "2019-01-05 15:02:15",
                        "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab soluta, unde sint debitis in magnam vel pariatur libero animi minima cumque tenetur eligendi expedita amet dolor quasi voluptatem officia? Eius?"
                    },
                    {
                        "uuid": 3,
                        "date": "2019-01-05 15:02:15",
                        "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab soluta, unde sint debitis in magnam vel pariatur libero animi minima cumque tenetur eligendi expedita amet dolor quasi voluptatem officia? Eius?"
                    },
                ],

                // Formulario nota
                valid: true,
                note: '',

                // Touch direction
                swipeDirection: 'None',
            }
        },
        methods: {
            // Guardar nota
            saveNote() {
                if (this.$refs.formNote.validate()) {
                    this.$store.state.alert = true
                    this.$store.state.alertMessage = this.$t('Nota guardada exitosamente')
                    this.$store.state.alertColor = 'success'
                    this.$refs.formNote.reset()
                } else {
                    this.$store.state.alert = true
                    this.$store.state.alertMessage = this.$t('Faltan campos por completar')
                    this.$store.state.alertColor = 'error'
                }
            },

            // Abrir opciones del Sheet
            swipe (direction, key) {
                this.swipeDirection = direction + key
            },
        }
    }
</script>