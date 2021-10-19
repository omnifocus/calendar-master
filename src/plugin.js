const plugins = {
    install(Vue) {
        Vue.directive('fbind',function(element,binding){
            // autofocus为true则自动聚焦
            if(binding.value){
                element.getElementsByTagName("input")[0].focus()
            }
        })
    }
}
export default plugins