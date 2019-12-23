<template lang="pug">
    infinite(:on-infinite="infinite" ref="infinite")
        span(slot="no-more")
        span(slot="no-results")
        //- v-progress-circular.mr-3(indeterminate width="2")
        //- span {{$t('Cargando más elementos')}}...
</template>
<script> 

    import Infinite from './shared/InfiniteLoading.vue'

    export default { 
        props: {
            infinite: {
                type: Function,
                default(){
                    return {}
                }
            }
        },
        components: {
            infinite: Infinite
        },
        methods: {
            loaded(){
                this.$refs.infinite && this.$refs.infinite.$emit('$InfiniteLoading:reset')
            },
            reset(){
                this.$refs.infinite && this.$refs.infinite.$emit('$InfiniteLoading:loaded')
            },
            complete(){
                this.$refs.infinite && this.$refs.infinite.$emit('$InfiniteLoading:complete')
            }
        }
    }

</script>