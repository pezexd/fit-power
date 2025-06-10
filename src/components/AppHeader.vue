<script setup lang="ts">
import { ref } from "vue"
import { RouterLink, useRouter } from "vue-router"
import { userState } from "../store"
import { supabase } from "../supabase"

const mobileMenuOpen = ref(false)
const loading = ref(false)
const router = useRouter();

async function signOut() {
    try {
        loading.value = true
        const { error } = await supabase.auth.signOut()

        if (error) throw error

        userState.id = ""
        userState.user_metadata = {
            name: "",
            date_of_birth: "",
            weight: ""
        }
        router.push("/")
    } catch (error) {
        alert(error.message)
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <header class="bg-default border-b border-default">
        <UContainer class="py-6">
            <nav class="flex items-center justify-between gap-x-6" aria-label="Global">
                <div class="flex lg:flex-1">
                    <RouterLink to="/" class="-m-1.5 p-1.5 flex items-center gap-2">
                        <UIcon name="solar:dumbbell-large-bold-duotone" class="size-8" />
                        <span class="font-bold">
                            FitPower
                        </span>
                    </RouterLink>
                </div>
                <div class="flex flex-1 items-center justify-end gap-x-4">
                    <template v-if="!userState.id">
                        <UButton to="/iniciar-sesion" label="Iniciar sesion" variant="ghost" color="neutral" />
                        <UButton to="/registrarse" label="Registrarse" variant="solid" color="neutral" />
                    </template>
                    <template v-else>
                        <UButton to="/profile" label="Perfil" variant="solid" color="primary" />
                        <UButton @click="signOut" :loading="loading" label="Cerrar sesión" icon="lucide:log-out"
                            variant="soft" color="error" />
                    </template>
                </div>
                <div class="flex lg:hidden">
                    <USlideover v-model:open="mobileMenuOpen"
                        :ui="{ header: 'py-6 flex justify-between items-center' }">
                        <UButton icon="solar:menu-dots-bold" variant="soft" color="neutral"
                            @click="mobileMenuOpen = true" />

                        <template #header>
                            <RouterLink to="/" class="-m-1.5 p-1.5 flex items-center gap-2">
                                <UIcon name="solar:dumbbell-large-bold-duotone" class="size-8" />
                                <span class="font-bold">
                                    FitPower
                                </span>
                            </RouterLink>
                            <UButton icon="lucide:x" variant="soft" color="neutral" @click="mobileMenuOpen = false" />
                        </template>
                        <template #body>
                            Menu de movil
                        </template>
                    </USlideover>
                </div>
            </nav>
        </UContainer>
    </header>
</template>
