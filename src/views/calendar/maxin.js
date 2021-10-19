const mixin = {
    data() {
        return {
            test: 'mixin测试'
        }
    },
    methods: {
        pringTest(){
            console.log('mixin测试', this.test)
        },
    },
}
const mixin2 = {
    methods: {
        pringTest(){
            console.log('mixin测试2')
        },
    },
}
export {
    mixin,
    mixin2
}