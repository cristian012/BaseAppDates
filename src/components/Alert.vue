<template lang="pug">
    v-snackbar(
        top
        right
        auto-height
        :color="$store.state.alertColor"
        v-model="$store.state.alert")
        b {{ $store.state.alertMessage }}
        v-spacer
        .v-btns.justify-end
            v-btn(flat icon @click.native="$store.state.alert = false")
                v-icon $vuetify.icons.close
</template>