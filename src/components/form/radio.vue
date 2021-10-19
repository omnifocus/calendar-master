<template>
    <div>
        <slot :name="formObj.name"/>
        <van-radio-group :icon-size="formObj.iconSize" v-model="checked" :direction="formObj.direction">
            <van-radio v-for="(item,index) in formObj.radioList" :key="index" :name="item.name">{{item.title}}</van-radio>
        </van-radio-group>
    </div>
</template>
<script>

export default({
    props: ['formObj'],
    emits: ['childCormFun'],
    data() {
        return {
            checked: this.formObj.checked
        }
    },
    mounted(){
        this.$emit('childCormFun',this.formObj.name,{value:this.formObj.checked})
    },
    watch:{
        checked(val) {
            this.$emit('childCormFun',this.formObj.name,{value:val})
        }
    },
})
</script>
