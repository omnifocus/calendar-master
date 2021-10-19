<template>
    <div>
        <div class="title">{{month}}月{{agendasData && agendasData.solar}}日  农历 {{agendasData && agendasData.lunarDay && agendasData.lunarDay.dateStr}}</div>
        <van-checkbox-group v-model="result">
            <van-cell-group v-if="agendasData">
                <van-cell
                v-for="(item, index) in agendasData.agendas"
                clickable
                :key="item.eventId"
                :title="item.event"
                @click="toggle(index)"
                >
                {{item.startTime}}-{{item.endTime}} &nbsp;
                <template #right-icon>
                    <van-checkbox shape='square' :name="item" ref="checkboxes" />
                </template>
                </van-cell>
            </van-cell-group>
        </van-checkbox-group>
    </div>
</template>

<script>
export default {
    props: ['agendasData','month'],
    data() {
        return {
            result: [],
        }
    },
    mounted() {
        console.log('xx:' + this.agendasData)
    },
    methods: {
        toggle(index) {
        this.$refs.checkboxes[index].toggle();
        },
    },
}
</script>

<style lang="less" scoped>
@import '@/assets/style/color.less';
@import '@/assets/style/font.less';
.title{
    padding: 8px;
    color: @color_font_666;
}
</style>
