<template lang="pug">
    .global-content
        toolbar

        v-content
            v-container(fluid).pgrs_pt_0.pgrs_home_head_sec
                v-layout(row)
                    v-flex(xl2 lg2)
                    v-flex(xl8 lg8)
                        global-search-bar()
                    v-flex(xl2 lg2)

                #pgrs_frame1
                #pgrs_frame4

            
            v-container(grid-list-lg)#first-section-home
               
                v-layout(row wrap)
                    v-flex(xl4 lg4)
                    v-flex(xl8 lg4).pt-0.pb-0
                        .pgrs_main_title_section.pgrs_semibold
                            v-icon(color='white') $vuetify.icons.outline_star
                            | &nbsp; Más populares
                    v-flex(xl4 lg4)

                v-layout(row wrap).pgrs_cont_favorites
                    //- First 4th
                    v-flex( v-for='(item, index) in pservices', :key='item.id' xl2, lg3, md4, sm4, xs12)
            
                        //-- Component card service
                        card-service(:data='item' :img-card='item.imgUrl' :img-logo='item.logoC')
                        
                    //- Request and fill div
                    v-flex(xs12).pt-0.pb-0
                        .pgrs_dynamic_content_fill(:class='{"pgrs_dynamic_content_fill_open": togglePopular}')
                            v-layout(row wrap)
                                v-flex( v-for='(item, index) in pservices', :key='index' xl2, lg3, md4, sm4, xs12)
                                    
                                    //-- Component card service
                                    card-service(:data='item' :img-card='item.imgUrl' :img-logo='item.logoC')
                                        

                    //- Open more results
                    v-flex(xs12)
                        v-layout(row wrap)
                            v-flex(xl5 lg5)
                            v-flex(xl2 lg2)
                                .pgrs_center
                                    v-btn(outline dark round @click='togglePopular = !togglePopular').pgrs_btn_capitalize 
                                        |  Ver todos  &nbsp;
                                        span(v-if='togglePopular == false' style='line-height:0')
                                            v-icon(size='14px') $vuetify.icons.chevron_down
                                        span(v-else style='line-height:0')
                                            v-icon(size='14px') $vuetify.icons.chevron_up
                            v-flex(xl5 lg5)
                
            
            v-container(grid-list-lg)
                v-layout(row wrap)
                        v-flex(xl4 lg4)
                        v-flex(xl8 lg4).pt-0.pb-0
                            .pgrs_center.pgrs_semibold.white--text.pgrs_p17 Catálogo de Servicios
                        v-flex(xl4 lg4)

                v-layout(row wrap).pgrs_cont_section.mt-4
                    v-layout(row justify-space-between)
                        div
                            | foekfokef
                        div
                            | 8 elementos 
                    v-layout(row wrap, style='padding: 0.8em')
                        //- First 4th
                        v-flex( v-for='(item, index) in pservices', :key='item.id' xl2, lg3, md4, sm4, xs12)
                
                            //-- Component card service
                            card-service(:data='item' :img-card='item.imgUrl' :img-logo='item.logoC')
                        

</template>

<script>
    import db from '@/db.json'
    import app from '../../mixins/app'
    import GlobalSearchBar from '../../components/GlogalSearchBar'
    import CardService from '../../components/CardService'

    export default {
        mixins : [app],
        name: 'Home',

        metaInfo() {
            return {
                title: this.$t('Inicio'),
                meta: [
                    { name: 'description', content: this.$t('Inicio Bookser') }
                ]
            }
        },

        components:{GlobalSearchBar, CardService},
        data() {
            return {
                // JSON
                pservices: db.PopularServices,


                // Moneda del sistema
                money: '40',

                //toggle open more popular
                togglePopular: false
            }
        },

        computed: {
        },

        mounted () {
            // Themes begin
            am4core.useTheme(am4themes_animated);
            // am4core.useTheme(am4themes_dark);
            // var darkTheme = store.state.darkTheme;
            if(this.darkTheme) {
                am4core.useTheme(am4themes_dark);
            };
            // Themes en
        },

    };
</script>
