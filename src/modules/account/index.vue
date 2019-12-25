<template lang="pug">
    .global-content.account
        toolbar
        
        v-content
            v-container(fluid grid-list-lg)
                h1.mb-4 {{$t('Mi cuenta')}}

                .avatar(:class="{'v-modal-loading white--text' : $refs.upload && $refs.upload.dropActive}")
                    //- .drop-active(v-show='$refs.upload && $refs.upload.dropActive')
                        h3 {{ $t('Soltar foto para cargar') }}
                    .avatar-upload(v-show='!edit')
                        label(for='avatar')
                            svg(xmlns='http://www.w3.org/2000/svg', viewBox='0 0 140 140')
                                title {{ $t('Seleccionar avatar') }}
                                g#Capa_2(data-name='Capa 2')
                                    g#Capa_1-2(data-name='Capa 1')
                                        path(d='M70,0A70,70,0,0,0,35.18,130.71c.65.38,1.32.74,2,1.09a69.1,69.1,0,0,0,10.66,4.6c.66.22,1.32.42,2,.62a69.63,69.63,0,0,0,13.39,2.65q3.36.33,6.81.33a68.21,68.21,0,0,0,7.18-.37,69.1,69.1,0,0,0,13.46-2.74c.66-.2,1.32-.42,2-.64a70.44,70.44,0,0,0,10.66-4.68c.66-.36,1.32-.74,2-1.12A70,70,0,0,0,70,0ZM49.8,134.86V121.54h-2V134.2a67.1,67.1,0,0,1-10.66-4.76v-7.9h0v-3.43A11.22,11.22,0,0,1,48.37,106.9H56a24.79,24.79,0,0,0,2.85,1.6,25.77,25.77,0,0,0,4.9,1.77l-8.36,5.52,1.09,1.65,6.46-4.26a7.9,7.9,0,0,0,.42,1.87,6.36,6.36,0,0,0,2.77,3.44c.07,1.94-1.07,9.84-2.57,19.12A67.68,67.68,0,0,1,49.8,134.86ZM45.88,82.79h0v-2H44.22a5.24,5.24,0,0,1,0-10.48h1.67V68.71c6.11-4.08-.48-20.58,5.71-26.16C56.67,38,65.69,40.49,78,45.75c5.29,2.25,13,1.88,16.52.47V68.35h0v2h1.68a5.24,5.24,0,1,1,0,10.48H94.58v2h0v2a24.36,24.36,0,0,1-23,24.3c-.46,0-.92,0-1.38,0A24.37,24.37,0,0,1,45.88,84.78Zm46.74,51.26V121.54h-2v13.18a67.76,67.76,0,0,1-13.8,2.86c-1.52-9.27-2.69-17.16-2.63-19.1A6.36,6.36,0,0,0,77,115a7.72,7.72,0,0,0,.4-1.79l6.18,4.2,1.11-1.64-8.07-5.48.34-.09c.37-.09.74-.2,1.1-.31a26.42,26.42,0,0,0,6.45-3h7.58a11.22,11.22,0,0,1,11.22,11.21v3.43h0v7.66A68.41,68.41,0,0,1,92.62,134.05Zm12.64-6v-6.5h0v-3.43a13.21,13.21,0,0,0-13.2-13.2h-4.9a26.24,26.24,0,0,0,9.37-20.13v-2h-.27a7.22,7.22,0,0,0,1.9-14.18,7,7,0,0,0-1.9-.26h.27v-28A26.31,26.31,0,0,0,70.22,14h-.11A26.27,26.27,0,0,0,43.9,40.32v28h0a7,7,0,0,0-1.58.25,7.21,7.21,0,0,0,.22,14,6.76,6.76,0,0,0,1.36.2v2h0a26.27,26.27,0,0,0,1.19,7.83c.25.82.55,1.63.88,2.42a26.31,26.31,0,0,0,3.94,6.49c.27.33.55.65.83,1a25.34,25.34,0,0,0,2.54,2.43H48.37a13.21,13.21,0,0,0-13.19,13.2V128.3a67.92,67.92,0,1,1,70.08-.26Z')
                                        path(d='M41,76.11h2a2,2,0,0,1,.25-1,2.11,2.11,0,0,1,1.32-1,2.24,2.24,0,0,1,.52-.06h.82v-2h-.82A4.07,4.07,0,0,0,41,76.11Z')
                                        path(d='M95.92,74.09a2.09,2.09,0,0,1,1.57,2h2a4.06,4.06,0,0,0-4.06-4.06h-.83v2h.83A2.1,2.1,0,0,1,95.92,74.09Z')
                        file-upload(extensions='gif,jpg,jpeg,png,webp', accept='image/png,image/gif,image/jpeg,image/webp', name='avatar', post-action='/upload/post', :drop='!edit', v-model='avatar', @input-filter='inputFilter', @input-file='inputFile', ref='upload')
                            v-btn(icon color="white success--text" large)
                                v-icon $vuetify.icons.edit
                    .avatar-edit(v-show='avatar.length && edit')
                        .avatar-edit-image(v-if='avatar.length')
                            img(ref='editImage', :src='avatar[0].url')
                        .avatar-edit-btns
                            v-btn(icon color="error" @click.prevent='$refs.upload.clear') 
                                v-icon $vuetify.icons.close
                            v-btn(icon color="success" @click.prevent='editSave')
                                v-icon $vuetify.icons.check


                .account-content.mxw-1200
                    v-card.account-data(flat)
                        v-card-text
                            h2.mb-3 {{ $t('Datos generales') }}
                            v-form(ref="form" v-model="valid" lazy-validation)
                                v-layout(row wrap)
                                    v-flex(xs12)
                                        v-text-field(v-model="userData.name" :label="$t('Nombre completo')" color="success" :rules="$store.state.rules" required)
                                    v-flex(xs12)
                                        v-text-field(v-model="userData.user_name" :label="$t('Nombre de usuario')" color="success" :rules="$store.state.rules" required)
                                    v-flex(xs12 sm6)
                                        v-text-field(v-model="userData.email" :label="$t('Correo electrónico')" color="success" :rules="$store.state.emailRules" required)
                                    v-flex(xs12 sm6)
                                        v-text-field(v-model="userData.phone" :label="$t('Teléfono')" color="success")
                                .v-btns.justify-center
                                    v-btn.px-5(round depressed color="primary" @click="save") {{$t('Guardar')}}
                    
                    v-card(flat)
                        v-card-text
                            h2.mb-3 {{ $t('Cambiar contraseña') }}
                            v-form(ref="formPass" v-model="valid" lazy-validation)
                                v-layout(row wrap)
                                    v-flex.flex-300
                                        v-text-field(
                                            v-model="password"
                                            :append-icon="showPass ? '$vuetify.icons.hide' : '$vuetify.icons.show'"
                                            :rules="[rules.required, rules.min]"
                                            :type="showPass ? 'text' : 'password'"
                                            :label="$t('Contraseña actual')"
                                            :hint="$t('Al menos 8 carácteres')"
                                            browser-autocomplete="new-password"
                                            @click:append="showPass = !showPass")
                                    v-flex.flex-300
                                        v-text-field(
                                            v-model="newPassword"
                                            :append-icon="showNewPass ? '$vuetify.icons.hide' : '$vuetify.icons.show'"
                                            :rules="[rules.required, rules.min]"
                                            :type="showNewPass ? 'text' : 'password'"
                                            :label="$t('Nueva contraseña')"
                                            :hint="$t('Al menos 8 carácteres')"
                                            browser-autocomplete="new-password"
                                            @click:append="showNewPass = !showNewPass")
                                    v-flex.flex-300
                                        v-text-field.mb-3(
                                            v-model="newPasswordConfirm"
                                            :append-icon="showNewPassConfirm ? '$vuetify.icons.hide' : '$vuetify.icons.show'"
                                            :rules="[rules.required, rules.min]"
                                            :type="showNewPassConfirm ? 'text' : 'password'"
                                            :label="$t('Confirmar nueva contraseña')"
                                            :hint="$t('Al menos 8 carácteres')"
                                            @click:append="showNewPassConfirm = !showNewPassConfirm")
                                .v-btns.justify-center
                                    v-btn.px-5(round depressed color="primary" @click="savePass") {{$t('Guardar')}}

        footer-component(:drawer="$store.state.drawer" :mini="$store.state.mini")

        btns-floating(left bottom :drawer="$store.state.drawer" :mini="$store.state.mini")
            back-to-top

</template>

<script>
    import db from '@/db.json'
    import Cropper from 'cropperjs'

    export default {
        name: 'Account',

        metaInfo() {
            return {
                title: this.$t('Mi cuenta'),
                meta: [
                    { name: 'description', content: this.$t('Mi cuenta Bookser') }
                ]
            }
        },

        data() {
            return {
                // JSON
                userData: db.userData,

                // Formulario
                valid: true,
                name: '',
                user_name: '',
                email: '',
                phone: '',
                avatar: [],

                // Formulario contraseña
                password: '',
                newPassword: '',
                newPasswordConfirm: '',

                // Mostrar contraseña
                showPass: false,
                showNewPass: false,
                showNewPassConfirm: false,

                // Validación
                rules: {
                    required: value => !!value || this.$t('Este campo es requerido'),
                    min: v => v.length >= 8 || this.$t('Min. 8 caracteres'),
                },

                // Avatar
                edit: false,
                cropper: false,
            }
        },

        watch: {
            edit(value) {
                if (value) {
                    this.$nextTick(function () {
                    if (!this.$refs.editImage) {
                        return
                    }
                    let cropper = new Cropper(this.$refs.editImage, {
                        aspectRatio: 1 / 1,
                        viewMode: 1,
                    })
                    this.cropper = cropper
                    })
                } else {
                    if (this.cropper) {
                    this.cropper.destroy()
                    this.cropper = false
                    }
                }
            }
        },

        methods: {
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

            savePass() {
                if (this.$refs.formPass.validate()) {
                    this.$store.state.alert = true
                    this.$store.state.alertMessage = this.$t('Datos guardados exitosamente')
                    this.$store.state.alertColor = 'success'
                } else {
                    this.$store.state.alert = true
                    this.$store.state.alertMessage = this.$t('Faltan campos por completar')
                    this.$store.state.alertColor = 'error'
                }
            },

            // Avatar
            editSave() {
                this.edit = false
                let oldFile = this.avatar[0]
                let binStr = atob(this.cropper.getCroppedCanvas().toDataURL(oldFile.type).split(',')[1])
                let arr = new Uint8Array(binStr.length)
                for (let i = 0; i < binStr.length; i++) {
                    arr[i] = binStr.charCodeAt(i)
                }
                let file = new File([arr], oldFile.name, { type: oldFile.type })
                this.$refs.upload.update(oldFile.id, {
                    file,
                    type: file.type,
                    size: file.size,
                    active: true,
                })
                },
                alert(message) {
                alert(message)
                },
                inputFile(newFile, oldFile, prevent) {
                if (newFile && !oldFile) {
                    this.$nextTick(function () {
                    this.edit = true
                    })
                }
                if (!newFile && oldFile) {
                    this.edit = false
                }
                },
                inputFilter(newFile, oldFile, prevent) {
                if (newFile && !oldFile) {
                    if (!/\.(gif|jpg|jpeg|png|webp)$/i.test(newFile.name)) {
                    this.alert('Your choice is not a picture')
                    return prevent()
                    }
                }
                if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
                    newFile.url = ''
                    let URL = window.URL || window.webkitURL
                    if (URL && URL.createObjectURL) {
                    newFile.url = URL.createObjectURL(newFile.file)
                    }
                }
            }
        }
    };
</script>