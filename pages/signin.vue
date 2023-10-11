<template>
  <div>
    <button @click.stop="signInWithGoogle">Signin With Google</button>
  </div>
</template>

<script setup>
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
const signInWithGoogle = async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    console.log(auth, provider);
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
};
</script>

<style></style>
