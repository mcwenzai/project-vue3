<template>
    <div class="login-form">
        <div class="logo-box">
            <img src="@/assets/images/login_logo.png" alt="">
            <span>审批中心</span>
        </div>
        <div class="login-box">
            <div class="img-box">
                <img class="img-title" src="@/assets/images/login_title.png" alt="">
                <img :src="bkImg" style="height: 100%; flex-shrink: 0" />
            </div>
            <div class="login-input">
                <span class="title">欢迎登录</span>
                <span class="desc">审批中心</span>
                <el-form :model="dataForm" :rules="dataRule" size="medium" ref="dataFormRef"
                    @keyup.enter.native="dataFormSubmit">
                    <el-col :span="24">
                        <el-form-item prop="mobilePhone" label="用户名" style="margin-bottom: 12px;">
                            <el-input v-model="dataForm.mobilePhone" style="width: 100%;" placeholder="帐号">
                                <template v-slot:prefix>
                                    <img src="@/assets/images/login_username.png" alt="">
                                </template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item prop="password" label="密码">
                            <el-input v-model="dataForm.password" style="width: 100%;" type="password" placeholder="密码"
                                show-password>
                                <template v-slot:prefix>
                                    <img src="@/assets/images/login_password.png" alt="">
                                </template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-button class="login-btn-submit" type="primary" style="width: 100%;margin-top: 10px;"
                        @click="dataFormSubmit">
                        登录
                    </el-button>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/store'
import { doLogin } from '@/api/url'
import { post } from '@/api/http'
import { encrypt, setToken } from '@/utils';
import { useRouter } from 'vue-router';

// 创建 Pinia store
const store = useAuthStore();
const router = useRouter();

// 定义图片引用
const bkImg = ref<string>('');

const dataForm = ref({
    mobilePhone: 'admin',
    password: '123456'
});
const dataRule = ref({
    mobilePhone: [
        { required: true, message: '帐号不能为空', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' }
    ]
});
const dataFormRef = ref<HTMLElement | null>(null);

// 动态加载图片的方法
const loadImage = async () => {
    try {
        const img = await import('@/assets/images/login_icon.png');
        bkImg.value = img.default;
    } catch (error) {
        console.error('Failed to load image:', error);
    }
};

const dataFormSubmit = () => {
    (dataFormRef.value as any).validate((valid: boolean) => {
        if (valid) {
            login();
        }
    });
};

const login = () => {
    const params = {
        loginName: dataForm.value.mobilePhone,
        password: encrypt(dataForm.value.password)
    };
    setToken(null);
    post({
        url: doLogin,
        data: params
    }).then((res: { data: { menuList: any[]; tokenData: any; }; }) => {
        store.setMenuList(res.data.menuList);
        delete res.data.menuList;
        store.setUserInfo(res.data, res.data.tokenData);
        setToken(res.data.tokenData);
        store.setCurrentMenuId(null);
        router.replace({ name: 'home' });
    }).catch((e) => {
        console.error(e)
    });

};

onMounted(() => {
    loadImage();
    store.setMenuList([]);
});

// Expose necessary variables and functions
defineExpose({
    dataForm,
    dataRule,
    dataFormRef,
    dataFormSubmit,
    login
});
</script>

<style lang="scss">
.login-form {
    width: 100vw;
    height: 100vh;
    background: url(~@/assets/img/login_bg.png) center center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;

    .logo-box {
        position: absolute;
        left: 5.5vw;
        top: 6.66vh;
        display: flex;
        align-items: center;
        font-size: 28px;
        color: #333333;
        font-weight: bold;

        img {
            margin-right: 11px;
        }
    }

    .login-box {
        display: flex;
        align-items: flex-start;
        border-radius: 3px;
        height: 408px;

        .login-input {
            width: 448px;
            border-radius: 16px;
            background-color: #fff;
            display: flex;
            flex-direction: column;
            padding: 46px 40px;
            box-shadow: 0px 2px 20px 1px rgba(79, 79, 79, 0.1);

            .title {
                color: #333333;
                font-size: 22px;
                font-weight: bold;
                margin-bottom: 5px;
            }

            .desc {
                font-size: 14px;
                margin-bottom: 24px;
                color: #666666;
            }
        }

        .img-box {
            margin-right: 163px;
            position: relative;

            .img-title {
                position: absolute;
                width: 375px;
                top: -80px;
                left: 0;
                right: 0;
                margin: 0 auto;

            }
        }

        .el-input--prefix .el-input__inner {
            padding-left: 42px;
        }

        .el-input__prefix {
            display: flex;
            align-items: center;
            margin-left: 4px;
        }
    }

    .el-form-item__label {
        color: #333333;
    }
}

.login-form .el-input__inner {
    height: 40px !important;
}
</style>
