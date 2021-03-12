import { Indicator, MessageBox } from 'mint-ui';

export default {
    showError(text, title?: '网络错误'){
        MessageBox.alert(text, title);
    }, 
    confirm(options, resolve, reject?) {
        let _options = {
            title: "提示",
            message: '',
            confirmButtonText: '确定',
            showCancelButton: true,
            showCobfirmButton: true
        }
        if (options.message) {
            _options = Object.assign(_options, options)
        }
        MessageBox(_options).then(resolve, reject)
    },
    showLoading(isShow, option: any = {}) {
        if (isShow) {
            if (option.text) {
                option = Object.assign({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                }, option)
            }
            Indicator.open(option)
        } else {
            Indicator.close()
        }
    }
}