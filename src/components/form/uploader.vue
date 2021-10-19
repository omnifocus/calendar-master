<template>
    <div>
        <slot :name="formObj.name"/>
        <van-uploader
            :max-size="formObj.maxSize"
            :after-read="uploadImg"
            :before-read="beforeRead"
            :max-count="formObj.maxCount"
            v-model="fileList"
            multiple
        />
    </div>
</template>
<script>
export default({
    props: ['formObj'],
    // setup() {
    //     const checked = ref('0');
    //     return { checked }; 
    // },
    emits: ['childCormFun'],
    watch: {
        fileList(val){
            this.$emit('childCormFun',this.formObj.name,{value:val})
        }
    },
    data(){
        return {
            fileList: this.formObj.fileList?this.formObj.fileList:[], //图片
            imgurl: "", //图片路径
            oneurl: "", //传给后台的图片类型
            imgs: "", //截图
        }
    },
    methods: {
        // 图片上传
        uploadImg(file) {
            console.log('当前图片信息',file);  //控制台可以看见图片信息
            // this.$emit('childCormFun',this.formObj.name,{value:file})
            //   const param = new FormData();
            //   param.append("file", file.file);
            //   param.append("token", localStorage.getItem("token"));
            //   this.$post("", param, {
            //     headers: { "Content-Type": "multipart/form-data" }
            //   }).then(() => {
            //     this.oneurl = ''; 
            //   });
        },
        beforeRead() {
            return true;
        },
        beforeDelete() {
            return false;
        },
    }
})
</script>