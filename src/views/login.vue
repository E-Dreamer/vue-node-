<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
}
.login > img {
  width: 100%;
  height: 100%;
}
.tip {
  font-size: 20px;
  margin: 40px auto 50px;
  text-align: center;
}

.dowebok {
  overflow: hidden;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 900px;
  height: 550px;
  margin: -300px 0 0 -450px;
  background: #fff;
}

.form {
  position: relative;
  width: 640px;
  height: 100%;
  transition: -webkit-transform 0.6s ease-in-out;
  transition: transform 0.6s ease-in-out;
  transition: transform 0.6s ease-in-out, -webkit-transform 0.6s ease-in-out;
  padding: 50px 30px 0;
}

.sub-cont {
  overflow: hidden;
  position: absolute;
  left: 640px;
  top: 0;
  width: 900px;
  height: 100%;
  padding-left: 260px;
  background: #fff;
  transition: -webkit-transform 0.6s ease-in-out;
  transition: transform 0.6s ease-in-out;
  transition: transform 0.6s ease-in-out, -webkit-transform 0.6s ease-in-out;
}

.login .dowebok.s--signup .sub-cont {
  -webkit-transform: translate3d(-640px, 0, 0);
  transform: translate3d(-640px, 0, 0);
}

button {
  display: block;
  margin: 0 auto;
  width: 260px;
  height: 36px;
  border-radius: 30px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}

.img {
  overflow: hidden;
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: 260px;
  height: 100%;
  padding-top: 360px;
}

.img:before {
  content: "";
  position: absolute;
  right: 0;
  top: 0;
  width: 900px;
  height: 100%;
  background-image: url("../assets/bg1.jpg");
  background-size: cover;
  transition: -webkit-transform 0.6s ease-in-out;
  transition: transform 0.6s ease-in-out;
  transition: transform 0.6s ease-in-out, -webkit-transform 0.6s ease-in-out;
}

.img:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}

.dowebok.s--signup .img:before {
  -webkit-transform: translate3d(640px, 0, 0);
  transform: translate3d(640px, 0, 0);
}

.img__text {
  z-index: 2;
  position: absolute;
  left: 0;
  top: 50px;
  width: 100%;
  padding: 0 20px;
  text-align: center;
  color: #fff;
  transition: -webkit-transform 0.6s ease-in-out;
  transition: transform 0.6s ease-in-out;
  transition: transform 0.6s ease-in-out, -webkit-transform 0.6s ease-in-out;
}

.img__text h2 {
  margin-bottom: 10px;
  font-weight: normal;
}

.img__text p {
  font-size: 14px;
  line-height: 1.5;
}

.dowebok.s--signup .img__text.m--up {
  -webkit-transform: translateX(520px);
  transform: translateX(520px);
}
.img__text.m--in {
  -webkit-transform: translateX(-520px);
  transform: translateX(-520px);
}

.dowebok.s--signup .img__text.m--in {
  -webkit-transform: translateX(0);
  transform: translateX(0);
}

.img__btn {
  overflow: hidden;
  z-index: 2;
  position: relative;
  width: 100px;
  height: 36px;
  margin: 0 auto;
  background: transparent;
  color: #fff;
  text-transform: uppercase;
  font-size: 15px;
  cursor: pointer;
}
.img__btn:after {
  content: "";
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: 2px solid #fff;
  border-radius: 30px;
}

.img__btn span {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  transition: -webkit-transform 0.6s;
  transition: transform 0.6s;
  transition: transform 0.6s, -webkit-transform 0.6s;
}

.img__btn span.m--in {
  -webkit-transform: translateY(-72px);
  transform: translateY(-72px);
}

.dowebok.s--signup .img__btn span.m--in {
  -webkit-transform: translateY(0);
  transform: translateY(0);
}

.dowebok.s--signup .img__btn span.m--up {
  -webkit-transform: translateY(72px);
  transform: translateY(72px);
}

h2 {
  width: 100%;
  font-size: 26px;
  text-align: center;
}

label {
  display: block;
  width: 260px;
  margin: 25px auto 0;
  text-align: center;
}

label span {
  font-size: 12px;
  color: #909399;
  text-transform: uppercase;
}

input {
  display: block;
  width: 100%;
  margin-top: 5px;
  padding-bottom: 5px;
  font-size: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  text-align: center;
}

.forgot-pass {
  margin-top: 15px;
  text-align: center;
  font-size: 12px;
  color: #cfcfcf;
}

.forgot-pass a {
  color: #cfcfcf;
}

.submit {
  margin-top: 40px;
  margin-bottom: 20px;
  background: #d4af7a;
  text-transform: uppercase;
}

.fb-btn {
  border: 2px solid #d3dae9;
  color: #8fa1c7;
}
.fb-btn span {
  font-weight: bold;
  color: #455a81;
}

.sign-in {
  transition-timing-function: ease-out;
}
.dowebok.s--signup .sign-in {
  transition-timing-function: ease-in-out;
  transition-duration: 0.6s;
  -webkit-transform: translate3d(640px, 0, 0);
  transform: translate3d(640px, 0, 0);
}

.sign-up {
  -webkit-transform: translate3d(-900px, 0, 0);
  transform: translate3d(-900px, 0, 0);
}
.dowebok.s--signup .sign-up {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
</style>

<template>
  <div class="login">
    <img src="../assets/login.jpg" alt />
    <div class="dowebok">
      <div class="form sign-in">
        <h2>欢迎回来</h2>
        <label>
          <span>用户名</span>
          <input type="text" v-model="userName" />
        </label>
        <label>
          <span>密码</span>
          <input type="password" v-model="passWord" @keydown.enter="login" />
        </label>
        <p class="forgot-pass">
          <a href="javascript:">忘记密码？</a>
        </p>
        <button type="button" class="submit" @click="login">登 录</button>
        <button type="button" class="fb-btn">
          使用
          <span>QQ</span> 帐号登录
        </button>
      </div>
      <div class="sub-cont">
        <div class="img">
          <div class="img__text m--up">
            <h2>还未注册？</h2>
            <p>立即注册，发现大量机会！</p>
          </div>
          <div class="img__text m--in">
            <h2>已有帐号？</h2>
            <p>有帐号就登录吧，好久不见了！</p>
          </div>
          <div class="img__btn" @click="imgclick">
            <span class="m--up">注 册</span>
            <span class="m--in">登 录</span>
          </div>
        </div>
        <div class="form sign-up">
          <h2>立即注册</h2>
          <label>
            <span>用户名</span>
            <input type="text" v-model="signusername" />
          </label>
          <label>
            <span>邮箱</span>
            <input type="email" v-model="signemail" />
          </label>
          <label>
            <span>密码</span>
            <input type="password" v-model="signpassword" @keydown.enter="register" />
          </label>
          <button type="button" class="submit" @click="register">注 册</button>
          <button type="button" class="fb-btn">
            使用
            <span>QQ</span> 帐号注册
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from "md5";
export default {
  data() {
    return {
      userName: "",
      passWord: "",
      signusername: "",
      signemail: "",
      signpassword: ""
    };
  },
  methods: {
    // 这是登录和注册 效果切换
    imgclick() {
      document.querySelector(".dowebok").classList.toggle("s--signup");
    },
    // 登录
    login() {
      let params = { userName: this.userName, passWord: md5(this.passWord) };
      this.$ajax.post(this.$api.login, params).then(res => {
        console.log(res);
        sessionStorage.setItem("token", res.token);
        sessionStorage.setItem("username", this.userName);
        if (res.success) {
          this.$router.push("/home");
        }
      });
    },
    // 注册
    register() {
      let params = {
        userName: this.signusername,
        passWord: md5(this.signpassword),
        email: this.signemail
      };
      this.$ajax.post(this.$api.adduser, params).then(res => {});
    }
  },
  created() {},
  mounted() {}
};
</script>