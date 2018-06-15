<template>
    <div class="page">
        <div class="page__bd page__bd_spacing">
            <swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular" >
                <div v-for="item in images" :key="index">
                    <swiper-item>
                        <image :src="item.picUrl" class="slide-image" />
                    </swiper-item>
                </div>
            </swiper>
        </div>
        <view class="swiper-tab">
            <view :class="{active : currentTab == 0, tabTitle : true}" data-current="0" @click="clickTab(0)">实时新闻</view>
            <view :class="{active : currentTab == 1, tabTitle : true}" data-current="1" @click="clickTab(1)">大众点评</view>
            <view :class="{active : currentTab == 2, tabTitle : true}" data-current="2" @click="clickTab(2)">我的自选</view>
        </view>
        <view>
            <view v-show="currentTab === 0">
                <div v-for="item in article" class="data_list">
                    <ul>
                        <li>
                            <div class="news_title">{{item.title}}</div>
                            <p class="news_time">{{item.time}}</p>
                        </li>
                    </ul>
                </div>
            </view>
        </view>
        <view>
            <view v-show="currentTab === 1">
                <div v-for="item in Comments" class="data_list">
                    <ul>
                        <li>
                            <div class="news_title">{{item.title}}</div>
                            <p class="news_time">{{item.time}}</p>
                        </li>
                    </ul>
                </div>
            </view>
        </view>
        <view>
            <view v-show="currentTab === 2">
                <div v-for="item in MyPools" class="data_list">
                    <ul>
                        <li>
                            <div class="news_title">{{item.title}}</div>
                            <p class="news_time">{{item.time}}</p>
                        </li>
                    </ul>
                </div>
            </view>
        </view>
    </div>
</template>

<script>
    import  {WxRequest, getHeader} from '../../tools/methods'
    import  {host} from "../../tools/api";
    export default {
        name: 'index',
        data () {
            return {
                getIndexDataUrl : host + "/getIndexData",
                getArticleUrl : host + '/getIndexInformations',
                getCommentsUrl: host + '/getIndexComments',
                images: [],
                indicatorDots: true,
                autoplay: true,
                interval: 5000,
                duration: 900,
                circular: true,
                currentTab: 0,
                swiper_tab_item: "swiper-tab-item",
                current: 0,
                article : [],
                Comments :[],
                MyPools :[],
                page1 : 1,
                page2 : 1,
                page3 : 1,
            }
        },
        methods: {
            getIndexData () {
                let _this = this
                let handler = {
                    params : {},
                    header : {},
                    success : function (data) {
                        console.log(data)
                        _this.images = data.data.data.others[13]
                    },
                    fail : function (error) {
                        console.log(error)
                    },
                    complete : function () {
                        console.log("完成")
                    }
                }
                WxRequest('POST',this.getIndexDataUrl,handler)
            },
            swiperTab (e) {
                let that = this;
                that.currentTab=e.target.current
            },
            //点击切换
            clickTab (e) {
                this.currentTab = e
            },
            getArticle (type = "get")  {
                let _this = this
                let handler = {
                    params : {
                        page:_this.page1
                    },
                    header : {},
                    success : function (data) {
                        console.log(data.data.data)
                        if(type ==="get"){
                            _this.article = _this.article.concat(data.data.data);
                        }else{
                            _this.article = data.data.data
                            _this.page1 = 1
                        }

                    },
                    fail : function (error) {
                        console.log(error)
                    },
                    complete : function () {
                        console.log("完成")
                    }
                }
                WxRequest('POST',this.getArticleUrl,handler)
            },

            getComments (type = "get") {
                let _this = this
                let handler = {
                    params : {
                        page:_this.page2
                    },
                    header : {},
                    success : function (data) {
                        console.log(data.data.data)
                        if(type ==="get"){
                            _this.Comments = _this.Comments.concat(data.data.data);
                        }else{
                            _this.Comments = data.data.data
                            _this.page2 = 1
                        }
                    },
                    fail : function (error) {
                        console.log(error)
                    },
                    complete : function () {
                        console.log("完成")
                    }
                }
                WxRequest('POST',_this.getCommentsUrl,handler)
            },
        },
        mounted (){
            getHeader();
            this.getIndexData()
            this.getArticle()
            this.getComments()
        },
        onPullDownRefresh(){
            this.getIndexData()
            this.getArticle('refresh')
            this.getComments('refresh')
            wx.stopPullDownRefresh();
        },
        onReachBottom() {
            let _this = this
            switch (_this.currentTab){
                case 0:
                    _this.page1++
                    _this.getArticle()
                    break;
                case 1:
                    _this.page2++
                    _this.getComments()
                    break;
                case 2:
                    _this.page3++
                    _this.getArticle()
                    break;
            }
        },
    }
</script>

<style scoped>
    .slide-image {
        width: 100%;
        height: 100%;
    }
    .swiper-tab{
        width: 100%;
        text-align: center;
        height: 88rpx;
        line-height: 88rpx;
        display: flex;
        flex-flow: row;
        justify-content: space-around;
        padding: 10px 0;
        border-bottom: 1px solid #333;
        box-shadow: 1px 1px 1px #333;
        background-color: #202020;
        color: #cccccc;
    }
    .swiper-tab-item{
        width: 30%;
        color:#434343;
    }
    .active{
        color:#F65959;
        border-bottom: 3px solid #F65959;

    }
    .swiper{
        text-align: center;
    }
    .tabTitle{
        width: 33.33%;
    }
    .content_content ul {
        width: 100%;
        border: none;
        padding: 0;
    }

    .content_content ul li {
        border-bottom: 1px solid #DDD;
        box-shadow: 1px 1px 1px #DDD;
        padding: 10px 0;
        width: 100%;
    }

    .content_content ul li span {
        float: none;
        display: inline-block;
        text-align: center;
        width: 23%;
        margin: 0;
    }

    .content_content ul li span a {
        color: red;
        text-align: right;
    }

    .content_content ul li span:nth-child(1), .content_content ul li span:nth-child(2), .content_content ul li span:nth-child(4) {
        color: black;
    }

    .content_title li a {
        font-weight: bold;
    }
    .news_title {
        font-family: sans-serif;
        padding: 0 20px;
        letter-spacing: 1px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        font-size: 32rpx;
    }

    .news_time {
        width: 100%;
        text-align: right;
        padding: 0.2rpx -2px;
        color: #666;
        font-size: 28rpx;
    }
    .data_list{
        background: #202020;
        border-bottom: 1px solid #333;
        color: #ddd;
    }
</style>
