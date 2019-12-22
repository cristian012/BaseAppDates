<script>
	export default {
		head: { 
			title: '403 Sin permisos'
		},
		mounted()
		{
			this.$root.preload = false;
		}
	};
</script>
<template lang="pug">
    div() 403 - No tiene permisos para acceder
</template>