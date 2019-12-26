<template lang="pug">
    v-card.pgrs_card-service()
        v-layout(row wrap)
            v-flex(xs12).pb-0
                .pgrs_cont_img
                    img(:src="require(`@/assets/img/services/${imgCard}`)")
            v-flex(xs12).pgrs_p_0
                .pgrs_cont_circ
                    .pgrs_circle_mask
                        router-link(to="#")
                            img(:src='require(`@/assets/img/companies/${imgLogo}`)')
            v-flex(xs12).pt-0
                .pgrs_cont_data_card
                    .pgrs_subtitle_card.text-truncate {{ data.subtitle | placeholder('- - - - - ') }}
                    .pgrs_title_card.text-truncate {{ data.title | placeholder('- - - - - ') }}
                    .pgrs_sec_title.text-truncate {{ data.location | placeholder('- - - - - ') }}
                    v-flex.mt-2
                        v-layout(row)
                            div.pgrs_chip_tag(v-for='(item, index) in data.tags' :key='index')
                                | {{ item  | placeholder('N/A') }}
                            

        slot(name='footer-bar')
</template>

<script>
    export default {
        props: {
            data: Object,
            imgCard: String,
            imgLogo: String
        },
        data() {
            return {
               
            }
        },
    };
</script>