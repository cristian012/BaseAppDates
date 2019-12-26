
export default {
    data: () => ({ 
        //-----------------------Desing------------------ 
        // Selección masiva
        massiveSelection: [],
        // Touch direction
        swipeDirection: 'None',
        currency_config: {
            decimal: ',',
            thousands: '.',
            prefix: '$ ',
            precision: 0,
            masked: false,
            allowBlank: false,
            min: Number.MIN_SAFE_INTEGER,
            max: Number.MAX_SAFE_INTEGER
        },
        //-----------------------Mixins-----------------
        rules: {
            required: value => !!value || 'Requerido.',
            email: value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Email invalido.'
            },
            phoneCel(value){
                if(value!==null&&typeof value!=="undefined"&&typeof value.length!=="undefined")
                {
                    if(value.length !== 10)
                        return "El numero de celular debe contener 10 caracteres";  
                    else
                        return true;
                }
                else
                    return true                
            },
            phone(value){
                if(value!==null&&typeof value!=="undefined"&&typeof value.length!=="undefined")
                {
                    if(value.length > 0){
                        if(value.length === 10 || value.length === 7)
                            return true;
                        else
                            return "Numero de telefono invalido";                      
                    }
                    else
                        return true;
                }
                else
                    return true 
            }
        },
        loadPage:false,
        loaderSubmit:false,
        //Listado de objetos en vista
        objects: [],
        //Formulario - Modal
        valid: true, 
        loadModal:false,
        manageModal: false,
        statusObj: true,
        obj: {},
        uuid:null,
        //----Filtros----
        filter: {},
        filterQuery: {},
        order:{},
        itemsOrder:[
            {text:"A - Z",value:"1"},
            {text:"Z - A",value:"2"},
            {text:"Fecha Asc.",value:"3"},
            {text:"Fecha Desc.",value:"4"},
        ],
        status: [ 
            { "name": "Activo", "value": "1"},
            { "name": "Inactivo", "value": "0"}
        ],
        //----InfiniteLoading----- 
        limit: 3,
        offset: 0,
        preload: true,
        infiniteLoad: false,
        total: 0,
    }),
    watch:{
        filter: {
            deep: true,
            handler:function(){   
                this.filterQuery = this.$cloneDeep(this.filter); 
                if(typeof this.filter.query!=="undefined"&&this.filter.query!==""){
                    let temp = {}
                    this.fieldsQuery.query.forEach(field => {
                        temp[field] = this.filter.query
                    });
                    this.filterQuery["OR #query"] = temp
                }
                else{
                    delete this.filterQuery["OR #query"]
                }
                delete this.filterQuery["order"]    
                delete this.filterQuery["query"]
                if(typeof this.filter.order!=="undefined"){
                    this.order = this.getOrderBy(this.filter.order,this.fieldsQuery.name,this.fieldsQuery.date)
                }
                this.fetch({},false,false,true)
            }
        }
    },
    methods: {
        //---------------------Desing---------------------
        // Abrir opciones del Sheet
        swipe (direction, key) {
            this.swipeDirection = direction + key
        },
        openCloseSheet (key) {
            if(this.swipeDirection == 'Left' + key) {
                return this.swipeDirection = 'Right' + key
            }
            else {
                return this.swipeDirection = 'Left' + key
            }
        },
        // Setting Years / Month / day (Datepickers)
        setDate (date, ref) {
            this.$refs[ref].save(date)
        },
        // Forecast to 5 years to future rage date
        setRangeDate(){
            let date, year, month, days, range;
            date = new Date()
            year = date.getFullYear() + 6 ;month = date.getMonth();days = date.getDate();
            range = year + '-' + month + '-' + days
            return range
        },
        //-----------------------Mixins-----------------
        manageAlert(type,message){
            let msj;
            if(!type){
                msj = "Error inesperado, intente nuevamente."
                if(typeof message!=="undefined")
                    msj = message
                
                this.$store.state.alert = true
                this.$store.state.alertMessage = this.$t(msj)
                this.$store.state.alertColor = 'error'
            }
            else{
                msj = "Los cambios fueron guardados correctamente."
                if(typeof message!=="undefined")
                    msj = message
                
                this.$store.state.alert = true
                this.$store.state.alertMessage = this.$t(msj)
                this.$store.state.alertColor = 'success'
            }
        },
        async manageConfirm(message="¿Confirma la acción?",title ="Confirmar",buttonFalseText = "Rechazar", buttonTrueText="Confirmar"){

            let res = await this.$confirm(message, {title,buttonFalseText,buttonTrueText})
            return res;
        },
        validateNumber(event, id, _float){
            let element = document.getElementById(id)
            event = event || window.event;
            var charCode = event.which || event.keyCode;
            if (charCode == 8 || charCode == 13 || (_float ? (element.value.indexOf('.') == -1 ? charCode == 46 : false) : false)){}                     
            else if ((charCode < 48) || (charCode > 57))
            {
                event.preventDefault();
            }     
        },
        loadSelect(dataFilter){

            this.$api(this, (xhr) => {
                xhr.get(dataFilter.url+"?"+this.$qs.stringify(dataFilter.form)).then((r) => {
                    let data = r.data                         
                    var dataTemp=[];
                    data.data.forEach(element => {
                        var temp = new Object();
                        if(dataFilter.id_element)
                            temp.value=element[dataFilter.idItem];
                        else
                            temp.value=element.uuid;
                        temp.text=element[dataFilter.nameItem];
                        dataTemp.push(temp)
                    });
                    this[dataFilter.arrayLocal] = dataTemp  
                }).catch(() => this.$root.$emit('networkError'))
            })
        },
        loadData(itemsRender){ 

            itemsRender.forEach(item => {
                 //Request
                this.$api(this, (xhr) => {
                    xhr.get(item.url+"?"+this.$qs.stringify(item.form)).then((r) =>{
                        
                        let data = r.data 
                        if(data.response)
                        {
                            switch(item.type)
                            {   
                                case 'select':
                                    var dataTemp=[];
                                    data.data.forEach(element => {
                                        var temp = new Object();
                                        if(item.idItem)
                                            temp.value=element[item.idItem];
                                        else
                                            temp.value=element.uuid;
                                        temp.text=element[item.nameItem];
                                        dataTemp.push(temp)
                                    });
                                    this[item.arrayLocal] = dataTemp  
                                break;
                                case 'free':
                                    this[item.arrayLocal] = data.data
                                break;
                                case 'object':
                                    this[item.arrayLocal] = data.data[0] 
                                break;
                            }                                        
                        }     
                        else
                        {
                            this[item.arrayLocal] = []
                        }                  
                    }).catch(() => {
                        this.manageError(true,"Ha ocurrido un error inesperado")
                        this.filterLoader = false
                        this.$root.$emit('networkError')
                    })
                })  
            });
        },  
        async loadItem(item){

            try {
                let request = await this.$api(this, (xhr) => {
                    return xhr.get(item.url+"?"+this.$qs.stringify(item.form))
                })
                let data = request.data;
                if(data.response){
                    switch(item.type)
                    {   
                        case 'select':
                            var dataTemp=[];
                            data.data.forEach(element => {
                                var temp = new Object();
                                if(item.idItem)
                                    temp.value=element[item.idItem];
                                else
                                    temp.value=element.uuid;
                                temp.text=element[item.nameItem];
                                dataTemp.push(temp)
                            });
                            this[item.arrayLocal] = dataTemp  
                        break;
                        case 'free':
                            this[item.arrayLocal] = data.data
                        break;
                        case 'object':
                            this[item.arrayLocal] = data.data[0] 
                        break;
                    } 
                }
                else{
                    this[item.arrayLocal] = []
                }
                return true;
            }catch(e) {
                this.manageError(true,e)
                return false;
            }            
        },
        async sendPost(data){
            try {
                let temp = await this.$api(this, (xhr) => {
                    return xhr.post(data.url, this.$qs.stringify(data.form))
                })
                return temp.data;
            }catch (error) {
                console.log(error)
                return []   
            }       
        },
        async sendDelete(data){
            try {
                let temp = await this.$api(this, (xhr) => {
                    return xhr.delete(data.url+"?"+this.$qs.stringify(data.form))
                })
                return temp.data;
            }catch (error) {
                console.log(error)
                return []   
            }       
        },
        async sendGet(data){

            try {
                let temp = await this.$api(this, (xhr) => {
                    return xhr.get(data.url+"?"+this.$qs.stringify(data.form))
                })
                return temp.data;
            }catch (error) {
                console.log(error)
                return []   
            }
            
        },
        async loadObject(data){

            try {
                let temp = await this.$api(this, (xhr) => {
                    return xhr.get(data.url+"?"+this.$qs.stringify(data.form))
                })
                if(temp.data.response)
                    this[data.object]=temp.data.data[0]
                else
                    this[data.object] = {}
            } catch (error) {
                console.log(error)
                return [] 
            }   
        },
        async deleteElement(uuid,url,fn=null,messageDelete="¿En verdad desea eliminar el registro?",showMessage=true){

            if(showMessage){
                let val = await this.manageConfirm(messageDelete)
                if(!val)
                    return false;
            }

            try {

                let temp = await this.$api(this, (xhr) => {
                    return xhr.delete(url+"?"+this.$qs.stringify({uuid}))
                })
                if(temp.data.response)
                {
                    this.manageAlert(true)
                    if(fn)
                        fn()
                }
                else
                {
                    this.manageAlert(false,temp.data.message)
                }
            } catch (error) {
                console.log(error)
                return []  
            }          
        },
        infinite(){
            setTimeout(() => this.fetch({}, true), 500)
        },
        addForgetKeys(data) {
            return data
        },
        getOrderBy(value,name,date){
            let order={}
            switch(value){
                case '1':
                    order[name]= "ASC"
                break;
                case '2':
                    order[name]= "DESC"
                break;
                case '3':
                    order[date]= "ASC"
                break;
                case '4':
                    order[date]= "DESC"
                break;
            }
            return order;
        },
        validateSelect(id,items,nameId="value"){
            let val = false
            items.forEach(element => {
                if(id===element[nameId]){
                    val = true
                }            
            });
            return val;
        },
        clearFilter(){
            console.log(this.objects)
            console.log(this.massiveSelection)
            this.filter = {}
            this.order = {}
        },
        async getProfile(){
            let params = { 
                url:"/profile"
            }
            let pr = {}
            try {
                let data =  await this.sendPost(params)
                if(data.response){
                    pr=data.data
                }
            } catch (error) {
               console.log(error) 
               return pr;
            }
            
            return pr;
        },
        reloadApp(){
            return this.$api(this, (xhr) => {
                return xhr.post('/profile').then((r) => {
                    let data = r.data
                    //Din sesión
                    if (!data.response) 
                    {                
                        this.$root.loader = false
                        if (!routeMeta.auth) return
                        return this.$router.push({ name : "Login" })              
                    } 
                    else 
                    {
                        //Datos del usuario
                        this.$root.profile = data.data 
                        let profile = data.data
                        this.authProfile({ profile, routeMeta, route})
                    }
                })
            })
        }
    }
}
