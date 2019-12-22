<template lang="pug">
    .not-found(:class="{ 'not-found-small' : small }")
        img.not-found-img(v-if="!small" src="@/assets/img/parts/not-found.svg")
        .not-found-content
            v-icon(size="30px" color="primary") {{ icon }}
            h3.my-2 {{ $t(message) }}
            .v-btns.justify-center
                slot
</template>

<script>
    export default {
        props: {
            icon: {
                type: String,
                default: ''
            },
            message: {
                type: String,
                default: ''
            },
            small: {
                type: Boolean,
                default: false
            }
        }
    }
</script>