export default {
    data() {
        return {
            categories      : [],
            providers       : [],
            products        : []
        }
    },
    methods: {

        //TODO: DOC
        getProductsByCategory(model, cb = null) {
            
            this.products = []
            this.preloadSmall = true

            return this.$api(this).then((xhr) => {
                return xhr.get('/products/category/' + model.id).then((r) => {

                    let data = r.data
                    let products = []
                    data.map(function(p){
                        products.push({
                            text: p.name,
                            id: p.uuid,
                            info: p
                        })
                    })
                    this.products = products

                    if (cb != null) cb()
                })
            })
        },

        //TODO: DOC
        getProductsByProvider(model, cb = null) {
            
            this.categories = []
            this.products = []
            this.preloadSmall = true

            return this.$api(this).then((xhr) => {
                return xhr.get('/products/asociate/' + model.id).then((r) => {

                    let data               = r.data
                    let productsByCategory = {}
                    let categories         = []

                    data.map(function(p){
                        if(productsByCategory[p.categoryid]){
                            productsByCategory[p.categoryid].push(p)
                        }else{
                            productsByCategory[p.categoryid] = [p]
                        }
                    })

                    Object.keys(productsByCategory).map(function(p){
                        categories.push({
                            id  : productsByCategory[p][0].category_id,
                            text: productsByCategory[p][0].category_name
                        })
                    })

                    this.products = data
                    this.categories   = categories
                    this.preloadSmall = false

                    if (cb != null) cb()
                })
            })
        },

        getProviderByProduct(model, cb = null){
            
            this.preloadSmall = true

            return this.$api(this).then((xhr) => {
                return xhr.get('/providers/asociate/' + model.id).then((r) => {
                    let data = r.data
                    let providers = []
                    data.map(function(p){
                        providers.push({
                            text: p.name,
                            id: p.uuid
                        })
                    })

                    this.providers = providers
                    if (cb != null) cb()
                })
            })
        },

        //TODO: DOC
        getCategories(cb = null) {
            
            this.categories = []
            this.products = []
            this.preloadSmall = true

            return this.$api(this).then((xhr) => {
                return xhr.get('/categories/select').then((r) => {
                    let data = r.data
                    this.categories = data
                    if (cb != null) cb()
                })
            })
        },

         //TODO: DOC
        getProductsAsync(model) {
            return new Promise((resolve) => {
                this.getProductsByCategory(model, () => resolve(true))
            })
        },

        //TODO: DOC
        getProvidersAsync(model){
            return new Promise((resolve) => {
                this.getProviderByProduct(model, () => resolve(true))
            })
        },

         //TODO: DOC
        getProductsByCategoryWithout(model) {

            this.products = this.products.filter((item) => item.category_id == model.id).map((product) => {
                return {
                    id  : product.uuid,
                    text: product.name,
                    info: product
                }
            })
        },

         //TODO: DOC
        getProviders(cb = null) {
            
            return this.$api(this).then((xhr) => {
                return xhr.get('/providers/select').then((r) => {
                    let data = r.data
                    this.providers = data
                    if (cb != null) cb()
                })
            })
        },

         //TODO: DOC
        getCategoriesAsync() {
            return new Promise((resolve) => {
                this.getCategories(() => resolve(true))
            })
        },

         //TODO: DOC
        getSellersByType(type, cb) {

            return this.$api(this).then((xhr) => {
                return xhr.get('/sellers/select-profile', {params: {profile: type}}).then((r) => {
                    let data = r.data
                    cb(data)
                })
            })
        },

         //TODO: DOC
        getSellersByTypeAsync(type) {
            return new Promise((resolve) => {
                this.getSellersByType(type, (data) => resolve(data))
            })
        }
    }
}