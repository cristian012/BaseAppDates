<template lang="pug">
    v-text-field(v-model="model" v-bind="$attrs")
</template>

<script>
    import Cleave from 'cleave.js'
    export default {
        props: {
            value: ''
        },
        data(){
            return {
                model : '',
                handle: null
            }
        },
        watch: {
            model(){
                this.setValue(this.model)
            }
        },
        mounted(){
            this.model = this.value
            let el = this.$el.getElementsByTagName('input')

            this.handle = new Cleave(el, {
                numeral: true,
                numericOnly: true,
                onValueChanged: (e) => {
                    this.model = e.target.value
                    this.$emit('input', e.target.rawValue)
                }
            })
        },
        methods: {
            setValue(value){
                this.model = value
                this.handle.setRawValue(value)
            }
        }
    }
</script>