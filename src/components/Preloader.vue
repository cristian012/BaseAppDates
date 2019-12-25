<script>
	export default {
        name: 'preloader',
	};
</script>
<template lang="pug">
    #pgrs_global_preloader
        v-layout.inner-cont(column, align-center)
            div(style='position:absolute; top: 7em')
                img(src='@/assets/img/logo_bookser.svg', width='170px')
            div.mt-2
            //-v-progress-linear(:indeterminate='true', color='white', height='3', style='opacity: 0.9')
            .pgrs_progress
                v-progress-circular(:size='240', color='white', indeterminate='')
            

           
</template>