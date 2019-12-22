<script>
	export default {
		head: { 
			title: '404 Not Found'
		},
		mounted()
		{
			this.$root.preload = false;
		}
	};
</script>
<template lang="pug">
    div() 404 - Pagina no encontrada
</template>