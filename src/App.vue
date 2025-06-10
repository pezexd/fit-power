<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { supabase } from './supabase'
import { userState } from "./store"

onMounted(() => {
    supabase.auth.getSession().then(({ data }) => {
        if (data.session?.user.user_metadata) {
            userState.id = data.session.user.id;
            userState.user_metadata = data.session.user.user_metadata as any;
        }
    })
    supabase.auth.onAuthStateChange((_, _session) => {
        if (_session?.user.user_metadata) {
            userState.id = _session.user.id;
            userState.user_metadata = _session.user.user_metadata as any;
        }
    })
})
</script>

<template>
    <UApp>
        <div class="flex flex-col">
            <AppHeader />
            <RouterView />
        </div>
    </UApp>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Baloo+2:wght@400..800&family=Bebas+Neue&display=swap");
</style>
