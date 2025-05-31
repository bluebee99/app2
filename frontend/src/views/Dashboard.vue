<template>
  <div class="dashboard">
    <div class="sidebar">メニュー</div>
    <div class="main">
      <h2>メール一覧</h2>
      <table>
        <thead>
          <tr>
            <th>受信日時</th>
            <th>差出人</th>
            <th>件名</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mail in mails" :key="mail.id">
            <td>{{ formatDate(mail.receivedDateTime) }}</td>
            <td>{{ mail.from?.emailAddress?.name }}</td>
            <td>{{ mail.subject }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="openai-chat">
      <OpenAIChat />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { msalInstance } from '../msal';
import axios from 'axios';
import OpenAIChat from '../components/OpenAIChat.vue';

const mails = ref([]);

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleString();
};

onMounted(async () => {
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length === 0) return;

  const tokenResponse = await msalInstance.acquireTokenSilent({
    account: accounts[0],
    scopes: ['Mail.Read'],
  });

  const res = await axios.post('http://localhost:3001/api/mail', {
    accessToken: tokenResponse.accessToken,
  });
  mails.value = res.data;
});
</script>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
}
.sidebar {
  width: 20%;
  border-right: 1px solid #ccc;
}
.main {
  width: 47%;
  border-right: 1px solid #ccc;
  padding: 1rem;
}
.openai-chat {
  width: 33%;
  padding: 1rem;
}
</style>
