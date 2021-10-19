<template>
    <!-- v-fbind是自定义指令 -->
    <van-search :id="id?id:'searchId'"
    :show-action='showAction' 
    @cancel="onCancel" class="changeSearch" 
    :disabled='disabled' 
    @update:model-value="getVal" 
    v-model="value" 
    :shape='shape' 
    :placeholder="placeholder" 
    v-fbind = 'autofocus'
    />
</template>
<script>
export default ({
    props: [
        'placeholder',
        'shape',
        'disabled',
        'showAction',
        'id',
        'autofocus'
    ],
    data() {
        return {
            value: '',
        }
    },
    directives: {
        // 自定义指令，暂时不起作用
        // fbind: {
        //     bind(element,binding){
        //         element.value = binding.value
        //     },
        //     inserted(element,binding){
        //         console.log(element,binding)
        //         element.getElementsByTagName("input")[0].focus()
        //     },
        //     updated(element,binding){
        //         element.value = binding.value
        //     },
        // },
        // fbind(element,binding){
        //     // autofocus为true则自动聚焦
        //     if(binding.value){
        //         element.getElementsByTagName("input")[0].focus()
        //     }
        // }
    },
    methods: {
        //#region 折叠
        getVal(val) {
            if(val){
                this.$emit('event', val)
            }
        },
        onCancel(){
            this.value = ''
            this.$emit('cancelEvent');
        }
        //#endregion
    }
})
</script>
<style lang="less" scoped>
</style>
