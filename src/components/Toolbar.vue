<template lang="pug">
    #toolbar
        //----------------------------------------------
        //-- NAVBAR REOLUTIONS (LG XS)
        //----------------------------------------------
        v-flex.pgrs_top_navbar.pgrs_gradient_blue.hidden-sm-and-down(:class='{"pgrs_bg_primary": $route.name != "Busqueda"}')
            v-container(fluid)
                v-layout(row wrap align-center).px-4
                    //- Section brand-logo
                    v-flex#pgrs_brand_sec_small
                        router-link(to="/")
                            img(src='@/assets/img/isotype.svg', width="60px")
                    //- Items Navigator
                    v-flex 
                        ul.pgrs_list_top_nav
                            li(v-for='(item, index) in menuOptions' :key='index')
                                a.pgrs_reltive(:href='item.to')
                                    v-flex.prgs_icon_item 
                                        span(:class="item.icon")
                                    v-flex.prgs_label_item(v-show='item.text && item.text != "Home"') {{item.text}}
                                v-flex.cont-indicator
                                    v-flex.cont-spacer(v-show='item.text && item.text != "Home"')
                                    v-flex.c-indicator
                                        v-flex.indicator(:class="{'indicator-marked': $route.name == item.text}")

                    //- cofiguration and notification sec
                    v-flex.pgrs_control_sec
                        v-flex(v-if='$route.name == "Busqueda"')
                            slot(name='login')
                        
                        //-- Panel access user session active
                        //---------------------------------------
                        v-layout(v-else row justify-end)
                            v-flex.pgrs_cont_btn()
                                v-btn.pgrs_mx_0(flat, icon, dark)
                                    v-icon(size='20px') $vuetify.icons.notifications

                            v-flex.pgrs_access-profile(shrink)
                                v-layout(row, align-center)
                                    v-layout(column).white--text.pr-2
                                        div.pgrs_bold Juan Rivera
                                        v-menu(v-model='profileMenu', bottom left)
                                            template(v-slot:activator='{ on }')
                                                div.pgrs_access_menu(v-on='on') Mi cuenta
                                            v-list(dense)
                                                //- v-list-tile()
                                                //-     v-list-tile-title Mi cuenta
                                                //- v-list-tile()
                                                //-     v-list-tile-title Ayuda
                                                v-list-tile(href='https://helpdesk.progresus.co/open.php' target='_blank')
                                                    v-list-tile-title Reportar un problema
                                                v-divider
                                                v-list-tile(to='/busqueda')
                                                    v-list-tile-title Salir
                                    v-layout.pgrs_profile
                                        div.pgrs_photo
                                            img(src="@/assets/img/profile_dummy.svg" width='100%')
        //----------------------------------------------
        //-- NAVBAR REOLUTIONS (MD SM XS)
        //----------------------------------------------

        v-toolbar(color='primary', dark, fixed, app).hidden-md-and-up
            v-toolbar-side-icon(@click.stop='$root.drawer = !$root.drawer')
            v-toolbar-title {{$route.name}}
            v-spacer
        
        v-navigation-drawer(fixed, v-model='$root.drawer', app temporary)
            v-list.pa-0
                v-list-tile(avatar)
                    v-list-tile-avatar
                       img(src='@/assets/img/profile_dummy.png')
                    v-list-tile-content
                        v-list-tile-title Liliana Illera
                        
                    v-list-tile-action(@click='$root.drawer = false').mr-1
                        span.icon-close.pgrs_p9

            v-divider
            v-list
                v-list-tile(v-for='item in menuOptions', :key='item.title', :to='item.to')
                    v-list-tile-action
                        span(:class="item.icon").pgrs_p13
                    v-list-tile-content
                        v-list-tile-title {{ item.text }}
            v-divider
            v-list
                v-list-tile(to='')
                    v-list-tile-action
                        span(class="icon-bell").pgrs_p13
                    v-list-tile-content
                        v-list-tile-title Notificaciones
                v-list-tile(to='')
                    v-list-tile-action
                        span(class="icon-gear").pgrs_p13
                    v-list-tile-content
                        v-list-tile-title Configuración  
                v-list-tile(href='https://helpdesk.progresus.co/open.php' target='_blank')
                    v-list-tile-action
                        span(class="icon-restict").pgrs_p13
                    v-list-tile-content
                        v-list-tile-title Reportar un problema   
                v-list-tile(to='/login')
                    v-list-tile-action
                        span(class="icon-arrow-right").pgrs_p13
                    v-list-tile-content
                        v-list-tile-title Salir   
        

        
        


</template>

<script>
    export default {
        name: "HeaderApp",
        methods:{
            toggleDrawer(){
                this.$root.drawerRight = !this.$root.drawerRight
            }
        },
        data() {
            return {
                showMenu: false,
                profileMenu: false,
                // Menu
                menuOptions: [
                    { 
                        icon: 'icon-search',
                        text: 'Busqueda' , to: '/busqueda',
                        withIcon: true, 
                    },{ 
                        icon: 'icon-calendar',
                        text: 'Agenda' , to: '#',
                        withIcon: true, 
                    },{ 
                        icon: 'icon-portfolio',
                        text: 'Asociados' , to: '#',
                        withIcon: true, 
                    }
                ],
            }
        },
        computed: {
            currentRouteName() {
                return this.$route.name;
            }
        }
    };
</script>

