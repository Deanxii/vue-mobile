<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
                <img :src="item.img" alt="" :class="{'full':isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
    data(){
        return{}
    },
    props:["lunbotuList","isfull"],
    methods:{

    }
}
</script>

<style lang="scss" scoped>
    .mint-swipe{
    height: 200px;
    text-align: center;
    .mint-swipe-item{
        

        img{
            //width: 100%;
            height: 100%;
        }

    }
}
.full{
    width:100%;
}
</style>