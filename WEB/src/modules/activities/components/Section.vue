<template lang="pug">
    .detailpage-section
        .detailpage-section-title
            .flex-300
                h2 {{$t('Actividades')}}
        v-layout(v-if="activities" row wrap)
            v-flex.d-flex.pos-r.overflow-hidden(v-for="(activity, i) in activities" :key="i" :class="$store.state.viewList == 0 ? 'flex-300' : 'flex-full'") 
                .v-sheet-back-options
                    .v-btns.justify-center
                        v-btn(dark icon depressed color="success" @click="")
                            v-icon(small) $vuetify.icons.edit
                        v-btn(dark icon depressed color="error" @click="$refs.deleteActivity.open()")
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
                                v-list-tile(@click="$refs.deleteActivity.open()")
                                    v-list-tile-action 
                                        v-icon $vuetify.icons.delete
                                    v-list-tile-title {{$t('Eliminar')}}
                    .v-sheet-content
                        .set.mb-2
                            h2 {{ activity.title }}
                        .set
                            label {{ $t('Descripción') }}
                            .caption {{ activity.details | placeholder('---') }}
                        v-divider.my-3
                        .set.mb-2
                            label {{ $t('Fecha') }}
                            .v-sheet-icon
                                v-icon(size="16") $vuetify.icons.date
                                h4 {{ activity.date | formatDate('MMMM DD, YYYY') | capitalize }} 
                                    template(v-if="activity.time") • {{ activity.time }}
                        .set.mb-2
                            label {{ $t('Encargado') }}
                            .v-sheet-icon
                                v-icon(size="16") $vuetify.icons.users
                                h4 {{ activity.user_manager && users.filter(item => item.uuid == activity.user_manager)[0].name | placeholder('---') }}
                        .v-sheet-phase.primary.mt-3
                            span {{ activity.phase && phasesActivity.filter(item => item.value == activity.phase)[0].name }}
        not-found(
            v-else
            small
            message="No se encontraron actividades"
            icon="$vuetify.icons.search")
        
        confirm(
            ref="deleteActivity"
            @action=""
            :title="$t('Eliminar actividad')"
            :message="$t('¿Realmente desea eliminar esta actividad?')")
</template>

<script>
    import db from '@/db.json'

    export default {
        data() {
            return {
                // JSON
                activities: db.activities,
                phasesActivity: db.phasesActivity,
                opportunities: db.opportunities,
                users: db.users,

                // Touch direction
                swipeDirection: 'None',
            }
        },
        methods: {
            // Abrir opciones del Sheet
            swipe (direction, key) {
                this.swipeDirection = direction + key
            },
        }
    }
</script>