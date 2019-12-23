<template lang="pug">
    v-navigation-drawer.filter(fixed right app v-model="$store.state.filter" :width="250")
        v-text-field.filter-search(solo :label="$t('Buscar') + '...'" append-icon="$vuetify.icons.search" clearable height="56" hide-details flat v-model="filterModel.query")
        .filter-content
            slot
            v-divider.transparent.my-3
            .v-btns
                v-btn(round small depressed color="success" @click='$emit("clear")') {{$t('Limpiar filtros')}}
</template>

<script>
    export default {
        props: {
            /**
             * Modelo del filtro
             */
            filterModel: {
                type: Object,
                default: () => { return {} }
            }
        },
        data() {
            return {
            }
        },
    };
</script>