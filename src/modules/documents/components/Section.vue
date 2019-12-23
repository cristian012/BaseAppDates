<template lang="pug">
    .detailpage-section
        .detailpage-section-title
            .flex-300
                h2 {{$t('Documentos')}}
        v-form
            .upload
                .upload-content.mb-4(:class="{'v-modal-loading white--text' : $refs.upload && $refs.upload.dropActive}")
                    .drop-active
                        h3 {{$t('Arrastra archivos aquí para subir')}}
                    .v-btns.mt-3
                        file-upload.v-btn.v-btn--round.v-btn--depressed.v-btn--small.primary(post-action='/upload/post', :multiple='true', :drop='true', :drop-directory='true', v-model='files', ref='upload')
                            .v-btn__content {{$t('Seleccionar archivos')}}
                        v-btn(small round depressed color="success" v-if='!$refs.upload || !$refs.upload.active' @click.prevent='$refs.upload.active = true')
                            v-icon(size="22").mr-2 $vuetify.icons.play
                            | {{$t('Comenzar carga')}}
                        v-btn(small round depressed color="error" v-else='', @click.prevent='$refs.upload.active = false')
                            v-icon(size="22").mr-2 $vuetify.icons.stop
                            | {{$t('Detener carga')}}
                v-layout(row wrap v-if='files.length')
                    v-flex.d-flex.pos-r.overflow-hidden(v-for='(file, i) in files' :key='file.id' :class="$store.state.viewList == 0 ? 'flex-200' : 'flex-full'") 
                        .v-sheet-back-options
                            .v-btns.justify-center
                                v-btn(dark icon depressed color="success" @click="")
                                    v-icon(small) $vuetify.icons.download
                                v-btn(dark icon depressed color="error" @click="$refs.deleteDocument.open()")
                                    v-icon(small) $vuetify.icons.delete
                        .v-sheet(v-touch="{ left: () => swipe('Left', i), right: () => swipe('Right', i) }" :class="[swipeDirection == 'Right'+i ? 'move-right' : '', $store.state.viewList == 1 ? 'v-sheet-row' : '', $store.state.darkTheme ? 'dark' : '']")
                            svg.v-sheet-tab(xmlns='http://www.w3.org/2000/svg', viewbox='0 0 152 24')
                                g#Capa_2(data-name='Capa 2')
                                    g#Capa_1-2(data-name='Capa 1')
                                        path#Path_159.v-sheet-tab-color(data-name='Path 159', d='M6,0H128l24,24H0V6A6,6,0,0,1,6,0Z')
                            .v-sheet-options
                                v-menu(left)
                                    v-btn(slot="activator" icon flat)
                                        v-icon $vuetify.icons.dots-vertical
                                    v-list.v-sheet-options-items
                                        v-list-tile(@click="")
                                            v-list-tile-action 
                                                v-icon $vuetify.icons.download
                                            v-list-tile-title {{$t('Descargar')}}
                                        v-list-tile(@click="$refs.deleteDocument.open()")
                                            v-list-tile-action 
                                                v-icon $vuetify.icons.delete
                                            v-list-tile-title {{$t('Eliminar')}}
                            .v-sheet-content
                                .v-sheet-status(:class="file.success ? 'success' : 'error'")
                                .set.mb-1
                                    label {{$t('Nombre')}}
                                    h2.pr-4 {{ file.name }} 
                                .set
                                    label {{$t('Tamaño')}}
                                    h4 {{ calculateSize(file.size) }}
                                .set
                                    label {{$t('Tipo')}}
                                    h4 {{ file.type }}
                                .set.mt-auto
                                    label {{$t('Progreso')}}
                                    v-progress-linear.mt-2.mb-0(v-model="file.progress" color="success" height="2")
                not-found(
                    v-else
                    small
                    message="No se encontraron documentos adjuntos"
                    icon="$vuetify.icons.search")
                
        confirm(
            ref="deleteDocument"
            @action=""
            :title="$t('Eliminar documento')"
            :message="$t('¿Realmente desea eliminar este documento?')")
</template>

<script>
    export default {
        data() {
            return {
                // Archivos
                files: [
                    {
                        "size": 80781,
                        "name": "Archivo.PNG",
                        "type": "image/png",
                        "success": true,
                        "progress": "100.00",
                        "id": "9fp5eq0ai0e",
                    }
                ],

                // Touch direction
                swipeDirection: 'None',
            }
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

            // Abrir opciones del Sheet
            swipe (direction, key) {
                this.swipeDirection = direction + key
            },
        }
    }
</script>