<template>
    <div>
        <slot :name="formObj.name"/>
        <div v-if="formObj.popType">
            <van-overlay :show="show" @click="show = false" >
                <div class="datePart">
                    <van-datetime-picker
                    v-model="currentDate"
                    :type="formObj.type"
                    :min-date="formObj.minDate"
                    :max-date="formObj.maxDate"
                    :formatter='formatter'
                    @confirm = 'confirm'
                    />
                </div>
            </van-overlay>
        </div>
        <div v-else>
            <van-datetime-picker
            v-model="currentDate"
            :type="formObj.type"
            :min-date="formObj.minDate"
            :max-date="formObj.maxDate"
            :formatter='formatter'
            @confirm = 'confirm'
            />
        </div>
    </div>
</template>
<script>

export default {
    props: ['formObj'],
    emits: ['childCormFun'],
    data() {
        return {
            currentDate: this.formObj.currentDate,
            show: this.formObj.show
        };
    },
    watch: {
        formObj: {
            handler(val){
                this.show = val.show
            },
            deep: true
        }
    },
    methods: {
        confirm(){
            this.$emit('childCormFun',this.formObj.name,{value:this.currentDate})
        },
        // 日期格式化函数
        formatter(type, val) {
            if (type === 'year') {
                return val + '年';
            }
            if (type === 'month') {
                return val + '月';
            }
            if (type === 'day') {
                return val + '日';
            }
            if (type === 'hour') {
                return val + '时';
            }
            if (type === 'minute') {
                return val + '分';
            }
            return val;
        }
    }
};
</script>
<style lang="less" scoped>
@import '@/assets/style/style.less';
@import '@/assets/style/color.less';
@import '@/assets/style/font.less';

.datePart{
    position: absolute;
    bottom: 0;
    width: 100%;
}
</style>
