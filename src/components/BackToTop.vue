<template lang="pug">
    v-btn.scale-center(icon dark color="primary" v-show="$store.state.backToTop" @click="$vuetify.goTo(0, options)" v-scroll="onScroll")
        v-icon $vuetify.icons.chevron-up
</template>

<script>
    import * as easings from 'vuetify/es5/util/easing-patterns'

    export default {
        data () {
            return {
                // Scroll
                offsetTop: 0,
                
                // Scrolling
                duration: 300,
                offset: 0,
                easing: 'easeInOutCubic',
                easings: Object.keys(easings),
            }
        },
        methods:{
            onScroll (e) {
                this.offsetTop = window.pageYOffset || document.documentElement.scrollTop

                if(this.offsetTop > 100) {
                    return this.$store.state.backToTop = true 
                } 
                else {
                    return this.$store.state.backToTop = false 
                }
            },
        },
        computed: {
            options () {
                return {
                    duration: this.duration,
                    offset: this.offset,
                    easing: this.easing
                }
            },
        }
    }
</script>