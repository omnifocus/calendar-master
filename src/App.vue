<template>
    <div>
      <router-view/>
    </div>
</template>
<script>
export default({
    data() {
        return {
            active: 'CallBack',
            pathUnTabArr: [
              'Login',
              'SearchPageC',
              'SubmitCbC',
              'MyCalbackC',
              'CbDetailsC',
              'Demo'
            ],
            include: 'SubmitCbC', // 不使用keepAlive的组件，使用‘,’分隔，如：Home,News
          //  isVistor: JSON.parse(localStorage.getItem('userMsg')).user_type === 'vistor'
        }
    },
    methods: {
      toChat() {
        console.log('开始聊天')
      }
    }
})
</script>
<style lang="less" scoped>
@import '@/assets/style/color.less';
.van-tabbar{
    border-top: 1px solid @color_border_f5;
}
.customerService{
  position: fixed;
  right: 16px;
  bottom: 150px;
  width: 40px;
  height: 40px;
}
</style>
