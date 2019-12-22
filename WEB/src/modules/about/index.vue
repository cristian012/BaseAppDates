<template lang="pug">
    .global-content
        toolbar

        v-content.home
            v-container(fluid)
                h1 {{$t('Nosotros')}}
                    //- small {{ admin.name }}
                v-btn(to="/") inicio
</template>

<script>
    export default {
        name: 'About',

        metaInfo: {
            title: 'Vue SSR Simple Setup About',
            meta: [
                { name: 'description', content: 'About page description' }
            ]
        },
    };
</script>
