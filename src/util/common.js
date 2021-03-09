import { Indicator, MessageBox } from 'mint-ui';

export default {
    Indicator: {
        open(option) {
            Indicator.open(Object.assign({
                text: '加载中...',
                spinnerType: 'snake'
            }, option));
        },
        close() {
            Indicator.close()
        }
    },
    MessageBox: {
        alert(msg) {
            return new Promise(function (resolve) {
                MessageBox.alert(msg || '操作成功').then((action) => {
                    resolve(action)
                })
            })
            MessageBox.alert(msg || '操作成功')
        },
        comfirm(msg) {
            return new Promise(function (resolve) {
                MessageBox.confirm(msg||'确实执行此操作吗?').then((action) => {
                    resolve(action)
                })
            })
        }
    }
}