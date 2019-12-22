<template lang="pug">
    ul
        li(v-for='user in users') {{user.name}} {{user.lastname}}
</template>

<script>
    export default {
        name: 'UsersList',
        props: {
            users: {
                type: Array,
                required: true
            }
        },
    };
</script>
