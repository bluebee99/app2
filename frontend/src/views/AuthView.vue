<template>
  <div class="auth">
    <h1>Microsoft アカウントでサインイン</h1>
    <button @click="login">サインイン</button>
  </div>
</template>

<script setup>
import { msalInstance } from '../msal';
import { useRouter } from 'vue-router';

const router = useRouter();

const login = async () => {
  try {
    const loginResponse = await msalInstance.loginPopup({
      scopes: ['User.Read', 'Mail.Read'],
    });
    if (loginResponse.account) {
      router.push('/dashboard');
    }
  } catch (e) {
    console.error("MSAL login error:", e);
    alert('認証に失敗しました');
  }
};
</script> 