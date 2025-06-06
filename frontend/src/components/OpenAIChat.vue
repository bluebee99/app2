<template>
    <div>
      <h3>OpenAI Chat</h3>
      <div v-for="(msg, idx) in messages" :key="idx" class="msg">
        <b>{{ msg.role }}:</b> {{ msg.content }}
      </div>
      <input v-model="userInput" @keyup.enter="sendMessage" placeholder="メッセージを入力" />
      <button @click="sendMessage">送信</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const userInput = ref('');
  const messages = ref([]);
  
  const sendMessage = async () => {
    if (!userInput.value.trim()) return;
    messages.value.push({ role: 'user', content: userInput.value });
  
    try {
      const res = await axios.post('http://localhost:3001/api/openai-chat', {
        messages: messages.value,
      });
      messages.value.push({ role: 'assistant', content: res.data.reply });
      userInput.value = '';
    } catch (e) {
      messages.value.push({ role: 'assistant', content: 'エラーが発生しました。' });
    }
  };
  </script>
  
  <style scoped>
  .msg { margin-bottom: 0.5em; }
  </style>