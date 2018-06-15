const SAVE_LASTING = true

export function WxRequest(method, url, requestHandler){
    let params = requestHandler.params;
    wx.request({
        url: url,
        data: params,
        method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: requestHandler.header,// 设置请求的 header
        success: function(res){
            requestHandler.success(res)
        },
        fail: function() {
            requestHandler.fail()
        },
        complete: function() {
            requestHandler.complete()
        }
    })
}
export const getItem = (key) => {
    let val = wx.getStorageSync(key)
    val=JSON.parse(val)
    return val
}

export const setItem = (key, val) => {
    val = JSON.stringify(val)
    if (SAVE_LASTING) {
        wx.setStorage({
            key:key,
            data:val
        })
    } else {
        val = sessionStorage.setItem(key, val)
    }
}
export function getHeader() {
    let token=getItem('token')
    let authHeader = 'Bearer ' + token
    return {Authorization: authHeader}
}
