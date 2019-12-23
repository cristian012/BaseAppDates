<template lang="pug">
    .v-btns.v-btns-floating(
        :class="[top ? 'v-btns-floating-top' : '', right ? 'v-btns-floating-right' : '', left ? 'v-btns-floating-left' : '', centerX ? 'v-btns-floating-center-x' : '', bottom ? 'v-btns-floating-bottom' : '', column ? 'v-btns-floating-column' : '', absolute ? 'v-btns-floating-absolute' : '', filter && right ? 'v-btns-floating-filter-open' : '', drawer && left ? 'v-btns-floating-menu-open' : '', drawer && mini && left ? 'v-btns-floating-menu-open-mini' : '' ]"
        )
        slot
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        props: {
            top: {
                type: Boolean,
                default: false
            },
            right: {
                type: Boolean,
                default: false
            },
            left: {
                type: Boolean,
                default: false
            },
            centerX: {
                type: Boolean,
                default: false
            },
            bottom: {
                type: Boolean,
                default: false
            },
            column: {
                type: Boolean,
                default: false
            },
            absolute: {
                type: Boolean,
                default: false
            },
            drawer: {
                type: Boolean,
                default: false,
            },
            mini: {
                type: Boolean,
                default: false,
            },
            filter: {
                type: Boolean,
                default: false,
            }
        },
    }
</script>