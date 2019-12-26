<template lang="pug">
   v-layout(column, align-center, justify-center fill-height)
        div.pgrs_relative.pgrs_full_width

            slot(name='main-logo')
            
            v-flex.white--text.pgrs_center.pgrs_p14 La forma inteligente de reservar citas
            v-flex.secondary--text.pgrs_center.pgrs_semibold.pgrs_p14 + 100 Servicios disponibles
        
        div.pgrs_full_width.pt-4
            v-layout.pgrs_finder_bar(row)
                v-flex.pgrs_input_cont
                    v-layout(row, wrap)
                        v-flex(lg7)
                            v-text-field.pgrs_input_s(solo, label='Busca',placeholder='Filtra aquí lo que buscas...', hide-details)
                        v-flex(lg3)
                            v-select.pgrs_input_filter(solo, dense, v-model='city' :items='cities' label='Ciudad', placeholder='Ciudad', hide-details)
                        v-flex(lg2)
                            v-btn.pgrs_btn_s.pgrs_m_0.pgrs_secondary_btn_color(depressed, color='secondary', to='/')
                                v-icon $vuetify.icons.search 
                                b &nbsp; Buscar

        slot(name='footer-bar')
</template>

<script>
    export default {
        data() {
            return {
                city: 'Bogotá DC',
                cities:[
                    'Bogotá DC',
                    'Barranquilla',
                    'Bucaramanga',
                    'Cali',
                    'Medellín',
                ],
            }
        },
    };
</script>