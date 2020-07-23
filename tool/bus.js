import Bus from 'vue'


const install = function (Vue) {
 
    // 设置eventBus

    Vue.prototype.$bus = new Bus({
        methods:{
            emit (event,...arg){
                this.$emit(event,...arg)
            },
            on (event,callback) {
                this.$on(event,callback)
            },
            off(event,callback){
                this.$off(event,callback)
            }
        }
    });
  
}

export default install