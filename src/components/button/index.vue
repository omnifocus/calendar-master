<template>
    <van-button 
    :loading='btnLoading' 
    loading-text="请稍后..." 
    @click="btnEvent" 
    :disabled='btnDisabled' 
    :round='round' 
    :color="color" 
    :square = 'square'
    :type="type" 
    :size="size?size:'large'">
    {{name}}
    </van-button>
</template>
<script>

export default ({
    props: [
        'btnLoading', // 按钮加载
        'btnDisabled', // 按钮禁用
        'round', // 按钮圆角
        'square', // 方形按钮
        'color', // 按钮颜色
        'size',  // 按钮尺寸large、normal、small、mini 默认large 
        'type', // 按钮类型primary success warning danger 默认info
        'name', // 按钮名字
    ],
    methods: {
        btnEvent(){
            this.$emit('btnEvent');
        }
    }
})
</script>
