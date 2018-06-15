<template>
    <view>
        <view class="page-body" v-if="infoShow === false">
            <view class="page-section">
                <view class="weui-cells__title">手机号</view>
                <view class="weui-cells weui-cells_after-title">
                    <view class="weui-cell weui-cell_input">
                        <input class="weui-input"  placeholder="请输入需要绑定的手机号" v-model="phone"/>
                        <button style="font-size: 28rpx">发送短信</button>
                    </view>
                </view>
            </view>
            <view class="page-section">
                <view class="weui-cells__title">短信验证码</view>
                <view class="weui-cells weui-cells_after-title">
                    <view class="weui-cell weui-cell_input">
                        <input class="weui-input"  placeholder="输入收到的短信验证码" v-model="code"/>
                    </view>
                </view>
            </view>
            <button type="primary" size="default" style="margin: 5px" @click="bindUser()">确认绑定</button>
        </view>
        <div class="weui-msg" v-if="infoShow === true">
            <div class="weui-msg__icon-area">
                <icon type="warn" size="93"></icon>
            </div>
            <div class="weui-msg__text-area">
                <div class="weui-msg__title">绑定失败</div>
                <div class="weui-msg__desc">{{msg}}</div>
            </div>
            <div class="weui-msg__opr-area">
                <div class="weui-btn-area">
                    <button class="weui-btn" type="primary" @click="hideShow()">确定</button>
                </div>
            </div>
        </div>
        <div class="weui-msg" v-if="infoShow === 'success'">
            <div class="weui-msg__icon-area">
                <icon type="success" size="93"></icon>
            </div>
            <div class="weui-msg__text-area">
                <div class="weui-msg__title">绑定成功</div>
                <div class="weui-msg__desc">5秒后将跳往首页，您也可以点击下方按钮立即前往</div>
            </div>
            <div class="weui-msg__opr-area">
                <div class="weui-btn-area">
                    <button class="weui-btn" type="primary" @click="goToIndex()">立即前往</button>
                </div>
            </div>
        </div>
    </view>
</template>

<script>
    import {WxRequest, getItem} from "../../tools/methods";
    import {host} from "../../tools/api";

    export default {
        name: "index",
        data () {
            return{
                phone: "",
                code: "",
                infoShow: false,
                msg: "1123",
                bindUserUrl : host + "/bindUser",
                openId: ""
            }
        },
        methods :{
            bindUser (){
                console.log(1);
                wx.showLoading({
                    title: '加载中',
                })
                let _this = this
                let Handler = {
                    params:{
                        openId: _this.openId,
                        code: _this.code,
                        phone: _this.phone
                    },
                    success(data){
                        wx.hideLoading()
                        if(data.data.status){
                            _this.infoShow = 'success'
                            setTimeout(_this.goToIndex(),5000)
                        }else{
                            _this.infoShow = true
                            _this.msg = data.data.msg
                        }
                    },
                    fail (){
                        _this.infoShow = true
                        wx.hideLoading()
                        _this.msg="未知错误发生！请稍后再试"
                    },
                    complete () {
                        wx.hideLoading()
                    }
                }
                WxRequest('POST',_this.bindUserUrl,Handler);
            },
            hideShow(){
                this.infoShow = false
            },
            getOpenId() {
                this.openId = getItem('openId')
            },
            goToIndex () {
                let url = '../proIndex/main'
                wx.switchTab({ url })
            },
        },
        mounted(){
            this.getOpenId()
            console.log(this.openId)
        }
    }
</script>

<style scoped>

</style>
