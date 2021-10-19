<template>
    <div class="default flex-column">
        <img :src="imgUrl[type]" alt="">
        <div class="font_sub_title">{{desc}}</div>
    </div>
</template>

<script>
export default {
    props: ['type', 'desc'],
    data() {
        return {
            imgUrl: {
                noData: require('@/assets/img/noData.png'),
            }
        }
    },
}
</script>

<style lang="less" scoped>
@import '@/assets/style/style.less';
@import '@/assets/style/color.less';
@import '@/assets/style/font.less';
.default{
    img{
        width: 200px;
        height: 200px;
    }
    justify-content: center;
    height: 100vh;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: -1;
}
</style>