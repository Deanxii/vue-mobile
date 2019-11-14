<template>
    <div class="photoinfo-contanier">
        <h3>{{photoinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{photoinfo.add_time|dataFormat}}</span>
            <span>点击:{{photoinfo.click}}</span>
        </p>
        <hr>

        <!-- 缩略图 -->
        <div class="thumbs"> 
            <vue-preview :slides="slide" @close="handleClose"></vue-preview>
        </div>

        <!-- 图片内容区域 -->
        <div class="content" v-html="photoinfo.content"></div>

        <!-- 评论对象 -->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>
//导入
import comment from '../subcomponents/comment.vue'


export default {
    data(){
        return{
            id:this.$route.params.id,
            photoinfo:{},
            slide: []
        };
    },
    created(){
        this.getPhotoInfo();
        this.getThumbs();
    },
    methods:{
        getPhotoInfo(){
            this.$http.get("api/getimageInfo/"+this.id).then(result=>{
                if(result.body.status===0){
                    this.photoinfo=result.body.message[0];
                }
            })
        },
        handleClose () {
            console.log('close event')
        },
        getThumbs(){
             this.$http.get("api/getthumimages/"+this.id).then(result=>{
                if(result.body.status===0){
                    result.body.message.forEach(item=>{
                        item.w=600;
                        item.h=400;
                        item.title='123';
                        item.msrc=item.src;
                        item.alt='picture';
                    })
                    this.slide=result.body.message;
                }
            })
        }
    },
    components:{
        'cmt-box':comment
    }
}
</script>

<style lang="scss" scoped>
.photoinfo-contanier{
    padding: 3px;
    h3{
        color: #26a2ff;
        font-size: 15px;
        text-align: center;
        margin:15px 0;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }
    .content{
        font-size: 13px;
        line-height: 25px;
    }
    .thumbs {
     /deep/ .my-gallery {
    display: flex;
    flex-wrap: wrap;
    
    figure {
      width: 30%;
      margin: 5px;
      img {
        width: 100%;
        border-radius: 2px;
        box-shadow: 0 0 4px #999;
      }
    }
    }
    }
}
</style>