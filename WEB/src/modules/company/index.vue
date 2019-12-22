<template lang="pug">
    .global-content
        toolbar
        
        v-content
            v-container(fluid grid-list-lg)
                h1 {{$t('Información empresarial')}}
                h2.font-weight-medium.mb-3 {{$t('Datos de la empresa/persona')}}
                v-form(ref="form" v-model="valid" lazy-validation)
                    .upload(:class="{'v-modal-loading' : $refs.upload && $refs.upload.dropActive}")
                        .upload-content.mb-4
                            .drop-active
                                h3 {{$t('Arrastra el logo aquí para subir')}}
                                .upload-logo.mt-3(v-if="files.length > 0")
                                    img(:src="files[0].blob")
                                    v-progress-linear.mt-2.mb-0(v-model="files[0].progress" color="success" height="2")
                            .v-btns.mt-3
                                file-upload.v-btn.v-btn--round.v-btn--depressed.v-btn--small.primary(
                                    post-action='/upload/post'
                                    extensions="gif,jpg,jpeg,png,webp"
                                    accept="image/png,image/gif,image/jpeg,image/webp"
                                    :drop='true'
                                    :drop-directory='true'
                                    v-model='files'
                                    @input-filter="inputFilter"
                                    @input-file="inputFile"
                                    ref='upload')
                                    .v-btn__content {{$t('Seleccionar logo')}}
                                v-btn(small round depressed color="success" v-if='!$refs.upload || !$refs.upload.active' @click.prevent='$refs.upload.active = true')
                                    v-icon(size="22").mr-2 $vuetify.icons.play
                                    | {{$t('Comenzar carga')}}
                                v-btn(small round depressed color="error" v-else='', @click.prevent='$refs.upload.active = false')
                                    v-icon(size="22").mr-2 $vuetify.icons.stop
                                    | {{$t('Detener carga')}}

                    v-layout(row wrap)
                        v-flex(xs12 sm6 md4 lg3 xl2)
                            v-text-field(v-model="name" :label="$t('Nombre')" color="success" :rules="$store.state.rules" required)
                        v-flex(xs12 sm6 md4 lg3 xl2)
                            v-text-field(v-model="id" :label="$t('Identificación')" color="success")
                        v-flex(xs12 sm6 md4 lg3 xl2)
                            v-text-field(v-model="phone" :label="$t('Teléfono')" color="success")
                        v-flex(xs12 sm6 md4 lg3 xl2)
                            v-text-field(v-model="address" :label="$t('Dirección')" color="success")
                        v-flex(xs12 sm6 md4 lg3 xl2)
                            v-text-field(v-model="website" :label="$t('Sitio web')" color="success")
                        v-flex(xs12 sm6 md4 lg3 xl2)
                            v-autocomplete(
                                v-model="country"
                                :items="countries"
                                :label="$t('País')"
                                item-text="name"
                                item-value="value"
                                color="success"
                                append-icon="$vuetify.icons.chevron-down"
                                persistent-hint)
                        v-flex(xs12 sm6 md4 lg3 xl2)
                            v-text-field(v-model="province" :label="$t('Departamento / Provincia')" color="success")
                        v-flex(xs12 sm6 md4 lg3 xl2)
                            v-text-field(v-model="city" :label="$t('Ciudad')" color="success")
                    .v-btns
                        v-btn.px-5(round depressed color="primary" @click="save") {{$t('Guardar')}}
                v-divider.my-4

                h2.font-weight-medium.mb-3 {{ $t('Políticas de privacidad, términos y condiciones') }}
                v-form(ref="formTerms" v-model="valid" lazy-validation)
                    .quill-editor(ref="terms" v-model="terms" v-quill:termsQuillEditor="editorOption" style="height: auto; min-height: 200px;" v-if="editor")
                    .v-btns.mt-3
                        v-btn.px-5(round depressed color="primary" @click="") {{$t('Guardar')}}

        footer-component(:drawer="$store.state.drawer" :mini="$store.state.mini")

        btns-floating(left bottom :drawer="$store.state.drawer" :mini="$store.state.mini")
            back-to-top

</template>

<script>
    import db from '@/db.json'

    export default {
        name: 'CompanyInfo',

        metaInfo() {
            return {
                title: this.$t('Información empresarial'),
                meta: [
                    { name: 'description', content: this.$t('Información empresarial SalesMan CRM') }
                ]
            }
        },

        data() {
            return {
                // Formulario
                valid: true,
                name: '',
                id: '',
                phone: '',
                address: '',
                website: '',
                country: '',
                province: '',
                city: '',

                // Formulario términos
                terms: '',

                // Editor
                editor: false,
                editorOption: {
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                            ['blockquote', 'link' /*'code-block'*/],

                            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                            [{ 'direction': 'rtl' }],                         // text direction

                            // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                            // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                            // [{ 'font': [] }],
                            [{ 'align': [] }],

                            ['clean']                                         // remove formatting button
                        ]
                    },
                },

                // Archivos
                files: [],

                // Paises
                countries: [
                    { name: 'Argentina', value: 0 },
                    { name: 'Brasil', value: 1 },
                    { name: 'Colombia', value: 2 },
                    { name: 'Perú', value: 3 },
                ],
            }
        },

        mounted() {
            this.editor = true
        },

        methods: {
            // Calcular peso
            calculateSize(bytes){
                var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
                if (bytes == 0) return '0 Byte'

                var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
                return Math.round(bytes/Math.pow(1024, i), 2) + ' ' + sizes[i]
            },

            // Subir archivos
            inputFile: function (newFile, oldFile) {
                if (newFile && oldFile && !newFile.active && oldFile.active) {
                    // Get response data
                    console.log('response', newFile.response)
                    if (newFile.xhr) {
                        //  Get the response status code
                        console.log('status', newFile.xhr.status)
                    }
                }
            },
            /**
             * Pretreatment
             * @param  Object|undefined   newFile   Read and write
             * @param  Object|undefined   oldFile   Read only
             * @param  Function           prevent   Prevent changing
             * @return undefined
             */
            inputFilter: function (newFile, oldFile, prevent) {
                if (newFile && !oldFile) {
                    // Filter non-image file
                    if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
                        return prevent()
                    }
                }

                // Create a blob field
                newFile.blob = ''
                let URL = window.URL || window.webkitURL
                if (URL && URL.createObjectURL) {
                    newFile.blob = URL.createObjectURL(newFile.file)
                }
            },

            // Formulario
            save() {
                if (this.$refs.form.validate()) {
                    this.$store.state.alert = true
                    this.$store.state.alertMessage = this.$t('Datos guardados exitosamente')
                    this.$store.state.alertColor = 'success'
                } else {
                    this.$store.state.alert = true
                    this.$store.state.alertMessage = this.$t('Faltan campos por completar')
                    this.$store.state.alertColor = 'error'
                }
            },
            reset() {
                this.$refs.form.reset()
            },
        }
    };
</script>