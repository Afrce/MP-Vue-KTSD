<template>
    <view style="font-size: 28rpx;color: #DDDDDD">
        <div class="weui-cells weui-cells_after-title ListHeader">
            <navigator url="" class="weui-cell weui-cell_access lineHeight">

                <div class="weui-cell__bd">
                    <li>
                        <image :src="icon" class="image"></image>
                    </li>
                    <li>123333333</li>
                </div>
                <div class="weui-cell__ft weui-cell__ft_in-access">
                    <image src='../../../static/images/date_QRcode.png' style="margin:0px 15px 0 0;vertical-align: middle;width:20px; height: 22px;"></image>
                </div>
            </navigator>
        </div>
        <div class="marginDiv">
            <navigator url="" class="weui-cell weui-cell_access lineHeight" >
                <div class="weui-cell__hd">
                    <image src="../../../static/images/mine_tutorial.png" style="margin:0px 15px 0 0;vertical-align: middle;width:20px; height: 22px;"></image>
                </div>
                <div class="weui-cell__bd">开天时代教程</div>
                <div class="weui-cell__ft weui-cell__ft_in-access"></div>
            </navigator>

            <navigator url="" class="weui-cell weui-cell_access lineHeight">
                <div class="weui-cell__hd">
                    <image src="../../../static/images/mine_details.png" style="margin:0px 15px 0 0;vertical-align: middle;width:20px; height: 22px;"></image>
                </div>
                <div class="weui-cell__bd">资金明细</div>
                <div class="weui-cell__ft weui-cell__ft_in-access"></div>
            </navigator>

            <navigator url="" class="weui-cell weui-cell_access lineHeight" >
                <div class="weui-cell__hd">
                    <image src="../../../static/images/mine_personal information.png" style="margin:0px 15px 0 0;vertical-align: middle;width:20px; height: 22px;"></image>
                </div>
                <div class="weui-cell__bd">完善个人资料</div>
                <div class="weui-cell__ft weui-cell__ft_in-access"></div>
            </navigator>
        </div>
        <div class="marginDiv">
            <navigator url="" class="weui-cell weui-cell_access lineHeight">
                <div class="weui-cell__hd">
                    <image src="../../../static/images/mine_about_us.png" style="margin:0px 15px 0 0;vertical-align: middle;width:20px; height: 22px;"></image>
                </div>
                <div class="weui-cell__bd">关于开天时代</div>
                <div class="weui-cell__ft weui-cell__ft_in-access"></div>
            </navigator>
        </div>
        <div class="marginDiv">
            <navigator url="" class="weui-cell weui-cell_access lineHeight">
                <div class="weui-cell__hd">
                    <image src="../../../static/images/mine_interest-free.png" style="margin:0px 15px 0 0;vertical-align: middle;width:20px; height: 22px;"></image>
                </div>
                <div class="weui-cell__bd">免息体验</div>
                <div class="weui-cell__ft weui-cell__ft_in-access"></div>
            </navigator>
        </div>
        <div class="marginDiv">
            <navigator url="" class="weui-cell weui-cell_access lineHeight">
                <div class="weui-cell__hd">
                    <image src="../../../static/images/tab_optional_selected.png" style="margin:0px 15px 0 0;vertical-align: middle;width:20px; height: 22px;"></image>
                </div>
                <div class="weui-cell__bd">自选股票</div>
                <div class="weui-cell__ft weui-cell__ft_in-access"></div>
            </navigator>
        </div>
    </view>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>
    .ListHeader{
        background: #202022;
    }
    .image{
        width: 40px;
        height: 40px;
        border: 2px solid #fff;
        border-radius: 50%;
        background: #eee;
    }
    li{
        margin-left: 10px;
        line-height: 45px;
        font-size: 16px;
        color: #ddd;
        float: left;
    }
    .marginDiv{
        margin-top: 10px;
        border-bottom: 1px solid #3333;
        border-top: 1px solid #333;
        background: #202022;
    }
    .lineHeight{
        line-height: 36px;
        border-bottom: 1px solid #333;
    }
</style>
