<template>
    <div>
        <component :formObj='item.value' @childCormFun='childCormFun' v-for="(item,index) in currentViews" :key="index" :is="item.name">
            <!-- 动态具名插槽 -->
            <template v-slot:[item.value.name]>
                <slot :name="item.value.name"/>
            </template>
        </component>
    </div>
</template>
<script>
import InputC from './input'
import DateC from './date'
import UploaderC from './uploader'
import RadioC from './radio'
export default({
    props: ['formObj'],
    emits: ['childCormFun'],
    components: {
        InputC,DateC,UploaderC,RadioC
    },
    data(){
        return{
            currentViews: [],
        }
    },
    watch:{
        formObj: {
            handler(val){
                let arr = []
                for (let item of val.formList) {
                    // 当某一模块的hidden设置为true时隐藏该模块
                    if(val[item.value] && !val[item.value].hidden){
                        arr.push({name:item.name,value:val[item.value]})
                    }
                }
                this.currentViews = arr
            },
            deep: true,
            immediate: true,
        }
    },
    methods: {
        childCormFun(key,val){
            this.$emit('childCormFun', key,val);
        },
    }
})
</script>
