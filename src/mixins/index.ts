// import Vue from 'vue'
import Dialog from '@/utils/dialog'
import VueRouter, { Route } from 'vue-router'
// import Utils from '@/utils/utils'

// 声明全局方法
declare module 'vue/types/vue' {
    interface Vue {
        $formValidateMx(name: string, isShowError?: boolean): Promise<boolean>
        goBack(): void
        goHome(nodeId): void
        goPage(hash, nodeId, isParent?: boolean, isShowloading?: boolean, isSimple?: boolean): void
        $router: VueRouter
        $route: Route
    }
}

export default {
    methods: {
        $formValidateMx(formname, showError = false) {
            const $form: any = (this as any).$refs[formname]
            return new Promise((resolve, reject) => {
                $form.validate((valid, error) => {
                    if (valid) {
                        resolve(valid)
                    } else {
                        const names = Object.keys(error)
                        const errMsg = error[names[0]][0].message
                        if (showError && names.length && error[names[0]]) {
                            Dialog.showError(errMsg)
                        }
                        reject(new Error(errMsg))
                    }
                })
            })
        },
        goBack() {
            window.history.back()
        },
        goPage(hash) {
            (this as any).$router.push(hash)
        }
    }
}