<template>
    <div class="page">
        <div class="page__bd">
            <div class="weui-search-bar">
                <div class="weui-search-bar__form">
                    <div class="weui-search-bar__box">
                        <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
                        <input type="text" class="weui-search-bar__input" id="search" placeholder="搜索" v-model="inputVal" :focus="inputShowed" @input="inputTyping" />
                        <input type="text" class="weui-search-bar__input" placeholder="" v-model="result.name" v-if="showResult">
                        <div class="weui-icon-clear" v-if="inputVal.length > 0" @click="clearInput">
                            <icon type="clear" size="14"></icon>
                        </div>
                    </div>
                    <label class="weui-search-bar__label" :hidden="inputShowed" @click="showInput">
                        <icon class="weui-icon-search" type="search" size="14"></icon>
                        <div class="weui-search-bar__text">搜索</div>
                    </label>
                </div>
                <div class="weui-search-bar__cancel-btn" :hidden="!inputShowed" @click="hideInput">添加</div>
            </div>
            <div class="weui-cells searchbar-result">
                <ul class="stock_title">
                    <li>名称</li>
                    <li>代码</li>
                    <li>现价</li>
                    <li>操作</li>
                </ul>
            </div>
            <div class="list_content">
                <article v-for="(value, key) in show">
                    <ul class="pool_list" @click="searchMarket(value)">
                        <li>
                            <span>{{value.stock_name}}</span>
                        </li>
                        <li>
                            <span >{{value.stock_code}}</span>
                        </li>
                        <li>
                            <span>{{value.value}}</span>
                        </li>
                        <li>
                            <button href="javascript:;"
                                    class="buy_in_button"
                                    :class="{fontRed:buyAvailable,fontGrey: !buyAvailable }"
                                    @click.stop="goBuy(value.stock_code)">买入</button>
                        </li>
                        <li>
                            <button href="javascript:;"
                                    class="delete_button" @click.stop="deleteStock(value.id)">删除</button>
                        </li>
                    </ul>
                </article>
            </div>

            <div class="tips" v-if="show.length == 0">
                <span>亲，你还没有添加任何自选哦</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {WxRequest, getItem, getHeader} from "../../tools/methods";
    import {host} from "../../tools/api";

    export default {
        data() {
            return {
                inputShowed: false,
                inputVal: "",
                showResult: false,
                result: {},
                page: 1,
                show:[],
                getUrl: host + '/getStockPool',
                addUrl: host + '/addStockToPool',
                delUrl: host + "/delStockFromPool",
                searchUrl: host + '/getStockInfo',
                infoShow: false
            }
        },
        methods: {
            showInput() {
                this.inputShowed = true;
            },
            hideInput() {
                let _this = this
                if(_this.result == {}){
                    return false
                }else{
                    let Obj = {
                        header: getHeader(),
                        params: {
                            stock_code: _this.result.code
                        },
                        success: function (data) {
                            console.log(data.data.status)
                            if(data.data.status  == true){
                                wx.showToast({
                                    title: '添加成功',
                                    icon: 'success',
                                    duration: 3000
                                });
                                _this.getPools()
                            }else{
                                wx.showToast({
                                    title: data.data.msg,
                                    icon: 'none',
                                    duration: 3000
                                });
                            }
                        },
                        error: function () {

                        },
                        complete: function () {

                        }
                    }
                    WxRequest("POST",_this.addUrl,Obj)
                }
            },
            clearInput() {
                this.inputVal = '';
                this.showResult = false;
                this.result = {}
            },
            inputTyping(e) {
                let _this = this;
                this.inputVal = e.mp.detail.value;
                this.result = {};
                if(this.inputVal.length === 6) {
                    let Obj = {
                        params: {
                            stock_code: _this.inputVal
                        },
                        success(data){
                            _this.result = data.data.data
                            _this.showResult = true
                            console.log(data.data.data)
                        },
                        fail(){

                        },
                        complete(){

                        }
                    }
                    WxRequest("POST",_this.searchUrl, Obj);
                }
            },
            getPools() {
                let _this = this;
                let Obj = {
                    header: getHeader(),
                    params: {
                        pageSize : "15",
                        page: _this.page
                    },
                    success: function (data) {
                        _this.show = data.data.data.data
                    },
                    error: function (data) {

                    },
                    complete: function (data) {

                    }
                }
                WxRequest("POST", _this.getUrl, Obj)
            },
            hideShow(){
                this.infoShow = false
                this.getPools()
            },
            deleteStock(id){
                let _this = this
                let Obj = {
                    params: {
                        id: id
                    },
                    header: getHeader(),
                    success: function () {
                        _this.getPools()
                    }
                }
                WxRequest("POST",this.delUrl,Obj)
            }
        },
        mounted (){
            this.getPools();
        }
    }
</script>

<style scoped>
    .searchbar-result {
        margin-top: 0;
        font-size: 14px;
        background-color: #202022;
    }
    .searchbar-result:before {
        display: none;
    }
    .weui-cell {
        padding: 12px 15px 12px 35px;
    }
    .weui-search-bar{
        border: 0 !important;
        background-color: #202022 !important;
    }
    .weui-search-bar__cancel-btn {
        color:#F65959 ;
    }
    #search{
        width:70%;
        float:left;
    }
    .stock_title {
        display: flex;
        height: 0.73rem;
        padding: 0 0.4rem;
    }

    .stock_title li {
        width: 100%;
        font-size: 32rpx;
        line-height: 0.73rem;
        text-align: center;
        font-family: PingFangSC-Regular;
        color: #DDDDDD;
    }

    .stock_title li:nth-child(1) {
        width: 20%;
    }

    .stock_title li:nth-child(2) {
        width: 19%;
    }

    .stock_title li:nth-child(3) {
        width: 15%;
    }

    .stock_title li:nth-child(4) {
        width: 46%;
    }

    .tips{
        margin-top: 10rpx;
        background: #202022;
        font-size: 12px;
        text-align: center;
        padding: 12.5px 0;
        color: #777;
    }

    .fontRed {
        color: #F74648;
    }

    .fontGreen {
        color: #00BD31;
    }

    .buy_in_button {
        font-size: 28rpx;
        width: 132rpx;
        height: 60rpx;
        color: white;
        background: #FE3D3D;
        border-radius: 5px;
    }

    .delete_button {
        font-size: 28rpx;
        width: 132rpx;
        height: 60rpx;
        color: white;
        background: #8E9092;
        border-radius: 5px;
    }

    .list_content {
        color: #CCC;
        margin-top: 0.2rem;
    }

    .pool_list {
        display: flex;
        justify-content: center;
        font-size: 28rpx;
        background-color: #202022;
        padding: 6rpx 40rpx 40rpx;
    }

    .pool_list li {
        width: 100%;
        line-height: 0.8rem;
        height: 0.8rem;
    }

    .pool_list li:nth-child(1) {
        width: 20%;
    }

    .pool_list li:nth-child(2) {
        width: 19%;
    }

    .pool_list li:nth-child(3) {
        width: 15%;
    }

    .pool_list li:nth-child(4) {
        width: 23%;
    }

    .pool_list li:nth-child(5) {
        width: 23%;
    }
</style>
