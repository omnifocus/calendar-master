<template>
    <div>
        <slot :name="formObj.name"/>
        <van-field
            v-model="message"
            :rows="formObj.rows"
            :autosize='formObj.autosize'
            :label="formObj.label"
            :type="formObj.type"
            :placeholder="formObj.placeholder"
            :required = "formObj.required"
            @update:model-value="getVal"
        />
    </div>
</template>
<script>
export default({
    setup() {
        
    },
    emits: ['childCormFun'],
    props: ['formObj'],
    data(){
        return {
            message: this.formObj.value?this.formObj.value:''
        }
    },
    beforeMount() {
        if(this.formObj.value){
            this.$emit('childCormFun',this.formObj.name,{value:this.formObj.value})
        }
    },
    methods: {
        getVal(val) {
            this.$emit('childCormFun',this.formObj.name,{value:val})
        },
    }
})
</script>
<style lang="less" scoped>
@import '@/assets/style/style.less';
@import '@/assets/style/color.less';
@import '@/assets/style/font.less';
</style>
