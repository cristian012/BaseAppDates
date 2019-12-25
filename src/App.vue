<template lang="pug">
    #app
        v-app( :dark="$store.state.darkTheme ? true : false ")

            div(v-show="$root.preload") 
                preloader() 
            
            main(v-show="!$root.preload")
                router-view()
                alert(ref="alert")      

        //- component(:is="layout") 
    </div>
</template>

<style src="@/assets/stylus/main.css"></style>

<script>
    
    import Preloader from './components/Preloader'

    export default {
        name: "App",

        // Inject meta tags using "vue-meta" plugin. See https://vue-meta.nuxtjs.org/
        metaInfo() {
            return {
                title: "Vue SSR Boilerplate",
                titleTemplate: "%s • " + this.$store.state.title,

                meta: [
                    {
                        vmid: "description",
                        name: "description",
                        content: "Minimal starter package for Vue.js server side rendering.",
                    },
                ],
            };
        },

        data() {
            return {
                drawer: 10
            }
        },

        components: {
           Preloader
        },

        computed: {
            layout() {
                return this.$route.meta.layout || "DefaultLayout";
            },
        },
    };
</script>