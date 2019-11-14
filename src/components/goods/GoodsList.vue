<template>
    <div class="goods-list">
        <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)"> 
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                <span class="new">￥{{item.sell_price}}</span>
                <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>

        <mt-button type="danger" size="large" @click="getMore()">加载更多</mt-button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            pageindex:1,
            goodslist:[]
        }
    },
    created(){
        this.getGoodsList();
    },
    methods:{
        getGoodsList(){
            this.$http.get("api/getgoods?pageindex="+this.pageindex).then(result=>{
                if(result.body.status===0){
                    this.goodslist=this.goodslist.concat(result.body.message);
                }
            })
        },
        getMore(){
            this.pageindex++;
            this.getGoodsList();
        },
        goDetail(id){
            this.$router.push("/home/goodsinfo/"+id);
        }
    }
}
</script>

<style lang="scss" scoped>

.goods-list{

    display:flex;
    flex-wrap: wrap;
    padding: 6px;
    justify-content: space-between;

   // margin: 4px 0;
    .goods-item{
        width: 48%;
        border: 1px solid rgb(226, 219, 219);
        border-radius: 2px;
        box-shadow: 0 0 6px #ccc;
        margin-left: 4px;
        margin-bottom: 4px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 293px;
        img{
            width: 100%;
        }
        .title{
            font-size: 10px;
            padding: 0px 4px;
        }

        .info{
            background-color: #eee;
            margin: 2px;
            p{
                margin: 0;
                padding: 5px;
            }
            .price{
                .new{
                    color:red;
                    font-weight: bolder;
                    font-size:16px;
                }
                .old{
                    text-decoration: line-through;
                    margin: 10px;
                    margin-left: 10px;
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
                font-size:12px;
            }
        }
    }
}
</style>