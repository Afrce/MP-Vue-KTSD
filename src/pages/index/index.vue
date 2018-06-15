<template>
  <div class="container">

    <div class="userinfo">
        <open-data type="userAvatarUrl"></open-data>
        <div class="userinfo-nickname">
            <open-data type="userNickName"></open-data>
        </div>
    </div>
      <div style="width: 100%" v-if="show">
          <button class="weui-btn" type="default" size="default"  @click="goToBind" style="width: 90%">绑定用户</button>
          <button class="weui-btn" type="primary" size="default" @click="goToIndex" style="width: 90%">随便看看</button>
      </div>
  </div>
</template>

<script>
import card from '@/components/card'
import {WxRequest, setItem} from '../../tools/methods'
import {host} from '../../tools/api'
export default {
  data () {
    return {
        userInfo: {},
        WxCode : "",
        GetOpenIdUrl : host + "/getOpenId",
        isShowBind: true,
        isBind : false,
        show: false
    }
  },

  components: {
    card
  },

  methods: {
      bindViewTap () {
          const url = '../logs/main'
          wx.navigateTo({ url })
      },
      getUserInfo () {
        let _this = this
      // 调用登录接口
      wx.login({
        success: (data) => {
            let appid= 'wx21625ac0d3ac1c61';
            let secret="3d65336045488d35d13e497d36126fb5";
            this.WxCode = data.code;
            let Handle = {
                params: {appid:appid, secret: secret, code: _this.WxCode},
                header: {},
                success: function (data) {
                    console.log(data.data.status)
                    if(data.data.status){
                        setItem('token',data.data.token)
                        _this.goToIndex()
                    }else{
                        _this.show = true
                        console.log(data.data.openId)
                        setItem('openId',data.data.openId)
                    }
                },
                fail: function (error) {
                    console.log(error)
                },
                complete: function () {
                    console.log("获取完毕")
                }
            }
            WxRequest("POST",this.GetOpenIdUrl,Handle);
        }
    })
    },
      goToIndex () {
          let url = '../proIndex/main'
          wx.switchTab({ url })
      },
      goToBind () {
          let url = '../bind/main'
          wx.navigateTo({ url })
      }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo();
  }
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}

</style>
