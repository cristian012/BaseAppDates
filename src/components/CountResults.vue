<template lang="pug">
    .v-counter(:class="filter ? 'filter-open' : '' ")
        span {{ currentCounter }} / {{ totalCounter }}
        strong {{ totalCounter | pluralize( $t('Resultado'), $t('Resultados') ) }}
</template>

<script>
    export default {
        props: {
            currentCounter: {
                type: Number,
                required: true
            },
            totalCounter: {
                type: Number,
                required: true
            },
            filter: {
                type: Boolean,
                default: false
            }
        }
    }
</script>